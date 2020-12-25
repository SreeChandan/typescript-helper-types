import {
  TestPassed,
  TestFailed,
  IsArrayInU,
  IsNotArrayInU,
  ArrayIndices,
  TestTypeArrayTisU,
  NotUnion,
} from "./typesBase";
//export { TestPassed, TestFailed };

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

function notUnionTest() {
  type test1 = TestTypeTisU<NotUnion<"foo"[]>, "foo"[]>;
  type test2 = TestTypeTisU<NotUnion<"foo">, "foo">;
  type test3 = TestTypeTisU<NotUnion<never>, never>;
  type test4 = TestTypeTisU<NotUnion<"foo" | "bar">, never>;

  type result = TestPassed extends test1 & test2 & test3 & test4
    ? TestPassed
    : TestFailed;
  return [undefined as result | undefined] as const;
}

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
  return [undefined as result | undefined] as const;
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

  return [undefined as result | undefined] as const;
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

  return [undefined as result | undefined] as const;
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

  return [undefined as result | undefined] as const;
}

type result = TestPassed extends TestReturn<typeof notUnionTest> &
  TestReturn<typeof testTypeArrayTisUTest> &
  TestReturn<typeof isNotArrayInUTest> &
  TestReturn<typeof testTypeTinUTest> &
  TestReturn<typeof testTypeTisUTest>
  ? TestPassed
  : TestFailed;
