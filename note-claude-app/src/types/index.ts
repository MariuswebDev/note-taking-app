export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type InputNote = Omit<Note, "id" | "createdAt" | "updatedAt">;
