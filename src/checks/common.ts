import { TypeCheckedError } from "../util/errors.js";

export type Optional<T> = T | undefined;
export type ValidatorFunction<T> = (value: T) => T;
export type LiteralBase = string | number | bigint | boolean;
export type Primitive = string | number | symbol | bigint | boolean | null | undefined;
export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
export type Tuple<T, N extends number, R extends readonly T[] = []> = R["length"] extends N
	? R
	: Tuple<T, N, readonly [T, ...R]>;
export type Range<T extends number> = number extends T ? number : RangeComputer<T, []>;
type RangeComputer<T extends number, R extends unknown[]> = R["length"] extends T
	? R["length"]
	: R["length"] | RangeComputer<T, [T, ...R]>;

export type FixedArray<K, T extends number> = Array<K> & {
	readonly length: Range<T>;
	[I: number]: K;
	[Symbol.iterator]: () => IterableIterator<T>;
};

export type OptionalTuple<T, N extends number, R extends readonly T[] = []> = R["length"] extends N
	? R
	: Tuple<Optional<T>, N, readonly [T, ...R]>;

function maxNumber(num: number, limit: number) {
	if (num > limit) {
		throw new TypeCheckedError(`Expected value ${num} equal to or below ${limit}`);
	}
	return num;
}

function minNumber(num: number, limit: number) {
	if (num < limit) {
		throw new TypeCheckedError(`Expected value ${num} to be equal to or above ${limit}`);
	}
	return num;
}

function maxString(num: string, limit: number) {
	if (num.length > limit) {
		throw new TypeCheckedError(
			`Expected length ${num.length} of string to be equal to or below ${limit}`
		);
	}
	return num;
}

function minString(num: string, limit: number) {
	if (num.length < limit) {
		throw new TypeCheckedError(
			`Expected length ${num.length} of string to be a number equal to or above ${limit}`
		);
	}
	return num;
}

export function isMax(limit: number) {
	return function <T extends string | number>(value: T) {
		if (typeof value === "number") {
			return maxNumber(value, limit) as T;
		}
		return maxString(value, limit) as T;
	};
}

export function isMin(limit: number) {
	return function <T extends number | string>(value: T) {
		if (typeof value === "number") {
			return minNumber(value, limit) as T;
		}
		return minString(value, limit) as T;
	};
}

export function isDefined<A>(val: A, message?: string) {
	if (val === null || val === undefined) {
		throw new TypeCheckedError(message || `Value cannot be null or undefined`);
	}
	return val;
}
