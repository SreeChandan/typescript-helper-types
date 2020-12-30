import { TestTypeArrayTisU } from "./typesBase";
import {
  TestTypeTinU,
  Not,
  TestTypeTisU,
  TestReturn,
  TestManager,
  ExtractTestReturn,
} from "./testsBase";

import { RemoveReadonlyArrayOnly } from "./types";
function filterOutReadonlyArrayOnlyTest() {
  type testsManager = TestManager<
    [
      TestTypeTisU<RemoveReadonlyArrayOnly<"foo">, "foo">,
      TestTypeTisU<RemoveReadonlyArrayOnly<"foo"[]>, "foo"[]>,
      TestTypeTisU<RemoveReadonlyArrayOnly<["foo"]>, ["foo"]>,
      TestTypeTisU<RemoveReadonlyArrayOnly<readonly "foo"[]>, never>,
      TestTypeTisU<RemoveReadonlyArrayOnly<readonly ["foo"]>, never>,
      TestTypeTisU<RemoveReadonlyArrayOnly<"foo"[] | "bar">, "foo"[] | "bar">,
      TestTypeTisU<RemoveReadonlyArrayOnly<["foo"] | "bar">, ["foo"] | "bar">,
      TestTypeTisU<RemoveReadonlyArrayOnly<readonly "foo"[] | "bar">, "bar">,
      TestTypeTisU<RemoveReadonlyArrayOnly<readonly ["foo"] | "bar">, "bar">
    ]
  >;
  type passedTests = testsManager["PassedTests"];
  type failedTests = testsManager["FailedTests"];
  type result = testsManager["Result"];

  return TestReturn<result>();
}

import { RemoveArrayOnly } from "./types";
function filterOutArrayOnlyTest() {
  type testsManager = TestManager<
    [
      TestTypeTisU<RemoveArrayOnly<"foo">, "foo">,
      TestTypeTisU<RemoveArrayOnly<"foo"[] | "bar">, "bar">,
      TestTypeTisU<RemoveArrayOnly<["foo"] | "bar">, ["foo"] | "bar">,
      TestTypeTisU<
        RemoveArrayOnly<readonly "foo"[] | "bar">,
        readonly "foo"[] | "bar"
      >
    ]
  >;
  type passedTests = testsManager["PassedTests"];
  type failedTests = testsManager["FailedTests"];
  type result = testsManager["Result"];

  return TestReturn<result>();
}

import { RemoveArray } from "./types";
function filterOutArrayTest() {
  type testsManager = TestManager<
    [
      TestTypeTisU<RemoveArray<"foo2">, "foo2">,
      TestTypeTisU<RemoveArray<"foo"[] | "foo2">, "foo2">,
      TestTypeTisU<RemoveArray<readonly "foo"[] | "foo2">, "foo2">
    ]
  >;
  type passedTests = testsManager["PassedTests"];
  type failedTests = testsManager["FailedTests"];
  type result = testsManager["Result"];

  return TestReturn<result>();
}

import { ReadonlyArrayToUnionArray } from "./types";
function readonlyArrayToUnionArrayTest() {
  type testsManager = TestManager<
    [
      Not<TestTypeTisU<ReadonlyArrayToUnionArray<"foo"[]>, "foo">>,
      Not<TestTypeTisU<ReadonlyArrayToUnionArray<"foo"[]>, "foo"[]>>,
      TestTypeTisU<ReadonlyArrayToUnionArray<readonly "foo"[]>, "foo"[]>
    ]
  >;
  type passedTests = testsManager["PassedTests"];
  type failedTests = testsManager["FailedTests"];
  type result = testsManager["Result"];

  return TestReturn<result>();
}

import { ArrayToUnionArray } from "./types";
function arrayToUnionArrayTest() {
  type testsManager = TestManager<
    [
      TestTypeTisU<ArrayToUnionArray<never>, never>,
      TestTypeTisU<
        ArrayToUnionArray<readonly "foo"[]> & ArrayToUnionArray<"foo"[]>,
        "foo"[] | ["foo"] | readonly "foo"[] | readonly ["foo"]
      >,
      TestTypeTisU<
        ArrayToUnionArray<readonly ("foo" | "bar"[])[]> &
          ArrayToUnionArray<("foo" | "bar"[])[]>,
        | ("foo" | "bar"[])[]
        | readonly ("foo" | "bar"[])[]
        | readonly ["foo" | "bar"[]]
        | ["foo" | "bar"[]]
      >
    ]
  >;
  type passedTests = testsManager["PassedTests"];
  type failedTests = testsManager["FailedTests"];
  type result = testsManager["Result"];

  return TestReturn<result>();
}

import { UnionToUnionOrUnionArray } from "./types";
function unionToUnionOrUnionArrayTest() {
  type testsManager = TestManager<
    [
      TestTypeTisU<UnionToUnionOrUnionArray<never>, never>,
      TestTypeTisU<UnionToUnionOrUnionArray<"foo">, "foo" | "foo"[]>,
      TestTypeTisU<
        UnionToUnionOrUnionArray<"foo" | "bar">,
        "foo" | "bar" | ("foo" | "bar")[]
      >,
      TestTypeTisU<
        UnionToUnionOrUnionArray<"foo" | "bar"[]>,
        ("foo" | "bar"[]) | ("foo" | "bar"[])[]
      >,
      TestTypeTisU<
        UnionToUnionOrUnionArray<"foo" | "bar">,
        "foo" | "bar" | ("foo" | "bar")[]
      >,
      TestTypeTisU<
        UnionToUnionOrUnionArray<"foo" | "bar">,
        "foo" | "bar" | ("foo" | "bar")[] | "foo"[] | "bar"[]
      >,
      TestTypeTinU<"foo"[] | "bar"[], UnionToUnionOrUnionArray<"foo" | "bar">>
    ]
  >;
  type passedTests = testsManager["PassedTests"];
  type failedTests = testsManager["FailedTests"];
  type result = testsManager["Result"];

  return TestReturn<result>();
}

