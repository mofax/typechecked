import { ValidatorFunction } from "../src";

/**
 * Pipes a series of functions together to validate a variable
 * @param check type assertion function
 * @param arg
 */
export function tcpipe<T extends ValidatorFunction<unknown>>(
	check: T,
	...validators: ValidatorFunction<ReturnType<T>>[]
) {
	return function (value: unknown) {
		let checked = check(value) as ReturnType<T>;
		for (const validator of validators) {
			checked = validator(checked);
		}
		return checked;
	};
}
