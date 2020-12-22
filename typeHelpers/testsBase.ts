export type TestPassed = "TEST PASSED";
export type TestFailed = "TEST FAILED";
/*type TestTypeTinU1<T, inU> = UnionToIntersection<
  [T] extends [never] ? TestFailed : T extends inU ? TestPassed : TestFailed
>;*/
export type TestTypeTinU<T, inU> = [T] extends [never]
  ? TestFailed
  : [T] extends [inU]
  ? TestPassed
  : TestFailed;
export type TestTypeTinU1<T, inU> = [T] extends [never]
  ? TestFailed
  : T extends inU
  ? TestPassed
  : TestFailed;
export type TestTypeTNotInU<T, NotInU> = TestTypeTinU<
  T,
  NotInU
> extends TestPassed
  ? TestFailed
  : TestPassed;
export type TestTypeTisU2<T, isU> = TestTypeTinU<[T], [isU]> &
  TestTypeTinU<[isU], [T]> extends never | TestFailed
  ? TestFailed
  : TestPassed;
export type TestTypeTisU<T, isU> = TestPassed extends TestTypeTinU<[T], [isU]> &
  TestTypeTinU<[isU], [T]>
  ? TestPassed
  : TestFailed;
export type TestTypeTisNotU<T, isNotU> = TestTypeTisU<
  T,
  isNotU
> extends TestPassed
  ? TestFailed
  : TestPassed;

function testTypeTinUTest() {
  type test1 = TestTypeTinU<"foo", "foo">; // case: Best case scenario when input and output are same.
  type test2 = TestTypeTinU<"foo", "foo" | "bar">;
  type test3 = TestTypeTNotInU<"foo" | "bar", "foo">;

  type result = test1 & test2 & test3 extends never | TestFailed
    ? TestFailed
    : TestPassed;

  return undefined as result | undefined;
}
function testTypeTisUTest() {
  type test1 = TestTypeTisU<"foo", "foo">; // case: Best case scenario when input and output are same.
  type test2 = TestTypeTisU<"foo" | "bar", "foo" | "bar">;

  // fail cases
  type test3 = TestTypeTisNotU<"foo", "foo" | "bar">;
  type test4 = TestTypeTisNotU<"foo" | "bar", "foo">;

  type result = test1 & test2 & test3 & test4 extends never | TestFailed
    ? TestFailed
    : TestPassed;

  return undefined as result | undefined;
}
