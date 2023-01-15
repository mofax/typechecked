import { ValidatorFunction } from './checks/common.js';

export function checkType<T extends unknown, S extends (value: T) => any>(
    value: T,
    checker: S,
    ...args: ValidatorFunction<ReturnType<typeof checker>>[]
) {
    type TypeToReturn = ReturnType<typeof checker>;
    let res = checker(value);
    for (let func of args) {
        res = func(res);
    }
    return res as TypeToReturn;
}

export * from "./assertions.js";
export * from './checks/common.js';
export * from './checks/strings.js';
export * from './checks/records.js';
export * from './checks/arrays.js';
