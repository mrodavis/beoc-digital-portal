export type ContentBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
    }
  | {
      type: "list";
      items: string[];
      ordered?: boolean;
    };

export interface LessonSection {
  heading: string;
  blocks: ContentBlock[];
}

export interface Lesson {
  slug: string;
  title: string;
  description: string;
  videoUrl?: string;
  videoUrls?: string[];
  duration?: string;
  sections?: LessonSection[];
  challenge?: ContentBlock[];
  practiceFiles?: {
    name: string;
    url: string;
  }[];  
}
