import {
  TestFailed,
  TestPassed,
  __TEST_PASSED__,
  __TEST_FAILED__,
  TestTypeTinU,
  Not,
  TestTypeTisU,
  TestReturn,
  DebugResults,
} from "./testsBase";

import { RemoveReadonlyArrayOnly } from "./types";
function filterOutReadonlyArrayOnlyTest() {
  type test1 = TestTypeTisU<RemoveReadonlyArrayOnly<"foo">, "foo">;
  type test2 = TestTypeTisU<RemoveReadonlyArrayOnly<"foo"[]>, "foo"[]>;
  type test3 = TestTypeTisU<RemoveReadonlyArrayOnly<["foo"]>, ["foo"]>;
  type test4 = TestTypeTisU<RemoveReadonlyArrayOnly<readonly "foo"[]>, never>;
  type test5 = TestTypeTisU<RemoveReadonlyArrayOnly<readonly ["foo"]>, never>;
  type test6 = TestTypeTisU<
    RemoveReadonlyArrayOnly<"foo"[] | "bar">,
    "foo"[] | "bar"
  >;
  type test7 = TestTypeTisU<
    RemoveReadonlyArrayOnly<["foo"] | "bar">,
    ["foo"] | "bar"
  >;
  type test8 = TestTypeTisU<
    RemoveReadonlyArrayOnly<readonly "foo"[] | "bar">,
    "bar"
  >;
  type test9 = TestTypeTisU<
    RemoveReadonlyArrayOnly<readonly ["foo"] | "bar">,
    "bar"
  >;

  type result = TestTypeTisU<
    test1 & test2 & test3 & test4 & test5 & test6 & test7 & test8 & test9,
    TestPassed
  >;
  type debug = DebugResults<{
    test1: test1;
    test2: test2;
    test3: test3;
    test4: test4;
    test5: test5;
    test6: test6;
    test7: test7;
    test8: test8;
    test9: test9;
    result: result;
  }>;

  return [(undefined as result | undefined)] as const; // ref: https://github.com/microsoft/TypeScript/issues/32242#issuecomment-508266857
}

import { RemoveArrayOnly } from "./types";
function filterOutArrayOnlyTest() {
  type test1 = TestTypeTisU<RemoveArrayOnly<"foo">, "foo">;
  type test2 = TestTypeTisU<RemoveArrayOnly<"foo"[] | "bar">, "bar">;
  type test3 = TestTypeTisU<RemoveArrayOnly<["foo"] | "bar">, ["foo"] | "bar">;
  type test4 = TestTypeTisU<
    RemoveArrayOnly<readonly "foo"[] | "bar">,
    readonly "foo"[] | "bar"
  >;

  type result = TestTypeTisU<test1 & test2 & test3 & test4, TestPassed>;

  type debug = DebugResults<{
    test1: test1;
    test2: test2;
    test3: test3;
    test4: test4;
    result: result;
  }>;

  return [(undefined as result | undefined)] as const;
}

import { RemoveArray } from "./types";
function filterOutArrayTest() {
  type test1 = TestTypeTisU<RemoveArray<"foo2">, "foo2">;
  type test2 = TestTypeTisU<RemoveArray<"foo"[] | "foo2">, "foo2">;
  type test3 = TestTypeTisU<RemoveArray<readonly "foo"[] | "foo2">, "foo2">;

  type result = TestTypeTisU<test1 & test2 & test3, TestPassed>;

  type debug = DebugResults<{
    test1: test1;
    test2: test2;
    test3: test3;
    result: result;
  }>;

  return [(undefined as result | undefined)] as const;
}

import { ReadonlyArrayToUnionArray } from "./types";
function readonlyArrayToUnionArrayTest() {
  type test1 = Not<TestTypeTisU<ReadonlyArrayToUnionArray<"foo"[]>, "foo">>;
  type test2 = Not<TestTypeTisU<ReadonlyArrayToUnionArray<"foo"[]>, "foo"[]>>;
  type test3 = TestTypeTisU<
    ReadonlyArrayToUnionArray<readonly "foo"[]>,
    "foo"[]
  >;

  type result = TestTypeTisU<test1 & test2 & test3, TestPassed>;

  type debug = DebugResults<{
    test1: test1;
    test2: test2;
    test3: test3;
    result: result;
  }>;

  return [(undefined as result | undefined)] as const;
}

