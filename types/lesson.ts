export interface LessonMeta {
  slug: string;
  title: string;
  summary: string;
  duration: string;
  order: number;
  section?: string;
}

export interface Lesson extends LessonMeta {
  body: string;
}

export interface ModuleMeta {
  slug: string;
  title: string;
  description: string;
  order: number;
  lessons: LessonMeta[];
}
