export interface MetaData {
  pageNumber: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
}

export class PagniatedResponse<T> {
  items: T;
  metaData: MetaData;
  constructor(items: T, metaData: MetaData) {
    this.items = items;
    this.metaData = metaData;
  }
}
