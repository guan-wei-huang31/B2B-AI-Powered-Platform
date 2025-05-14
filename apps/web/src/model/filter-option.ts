export enum FilterKey {
  cid = 'cid',
  fid = 'fid',
  aid = 'aid',
  iid = 'iid',
  sid = 'sid',
  hid = 'hid',
}
export interface FilterOption {
  key: FilterKey;
  options: FilterOptionItem[];
}

export interface FilterOptionItem {
  id: string;
  name: string;
}

export type SelectedFilterOptions = Partial<Record<FilterKey, FilterOptionItem[]>>;
