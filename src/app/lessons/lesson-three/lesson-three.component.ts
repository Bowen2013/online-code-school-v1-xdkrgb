import { Component, EventEmitter, Output } from "@angular/core";
import {
  CM_EXERCISE_OPTIONS,
  CM_VIEWONLY_OPTIONS
} from "../../../model/ui_constants";
import { ANSWER_STATUS } from "../../../model/ui_model";
import { getResultFromFunctionString } from "../../../shared/functionStringBuilder";

const LESSON_THREE_INDEX = 3;
const INITIAL_EXERCISE = `function makeShoppingList() {


}

/**
 * Examples:
 * makeShoppingList() should return string 'Remember to buy milk, bread, eggs'
 * makeShoppingList('soy milk', 'noodle', 'bacon') should return string 'Remember to buy soy milk, noodle, bacon'
 */

`;

@Component({
  selector: "lesson-three",
  templateUrl: "./lesson-three.component.html",
  styleUrls: ["./lesson-three.component.scss"]
})
export class LessonThreeComponent {
  @Output() exerciseFinish = new EventEmitter<number>();

  viewOnlyOptions = CM_VIEWONLY_OPTIONS;
  exerciseOptions = CM_EXERCISE_OPTIONS;
  answerStatus = ANSWER_STATUS.UNSPECIFIED;
  errorMessage = "";

  /** View only code mirror */
  viewOnlyContent1 = `function getGreetings() {
  return "Hello world";
}

getGreetings();
`;

  viewOnlyContent2 = `function calculateArea(width, height) {
  return width * height;
}

calculateArea(5, 3); // Output: 15
`;

  viewOnlyContent3 = `function greeting (name = 'stranger') {
  console.log(\`Hello, \${name}!\`)
}

greeting('Nick') // Output: Hello, Nick!
greeting() // Output: Hello, stranger!
`;

  /** Input for exercise */
  exerciseContent = INITIAL_EXERCISE;

  // do not use string inteporlation format, which makes it not working
  solutionContent =
    "function makeShoppingList(item1 = 'milk', item2 = 'bread', item3 = 'eggs') {return `Remember to buy ${item1}, ${item2}, ${item3}`;}";

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

    let actualAns = getResultFromFunctionString(this.exerciseContent, []);
    let solutionAns = getResultFromFunctionString(this.solutionContent, []);

    if (actualAns !== solutionAns) {
      this.answerStatus = ANSWER_STATUS.WRONG;
      this.errorMessage = `
      Expected result is: ${solutionAns} while
      Actual result is: ${actualAns}`;
      return;
    }

    actualAns = getResultFromFunctionString(this.exerciseContent, [
      "soy milk",
      "noodle",
      "bacon"
    ]);
    solutionAns = getResultFromFunctionString(this.solutionContent, [
      "soy milk",
      "noodle",
      "bacon"
    ]);

    if (actualAns !== solutionAns) {
      this.answerStatus = ANSWER_STATUS.WRONG;
      this.errorMessage = `
      Expected result is: ${solutionAns} while
      Actual result is: ${actualAns}`;
    } else {
      this.answerStatus = ANSWER_STATUS.CORRECT;
      this.onExerciseFinish();
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
    this.exerciseFinish.emit(LESSON_THREE_INDEX);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
