import { AfterViewInit, Component, EventEmitter, Output } from "@angular/core";

const LESSON_PREFACE_INDEX = 0;

@Component({
  selector: "lesson-preface",
  templateUrl: "./lesson-preface.component.html",
  styleUrls: ["./lesson-preface.component.css"]
})
export class LessonPrefaceComponent implements AfterViewInit {
  @Output() exerciseFinish = new EventEmitter<number>();

  constructor() {}

  ngAfterViewInit() {
    this.exerciseFinish.emit(LESSON_PREFACE_INDEX);
  }
}
