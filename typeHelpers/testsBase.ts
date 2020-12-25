export const __TEST_PASSED__ = Symbol();
export const __TEST_FAILED__ = Symbol();
export enum __TEST__STATE__ {
  PASSED,
  FAILED
}
export type TestPassed = typeof __TEST__STATE__.PASSED;
export type TestFailed = typeof __TEST__STATE__.FAILED;

type ArrayIndices<
  T extends readonly unknown[],
  Q = keyof T,
  U extends `${number}` = Q extends `${number}` ? Q : never
> = U extends keyof [] ? never : U;
type IsTuple<
  T extends readonly unknown[],
  K extends `${number}` = ArrayIndices<T>
> = [K] extends [never] ? TestFailed : TestPassed;
type TupleOnly<T extends readonly unknown[]> = [T] extends [unknown[]]
  ? /*unknown[]*/ TestPassed extends IsTuple<T>
    ? T
    : never
  : /*readonly unknown[]*/ never;
type ArrayOnly<T extends readonly unknown[]> = [T] extends [unknown[]]
  ? /*unknown[]*/ TestPassed extends IsTuple<T>
    ? never
    : T
  : /*readonly unknown[]*/ never;
type ReadonlyArrayOnly<T extends readonly unknown[]> = [T] extends [unknown[]]
  ? /*unknown[]*/ never
  : /*readonly unknown[]*/ TestPassed extends IsTuple<T>
  ? never
  : T;
type ReadonlyTupleOnly<T extends readonly unknown[]> = [T] extends [unknown[]]
  ? /*unknown[]*/ never
  : /*readonly unknown[]*/ TestPassed extends IsTuple<T>
  ? T
  : never;
type NotUnion<T, U extends T = T> = (
  T extends any ? (U extends T ? false : true) : never
) extends false
  ? T
  : never;
type TestTypeArrayTisU<
  Ts extends readonly unknown[],
  isUs extends readonly unknown[],
  T extends NotUnion<readonly unknown[]> = NotUnion<Ts>,
  isU extends NotUnion<readonly unknown[]> = NotUnion<isUs>
> = true extends
  | ([T] extends [never] ? true : false)
  | ([U] extends [never] ? true : false)
  ? TestFailed
  : [T] extends [unknown[]]
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
  : [T] extends [readonly [unknown]]
  ? /*readonly [unknown]*/ [ReadonlyTupleOnly<isU>] extends [never]
    ? TestFailed
    : [T] extends [isU]
    ? TestPassed
    : TestFailed
  : /*readonly unknown[]*/ [ReadonlyArrayOnly<isU>] extends [never]
  ? TestFailed
  : [T] extends [isU]
  ? TestPassed
  : TestFailed;
type IsArrayInU<T extends readonly unknown[], inU> = TestPassed extends (
  inU extends unknown
    ? inU extends readonly unknown[]
      ? TestTypeArrayTisU<T, inU>
      : TestFailed
    : never
)
  ? TestPassed
  : TestFailed;
