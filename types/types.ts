export type RemoveReadonlyArrayOnly<T> = T extends readonly unknown[]
  ? T extends unknown[]
    ? T
    : never
  : T;
export type RemoveArrayOnly<T> = T extends readonly unknown[] // readonly array | array | tuple
  ? T extends unknown[] // array | tuple
    ? T[number][] extends T // not tuple
      ? never
      : T
    : T
  : T;
export type RemoveTupleOnly<T> = T extends readonly unknown[] // readonly array | array | tuple
  ? T extends unknown[] // array | tuple
    ? T[number][] extends T // not tuple
      ? T
      : never
    : T
  : T;
export type RemoveArray<T> = T extends readonly unknown[] ? never : T;
export type ReadonlyArrayToUnionArray<
  U extends readonly unknown[],
  T extends RemoveArrayOnly<U> = RemoveArrayOnly<U>
> = T extends never ? never : T[number][];
export type ArrayToUnionArray<T extends readonly unknown[]> = [T] extends [
  never
] // ref: https://github.com/microsoft/TypeScript/issues/31751#issuecomment-498526919
  ? never
  :
      | readonly T[number][]
      | T[number][]
      | ([T] extends [readonly [unknown]]
          ? Readonly<T> | T
          : readonly [T[number]] | [T[number]]);
export type UnionToUnionOrUnionArray<
  T
  //T extends FilterOutArray<U> = FilterOutArray<U>
> = [T] extends [never] ? never : T | T[];
export type ToUnionOrUnionArray1<T> = [T] extends [readonly unknown[]]
  ? ArrayToUnionArray<T> | T[number]
  : readonly T[] | readonly [T] | T[] | [T] | T;
export type ToUnionOrUnionArray<T, UniqueOnly extends true | false = false> = [
  T
] extends [readonly unknown[]]
  ? ArrayToUnionArray<UniqueOnly extends true ? IfUniqueList<T> : T> | T[number]
  : readonly T[] | readonly [T] | T[] | [T] | T;

/*type ArrayIndices<
  T extends readonly unknown[],
  Q = keyof T,
> = Q extends `${number}` ? Q : never;*/
import { ArrayIndices } from "./typesBase";

export type ArrayIndicesExclude<
  List extends readonly unknown[],
  Indices extends `${number}`,
  U extends string = ArrayIndices<List>
> = keyof {
  [P in U extends Indices ? never : U]: P extends number ? List[P] : never;
};
export type IfUniqueList<
  T extends readonly unknown[],
  Part1 = {
    [P in ArrayIndices<T>]: T[P] extends T[ArrayIndicesExclude<T, P>]
      ? never
      : T[P];
  },
  Part2 = Part1[keyof Part1]
> = T[number] extends Part2 ? T : never;

export type SafeArrayAccess<
  T extends readonly unknown[],
  F extends number,
  K extends `${number}` = `${F}`
> = K extends ArrayIndices<T>
  ? T[F]
  : (`${number}` extends K ? T[ArrayIndices<T>] : never) | undefined;
