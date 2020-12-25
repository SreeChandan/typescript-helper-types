import { TestTypeArrayTisU } from "./typesBase";
import {
  TestTypeTinU,
  Not,
  TestTypeTisU,
  TestReturn,
  TestManager,
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

  return [undefined as result | undefined] as const; // ref: https://github.com/microsoft/TypeScript/issues/32242#issuecomment-508266857
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

  return [undefined as result | undefined] as const;
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

  return [undefined as result | undefined] as const;
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

  return [undefined as result | undefined] as const;
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

  return [undefined as result | undefined] as const;
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

  return [undefined as result | undefined] as const;
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

  return [undefined as result | undefined] as const;
}

import { ArrayIndicesSlice } from "./types";
function arrayIndicesSliceTest() {
  type testsManager = TestManager<
    [TestTypeTisU<ArrayIndicesSlice<["foo"], "0">, never>]
  >;
  type passedTests = testsManager["PassedTests"];
  type failedTests = testsManager["FailedTests"];
  type result = testsManager["Result"];

  return [undefined as result | undefined] as const;
}

import { UniqueList } from "./types";
function uniqueListTest() {
  type testsManager = TestManager<
    [
      TestTypeTisU<
        UniqueList<readonly ["foo", "bar"]>,
        readonly ["foo", "bar"]
      >,
      TestTypeTisU<UniqueList<readonly ["foo", "foo"]>, never>,
      TestTypeTisU<
        UniqueList<readonly ["foo"| "bar", "bar"]>,
        readonly ["foo" | "bar", "bar"]
      >,
    ]
  >;
  type passedTests = testsManager["PassedTests"];
  type failedTests = testsManager["FailedTests"];
  type result = testsManager["Result"];

  return [undefined as result | undefined] as const;
}

type testsManager = TestManager<
  [
    TestReturn<typeof filterOutReadonlyArrayOnlyTest>,
    TestReturn<typeof filterOutArrayOnlyTest>,
    TestReturn<typeof filterOutArrayTest>,
    TestReturn<typeof readonlyArrayToUnionArrayTest>,
    TestReturn<typeof arrayToUnionArrayTest>,
    TestReturn<typeof unionToUnionOrUnionArrayTest>,
    TestReturn<typeof toUnionOrUnionArrayTest>
  ]
>;
type passedTests = testsManager["PassedTests"];
type failedTests = testsManager["FailedTests"];
type result = testsManager["Result"];
