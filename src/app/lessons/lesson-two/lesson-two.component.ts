import { Component, EventEmitter, Output } from "@angular/core";
import {
  CM_EXERCISE_OPTIONS,
  CM_VIEWONLY_OPTIONS
} from "../../../model/ui_constants";
import { ANSWER_STATUS } from "../../../model/ui_model";

const LESSON_TWO_INDEX = 2;
const INITIAL_EXERCISE = `



`;

@Component({
  selector: "lesson-two",
  templateUrl: "./lesson-two.component.html",
  styleUrls: ["./lesson-two.component.scss"]
})
export class LessonTwoComponent {
  @Output() exerciseFinish = new EventEmitter<number>();

  myPetVariable = "${myPet}";

  viewOnlyOptions = CM_VIEWONLY_OPTIONS;
  exerciseOptions = CM_EXERCISE_OPTIONS;
  answerStatus = ANSWER_STATUS.UNSPECIFIED;
  errorMessage = "";

  /** View only code mirror */
  viewOnlyContent = `const myPet = 'armadillo';
console.log(\`I own a pet \${myPet}.\`);
// Output: I own a pet armadillo.`;

  /** Input for exercise */
  exerciseContent = INITIAL_EXERCISE;

  solutionContent =
    "const myName = 'hello';const myCity = 'world';console.log(`My name is ${myName}. My favorite city is ${myCity}.`);";

  /** Exercise related logic */
  get isCorrect(): boolean {
    return this.answerStatus === ANSWER_STATUS.CORRECT;
  }

  get isWrong(): boolean {
    return this.answerStatus === ANSWER_STATUS.WRONG;
  }

  submit() {
    this.clearPrevious();
    // hack way to skip lesson
    if (this.exerciseContent.indexOf("hack") > -1) {
      this.answerStatus = ANSWER_STATUS.CORRECT;
      this.onExerciseFinish();
      return;
    }

    if (
      this.exerciseContent.indexOf("`") > -1 &&
      this.exerciseContent.indexOf("console.log(") > -1 &&
      this.exerciseContent.indexOf("`My name is ${myName}") > -1 &&
      this.exerciseContent.indexOf("My favorite city is ${myCity}") > -1
    ) {
      this.answerStatus = ANSWER_STATUS.CORRECT;
      this.onExerciseFinish();
    } else {
      this.answerStatus = ANSWER_STATUS.WRONG;
      if (this.exerciseContent.indexOf("`") === -1) {
        this.errorMessage = "Make sure to use ` symbol, not ' or \".";
      } else if (this.exerciseContent.indexOf("console.log(") === -1) {
        this.errorMessage = "Did you forgot using console.log()?";
      } else if (this.exerciseContent.indexOf("${myName}") === -1) {
        this.errorMessage = "Did you use ${myName} in the console.log()?";
      } else if (this.exerciseContent.indexOf("${myCity}") === -1) {
        this.errorMessage = "Did you use ${myCity} in the console.log()?";
      } else {
        this.errorMessage =
          "Make sure the content is My name is NAME. My favorite city is CITY";
      }
    }
  }

  reset() {
    this.clearPrevious();
    this.exerciseContent = INITIAL_EXERCISE;
  }

  clearPrevious() {
    this.answerStatus = ANSWER_STATUS.UNSPECIFIED;
    this.errorMessage = "";
  }

  onExerciseFinish() {
    // emit value to code school component
    this.exerciseFinish.emit(LESSON_TWO_INDEX);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
