// notes-board.component.ts
import { Component, OnInit } from '@angular/core';
import { Note } from "../../model/note";
import {debounceTime, distinctUntilChanged, Subject} from "rxjs";

@Component({
  selector: 'app-notes-board',
  templateUrl: './notes-board.component.html',
  styleUrls: ['./notes-board.component.css']
})
export class NotesBoardComponent implements OnInit {
  notes: Note[] = [];
  searchQuery: string = '';
  searchQuery$ = new Subject<string>();

  constructor() {
    this.searchQuery$
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(query => {
        this.searchQuery = query;
      });
  }

  trackByNotes(index: number, note: Note): string {
    return note.id; // Benzersiz ID'ye göre takip
  }

  ngOnInit() {
    this.loadNotes();
  }

  private loadNotes() {
    const saved = localStorage.getItem('stickyNotes');
    this.notes = saved ? JSON.parse(saved, this.reviver) : [];
  }

  private reviver(key: string, value: any) {
    return key === 'createdAt' || key === 'updatedAt' ? new Date(value) : value;
  }

  addNote() {
    const note: Note = {
      id: Date.now().toString(), // ID string olarak güncellendi
      content: '',
      tags: [],
      color: '#fff8b3',
      x: Math.random() * 100 + 20, // Rastgele başlangıç pozisyonu
      y: Math.random() * 100 + 20,
      width: 250,
      height: 220,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.notes = [...this.notes, note]; // Immutable update
    this.saveNotes();
  }

  updateNote(updatedNote: Note) {
    this.notes = this.notes.map(n =>
      n.id === updatedNote.id ? { ...updatedNote } : n
    );
    this.saveNotes();
  }

  deleteNote(noteId: string) {
    this.notes = this.notes.filter(n => n.id !== noteId);
    this.saveNotes();
  }

  private saveNotes() {
    localStorage.setItem('stickyNotes', JSON.stringify(this.notes));
  }

  filteredNotes(): Note[] {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) return this.notes;

    return this.notes.filter(note =>
      note.content.toLowerCase().includes(query) ||
      note.tags.some(t => t.toLowerCase().includes(query))
    );
  }

  exportNotesAsText() {
    const text = this.notes
      .map(n => `📌 ${n.content}\n🎨 Renk: ${n.color}\n📍 Pozisyon: (${n.x},${n.y})\n📅 Oluşturulma: ${n.createdAt.toLocaleDateString()}\n\n`)
      .join('\n――――――――――\n');

    this.triggerDownload(text, 'notlar.txt');
  }

  private triggerDownload(content: string, filename: string) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
}