import { ArrayToUnionArray } from "./types";
function arrayToUnionArrayTest() {
  type test1 = TestTypeTisU<ArrayToUnionArray<never>, never>;
  type test2 = TestTypeTisU<
    ArrayToUnionArray<readonly "foo"[]> & ArrayToUnionArray<"foo"[]>,
    "foo"[] | ["foo"] | readonly "foo"[] | readonly ["foo"]
  >;
  type test3 = TestTypeTisU<
    ArrayToUnionArray<readonly ("foo" | "bar"[])[]> &
      ArrayToUnionArray<("foo" | "bar"[])[]>,
    | ("foo" | "bar"[])[]
    | readonly ("foo" | "bar"[])[]
    | readonly ["foo" | "bar"[]]
    | ["foo" | "bar"[]]
  >;

  type result = TestTypeTisU<test1 & test2 & test3, TestPassed>;

  type debug = DebugResults<{
    test1: test1;
    test2: test2;
    test3: test3;
    result: result;
  }>;

  return [(undefined as result | undefined)] as const;
}

import { UnionToUnionOrUnionArray } from "./types";
function unionToUnionOrUnionArrayTest() {
  type test1 = TestTypeTisU<UnionToUnionOrUnionArray<never>, never>;
  type test2 = TestTypeTisU<UnionToUnionOrUnionArray<"foo">, "foo" | "foo"[]>;
  type test3 = TestTypeTisU<
    UnionToUnionOrUnionArray<"foo" | "bar">,
    "foo" | "bar" | ("foo" | "bar")[]
  >;
  type test4 = TestTypeTisU<
    UnionToUnionOrUnionArray<"foo" | "bar"[]>,
    ("foo" | "bar"[]) | ("foo" | "bar"[])[]
  >;
  type test5 = TestTypeTisU<
    UnionToUnionOrUnionArray<"foo" | "bar">,
    "foo" | "bar" | ("foo" | "bar")[]
  >;
  type test6 = TestTypeTisU<
    UnionToUnionOrUnionArray<"foo" | "bar">,
    "foo" | "bar" | ("foo" | "bar")[] | "foo"[] | "bar"[]
  >;
  type test7 = TestTypeTinU<
    "foo"[] | "bar"[],
    UnionToUnionOrUnionArray<"foo" | "bar">
  >;

  type result = TestTypeTisU<
    test1 & test2 & test3 & test4 & test5 & test6 & test7,
    TestPassed
  >;

  type debug = DebugResults<{
    test1: test1;
    test2: test2;
    test3: test3;
    test4: test4;
    test5: test5;
    test6: test6;
    test7: test7;
    result: result;
  }>;

  return [(undefined as result | undefined)] as const;
}

