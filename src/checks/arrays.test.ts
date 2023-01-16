import assert from "node:assert"
import test from "node:test"
import { isString, isNumber, isBoolean } from "../assertions.js"
import { isTuple } from "./arrays.js"

test("Arrays", () => {
    test("isTuple", () => {
        const check = isTuple(isNumber, isString, isBoolean)
        const checked = check([1, "3", true]);
        assert(checked.length === 3);
        assert(checked[0] === 1);
        assert.throws(() => {
            check(["1", "2", 3]);
        })
    })
})
