import { createRecordValidator } from "./records.js";
import { test, expect } from "bun:test";
import { tcpipe } from "../util/util.js";
import { isHex } from "./strings.js";
import { isBoolean, isNumber, isString } from "../assertions.js";

test("createRecordValidator", () => {
	const validator = createRecordValidator({
		name: tcpipe(isString),
		admin: tcpipe(isBoolean),
		id: tcpipe(isString, isHex),
	});

	const validated = validator({
		name: "John",
		admin: true,
		id: "123456",
	});

	expect(validated).toEqual({
		name: "John",
		admin: true,
		id: "123456",
	})
})

test("createRecordValidator - nested", () => {
	const validator = createRecordValidator({
		name: tcpipe(isString),
		admin: tcpipe(isBoolean),
		id: tcpipe(isString, isHex),
		address: {
			county: tcpipe(isString),
			population: tcpipe(isNumber),
			codes: {
				county: tcpipe(isString),
				population: tcpipe(isNumber),
			}
		}
	});

	const testKit = {
		name: "John",
		admin: true,
		id: "123456",
		address: {
			county: "Nairobi",
			population: 500000,
			codes: {
				county: "Nairobi",
				population: 500000,
			}
		},
	}

	const validated = validator(testKit);
	expect(validated).toStrictEqual(testKit)
});

test("createRecordValidator - partial", () => {
	const validator = createRecordValidator({
		name: tcpipe(isString),
		admin: tcpipe(isBoolean),
		id: tcpipe(isString, isHex),
	}, { partial: true });

	const validated = validator({
		admin: true,
		id: "123456",
	});

	expect(validated).toStrictEqual({
		name: undefined,
		admin: true,
		id: "123456",
	})
})
