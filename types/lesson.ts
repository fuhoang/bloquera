export interface LessonMeta {
  slug: string;
  title: string;
  summary: string;
  duration: string;
  order: number;
  track: string;
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
  track: string;
  lessons: LessonMeta[];
}

export interface TrackMeta {
  slug: string;
  title: string;
  description: string;
  order: number;
  status: "available" | "planned";
}
