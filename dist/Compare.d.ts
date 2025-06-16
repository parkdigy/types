import { Arr, Dict } from './ObjectArray';
export type InValue<T, TValue> = Extract<T, TValue> extends never ? false : true;
export type IsEmpty<T extends Dict | any[]> = T extends Dict ? keyof T extends never ? true : false : T extends Arr ? T[number] extends never ? true : false : true;
export type IsUnionInclude<UnionType, TargetType> = [TargetType] extends [UnionType] ? [UnionType] extends [Exclude<UnionType, TargetType>] ? false : true : false;
export type IsStringLiteralUnion<U> = string extends U ? false : U extends string ? true : false;
