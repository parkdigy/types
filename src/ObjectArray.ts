export type ValueOf<T> = T[keyof T];

export type Dict<T = any> = { [k: string]: T };
export type Arr<T = any> = T[];

export type IsObject<T> = T extends Record<string, unknown> ? true : false;
export type IsArray<T> = T extends unknown[] ? true : false;

export type ObjectMerge<T> = { [K in keyof T]: T[K] };
export type ArrayMerge<A extends any[]> = A extends [infer T, ...infer R] ? T & ArrayMerge<R> : unknown;
