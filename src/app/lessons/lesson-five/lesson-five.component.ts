import { Component, EventEmitter, Output } from "@angular/core";
import {
  CM_EXERCISE_OPTIONS,
  CM_VIEWONLY_OPTIONS
} from "../../../model/ui_constants";
import { ANSWER_STATUS } from "../../../model/ui_model";

const LESSON_FIVE_INDEX = 5;
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
  selector: "lesson-five",
  templateUrl: "./lesson-five.component.html",
  styleUrls: ["./lesson-five.component.scss"]
})
export class LessonFiveComponent {
  @Output() exerciseFinish = new EventEmitter<number>();

  bracketVariable = "{}";

  viewOnlyOptions = CM_VIEWONLY_OPTIONS;
  exerciseOptions = CM_EXERCISE_OPTIONS;
  answerStatus = ANSWER_STATUS.UNSPECIFIED;
  errorMessage = "";

  /** View only code mirror */
  viewOnlyContent1 = `let x = 20,
let y = 10;

let result = add(x,y);
console.log(result);

function add(a, b){
  return a + b;
}
`;

  viewOnlyContent2 = `function add(a, b){
  return a + b;
}
let x = 20,
let y = 10;

let result = add(x,y);
console.log(result); // Outputs 30
`;

  viewOnlyContent3 = `let x = 20,
let y = 10;

let result = add(x,y);
console.log(result);

let add = function(x, y) {
return x + y;
}
`;

  /** Input for exercise */
  exerciseContent1 = `greeting();

let greeting = function() {
  console.log('hello world');
}  
`;
  exerciseContent2 = `greeting();

function greeting() {
  return helloWorld();
}  

function helloWorld() {
  console.log('hello world');
}

`;

  exerciseAnswer1 = "";
  exerciseAnswer2 = "";

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
    if (this.exerciseAnswer1 === "hack" && this.exerciseAnswer2 === "hack") {
      this.answerStatus = ANSWER_STATUS.CORRECT;
      this.onExerciseFinish();
      return;
    }

    if (
      this.exerciseAnswer1.indexOf("greeting is not defined") > -1 &&
      this.exerciseAnswer2.indexOf("hello world") > -1
    ) {
      this.answerStatus = ANSWER_STATUS.CORRECT;
      this.onExerciseFinish();
    } else if (this.exerciseAnswer1.indexOf("greeting is not defined") === -1) {
      this.answerStatus = ANSWER_STATUS.WRONG;
      this.errorMessage = "First exercise is not correct";
    } else {
      this.answerStatus = ANSWER_STATUS.WRONG;
      this.errorMessage = "Second exercise is not correct";
    }
  }

  reset() {
    this.clearPrevious();
    this.exerciseAnswer1 = "";
    this.exerciseAnswer2 = "";
  }

  clearPrevious() {
    this.answerStatus = ANSWER_STATUS.UNSPECIFIED;
    this.errorMessage = "";
  }

  onExerciseFinish() {
    // emit value to code school component
    this.exerciseFinish.emit(LESSON_FIVE_INDEX);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
