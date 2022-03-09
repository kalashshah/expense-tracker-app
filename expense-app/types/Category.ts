export interface ICategory {
  _id: string;
  type: string;
  name: string;
  icon: string;
  color: string;
  user: string;
}

export interface IAddCategory {
  name: string;
  check: string;
}
