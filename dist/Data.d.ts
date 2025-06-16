export type Lv<L = unknown, V = unknown, Other = {
    [key: string]: unknown;
}> = {
    label: L;
    value: V;
} & Other;
export type Vl<V = unknown, L = unknown, Other = {
    [key: string]: unknown;
}> = Lv<V, L, Other>;
