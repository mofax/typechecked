import { describe, test, expect } from "bun:test";
import { isString, isNumber, isBoolean } from "../assertions.js";
import { createTupleValidator,  createArrayValidator } from "./arrays.js";

describe("Arrays", () => {
	test("createTupleValidator", () => {
		const check = createTupleValidator(isNumber, isString, isBoolean);
		const checked = check([1, "3", true]);
		expect(checked.length).toBe(3);
		expect(checked[0]).toBe(1)
		expect(checked[1]).toBe("3")
		expect(checked[2]).toBe(true)
		expect(() => {
			check(["1", "2", 3]);
		}).toThrow();
	});

	test("createArrayValidator", () => {
		const check = createArrayValidator(isString);
		const checked = check(["apple", "banana", "cherry"]);
		expect(checked.length).toBe(3);
		expect(checked[0]).toBe("apple")
		expect(checked[1]).toBe("banana")
		expect(checked[2]).toBe("cherry")
		expect(() => {
			check(["apple", 2, "cherry"]);
		}).toThrow();
	});
	
});
