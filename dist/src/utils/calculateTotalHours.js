"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotalHours = calculateTotalHours;
function calculateTotalHours(entry, exit) {
    const diffInMilliseconds = new Date(exit).getTime() - new Date(entry).getTime();
    return diffInMilliseconds;
}
