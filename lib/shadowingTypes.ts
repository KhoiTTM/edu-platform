export interface WordItem {
  key: number;
  type: 'BLANK' | 'TEXT' | 'PUNCTUATION';
  value: string;
}

export interface SentenceItem {
  index: number;
  start: number;
  end: number;
  content: string;
  contentVi: string;
  words: WordItem[];
}

export interface AdviceData {
  title: string;
  audio_url: string;
  repeat_offset: number;
  sentences: SentenceItem[];
}