import { ToUnionOrUnionArray } from "./types";
function toUnionOrUnionArrayTest() {
  type testsManager = TestManager<
    [
      TestTypeTisU<
        ToUnionOrUnionArray<"foo">,
        "foo" | "foo"[] | ["foo"] | readonly "foo"[] | readonly ["foo"]
      >,
      TestTypeTisU<
        ToUnionOrUnionArray<"foo"[]>,
        "foo" | "foo"[] | ["foo"] | readonly "foo"[] | readonly ["foo"]
      >,
      TestTypeTisU<
        ToUnionOrUnionArray<"foo" | "bar">,
        | "foo"
        | "bar"
        | ["foo" | "bar"]
        | readonly ("foo" | "bar")[]
        | readonly ["foo" | "bar"]
        | ("foo" | "bar")[]
      >,
      TestTypeTisU<
        ToUnionOrUnionArray<("foo" | "bar")[]>,
        | "foo"
        | "bar"
        | ("foo" | "bar")[]
        | ["foo" | "bar"]
        | readonly ("foo" | "bar")[]
        | readonly ["foo" | "bar"]
      >,
      TestTypeTisU<
        ToUnionOrUnionArray<("foo" | "bar"[])[]> &
          ToUnionOrUnionArray<readonly ("foo" | "bar"[])[]>,
        | "foo"
        | "bar"[]
        | ["foo" | "bar"[]]
        | ("foo" | "bar"[])[]
        | readonly ("foo" | "bar"[])[]
        | readonly ["foo" | "bar"[]]
      >,
      TestTypeTisU<
        ToUnionOrUnionArray<("foo" | "bar")[]>,
        | "foo"
        | "bar"
        | ["foo" | "bar"]
        | ("foo" | "bar")[]
        | readonly ("foo" | "bar")[]
        | readonly ["foo" | "bar"]
      >,
      TestTypeTisU<
        ToUnionOrUnionArray<"foo" | "bar"[]>,
        | "foo"
        | "bar"[]
        | ["foo" | "bar"[]]
        | readonly ("foo" | "bar"[])[]
        | readonly ["foo" | "bar"[]]
        | ("foo" | "bar"[])[]
      >,
      TestTypeTinU<"foo"[] | "bar"[], ToUnionOrUnionArray<("foo" | "bar")[]>>,
      TestTypeTinU<"foo"[] | "bar"[], ToUnionOrUnionArray<"foo" | "bar">>
    ]
  >;
  type passedTests = testsManager["PassedTests"];
  type failedTests = testsManager["FailedTests"];
  type result = testsManager["Result"];

  return TestReturn<result>();
}

import { ArrayIndicesExclude } from "./types";
function arrayIndicesExcludeTest() {
  type testsManager = TestManager<
    [TestTypeTisU<ArrayIndicesExclude<["foo"], "0">, never>]
  >;
  type passedTests = testsManager["PassedTests"];
  type failedTests = testsManager["FailedTests"];
  type result = testsManager["Result"];

  return TestReturn<result>();
}

import { IfUniqueList } from "./types";
function uniqueListTest() {
  type testsManager = TestManager<
    [
      TestTypeTisU<
        IfUniqueList<readonly ["foo", "bar"]>,
        readonly ["foo", "bar"]
      >,
      TestTypeTisU<IfUniqueList<readonly ["foo", "foo"]>, never>,
      TestTypeTisU<
        IfUniqueList<readonly ["foo" | "bar", "bar"]>,
        readonly ["foo" | "bar", "bar"]
      >,
      TestTypeTisU<IfUniqueList<["foo", "bar"]>, ["foo", "bar"]>,
      TestTypeTisU<IfUniqueList<["foo", "foo"]>, never>
    ]
  >;
  type passedTests = testsManager["PassedTests"];
  type failedTests = testsManager["FailedTests"];
  type result = testsManager["Result"];

  return TestReturn<result>();
}

import { SafeArrayAccess } from "./types";
function safeArrayAccessTest() {
  type testsManager = TestManager<
    [
      TestTypeTisU<
        SafeArrayAccess<readonly [5, 6, 7], number>,
        5 | 6 | 7 | undefined
      >
    ]
  >;
  type passedTests = testsManager["PassedTests"];
  type failedTests = testsManager["FailedTests"];
  type result = testsManager["Result"];

  return TestReturn<result>();
}

type testsManager = TestManager<
  [
    ExtractTestReturn<typeof filterOutReadonlyArrayOnlyTest>,
    ExtractTestReturn<typeof filterOutArrayOnlyTest>,
    ExtractTestReturn<typeof filterOutArrayTest>,
    ExtractTestReturn<typeof readonlyArrayToUnionArrayTest>,
    ExtractTestReturn<typeof arrayToUnionArrayTest>,
    ExtractTestReturn<typeof unionToUnionOrUnionArrayTest>,
    ExtractTestReturn<typeof toUnionOrUnionArrayTest>,
    ExtractTestReturn<typeof uniqueListTest>,
    ExtractTestReturn<typeof safeArrayAccessTest>
  ]
>;
type passedTests = testsManager["PassedTests"];
type failedTests = testsManager["FailedTests"];
type result = testsManager["Result"];
