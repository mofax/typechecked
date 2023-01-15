import { TypeCheckedError } from "../util/errors.js";

export type ValidatorFunction<T> = (value: T) => T
export type LiteralBase =
    | string
    | number
    | bigint
    | boolean

export type Primitive =
    | string
    | number
    | symbol
    | bigint
    | boolean
    | null
    | undefined;

export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

function maxNumber(num: number, limit: number) {
    if (num > limit) {
        throw new TypeCheckedError(`Expected value to be a number below ${limit}`);
    }
    return num;
}

function minNumber(num: number, limit: number) {
    if (num < limit) {
        throw new TypeCheckedError(`Expected value to be a number above ${limit}`);
    }
    return num;
}

function maxString(num: string, limit: number) {
    if (num.length > limit) {
        throw new TypeCheckedError(`Expected length of string to be a number below ${limit}`);
    }
    return num;
}

function minString(num: string, limit: number) {
    if (num.length <= limit) {
        throw new TypeCheckedError(`Expected length of string to be a number equal to or above ${limit}`);
    }
    return num;
}

export function isMax(value: number | string, limit: number) {
    if (typeof value === "number") {
        return maxNumber(value, limit);
    }
    return maxString(value, limit);
}

export function isDefined<A extends unknown>(val: A, message?: string) {
    if (val === null || val === undefined) {
        throw new TypeCheckedError(message || `Value cannot be null or undefined`)
    }
    return val;
}

export function isMin(value: number | string, limit: number) {
    if (typeof value === "number") {
        return minNumber(value, limit);
    }
    return minString(value, limit);
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
    }
}
