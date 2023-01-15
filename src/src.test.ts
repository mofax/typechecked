import test from 'node:test';
import assert from "node:assert";
import { checkType, isArray, isRecord } from './src.js'
import { isBoolean, isFunction, isNumber, isString } from "./assertions.js";


test("src", () => {
    test("checkType", () => {
        assert.throws(() => {
            checkType("full", isBoolean)
        })

        const bool = checkType(true, isBoolean);
        const num = checkType(10, isNumber);
        const str = checkType('str', isString);

        assert(bool);
        assert((num + 1) === 11)
        assert(str.length === 3);
        assert(isFunction(str.toUpperCase));
    })

    test("checkArray", () => {
        const nums = isArray(isNumber)([1, 3, 4, 5])
        isArray(isString)(['int', 'string', 'number'])

        // should compile
        let sum = nums.reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
        });

        assert(sum === 13)

        assert.throws(() => {
            isArray(isNumber)(["1", 2, 4, 5]);
        })
    })

    test('checkRecord', () => {
        const validator = isRecord({
            key: [isBoolean],
            name: [isString]
        })

        const val = validator({
            key: true,
            name: 'Arnold'
        })
        assert(val.key);
        assert(val.name.length === 6);
    })
})
