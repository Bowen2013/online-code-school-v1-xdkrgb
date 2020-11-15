import { Component, EventEmitter, Output } from "@angular/core";
import {
  CM_EXERCISE_OPTIONS,
  CM_VIEWONLY_OPTIONS
} from "../../../model/ui_constants";
import { ANSWER_STATUS } from "../../../model/ui_model";

const LESSON_ONE_INDEX = 1;
const INITIAL_EXERCISE = `let drink = 'Pepsi';
console.log('I changed my mind');
drink = 'Coke';

const entree = 'Tacos';
console.log('I changed my mind again');
entree = 'Burritos';
`;

@Component({
  selector: "lesson-one",
  templateUrl: "./lesson-one.component.html",
  styleUrls: ["./lesson-one.component.scss"]
})
export class LessonOneComponent {
  @Output() exerciseFinish = new EventEmitter<number>();

  viewOnlyOptions = CM_VIEWONLY_OPTIONS;
  exerciseOptions = CM_EXERCISE_OPTIONS;
  answerStatus = ANSWER_STATUS.UNSPECIFIED;
  errorMessage = "";

  /** View only code mirror */
  viewOnlyContent1 = `let meal = 'Enchiladas';
console.log(meal); // Output: Enchiladas
meal = 'Burrito';
console.log(meal); // Output: Burrito

// we can declare a variable without assigning the variable a value. In such a case, the variable will be automatically initialized with a value of undefined
let price;
console.log(price); // Output: undefined
price = 350;
console.log(price); // Output: 350
`;

  viewOnlyContent2 = `const myName = 'Gilberto';
console.log(myName); // Output: Gilberto
myName = 'John'; // <-- TypeError: Assignment to constant variable.
`;

  /** Exercise code mirror */
  exerciseContent = INITIAL_EXERCISE;
  solutionContent = `let drink = 'Pepsi';
console.log('I changed my mind');
drink = 'Coke';

let entree = 'Tacos';
console.log('I changed my mind again');
entree = 'Burritos';
`;

  /** Exercise related logic */
  get isCorrect(): boolean {
    return this.answerStatus === ANSWER_STATUS.CORRECT;
  }

  get isWrong(): boolean {
    return this.answerStatus === ANSWER_STATUS.WRONG;
  }

  submit() {
    this.clearPrevious();
    if (
      // hack way to skip lesson
      this.exerciseContent === "hack" ||
      this.exerciseContent === this.solutionContent
    ) {
      this.answerStatus = ANSWER_STATUS.CORRECT;
      this.onExerciseFinish();
    } else {
      this.answerStatus = ANSWER_STATUS.WRONG;
      this.errorMessage = "Make sure to change only one line";
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
    this.exerciseFinish.emit(LESSON_ONE_INDEX);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
