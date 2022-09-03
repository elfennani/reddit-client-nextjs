/**
 * Minimize number
 * @param {Number} number Number to minimize
 * @param {Number?} [fixedAmount=2] How many numbers after point.
 * @returns {string}
 */
export const minimizeNumber = (number, fixedAmount = 2) => {
    if (number >= 1000000) {
        number = number / 1000000;
        return `${number.toFixed(fixedAmount)}M`;
    } else if (number >= 1000) {
        number = number / 1000;
        return `${number.toFixed(fixedAmount)}K`;
    } else {
        return number.toString();
    }
};
