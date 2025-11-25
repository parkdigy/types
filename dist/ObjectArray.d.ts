export type ValueOf<T> = T[keyof T];
export type Dict<T = any> = {
    [k: string]: T;
};
export type Arr<T = any> = T[];
export type IsObject<T> = T extends Record<string, unknown> ? true : false;
export type IsArray<T> = T extends unknown[] ? true : false;
export type ObjectMerge<T> = {
    [K in keyof T]: T[K];
};
export type ArrayMerge<A extends any[]> = A extends [infer T, ...infer R] ? T & ArrayMerge<R> : unknown;
export type MutableArray<T> = {
    -readonly [P in keyof T]: T[P];
};
export type FlattenArray<T> = T extends ReadonlyArray<infer U> ? U extends ReadonlyArray<any> ? FlattenArray<U> : U extends string ? U : never : T extends string ? T : never;
