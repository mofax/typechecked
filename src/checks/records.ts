import { TypeCheckedError } from "../util/errors.js";

type IsRecordInput = { [K: string]: (arg: unknown) => unknown };

type IsRecordReturn<CBR extends IsRecordInput> = {
	[Key in keyof CBR]: ReturnType<CBR[Key]>;
};

type IsRecordOptions = {
	lazy?: boolean;
};

export function isRecord<T extends IsRecordInput>(validations: T, options: IsRecordOptions = {}) {
	return function (value: unknown): IsRecordReturn<T> {
		if (typeof value !== "object") {
			throw new TypeCheckedError(`Expected value to be an object`);
		}

		let errorCount = 0;
		const errors: { [K: string]: string } = Object.create(null);
		const responses = Object.create(null);

		for (const entry of Object.entries(validations)) {
			const [key, validator] = entry;
			const descriptor = Object.getOwnPropertyDescriptor(value, key);

			if (!descriptor) {
				if (options.lazy) {
					throw new TypeCheckedError(`Expected value of key ${key} is undefined`);
				} else {
					errorCount++;
					errors[key] = "Value is undefined";
					continue;
				}
			}

			try {
				responses[key] = validator(descriptor.value);
			} catch (err) {
				const error = err as Error;
				if (options.lazy) {
					throw error;
				} else {
					errors[key] = error.message;
				}
			}
		}

		if (errorCount !== 0) {
			const errorValues = Object.values(errors);
			const error = new TypeCheckedError(errorValues.join("/n"));
			error.data = errors;
			throw error;
		}

		return responses;
	};
}

export function isPartialRecord<T extends IsRecordInput>(
	validations: T,
	options: IsRecordOptions = {}
) {
	return function (value: unknown): Partial<IsRecordReturn<T>> {
		if (typeof value !== "object") {
			throw new TypeCheckedError(`Expected value to be an object`);
		}

		const errorCount = 0;
		const errors: { [K: string]: string } = Object.create(null);
		const responses = Object.create(null);

		for (const entry of Object.entries(validations)) {
			const [key, validator] = entry;
			const descriptor = Object.getOwnPropertyDescriptor(value, key);

			if (!descriptor) {
				responses[key] = undefined;
				continue;
			}

			try {
				responses[key] = validator(descriptor.value);
			} catch (err) {
				const error = err as Error;
				if (options.lazy) {
					throw error;
				} else {
					errors[key] = error.message;
				}
			}
		}

		if (errorCount !== 0) {
			const errorValues = Object.values(errors);
			const error = new TypeCheckedError(errorValues.join("/n"));
			error.data = errors;
			throw error;
		}

		return responses;
	};
}
