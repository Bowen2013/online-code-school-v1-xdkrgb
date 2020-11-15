import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ANSWER_STATUS } from "../../model/ui_model";
import { CM_EXERCISE_OPTIONS } from "../../model/ui_constants";

@Component({
  selector: "exercise-codemirror",
  templateUrl: "./exercise-codemirror.component.html",
  styleUrls: ["./exercise-codemirror.component.scss"]
})
export class ExerciseCodemirrorComponent {
  answerStatus = ANSWER_STATUS.UNSPECIFIED;
  exerciseOptions = CM_EXERCISE_OPTIONS;

  actualAnswers = "";
  solutionAnswers = "";
  // exercise content user is editing
  exerciseContentInternal = "";
  // initial exercise content
  exerciseContentInitial = "";

  @Input()
  set exerciseContent(value: string) {
    this.exerciseContentInitial = value;
    this.exerciseContentInternal = value;
  }
  @Input() testCases: Array<any>;
  @Input() testCasesString: string;
  @Input() solutionContent: string;

  @Output() exerciseFinish = new EventEmitter<void>();

  get isCorrect(): boolean {
    return this.answerStatus === ANSWER_STATUS.CORRECT;
  }

  get isWrong(): boolean {
    return this.answerStatus === ANSWER_STATUS.WRONG;
  }

  run() {
    this.clearPrevious();
    let isWrong = false;
    for (let i = 0; i < this.testCases.length; i++) {
      const arg = this.testCases[i];
      const solutionAns = this.getResultFromFunctionString(
        this.solutionContent,
        arg
      );
      const actualAns = this.getResultFromFunctionString(
        this.exerciseContentInternal,
        arg
      );
      this.solutionAnswers += `${solutionAns}${
        i === this.testCases.length - 1 ? "" : ", "
      }`;
      this.actualAnswers += `${actualAns}${
        i === this.testCases.length - 1 ? "" : ", "
      }`;
      if (solutionAns !== actualAns) {
        isWrong = true;
      }
    }
    if (isWrong) {
      this.answerStatus = ANSWER_STATUS.WRONG;
    } else {
      this.answerStatus = ANSWER_STATUS.CORRECT;
      this.exerciseFinish.emit();
    }
  }

  clearPrevious() {
    this.answerStatus = ANSWER_STATUS.UNSPECIFIED;
    this.actualAnswers = "";
    this.solutionAnswers = "";
  }

  /**
   * How it works?
   * fnString:
   *   function foo(a, b) {
   *    return a + b;
   *   }
   * wrapper {return function foo(a, b) {return a + b;};}
   * func: function anonymous() {
   *    return function foo(){
   *     };
   * }
   * call(null) => foo(a, b)
   * apply(null, args) => invoke foo with args
   */
  getResultFromFunctionString(fnString, args) {
    const wrapper = s => `{return ${fnString}}`;
    const func = new Function(wrapper(fnString));

    const fn = func.call(null);
    if (typeof fn === "function") {
      return fn.apply(null, args);
    }
    return undefined;
  }

  reset() {
    this.exerciseContentInternal = this.exerciseContentInitial;
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
