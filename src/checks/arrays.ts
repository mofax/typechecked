import { TypeCheckedError } from "../util/errors.js";
import { ValidatorFunction } from "./common.js";

export function isArray<S extends (value: unknown) => unknown, C extends ReturnType<S>>(
	checker: S,
	...args: ValidatorFunction<C>[]
) {
	return function (value: unknown) {
		if (!Array.isArray(value)) {
			throw new TypeCheckedError(`Expected value to be an array but found ${typeof value}`);
		}

		const checked: C[] = value.map((item, index) => {
			try {
				let checkedItem = checker(item) as C;
				args.forEach((validator) => {
					checkedItem = validator(checkedItem);
				});
				return checkedItem;
			} catch (err) {
				const error = err as Error;
				throw new TypeCheckedError(`Index ${index}: ${error.message}`);
			}
		});

		return checked;
	};
}

type ReturnTypeExtractor<
	T extends Readonly<ValidatorFunction<unknown>[]>,
	S extends ReturnType<T[number]>[] = []
> = T["length"] extends S["length"]
	? S
	: ReturnTypeExtractor<T, [...S, ReturnType<T[S["length"]]>]>;

/**
 * Tuple validation
 * Takes in a tuple passed in (as const)
 *
 * For example
 *
 * ```
 *  const tupleCheck = isTuple(isString, isBoolean);
 *  // tupleCheck is now a function that can be used for validation
 *
 *  const checked = tupleCheck["true", false];
 *  // checked is of type [string, boolean]
 *
 *  tupleCheck(["true", false]); // this will pass
 *  tupleCheck([43, "23"]); // this will fail
 * ```
 *
 */
export function isTuple<A extends Readonly<ValidatorFunction<unknown>[]>>(...arg: A) {
	return function check(value: unknown) {
		if (!Array.isArray(value)) {
			throw new TypeCheckedError(`Expected value to be an array but found ${typeof value}`);
		}

		if (arg.length !== value.length) {
			throw new TypeCheckedError(
				`Expected value to have length ${arg.length} tuple but found ${value.length}`
			);
		}

		arg.forEach((argItem, index) => {
			try {
				argItem(value[index]);
			} catch (err) {
				const error = err as Error;
				throw new TypeCheckedError(`Error at ${index}: ${error.message}`);
			}
		});

		return value as ReturnTypeExtractor<A>;
	};
}
