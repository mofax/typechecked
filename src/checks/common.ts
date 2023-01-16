import { TypeCheckedError } from "../util/errors.js";

export type ValidatorFunction<T> = (value: T) => T;
export type LiteralBase = string | number | bigint | boolean;

export type Primitive = string | number | symbol | bigint | boolean | null | undefined;

export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

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
		throw new TypeCheckedError(`Expected length ${num.length} of string to be equal to or below ${limit}`);
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
	}
}

export function isMin(limit: number) {
	return function <T extends number | string>(value: T) {
		if (typeof value === "number") {
			return minNumber(value, limit) as T;
		}
		return minString(value, limit) as T;
	}
}

export function isDefined<A>(val: A, message?: string) {
	if (val === null || val === undefined) {
		throw new TypeCheckedError(message || `Value cannot be null or undefined`);
	}
	return val;
}

export function isEnum<A extends unknown[]>(...args: [...A]) {
	const s = new Set(args);
	return function (value: unknown): [...A][number] {
		if (!s.has(value)) {
			throw new TypeError(`Value ${value} should be one of [${args.join(". ")}]`);
		}
		return value;
	};
}

export function isLiteral<T extends LiteralBase>(base: T) {
	function check(value: unknown): value is T {
		return value === base;
	}

	return function (value: unknown) {
		if (check(value)) {
			return value;
		}
		throw new TypeCheckedError(`Expected ${value} to be ${base}`);
	};
}
