import { createRecordValidator } from "./records.js";
import { test, expect } from "bun:test";
import assert from "node:assert";
import { tcpipe } from "../util/util.js";
import { isHex } from "./strings.js";
import { isBoolean, isNumber, isString } from "../assertions.js";

test("Records", () => {
	test("isRecord", () => {
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

		assert(validated.name === "John");
		assert(validated.admin);
		assert((validated.id = "123456"));
	});

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

		const validated = validator({
			name: "John",
			admin: true,
			id: "123456",
			address: {
				county: "Nairobi",
				population: 500000,
			},
		});

		assert(validated.name === "John");
		assert(validated.admin);
		assert((validated.id = "123456"));
		assert(validated.address.county === "Nairobi");
		assert(validated.address.population === 500000);
	});

	test("isPartialRecord - nested", () => {
		// const validator = isPartialRecord({
		// 	name: tcpipe(isString),
		// 	admin: tcpipe(isBoolean),
		// 	id: tcpipe(isString, isHex),
		// 	address: {
		// 		county: tcpipe(isString),
		// 		population: tcpipe(isNumber),
		// 	}
		// });

		// const validated = validator({
		// 	admin: true,
		// 	id: "123456",
		// 	address: {
		// 		county: "Nairobi",
		// 		population: 500000,
		// 	},
		// });

		// assert(validated.name === undefined);
		// assert(validated.admin);
		// assert((validated.id = "123456"));
		// assert(validated.address?.county === "Nairobi");
		// assert(validated.address.population === 500000);
	});
});
