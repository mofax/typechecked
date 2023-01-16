import { tcpipe, tcpipe_t } from "./util.js";
import test from "node:test";
import assert from "node:assert";
import { isNumber, isString } from "../assertions.js";
import { isHex } from "../checks/strings.js";
import { isMin, isMax } from "../checks/common.js";

test("util", () => {
	test("tcpipe", () => {
		const checker = tcpipe(isString, isHex);
		const val = checker("123ABF");
		assert(val === "123ABF");
		assert.throws(() => {
			checker("PROof");
		});
	});

	test("tcpipe - isMax, isMin", () => {
		const checker = tcpipe(isString, isMin(5), isMax(10));
		checker("PROof");
		assert.throws(() => {
			checker("PROo");
		});

		const checkerNum = tcpipe(isNumber, isMin(5), isMax(10));
		checkerNum(7);
		assert.throws(() => {
			checkerNum(4);
			checkerNum(11);
		});
	});

	test("tcpipe_t", () => {
		function parse(str: string) {
			return parseInt(str);
		}

		const checker = tcpipe_t(isString, parse);
		const val = checker("123");
		assert(val === 123);
	});
});
