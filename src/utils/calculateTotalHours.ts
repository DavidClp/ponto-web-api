export function calculateTotalHours(entry: Date, exit: Date): number {
    const diffInMilliseconds = new Date(exit).getTime() - new Date(entry).getTime();
    return diffInMilliseconds;
}
