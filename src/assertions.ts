import { TypeCheckedError } from "./util/errors.js";

export function isString(value: unknown, msg?: string) {
	if (typeof value !== "string") {
		throw new TypeCheckedError(msg || `Expected ${value} to be a string, but got ${typeof value}`);
	}
	return value;
}

export function isNumber(value: unknown, msg?: string) {
	if (typeof value !== "number") {
		throw new TypeCheckedError(msg || `Expected value to be a number, but got ${typeof value}`);
	}
	if (Number.isNaN(value)) {
		throw new TypeCheckedError(msg || `Expected value to be a number, but got ${typeof value}`);
	}
	return value;
}

export function isInteger(value: unknown, msg?: string) {
	const asNumber = isNumber(value, msg);
	if (Number.isInteger(asNumber)) {
		return asNumber;
	}
	throw new TypeCheckedError(msg || `Expected value ${value} to be an integer, it is not`);
}

export function isBigInt(value: unknown, msg?: string) {
	if (typeof value !== "bigint") {
		throw new TypeCheckedError(msg || `Expected value to be a bigint, but got ${typeof value}`);
	}
	return value;
}

export function isBoolean(value: unknown, msg?: string) {
	if (typeof value !== "boolean") {
		throw new TypeCheckedError(msg || `Expected value to be a boolean, but got ${typeof value}`);
	}
	return value;
}

export function isNully(value: unknown, msg?: string): null | undefined {
	if (value === null || value === undefined) {
		return value;
	}
	throw new TypeCheckedError(msg || `Expected value to be null or undefined, but got ${typeof value}`);
}

export function isNull(value: unknown, msg?: string): null {
	if (!(value === null)) {
		throw new TypeCheckedError(msg || `Expected value to be null, but got ${typeof value}`);
	}
	return value;
}

export function isUndefined(value: unknown, msg?: string): undefined {
	if (!(value === undefined)) {
		throw new TypeCheckedError(msg || `Expected value to be undefined, but got ${typeof value}`);
	}
	return value;
}

export function isSymbol(value: unknown, msg?: string): symbol {
	if (!(typeof value === "symbol")) {
		throw new TypeCheckedError(msg || `Expected value to be a symbol, but got ${typeof value}`);
	}
	return value;
}

export function isDate(value: unknown, msg?: string): Date {
	let val: Date;
	if (typeof value === "string" || typeof value === "number") {
		val = new Date(value);
	} else if (value instanceof Date) {
		val = value;
	} else {
		throw new TypeCheckedError(msg || `Cannot construct a Date object from ${value}`);
	}

	if (Number.isNaN(val.getTime())) {
		throw new TypeCheckedError(msg || `The value ${value} constructs an invalid Date`);
	}
	return val;
}

type ObjectLike = { [P: string | number | symbol]: unknown }
export function isObject(value: unknown, msg?: string): ObjectLike {
	if (typeof value === "object") {
		if (Array.isArray(value)) {
			throw new TypeCheckedError(msg || `Expected value to be an object, but got an array`);
		}
		if (value !== null) return value as ObjectLike
	}
	throw new TypeCheckedError(msg || `Expected value to be an object, but got ${typeof value}`);
}

export function isFunction<T>(value: T, msg?: string): T {
	if (typeof value !== "function") {
		throw new TypeCheckedError(msg || `Expected value to be a function but go ${typeof value}`);
	}
	return value;
}
