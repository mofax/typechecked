import { tcpipe } from "./util.js";
import test from "node:test";
import assert from "node:assert";
import { isString } from "../assertions.js";
import { isHex } from "../checks/strings.js";

test("util", () => {
	test("tcpipe", () => {
		const checker = tcpipe(isString, isHex);
		const val = checker("123ABF");
		assert(val === "123ABF");
		assert.throws(() => {
			checker("PROof");
		});
	});
});
