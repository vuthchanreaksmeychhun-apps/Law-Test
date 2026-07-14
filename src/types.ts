export interface Lawyer {
  id: string;
  name: string;
  nameKh: string;
  title: string;
  titleKh: string;
  avatar: string;
  experience: number;
  rating: number;
  reviewsCount: number;
  specialties: string[];
  specialtiesKh: string[];
  location: string;
  locationKh: string;
  phone: string;
  email: string;
  languages: string[];
  fee: string;
  bio: string;
  bioKh: string;
}

export interface LegalDocumentField {
  key: string;
  label: string;
  labelKh: string;
  placeholder: string;
  defaultValue: string;
}

export interface LegalDocument {
  id: string;
  title: string;
  titleKh: string;
  category: 'Contract' | 'Lawsuit' | 'Corporate' | 'Family';
  categoryKh: string;
  description: string;
  descriptionKh: string;
  fields: LegalDocumentField[];
  templateText: string;
}

export interface TextbookChapter {
  title: string;
  titleKh: string;
  content: string;
  contentKh: string;
}

export interface Textbook {
  id: string;
  title: string;
  titleKh: string;
  author: string;
  year: number;
  coverColor: string;
  category: string;
  chapters: TextbookChapter[];
}

export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
