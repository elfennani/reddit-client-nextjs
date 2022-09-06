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

/**
 *
 * @param {number} dateNumber in seconds since Epoch
 * @returns {Number} in milliseconds since Epoch
 */
export const dateDifference = (dateNumber) => {
    let now = new Date();
    let date = new Date(0);
    date.setUTCSeconds(dateNumber);

    return now.getTime() - date.getTime();
};

export const parseDate = (secondsSinceEpoch) => {
    let difference = dateDifference(secondsSinceEpoch) / 1000;

    let result;
    if (difference >= 31449600)
        result = `${(difference / (365 * 24 * 3600)).toFixed(0)}y`;
    else if (difference >= 31 * 24 * 3600)
        result = `${(difference / (31 * 24 * 3600)).toFixed(0)}mo`;
    else if (difference >= 24 * 3600)
        result = `${(difference / (24 * 3600)).toFixed(0)}d`;
    else if (difference >= 3600) result = `${(difference / 3600).toFixed(0)}h`;
    else if (difference >= 60) result = `${(difference / 60).toFixed(0)}min`;
    else result = `${difference.toFixed(0)}s`;

    return result;
};
