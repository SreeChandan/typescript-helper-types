import {
  TestFailed,
  TestPassed,
  TestTypeTinU,
  TestTypeTNotInU,
  TestTypeTisU,
  TestTypeTisNotU,
} from "./testsBase";

import { FilterOutReadonlyArrayOnly } from "./types";
function filterOutReadonlyArrayOnlyTest() {
  type test1 = TestTypeTisU<FilterOutReadonlyArrayOnly<"foo">, "foo">;
  type test2 = TestTypeTisU<FilterOutReadonlyArrayOnly<"foo"[]>, "foo"[]>;
  type test3 = TestTypeTisU<FilterOutReadonlyArrayOnly<["foo"]>, ["foo"]>;
  type test4 = TestTypeTisU<
    FilterOutReadonlyArrayOnly<readonly "foo"[]>,
    never
  >;
  type test5 = TestTypeTisU<
    FilterOutReadonlyArrayOnly<readonly ["foo"]>,
    never
  >;
  type test6 = TestTypeTisU<
    FilterOutReadonlyArrayOnly<"foo"[] | "bar">,
    "foo"[] | "bar"
  >;
  type test7 = TestTypeTisU<
    FilterOutReadonlyArrayOnly<["foo"] | "bar">,
    ["foo"] | "bar"
  >;
  type test8 = TestTypeTisU<
    FilterOutReadonlyArrayOnly<readonly "foo"[] | "bar">,
    "bar"
  >;
  type test9 = TestTypeTisU<
    FilterOutReadonlyArrayOnly<readonly ["foo"] | "bar">,
    "bar"
  >;

  type result = TestTypeTisU<
    test1 & test2 & test3 & test4 & test5 & test6 & test7 & test8 & test9,
    TestPassed
  >;

  return undefined as result | undefined;
}

import { FilterOutArrayOnly } from "./types";
function filterOutArrayOnlyTest() {
  type test1 = TestTypeTisU<FilterOutArrayOnly<"foo">, "foo">;
  type test2 = TestTypeTisU<FilterOutArrayOnly<"foo"[] | "bar">, "bar">;
  type test3 = TestTypeTisU<
    FilterOutArrayOnly<["foo"] | "bar">,
    ["foo"] | "bar"
  >;
  type test4 = TestTypeTisU<
    FilterOutArrayOnly<readonly "foo"[] | "bar">,
    readonly "foo"[] | "bar"
  >;

  type result = TestTypeTisU<test1 & test2 & test3 & test4, TestPassed>;

  return undefined as result | undefined;
}

import { FilterOutArray } from "./types";
function filterOutArrayTest() {
  type test1 = TestTypeTisU<FilterOutArray<"foo2">, "foo2">;
  type test2 = TestTypeTisU<FilterOutArray<"foo"[] | "foo2">, "foo2">;
  type test3 = TestTypeTisU<FilterOutArray<readonly "foo"[] | "foo2">, "foo2">;

  type result = TestTypeTisU<test1 & test2 & test3, TestPassed>;

  return undefined as result | undefined;
}

import { ReadonlyArrayToUnionArray } from "./types";
function readonlyArrayToUnionArrayTest() {
  type test1 = TestTypeTisNotU<ReadonlyArrayToUnionArray<"foo"[]>, "foo">;
  type test2 = TestTypeTisNotU<ReadonlyArrayToUnionArray<"foo"[]>, "foo"[]>;
  type test3 = TestTypeTisU<
    ReadonlyArrayToUnionArray<readonly "foo"[]>,
    "foo"[]
  >;

  type result = TestTypeTisU<test1 & test2 & test3, TestPassed>;

  return undefined as result | undefined;
}

import { ArrayToUnionArray } from "./types";
function arrayToUnionArrayTest() {
  type test1 = TestTypeTisU<ArrayToUnionArray<"foo"[]>, "foo"[]>;
  type test2 = TestTypeTisU<ArrayToUnionArray<readonly "foo"[]>, "foo"[]>;
  type test3 = TestTypeTisU<
    ArrayToUnionArray<("foo" | "foo"[])[]>,
    ("foo" | "foo"[])[]
  >;
  type test4 = TestTypeTisU<
    ArrayToUnionArray<readonly ("foo" | "bar")[]>,
    ("foo" | "bar")[]
  >;

  type result = TestTypeTisU<test1 & test2 & test3 & test4, TestPassed>;

  return undefined as result | undefined;
}

import { UnionToUnionOrUnionArray } from "./types";
function unionToUnionOrUnionArrayTest() {
  type test1 = TestTypeTisU<UnionToUnionOrUnionArray<"foo">, "foo" | "foo"[]>;
  type test2 = TestTypeTisU<
    UnionToUnionOrUnionArray<"foo" | "bar">,
    "foo" | "bar" | ("foo" | "bar")[]
  >;
  type test3 = TestTypeTisU<
    UnionToUnionOrUnionArray<"foo" | "bar"[]>,
    ("foo" | "bar"[]) | ("foo" | "bar"[])[]
  >;
  type test4 = TestTypeTisU<
    UnionToUnionOrUnionArray<"foo" | "bar">,
    "foo" | "bar" | ("foo" | "bar")[]
  >;
  type test5 = TestTypeTisU<
    UnionToUnionOrUnionArray<"foo" | "bar">,
    "foo" | "bar" | ("foo" | "bar")[] | "foo"[] | "bar"[]
  >;
  type test6 = TestTypeTinU<
    "foo"[] | "bar"[],
    UnionToUnionOrUnionArray<"foo" | "bar">
  >;

  type result = TestTypeTisU<test1 & test2 & test3 & test4 & test5 & test6, TestPassed>;

  return undefined as result | undefined;
}

import { ToUnionOrUnionArray } from "./types";
function toUnionOrUnionArrayTest() {
  type test1 = TestTypeTisU<ToUnionOrUnionArray<"foo"[]>, "foo" | "foo"[]>;
  type test2 = TestTypeTisU<
    ToUnionOrUnionArray<("foo" | "foo"[])[]>,
    "foo" | "foo"[]
  >;
  type test3 = TestTypeTisU<
    ToUnionOrUnionArray<("foo" | "bar")[]>,
    "foo" | "bar" | ("foo" | "bar")[]
  >;
  // Debuggin here
  type test3a = TestTypeTisU<
    ToUnionOrUnionArray<readonly ("foo" | "bar")[]>,
    "foo" | "bar" | ("foo" | "bar")[] | readonly ("foo" | "bar")[]
  >; // should fail
  type test3b = TestTypeTinU<
    "foo" | "bar" | ("foo" | "bar")[] | readonly ("foo" | "bar")[],
    ToUnionOrUnionArray<readonly ("foo" | "bar")[]>
  >; // should fail
  type test3c = TestTypeTinU<
    ToUnionOrUnionArray<readonly ("foo" | "bar")[]>,
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

  return undefined as result | undefined;
}

type NonNullableReturnType<T extends () => void> = NonNullable<ReturnType<T>>;
type AllTestsResult = TestTypeTisU<
  NonNullableReturnType<typeof filterOutReadonlyArrayOnlyTest> &
    NonNullableReturnType<typeof filterOutArrayOnlyTest> &
    NonNullableReturnType<typeof filterOutArrayTest> &
    NonNullableReturnType<typeof readonlyArrayToUnionArrayTest> &
    NonNullableReturnType<typeof arrayToUnionArrayTest> &
    NonNullableReturnType<typeof unionToUnionOrUnionArrayTest> &
    NonNullableReturnType<typeof toUnionOrUnionArrayTest>,
  TestPassed
>;
