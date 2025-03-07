// tests/sum.test.ts

// 간단한 덧셈 함수 정의
function sum(a: number, b: number): number {
  return a + b;
}

describe('sum 함수', () => {
  test('1 + 2는 3이 되어야 한다', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