type IsNotArrayInU<T, inU> = TestPassed extends (
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
export type TestTypeTinU<T, inU> = [T] extends [never]
  ? [inU] extends [never]
    ? TestPassed
    : TestFailed
  : [inU] extends [never]
  ? TestFailed
  : TestFailed extends (
      T extends readonly unknown[] ? IsArrayInU<T, inU> : IsNotArrayInU<T, inU>
    )
  ? TestFailed
  : TestPassed;
export type TestTypeTisU<T, isU> = TestPassed extends TestTypeTinU<T, isU> &
  TestTypeTinU<isU, T>
  ? TestPassed
  : TestFailed;
export type Not<T extends TestFailed | TestPassed> = T extends TestPassed
  ? TestFailed
  : TestPassed;

export type TestReturn<T extends () => readonly [unknown]> = ReturnType<T>[0];
export type TestManager<
  T extends readonly (TestFailed | TestPassed)[],
  TestPassedMsg extends string = "TEST PASSED",
  TestFailedMsg extends string = "TEST FAILED",
  U extends ArrayIndices<T> = ArrayIndices<T>
> = {
  Tests: {
    [P in `test${ArrayIndices<T>}`]: T[P extends `test${infer U}`
      ? U
      : never] extends TestPassed
      ? TestPassedMsg
      : TestFailedMsg;
  };
  Debug: {
    [P in U extends unknown
      ? T[U] extends TestFailed
        ? `test${U}`
        : never
      : never]: TestFailedMsg;
  };
} & { Result: TestFailed extends T[number] ? TestFailed : TestPassed };

function testTypeArrayTisUTest() {
  type test1 = TestTypeArrayTisU<"foo"[], "foo"[]>;
  type test2 = Not<TestTypeArrayTisU<["foo"], "foo"[]>>;
  type test3 = Not<TestTypeArrayTisU<"foo"[], ["foo"]>>;
  type test4 = Not<TestTypeArrayTisU<"foo"[] | ["foo"], ["foo"]>>;

  type test5 = TestTypeArrayTisU<readonly "foo"[], readonly "foo"[]>;
  type test7 = Not<TestTypeArrayTisU<readonly ["foo"], readonly "foo"[]>>;
  type test8 = Not<TestTypeArrayTisU<readonly "foo"[], readonly ["foo"]>>;
  type test9 = Not<
    TestTypeArrayTisU<readonly "foo"[] | readonly ["foo"], readonly ["foo"]>
  >;

  type result = TestPassed extends test1 &
    test2 &
    test3 &
    test4 &
    test5 &
    test7 &
    test8 &
    test9
    ? TestPassed
    : TestFailed;
  return undefined as result | undefined;
}

function isNotArrayInUTest() {
  type test1 = IsNotArrayInU<"foo", "foo">; // case: Best case scenario when input and output are same.
  type test2 = IsNotArrayInU<"foo", "foo" | "bar">;
  type test3 = IsNotArrayInU<"foo", "foo" | "bar"[]>;
  type test4 = Not<IsNotArrayInU<"foo", "foo"[] | "bar">>;
  type test5 = IsNotArrayInU<"foo", "foo" | "foo"[]>;

  type result = TestPassed extends test1 & test2 & test3 & test4 & test5
    ? TestPassed
    : TestFailed;

  return undefined as result | undefined;
}

function testTypeTinUTest() {
  type test1 = TestTypeTinU<"foo", "foo">; // case: Best case scenario when input and output are same.
  type test2 = TestTypeTinU<"foo", "foo" | "bar">;
  type test3 = TestTypeTinU<"foo" | "bar", "foo" | "bar" | "fart">;
  type test4 = Not<TestTypeTinU<"foo" | "bar", "foo">>;

  type test5 = TestTypeTinU<"foo"[], "foo"[]>;
  type test6 = TestTypeTinU<"foo"[], "foo"[] | ["foo"]>; // should work: WIP
  type test7 = Not<TestTypeTinU<["foo"], "foo"[]>>;
  type test8 = Not<TestTypeTinU<"foo"[], ["foo"]>>;
  type test9 = TestTypeTinU<"foo"[] | "bar", "foo"[] | "bar" | "fart">;

  type result = TestPassed extends test1 &
    test2 &
    test3 &
    test4 &
    test5 &
    test6 &
    test7 &
    test8 &
    test9
    ? TestPassed
    : TestFailed;

  return undefined as result | undefined;
}
function testTypeTisUTest() {
  type test1 = TestTypeTisU<"foo", "foo">; // case: Best case scenario when input and output are same.
  type test2 = TestTypeTisU<"foo" | "bar", "foo" | "bar">;

  // fail cases
  type test3 = Not<TestTypeTisU<"foo", "foo" | "bar">>;
  type test4 = Not<TestTypeTisU<"foo" | "bar", "foo">>;

  type test5 = Not<
    TestTypeTisU<
      "foo" | "foo"[] | readonly "foo"[],
      "foo" | "foo"[] | readonly "foo"[] | readonly ["foo"]
    >
  >;

  type result = TestPassed extends test1 & test2 & test3 & test4 & test5
    ? TestPassed
    : TestFailed;

  return undefined as result | undefined;
}
