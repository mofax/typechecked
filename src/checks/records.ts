import { TypeCheckedError } from "../util/errors.js";
import { ValidatorFunction } from "./common.js";

type SimpleFunc = (value: unknown) => unknown;
type CheckArgRecord<S extends SimpleFunc = SimpleFunc> = {
	[K: string]: [S, ...ValidatorFunction<ReturnType<S>>[]];
};
// type CheckObjectInput<CBR> = CBR extends CheckArgRecord ? {
//     [Key in keyof CBR]: [CBR[Key][0], ...ValidatorFunction<ReturnType<CBR[Key][0]>>[]]
// } : never

type CheckObjectReturn<CBR extends CheckArgRecord> = {
	[Key in keyof CBR]: ReturnType<CBR[Key][0]>;
};

type CheckObjectOptions = {
	lazy?: boolean;
};

export function isRecord<T extends CheckArgRecord>(
	validations: T,
	options: CheckObjectOptions = {}
) {
	return function (obj: unknown): CheckObjectReturn<typeof validations> {
		if (typeof obj !== "object") {
			throw new TypeCheckedError(`Expected value to be an object but got ${typeof obj}`);
		}

		let errorCount = 0;
		const errors: { [K: string]: string } = Object.create(null);
		const responses = Object.create(null);

		for (const entry of Object.entries(validations)) {
			const [key, validators] = entry;
			const descriptor = Object.getOwnPropertyDescriptor(obj, key);
			let validatedValue: unknown;

			if (!descriptor) {
				if (options.lazy) {
					throw new TypeCheckedError(`Expected value of key ${key} is undefined`);
				} else {
					errorCount++;
					errors[key] = "Value is undefined";
					continue;
				}
			}

			for (const validator of validators) {
				try {
					validatedValue = validator(descriptor.value);
				} catch (err) {
					const error = err as Error;
					if (options.lazy) {
						throw error;
					} else {
						errorCount++;
						errors[key] = error.message;
						break;
					}
				}
			}

			responses[key] = validatedValue;
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

export function isPartialRecord<T extends CheckArgRecord>(
	validations: T,
	options: CheckObjectOptions
) {
	return function (obj: unknown): Partial<CheckObjectReturn<typeof validations>> {
		if (typeof obj !== "object") {
			throw new TypeCheckedError(`Expected value to be an object but got ${typeof obj}`);
		}

		let errorCount = 0;
		const errors = Object.create(null);
		const responses = Object.create(null);

		for (const entry of Object.entries(validations)) {
			const [key, validators] = entry;
			const descriptor = Object.getOwnPropertyDescriptor(obj, key);
			let validatedValue: unknown;

			if (!descriptor) {
				responses[key] = undefined;
				continue;
			}

			for (const validator of validators) {
				try {
					validatedValue = validator(descriptor.value);
				} catch (err) {
					if (options.lazy) {
						throw err;
					} else {
						const error = err as Error;
						errors[key] = error.message;
						errorCount++;
						break;
					}
				}
			}

			responses[key] = validatedValue;
		}

		if (errorCount !== 0) {
			const error = new TypeCheckedError(`Object validation failed`);
			error.data = errors;
			throw error;
		}

		return responses;
	};
}
