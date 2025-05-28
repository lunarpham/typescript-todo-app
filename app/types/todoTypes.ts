export enum Category {
  WORK = "WORK",
  PERSONAL = "PERSONAL",
  SCHOOL = "SCHOOL",
}

export const categoryColors: Record<Category, string> = {
  [Category.PERSONAL]: "bg-[#fdf3b4]",
  [Category.WORK]: "bg-[#d1eaed]",
  [Category.SCHOOL]: "bg-[#ffdadb]",
};

export type TodoAttributes = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  category?: Category;
  createdAt: Date;
};

export type TodoRespone = {
  result: "ok" | "error";
  response: string;
  data: TodoAttributes[];
};

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];
