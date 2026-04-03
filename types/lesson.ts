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
      start?: number;
    }

  | {
      type: "callout";
      variant: "info" | "warning" | "success";
      text: string;
    }

  | {
      type: "tip";
      text: string;
    }

  | {
      type: "code";
      code: string;
      language?: string;
    }

  | {
      type: "download";
      name: string;
      url: string;
    }

  | {
      type: "knowledge-check";
      question: string;
      options: string[];
      correctIndex: number;
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
  slides?: { src: string; alt: string }[];
  duration?: string;
  sections?: LessonSection[];
  challenge?: ContentBlock[];
  practiceFiles?: {
    name: string;
    url: string;
  }[];
}
