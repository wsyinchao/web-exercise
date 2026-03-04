export function calculateDaysBetweenDates(begin, end) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(begin);
    const secondDate = new Date(end);

    // Why you can use the minus opertor to subtract two dates?
    // Because in JavaScript, it will call the valueOf method when encountering an object 
    // where a primitive value is expected.
    // For Date objects, the valueOf method returns the number of milliseconds since January 1, 1970, 00:00:00 UTC.
    // Refer to https://leetcode.com/problems/array-wrapper/editorial/
    return Math.round(Math.abs((firstDate - secondDate) / oneDay));
}

// console.log(new Date().toLocaleString());