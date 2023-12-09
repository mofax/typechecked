import { test, expect } from "bun:test";
import { createLiteralUnionValidator, createLiteralValidator } from "./complex";

test("createLiteralValidator", () => {
	const isLiteral42 = createLiteralValidator(42);
	expect(isLiteral42(42)).toBe(42);

	expect(() => isLiteral42(43)).toThrow(TypeError);
	expect(() => isLiteral42("42")).toThrow(TypeError);
});


test("createLiteralUnionValidator", () => {
	const isLiteralUnion = createLiteralUnionValidator(42, "hello", true);
	expect(isLiteralUnion(42)).toBe(42);
	expect(isLiteralUnion("hello")).toBe("hello");
	expect(isLiteralUnion(true)).toBe(true);

	expect(() => isLiteralUnion(43)).toThrow(TypeError);
	expect(() => isLiteralUnion("world")).toThrow(TypeError);
	expect(() => isLiteralUnion(false)).toThrow(TypeError);
});
