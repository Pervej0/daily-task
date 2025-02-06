export type TMeta = {
  page: number;
  limit: number;
  total: number;
};

export type TJsonData<T> = {
  statusCode: number;
  message: string;
  meta?: TMeta;
  data: T;
};

export type TErrorDetails = {
  field: string | number;
  message: string;
}[];

export type TCustomSimplifiedError = {
  statusCode?: number;
  message: string;
  errorDetails: TErrorDetails | any;
};

export type TJwtPayload = {
  email: string;
  role: string;
};
