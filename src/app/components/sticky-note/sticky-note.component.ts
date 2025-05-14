import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import { Note } from "../../model/note";
import { CdkDragEnd } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-sticky-note',
  templateUrl: './sticky-note.component.html',
  styleUrls: ['./sticky-note.component.css']
})
export class StickyNoteComponent {
  @Input() note!: Note;
  @Output() noteChange = new EventEmitter<Note>();
  @Output() delete = new EventEmitter<void>();


  @HostListener('window:resize')
  onWindowResize() {
    this.note.x = Math.min(this.note.x, window.innerWidth - this.note.width);
    this.note.y = Math.min(this.note.y, window.innerHeight - this.note.height);
  }

  // Not boyutları için minimum ve maksimum limitler
  readonly MIN_WIDTH = 200;
  readonly MIN_HEIGHT = 180;
  readonly MAX_WIDTH = 400;
  readonly MAX_HEIGHT = 400;

  constructor() { }

  onDragEnd(event: CdkDragEnd): void {
    const newPosition = event.source.getFreeDragPosition();

    // Pozisyon limitleri
    this.note.x = Math.max(0, newPosition.x);
    this.note.y = Math.max(0, newPosition.y);

    this.updateNote();
  }

  updateNote(): void {
    // Boyut limitlerini uygula
    this.note.width = Math.min(Math.max(this.note.width, this.MIN_WIDTH), this.MAX_WIDTH);
    this.note.height = Math.min(Math.max(this.note.height, this.MIN_HEIGHT), this.MAX_HEIGHT);

    this.note.updatedAt = new Date();
    this.noteChange.emit({ ...this.note });
  }

  saveNote(): void {
    this.updateNote();
  }

  deleteNote(): void {
    this.delete.emit();
  }


  getTextColor(): string {
    return '#333333'; // Her zaman siyah döner
  }
}