import { ToUnionOrUnionArray } from "./types";
function toUnionOrUnionArrayTest() {
  type tt = ToUnionOrUnionArray<"foo">;
  type tt1 = ToUnionOrUnionArray<"foo"[]>;
  type tt2 = ToUnionOrUnionArray<["foo"]>;
  type tt3 = ToUnionOrUnionArray<"foo" | "bar">;
  type tt4 = ToUnionOrUnionArray<("foo" | "bar")[]>;
  type test = TestTypeTisU<
    ToUnionOrUnionArray<"foo"[]>,
    "foo" | "foo"[] | readonly "foo"[]
  >; // should fail
  type test1 = TestTypeTisU<
    ToUnionOrUnionArray<"foo"[]>,
    "foo" | "foo"[] | readonly "foo"[] | readonly ["foo"]
  >;
  type test2 = TestTypeTisU<
    ToUnionOrUnionArray<("foo" | "bar")[]>,
    | "foo"
    | "bar"
    | ("foo" | "bar")[]
    | ["foo" | "bar"]
    | readonly ("foo" | "bar")[]
    | readonly ["foo" | "bar"]
  >;
  type test3 = TestTypeTisU<
    ToUnionOrUnionArray<("foo" | "bar"[])[]> &
      ToUnionOrUnionArray<readonly ("foo" | "bar"[])[]>,
    | "foo"
    | "bar"[]
    | ["foo" | "bar"[]]
    | ("foo" | "bar"[])[]
    | readonly ("foo" | "bar"[])[]
    | readonly ["foo" | "bar"[]]
  >;
  type test3c = TestTypeTisU<
    ToUnionOrUnionArray<"foo" | "bar">,
    "foo" | "bar" | ("foo" | "bar")[] | readonly ("foo" | "bar")[]
  >; // should pass
  type test4 = TestTypeTisU<
    ToUnionOrUnionArray<("foo" | "bar")[]>,
    "foo" | "bar" | ("foo" | "bar")[] | "foo"[] | "bar"[]
  >;
  type test5 = TestTypeTinU<
    "foo"[] | "bar"[],
    ToUnionOrUnionArray<("foo" | "bar")[]>
  >;

  type test6 = TestTypeTisU<ToUnionOrUnionArray<"foo">, "foo" | "foo"[]>;
  type test7 = TestTypeTisU<
    ToUnionOrUnionArray<"foo" | "foo"[]>,
    ("foo" | "foo"[])[] | "foo" | "foo"[]
  >;
  type test8 = TestTypeTisU<
    ToUnionOrUnionArray<"foo" | "bar">,
    "foo" | "bar" | ("foo" | "bar")[]
  >;
  type test9 = TestTypeTisU<
    ToUnionOrUnionArray<"foo" | "bar">,
    "foo" | "bar" | ("foo" | "bar")[] | "foo"[] | "bar"[]
  >;
  type test10 = TestTypeTinU<
    "foo"[] | "bar"[],
    ToUnionOrUnionArray<"foo" | "bar">
  >;

  type result = TestTypeTisU<
    test1 &
      test2 &
      test3 &
      test4 &
      test5 &
      test6 &
      test7 &
      test8 &
      test9 &
      test10,
    TestPassed
  >;

  type debug = DebugResults<{
    test1: test1;
    test2: test2;
    test3: test3;
    test4: test4;
    test5: test5;
    test6: test6;
    test7: test7;
    test8: test8;
    test9: test9;
    test10: test10;
    result: result;
  }>;

  return [(undefined as result | undefined)] as const;
}

//type NonNullableReturnType<T extends () => void> = NonNullable<ReturnType<T>>;
type AllTestsResult = TestTypeTisU<
  TestReturn<typeof filterOutReadonlyArrayOnlyTest> &
    TestReturn<typeof filterOutArrayOnlyTest> &
    TestReturn<typeof filterOutArrayTest> &
    TestReturn<typeof readonlyArrayToUnionArrayTest> &
    TestReturn<typeof arrayToUnionArrayTest> &
    TestReturn<typeof unionToUnionOrUnionArrayTest> &
    TestReturn<typeof toUnionOrUnionArrayTest>,
  TestPassed
>;
type debug = DebugResults<{
  filterOutReadonlyArrayOnlyTest: TestReturn<
    typeof filterOutReadonlyArrayOnlyTest
  >;
  filterOutArrayOnlyTest: TestReturn<typeof filterOutArrayOnlyTest>;
  filterOutArrayTest: TestReturn<typeof filterOutArrayTest>;
  readonlyArrayToUnionArrayTest: TestReturn<
    typeof readonlyArrayToUnionArrayTest
  >;
  arrayToUnionArrayTest: TestReturn<typeof arrayToUnionArrayTest>;
  unionToUnionOrUnionArrayTest: TestReturn<
    typeof unionToUnionOrUnionArrayTest
  >;
  toUnionOrUnionArrayTest: TestReturn<
    typeof toUnionOrUnionArrayTest
  >;
  AllTestsResult: AllTestsResult;
}>;
