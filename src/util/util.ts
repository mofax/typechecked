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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SimpleFunction = (value: any) => any;

// TODO: These types are not working!
// type PipeArgs<
// 	P extends readonly SimpleFunction[],
// 	T extends P[number],
// 	S extends readonly SimpleFunction[] = []> =
// 	P['length'] extends S['length'] ? S
// 	: PipeArgs<P, P[S['length']], readonly [FollowerFunction<T>, ...S]>

type FollowerFunction<F extends SimpleFunction> = (arg: ReturnType<F>) => unknown;
type LastIndex<Arr extends readonly SimpleFunction[]> = Arr extends [unknown, ...infer Rest]
	? Rest["length"]
	: never;
type LastItem<T extends readonly SimpleFunction[]> = T[LastIndex<T>];

/**
 * WARNING: This function is not yet properly typed
 * tcpipe_t allows you to transform variable types via piped functions
 * @param firstArg
 * @param transformers
 * @returns
 */
export function tcpipe_t<SF extends SimpleFunction, SFA extends SimpleFunction[]>(
	firstArg: SF,
	...transformers: [FollowerFunction<SF>, ...SFA]
) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return function (value: any): ReturnType<LastItem<SFA>> {
		let newval = firstArg(value);
		for (const transformer of transformers) {
			newval = transformer(value);
		}
		return newval;
	};
}
