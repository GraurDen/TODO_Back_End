export function orderByAsc(a, b) {
    return a.sortingIndex - b.sortingIndex;
}
export function orderByDesc(a, b) {
    return b.sortingIndex - a.sortingIndex;
}
