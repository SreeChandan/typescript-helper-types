export const __TEST_PASSED__ = Symbol();
export const __TEST_FAILED__ = Symbol();
export const __TEST__STATE__ = {
  PASSED: __TEST_PASSED__ as typeof __TEST_PASSED__,
  FAILED: __TEST_FAILED__ as typeof __TEST_FAILED__,
};
export type TestPassed = typeof __TEST__STATE__.PASSED;
export type TestFailed = typeof __TEST__STATE__.FAILED;

export type ArrayIndices<
  T extends readonly unknown[],
  Q = keyof T
> = Q extends `${number}` ? Q : never;
export type IsTuple<
  T extends readonly unknown[],
  K extends `${number}` = ArrayIndices<T>
> = [K] extends [never] ? TestFailed : TestPassed;
export type TupleOnly<T extends readonly unknown[]> = [T] extends [unknown[]]
  ? /*unknown[]*/ TestPassed extends IsTuple<T>
    ? T
    : never
  : /*readonly unknown[]*/ never;
export type ArrayOnly<T extends readonly unknown[]> = [T] extends [unknown[]]
  ? /*unknown[]*/ TestPassed extends IsTuple<T>
    ? never
    : T
  : /*readonly unknown[]*/ never;
export type ReadonlyArrayOnly<T extends readonly unknown[]> = [T] extends [
  unknown[]
]
  ? /*unknown[]*/ never
  : /*readonly unknown[]*/ TestPassed extends IsTuple<T>
  ? never
  : T;
export type ReadonlyTupleOnly<T extends readonly unknown[]> = [T] extends [
  unknown[]
]
  ? /*unknown[]*/ never
  : /*readonly unknown[]*/ TestPassed extends IsTuple<T>
  ? T
  : never;
export type NotUnion<T, U extends T = T> = (
  T extends any ? (U extends T ? false : true) : never
) extends false
  ? T
  : never;

export type TestTypeArrayTisU<
  Ts extends readonly unknown[],
  isUs extends readonly unknown[],
  T extends NotUnion<readonly unknown[]> = NotUnion<Ts>,
  isU extends NotUnion<readonly unknown[]> = NotUnion<isUs>
> = true extends
  | ([T] extends [never] ? true : false)
  | ([isU] extends [never] ? true : false)
  ? TestFailed
  : [T] extends [unknown[]] // T is not readonly
  ? /*unknown[]*/ [T] extends [[unknown]]
    ? /**[unknown] */ [TupleOnly<isU>] extends [never]
      ? TestFailed
      : [T] extends [isU]
      ? TestPassed
      : TestFailed
    : /**unknown[] */ [ArrayOnly<isU>] extends [never]
    ? TestFailed
    : [T] extends [isU]
    ? TestPassed
    : TestFailed
  : [ReadonlyTupleOnly<T>] extends [never]
  ? /*readonly unknown[]*/ [ReadonlyArrayOnly<isU>] extends [never]
    ? TestFailed // fails here
    : [T] extends [isU]
    ? TestPassed
    : TestFailed
  : /*readonly [unknown]*/ [ReadonlyTupleOnly<isU>] extends [never]
  ? TestFailed
  : [T] extends [isU]
  ? TestPassed
  : TestFailed;

export type IsArrayInU<T extends readonly unknown[], inU> = TestPassed extends (
  inU extends unknown
    ? inU extends readonly unknown[]
      ? TestTypeArrayTisU<T, inU>
      : TestFailed
    : never
)
  ? TestPassed
  : TestFailed;
export type IsNotArrayInU<T, inU> = TestPassed extends (
  inU extends unknown
    ? inU extends readonly unknown[]
      ? never
      : T extends inU
      ? TestPassed
      : TestFailed
    : never
)
  ? TestPassed
  : TestFailed;
