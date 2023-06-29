import {expect, test } from "bun:test";
import assert from "node:assert";

import { isString } from "./assertions.js";

test("assertions.ts", () => {
	test("isString", () => {
		const val = isString("YES");
		assert.strictEqual(val, "YES");

		assert.throws(
			() => {
				isString(10);
			},
			{
				name: "TypeError",
			}
		);
	});
});
