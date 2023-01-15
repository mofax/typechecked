import { isDefined } from "./common.js";

export function isHex(str: string): string {
    // Check if the string consists only of hexadecimal characters (0-9, a-f, A-F)
    if (!/^[0-9a-fA-F]+$/.test(str)) {
        throw new Error("Invalid hex string: contains non-hexadecimal characters");
    }
    return str;
}

export function isEmail(email: string) {
    // Split the email into two parts: the local part and the domain part
    const parts = email.split("@");
    if (parts.length !== 2) {
        throw new Error("Invalid email address");
    }

    const localPart = isDefined(parts[0]);
    const domainPart = isDefined(parts[1]);

    // Check if the local part is non-empty
    if (localPart.length === 0) {
        throw new Error("Invalid email address");
    }

    // Check if the domain part is non-empty and contains a '.' symbol
    if (domainPart.length < 4) {
        throw new Error("Invalid email address");
    }

    const domainDotSplit = domainPart.split(".");

    if (domainDotSplit.length < 2) {
        throw new Error("Invalid email address");
    }

    if (isDefined(domainDotSplit[0]).length < 1) {
        throw new Error("Invalid email address");
    }

    if (isDefined(domainDotSplit[domainDotSplit.length - 1]).length < 2) {
        throw new Error("Invalid email address");
    }

    return email;
}

export function isISODate(date: string) {
    const isoDateRegex = /^[1-9][0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    if (!isoDateRegex.test(date)) {
        throw new TypeError(`Expected value to be a date of the format YYYY-MM-DD`);
    }
    return date;
}

export function isNotEmpty(val: string) {
    if (!val.length) {
        throw new Error("Cannot be an empty string");
    }
    return val;
}
