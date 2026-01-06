
export class NoteEntity {
  id: number;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
    id: number;
    title: string;
    content: string;
    tags?: string[];
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
    this.tags = data.tags || [];
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }
} 
