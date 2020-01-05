export interface ItemInterface {
  Id: string;
  body: string;
  title: string;
}

export interface ItemProps {
  key: any;
  body: string;
  title: string;
}

export interface ItemListProps {
  items: ItemInterface[];
}
