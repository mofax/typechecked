import { test, expect } from "bun:test";
import { isString, isNumber, isBoolean } from "../assertions.js";
import { isTuple } from "./arrays.js";

test("Arrays", () => {
	test("isTuple", () => {
		const check = isTuple(isNumber, isString, isBoolean);
		const checked = check([1, "3", true]);
		expect(checked.length).toBe(3);
		expect(checked[0]).toBe(1)
		expect(() => {
			check(["1", "2", 3]);
		}).toThrow();
	});
});
