"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertDateToUTC = convertDateToUTC;
function convertDateToUTC(date) {
    if (date.toISOString() === date.toISOString().substring(0, 19) + "Z") {
        return date;
    }
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
}
