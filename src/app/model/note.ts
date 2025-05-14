export interface Note {
  id: string;
  content: string;
  color: string;
  width: number;
  height: number;
  x: number;
  y: number;
  updatedAt: Date;
  createdAt: Date;
  tags: string[];
  isMinimized: boolean;
  originalWidth?: number; // Opsiyonel: Orijinal genişlik
  originalHeight?: number; // Opsiyonel: Orijinal yükseklik;
}
