import { TypeCheckedError } from "../util/errors.js";
import { ValidatorFunction } from "./common.js";


export function isArray<S extends (value: unknown) => any, C extends ReturnType<S>>
    (checker: S, ...args: ValidatorFunction<ReturnType<S>>[]) {

    return function (value: unknown) {
        if (!Array.isArray(value)) {
            throw new TypeCheckedError(`Expected value to be an array but found ${typeof value}`);
        }

        const checked: C[] = value.map((item, index) => {
            try {
                let checkedItem: C = checker(item);
                args.forEach(validator => {
                    checkedItem = validator(checkedItem)
                })
                return checkedItem;
            } catch (err) {
                const error = err as Error;
                throw new TypeCheckedError(`Index ${index}: ${error.message}`);
            }
        });

        return checked;
    }
}
