import { findLastIndex, intersecting } from '../array';

describe(findLastIndex, () => {
  it('should return the last index of an item based on a given criteria', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const predicate = (item: number) => item % 2 === 0;
    expect(findLastIndex(array, predicate)).toBe(9);
  });
});

describe(intersecting, () => {
  it('should return a list of items that intersect between two given arrays', () => {
    const a = [1, 2, 3];
    const b = [1, 2, 3, 4, 5, 6];
    expect(intersecting(a, b)).toEqual([1, 2, 3]);
  });
});
