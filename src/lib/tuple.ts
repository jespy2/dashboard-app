export type Ten<T> = [T, T, T, T, T, T, T, T, T, T];
export const ten = <T>(v: T): Ten<T> => [v, v, v, v, v, v, v, v, v, v];
