import { isObject } from "../assertions.js";
import { TypeCheckedError } from "../util/errors.js";

export type RecordInput = {
	[key: string | number | symbol]: ((arg: unknown) => unknown) | RecordInput;
};

type RecursiveRecordReturn<T> = T extends RecordInput ? RecordReturn<T> : never;

type RecordReturn<T extends RecordInput> = {
	[K in keyof T]: T[K] extends (arg: unknown) => infer R ? R : RecursiveRecordReturn<T[K]>;
};

type RecordValidatorOptions = {
	lazy?: boolean;
	partial?: boolean;
};

export function createRecordValidator<T extends RecordInput, R extends RecordValidatorOptions>(
	validations: T,
	options: R = Object.create({ lazy: true, partial: false })
) {
	function validateRecord(arg: T, _target: unknown, parent = "") {
		const target = isObject(_target, `Key ${parent} was expected to be an object`);
		const validated = Object.create(null);
		const entries = Object.entries(arg);

		for (const entry of entries) {
			const [key, value] = entry;
			if (typeof value === "function") {
				try {
					const targetKey = target[key];
					if (options.partial && targetKey === undefined) {
						validated[key] = undefined
					} else {
						validated[key] = value.call(null, target[key]);
					}
				} catch (err) {
					const error = err as Error;
					const parentPrefix = parent.length ? `${parent}.` : "";
					const msg = `Key ${parentPrefix}${key} failed validation: ${error.message}`;
					throw new TypeCheckedError(msg);
				}
			} else {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				validated[key] = validateRecord(arg[key] as any, target[key], key);
			}
		}

		type PartialOveride = (typeof options)["partial"] extends true
			? Partial<RecordReturn<T>>
			: RecordReturn<T>;
		return validated as PartialOveride;
	}

	return function (value: unknown) {
		return validateRecord(validations, value);
	};
}
