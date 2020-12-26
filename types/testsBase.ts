import {
  TEST,
  IsArrayInU,
  IsNotArrayInU,
  ArrayIndices,
  TestTypeArrayTisU,
  NotUnion,
} from "./typesBase";
//export { TestPassed, TestState["FAILED"] };

export type TestTypeTinU<T, inU> = [T] extends [never]
  ? [inU] extends [never]
    ? TEST["PASSED"]
    : TEST["FAILED"]
  : [inU] extends [never]
  ? TEST["FAILED"]
  : TEST["FAILED"] extends (
      T extends readonly unknown[] ? IsArrayInU<T, inU> : IsNotArrayInU<T, inU>
    )
  ? TEST["FAILED"]
  : TEST["PASSED"];
/**
 * Note: may not deal with {} types properly yet.
 */
export type TestTypeTisU<T, isU> = TEST["PASSED"] extends TestTypeTinU<T, isU> &
  TestTypeTinU<isU, T>
  ? TEST["PASSED"]
  : TEST["FAILED"];
export type Not<
  T extends TEST["FAILED"] | TEST["PASSED"]
> = T extends TEST["PASSED"] ? TEST["FAILED"] : TEST["PASSED"];

export type ExtractTestReturn<
  T extends () => readonly [unknown]
> = ReturnType<T>[0];
/**
 * ref: https://github.com/microsoft/TypeScript/issues/32242#issuecomment-508266857
 * @param ret 
 */
export declare function TestReturn<Return extends TEST[keyof TEST]>() : readonly [Return];
export type TestManager<
  T extends readonly (TEST["FAILED"] | TEST["PASSED"])[],
  TestPassedMsg extends string = "TEST PASSED",
  TestFailedMsg extends string = "TEST FAILED",
  U extends ArrayIndices<T> = ArrayIndices<T>,
  PassedTests extends `test${U}` = keyof {
    [P in `test${U}`]: T[P extends `test${infer U}`
      ? U
      : never] extends TEST["PASSED"]
      ? TestPassedMsg
      : TestFailedMsg;
  },
  FailedTests extends `test${U}` = keyof {
    [P in U extends unknown
      ? T[U] extends TEST["FAILED"]
        ? `test${U}`
        : never
      : never]: unknown;
  }
> = {
  PassedTests: [PassedTests] extends [never] ? null : PassedTests;
  FailedTests: [FailedTests] extends [never] ? null : FailedTests;
} & {
  Result: TEST["FAILED"] extends T[number] ? TEST["FAILED"] : TEST["PASSED"];
};

function notUnionTest() {
  type test1 = TestTypeTisU<NotUnion<"foo"[]>, "foo"[]>;
  type test2 = TestTypeTisU<NotUnion<"foo">, "foo">;
  type test3 = TestTypeTisU<NotUnion<never>, never>;
  type test4 = TestTypeTisU<NotUnion<"foo" | "bar">, never>;

  type result = TEST["PASSED"] extends test1 & test2 & test3 & test4
    ? TEST["PASSED"]
    : TEST["FAILED"];
  return [undefined as result | undefined] as const;
}

function testTypeArrayTisUTest() {
  type test1 = TestTypeArrayTisU<"foo"[], "foo"[]>;
  type test2 = Not<TestTypeArrayTisU<["foo"], "foo"[]>>;
  type test3 = Not<TestTypeArrayTisU<"foo"[], ["foo"]>>;
  type test4 = Not<TestTypeArrayTisU<"foo"[] | ["foo"], ["foo"]>>;

  type test5 = TestTypeArrayTisU<readonly "foo"[], readonly "foo"[]>;
  type test6 = TestTypeArrayTisU<
    readonly ["foo", "bar"],
    readonly ["foo", "bar"]
  >;
  type test7 = Not<TestTypeArrayTisU<readonly ["foo"], readonly "foo"[]>>;
  type test8 = Not<TestTypeArrayTisU<readonly "foo"[], readonly ["foo"]>>;
  type test9 = Not<
    TestTypeArrayTisU<readonly "foo"[] | readonly ["foo"], readonly ["foo"]>
  >;

  type result = TEST["PASSED"] extends test1 &
    test2 &
    test3 &
    test4 &
    test5 &
    test7 &
    test8 &
    test9
    ? TEST["PASSED"]
    : TEST["FAILED"];
  return [undefined as result | undefined] as const;
}

function isNotArrayInUTest() {
  type test1 = IsNotArrayInU<"foo", "foo">; // case: Best case scenario when input and output are same.
  type test2 = IsNotArrayInU<"foo", "foo" | "bar">;
  type test3 = IsNotArrayInU<"foo", "foo" | "bar"[]>;
  type test4 = Not<IsNotArrayInU<"foo", "foo"[] | "bar">>;
  type test5 = IsNotArrayInU<"foo", "foo" | "foo"[]>;

  type result = TEST["PASSED"] extends test1 & test2 & test3 & test4 & test5
    ? TEST["PASSED"]
    : TEST["FAILED"];

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

  type result = TEST["PASSED"] extends test1 &
    test2 &
    test3 &
    test4 &
    test5 &
    test6 &
    test7 &
    test8 &
    test9
    ? TEST["PASSED"]
    : TEST["FAILED"];

  return [undefined as result | undefined] as const;
}
function testTypeTisUTest() {
  type test1 = TestTypeTisU<"foo", "foo">; // case: Best case scenario when input and output are same.
  type test2 = TestTypeTisU<"foo" | "bar", "foo" | "bar">;

  // fail cases
  type test3 = Not<TestTypeTisU<"foo", "foo" | "bar">>;
  type test4 = Not<TestTypeTisU<"foo" | "bar", "foo">>;
  type test5 = Not<TestTypeTisU<unknown, any>>;

  type test6 = Not<
    TestTypeTisU<
      "foo" | "foo"[] | readonly "foo"[],
      "foo" | "foo"[] | readonly "foo"[] | readonly ["foo"]
    >
  >;

  type result = TEST["PASSED"] extends test1 &
    test2 &
    test3 &
    test4 &
    test5 &
    test6
    ? TEST["PASSED"]
    : TEST["FAILED"];

  return [undefined as result | undefined] as const;
}

type result = TEST["PASSED"] extends ExtractTestReturn<typeof notUnionTest> &
  ExtractTestReturn<typeof testTypeArrayTisUTest> &
  ExtractTestReturn<typeof isNotArrayInUTest> &
  ExtractTestReturn<typeof testTypeTinUTest> &
  ExtractTestReturn<typeof testTypeTisUTest>
  ? TEST["PASSED"]
  : TEST["FAILED"];
