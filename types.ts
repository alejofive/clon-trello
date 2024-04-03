export type Id = string | number;

export type Column = {
  map(arg0: (col: { id: Id; }) => { id: Id; } | { title: string; id: Id; }): unknown;
  id: Id;
  title: string;
};

export type Task = {
  id: Id;
  columnId: Id;
  content: string;
};
