import { describe, expect, it } from 'vitest';

import { paginateSchema } from '../schema';

describe('paginateSchema', () => {
  it('should parse valid page numbers correctly', () => {
    expect(paginateSchema.parse('1')).toBe(1);
    expect(paginateSchema.parse('50')).toBe(50);
    expect(paginateSchema.parse('100')).toBe(100);
  });
  it('should throw an error for invalid page numbers', () => {
    expect(() => paginateSchema.parse('0')).toThrow();
    expect(() => paginateSchema.parse('-5')).toThrow();
    expect(() => paginateSchema.parse('101')).toThrow();
    expect(() => paginateSchema.parse('abc')).toThrow();
    expect(() => paginateSchema.parse('10.5')).toThrow();
  });
});
