export type PartialPick<T, K extends keyof T> = Partial<Pick<T, K>>;
export type PartialOmit<T, K extends keyof T> = Partial<Omit<T, K>>;
export type RequiredPick<T, K extends keyof T> = Required<Pick<T, K>>;
export type RequiredOmit<T, K extends keyof T> = Required<Omit<T, K>>;
