interface IResponse<T> {
  results: T[];
  hasPrevious: boolean;
  previous: string;
  hasNext: boolean;
  next: string;
}

export { type IResponse };
