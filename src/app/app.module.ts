import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StickyNoteComponent } from './components/sticky-note/sticky-note.component';
import {CdkDrag, DragDropModule} from "@angular/cdk/drag-drop";
import {FormsModule} from "@angular/forms";
import { NotesBoardComponent } from './components/notes-board/notes-board.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    StickyNoteComponent,
    NotesBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CdkDrag,
    FormsModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
