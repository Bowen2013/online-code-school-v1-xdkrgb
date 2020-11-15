import { Component, EventEmitter, Output } from "@angular/core";
import {
  CM_EXERCISE_OPTIONS,
  CM_VIEWONLY_OPTIONS
} from "../../../model/ui_constants";
import { ANSWER_STATUS } from "../../../model/ui_model";

const LESSON_FOUR_INDEX = 4;
const INITIAL_EXERCISE = `function makeShoppingList(item1 = 'milk', item2 = 'bread', item3 = 'eggs') {
  return \`Remember to buy \${item1}, \${item2}, \${item3}\`;
}

/**
 * Examples:
 * makeShoppingList() should return string 'Remember to buy milk, bread, eggs'
 * makeShoppingList('soy milk', 'noodle', 'bacon') should return string 'Remember to buy soy milk, noodle, bacon'
 */

`;

@Component({
  selector: "lesson-four",
  templateUrl: "./lesson-four.component.html",
  styleUrls: ["./lesson-four.component.scss"]
})
export class LessonFourComponent {
  @Output() exerciseFinish = new EventEmitter<number>();

  bracketVariable = "{}";

  viewOnlyOptions = CM_VIEWONLY_OPTIONS;
  exerciseOptions = CM_EXERCISE_OPTIONS;
  answerStatus = ANSWER_STATUS.UNSPECIFIED;
  errorMessage = "";

  /** View only code mirror */
  viewOnlyContent1 = `const calculateArea = function(width, height) {
    const area = width * height;
    return area;
  }
`;

  viewOnlyContent2 = `const rectangleArea = (width, height) => {
  let area = width * height;
  return area;
};
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

    if (
      (this.exerciseContent.indexOf("makeShoppingList =") > -1 ||
        this.exerciseContent.indexOf("makeShoppingList=") > -1) &&
      this.exerciseContent.indexOf("=>") > 0
    ) {
      this.answerStatus = ANSWER_STATUS.CORRECT;
      this.onExerciseFinish();
    } else if (this.exerciseContent.indexOf("=>") === -1) {
      this.answerStatus = ANSWER_STATUS.WRONG;
      this.errorMessage = "Be sure to use the Arrows function format.";
    } else {
      this.answerStatus = ANSWER_STATUS.WRONG;
      this.errorMessage = "Be sure to use the function expression format.";
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
    this.exerciseFinish.emit(LESSON_FOUR_INDEX);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
