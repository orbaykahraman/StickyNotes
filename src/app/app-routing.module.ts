import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotesBoardComponent} from "./components/notes-board/notes-board.component";

const routes: Routes = [
  {  path: '', component: NotesBoardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
