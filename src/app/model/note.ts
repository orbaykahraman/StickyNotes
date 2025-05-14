// model/note.ts
export interface Note {
  id: string; // String olarak kalacak
  content: string;
  color: string;
  width: number;
  height: number;
  x: number;
  y: number;
  updatedAt: Date;
  createdAt: Date;
  tags: string[]; // Optional (?) kaldırıldı
}
