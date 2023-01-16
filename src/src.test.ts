import test from "node:test";
import assert from "node:assert";
import { isArray, isRecord } from "./src.js";
import { isBoolean, isNumber, isString } from "./assertions.js";

test("src", () => {
	test("checkArray", () => {
		const nums = isArray(isNumber)([1, 3, 4, 5]);
		isArray(isString)(["int", "string", "number"]);

		// should compile
		const sum = nums.reduce(function (previousValue, currentValue) {
			return previousValue + currentValue;
		});

		assert(sum === 13);

		assert.throws(() => {
			isArray(isNumber)(["1", 2, 4, 5]);
		});
	});

	test("checkRecord", () => {
		const validator = isRecord({
			key: [isBoolean],
			name: [isString],
		});

		const val = validator({
			key: true,
			name: "Arnold",
		});
		assert(val.key);
		assert(val.name.length === 6);
	});
});
