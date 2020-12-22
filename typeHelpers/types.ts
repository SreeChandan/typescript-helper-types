export type FilterOutReadonlyArrayOnly<T> = T extends readonly unknown[]
  ? T extends unknown[]
    ? T
    : never
  : T;
export type FilterOutArrayOnly<T> = T extends readonly unknown[] // readonly array | array | tuple
  ? T extends unknown[] // array | tuple
    ? T[number][] extends T // not tuple
      ? never
      : T
    : T
  : T;
export type FilterOutArray<T> = T extends unknown[] | readonly unknown[]
  ? never
  : T;
export type ReadonlyArrayToUnionArray<
  U extends readonly unknown[],
  T extends FilterOutArrayOnly<U> = FilterOutArrayOnly<U>
> = T extends never ? never : T[number][];
export type ArrayToUnionArray<T extends readonly unknown[]> = T extends never
  ? never
  : T[number][];
export type UnionToUnionOrUnionArray1<
  U,
  T extends FilterOutArray<U> = FilterOutArray<U>
> = [T] extends [never] ? never : T | T[];
export type UnionToUnionOrUnionArray<
  T
  //T extends FilterOutArray<U> = FilterOutArray<U>
> = [T] extends [never] ? never : T | T[];
export type ToUnionOrUnionArray<T> = [T] extends [readonly unknown[]]
  ? ArrayToUnionArray<T> | T[number]
  : T[] | T;

