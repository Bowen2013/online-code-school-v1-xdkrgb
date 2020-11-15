import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { CodeSchoolComponent } from "./code-school/code-school.component";
import { ExerciseCodemirrorComponent } from "./exercise-codemirror/exercise-codemirror.component";
import { LessonOneComponent } from "./lessons/lesson-one/lesson-one.component";
import { LessonTwoComponent } from "./lessons/lesson-two/lesson-two.component";
import { LessonTemplateComponent } from "./lessons/lesson-template/lesson-template.component";
import { CodemirrorModule } from "@ctrl/ngx-codemirror";
import { LessonPrefaceComponent } from "./lessons/lesson-preface/lesson-preface.component";
import { LessonThreeComponent } from "./lessons/lesson-three/lesson-three.component";
import { LessonFourComponent } from "./lessons/lesson-four/lesson-four.component";
import { LessonFiveComponent } from "./lessons/lesson-five/lesson-five.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    CodemirrorModule,
    RouterModule.forRoot([{ path: "", component: CodeSchoolComponent }])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    CodeSchoolComponent,
    LessonOneComponent,
    LessonTemplateComponent,
    LessonTwoComponent,
    ExerciseCodemirrorComponent,
    LessonPrefaceComponent,
    LessonThreeComponent,
    LessonFourComponent,
    LessonFiveComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
