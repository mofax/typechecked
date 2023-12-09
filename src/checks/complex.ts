import { TypeCheckedError } from "../src";
import { LiteralBase } from "./common";

export function isEnum<A extends unknown[]>(...args: [...A]) {
    const s = new Set(args);
    return function (value: unknown): [...A][number] {
        if (!s.has(value)) {
            throw new TypeError(`Value ${value} should be one of [${args.join(". ")}]`);
        }
        return value;
    };
}

export function createLiteralUnionValidator<A extends LiteralBase[]>(...args: A) {
    return function (value: unknown): A[number] {
        for (let i = 0; i < args.length; i++) {
            if (args[i] === value) return args[i]
        }
        throw new TypeCheckedError(`Expected ${value} to be one of ${args.join(" | ")}`);
    }
}

export function createLiteralValidator<T extends LiteralBase>(base: T) {
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
