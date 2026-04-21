"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.levenshteinDistance = levenshteinDistance;
exports.similarityScore = similarityScore;
function levenshteinDistance(a, b) {
    if (a === b) {
        return 0;
    }
    const aLen = a.length;
    const bLen = b.length;
    if (aLen === 0) {
        return bLen;
    }
    if (bLen === 0) {
        return aLen;
    }
    const matrix = [];
    for (let i = 0; i <= bLen; i += 1) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= aLen; j += 1) {
        matrix[0][j] = j;
    }
    for (let i = 1; i <= bLen; i += 1) {
        for (let j = 1; j <= aLen; j += 1) {
            const cost = b.charAt(i - 1) === a.charAt(j - 1) ? 0 : 1;
            matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + cost);
        }
    }
    return matrix[bLen][aLen];
}
function similarityScore(a, b) {
    if (!a || !b) {
        return 0;
    }
    const longest = Math.max(a.length, b.length);
    if (longest === 0) {
        return 1;
    }
    const distance = levenshteinDistance(a, b);
    return (longest - distance) / longest;
}
