import { TypeCheckedError } from "./util/errors.js";

export function isString(value: unknown) {
	if (!(typeof value === "string")) {
		throw new TypeCheckedError(`Expected ${value} to be a string, but got ${typeof value}`);
	}
	return value;
}

export function isNumber(value: unknown) {
	if (!(typeof value === "number")) {
		throw new TypeCheckedError(`Expected value to be a number, but got ${typeof value}`);
	}
	if (Number.isNaN(value)) {
		throw new TypeCheckedError(`Expected value to be a number, but got ${typeof value}`);
	}
	return value;
}

export function isInteger(value: unknown) {
	const asNumber = isNumber(value);
	if (Number.isInteger(isNumber(asNumber))) {
		return asNumber;
	}
	throw new TypeCheckedError(`Expected value ${value} to be an integer, it is not`);
}

export function isBoolean(value: unknown) {
	if (!(typeof value === "boolean")) {
		throw new TypeCheckedError(`Expected value to be a boolean, but got ${typeof value}`);
	}
	return value;
}

export function isNully(value: unknown): null | undefined {
	if (value === null || value === undefined) {
		return value;
	}
	throw new TypeCheckedError(`Expected value to be null or undefined, but got ${typeof value}`);
}

export function isNull(value: unknown): null {
	if (!(value === null)) {
		throw new TypeCheckedError(`Expected value to be null, but got ${typeof value}`);
	}
	return value;
}

export function isUndefined(value: unknown): undefined {
	if (!(value === undefined)) {
		throw new TypeCheckedError(`Expected value to be undefined, but got ${typeof value}`);
	}
	return value;
}

export function isSymbol(value: unknown): symbol {
	if (!(typeof value === "symbol")) {
		throw new TypeCheckedError(`Expected value to be a symbol, but got ${typeof value}`);
	}
	return value;
}

export function isDate(value: unknown): Date {
	let val: Date;
	if (typeof value === "string" || typeof value === "number") {
		val = new Date(value);
	} else if (value instanceof Date) {
		val = value;
	} else {
		throw new TypeCheckedError(`Cannot construct a Date object from ${value}`);
	}

	if (Number.isNaN(val.getTime())) {
		throw new TypeCheckedError(`The value ${value} constructs an invalid Date`);
	}
	return val;
}

export function isObject(value: unknown): object {
	if (typeof value === "object") {
		if (Array.isArray(value)) {
			throw new TypeCheckedError(`Expected value to be an object, but got an array`);
		}
		if (value !== null) return value;
	}
	throw new TypeCheckedError(`Expected value to be an object, but got ${typeof value}`);
}

export function isFunction<T>(value: T): T {
	if (typeof value !== "function") {
		throw new TypeCheckedError(`Expected value to be a function but go ${typeof value}`);
	}
	return value;
}
