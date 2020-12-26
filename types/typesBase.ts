export const __TEST_PASSED__ = Symbol();
export const __TEST_FAILED__ = Symbol();
export type TEST = {
  PASSED: typeof __TEST_PASSED__;
  FAILED: typeof __TEST_FAILED__;
};
//export type TestState["PASSED"] = TestState["PASSED"];
//export type TestState["FAILED"] = TestState["FAILED"];

export type ArrayIndices<
  T extends readonly unknown[],
  Q = keyof T
> = Q extends `${number}` ? Q : never;
export type IsTuple<
  T extends readonly unknown[],
  K extends `${number}` = ArrayIndices<T>
> = [K] extends [never] ? TEST["FAILED"] : TEST["PASSED"];
export type IfTupleOnly<T extends readonly unknown[]> = [T] extends [unknown[]]
  ? /*unknown[]*/ TEST["PASSED"] extends IsTuple<T>
    ? T
    : never
  : /*readonly unknown[]*/ never;
export type IfArrayOnly<T extends readonly unknown[]> = [T] extends [unknown[]]
  ? /*unknown[]*/ TEST["PASSED"] extends IsTuple<T>
    ? never
    : T
  : /*readonly unknown[]*/ never;
export type IfReadonlyArrayOnly<T extends readonly unknown[]> = [T] extends [
  unknown[]
]
  ? /*unknown[]*/ never
  : /*readonly unknown[]*/ TEST["PASSED"] extends IsTuple<T>
  ? never
  : T;
export type IfReadonlyTupleOnly<T extends readonly unknown[]> = [T] extends [
  unknown[]
]
  ? /*unknown[]*/ never
  : /*readonly unknown[]*/ TEST["PASSED"] extends IsTuple<T>
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
  ? TEST["FAILED"]
  : [T] extends [unknown[]] // T is not readonly
  ? /*unknown[]*/ [T] extends [[unknown]]
    ? /**[unknown] */ [IfTupleOnly<isU>] extends [never]
      ? TEST["FAILED"]
      : [T] extends [isU]
      ? TEST["PASSED"]
      : TEST["FAILED"]
    : /**unknown[] */ [IfArrayOnly<isU>] extends [never]
    ? TEST["FAILED"]
    : [T] extends [isU]
    ? TEST["PASSED"]
    : TEST["FAILED"]
  : [IfReadonlyTupleOnly<T>] extends [never]
  ? /*readonly unknown[]*/ [IfReadonlyArrayOnly<isU>] extends [never]
    ? TEST["FAILED"] // fails here
    : [T] extends [isU]
    ? TEST["PASSED"]
    : TEST["FAILED"]
  : /*readonly [unknown]*/ [IfReadonlyTupleOnly<isU>] extends [never]
  ? TEST["FAILED"]
  : [T] extends [isU]
  ? TEST["PASSED"]
  : TEST["FAILED"];

export type IsArrayInU<
  T extends readonly unknown[],
  inU
> = TEST["PASSED"] extends (
  inU extends unknown
    ? inU extends readonly unknown[]
      ? TestTypeArrayTisU<T, inU>
      : TEST["FAILED"]
    : never
)
  ? TEST["PASSED"]
  : TEST["FAILED"];
export type IsNotArrayInU<T, inU> = TEST["PASSED"] extends (
  inU extends unknown
    ? inU extends readonly unknown[]
      ? never
      : T extends inU
      ? TEST["PASSED"]
      : TEST["FAILED"]
    : never
)
  ? TEST["PASSED"]
  : TEST["FAILED"];
