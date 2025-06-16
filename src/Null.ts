import { ValueOf } from './ObjectArray';

export type NullableKeys<T> = ValueOf<{ [K in keyof T]: Exclude<T[K], NonNullable<T[K]>> extends never ? never : K }>;
export type NotNullableKeys<T> = ValueOf<{
  [K in keyof T]: Exclude<T[K], NonNullable<T[K]>> extends never ? K : never;
}>;
export type NullableProperties<T> = Pick<T, NullableKeys<T>>;
export type NotNullableProperties<T> = Pick<T, NotNullableKeys<T>>;
