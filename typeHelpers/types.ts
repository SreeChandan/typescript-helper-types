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
export type ToUnionOrUnionArray<T> = [T] extends [readonly unknown[]]
  ? ArrayToUnionArray<T> | T[number]
  : readonly T[] | readonly [T] | T[] | [T] | T;

/*type ArrayIndices<
  T extends readonly unknown[],
  Q = keyof T,
> = Q extends `${number}` ? Q : never;*/
import { ArrayIndices } from "./typesBase";

export type ArrayIndicesSlice<
  List extends readonly unknown[],
  SliceIndexes extends `${number}`,
  U extends string = ArrayIndices<List>
> = keyof {
  [P in U extends SliceIndexes ? never : U]: P extends number ? List[P] : never;
};
export type UniqueList<
  T extends readonly unknown[],
  Part1 = {
    [P in ArrayIndices<T>]: T[P] extends T[ArrayIndicesSlice<T, P>]
      ? never
      : T[P];
  },
  Part2 = Part1[keyof Part1]
> = T[number] extends Part2 ? T : never;

type ArrayIndicesTest = ArrayIndices<[5, 6, 7]>;
type ArrayIndicesTest2 = keyof [5, 6, 7]; //extends number ? keyof [5,6.7]:never;
type IsUnion<T, U extends T = T> = (
  T extends any ? (U extends T ? false : true) : never
) extends false
  ? false
  : true;
type isTuple<
  T extends readonly unknown[],
  K extends `${number}` = ArrayIndices<T>
> = [K] extends [never] ? false : true;
type tup = isTuple<[5, 6, 7]>;
type tup2 = isTuple<(5 | 6 | 7)[]>; // should fail
type tup3 = isTuple<readonly [5, 6, 7]>;
type tup4 = isTuple<readonly (5 | 6 | 7)[]>;
