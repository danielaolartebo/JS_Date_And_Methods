export function getFullDaysBeforeNewYear(date, month) {
    // Check if parameters are valid numbers within the correct range
    if (
        typeof date !== 'number' || typeof month !== 'number' ||
        date < 1 || date > 31 || month < 1 || month > 12 ||
        isNaN(date) || isNaN(month) || !isFinite(date) || !isFinite(month)
    ) {
        return null;
    }

    // Adjust month to zero-indexed for the Date constructor (January is 0, December is 11)
    const currentYear = new Date().getFullYear();
    const inputDate = new Date(currentYear, month - 1, date);
    const newYears = new Date(currentYear, 11, 31); // December 31

    // Calculate the difference in milliseconds and convert to full days
    const differenceInTime = newYears - inputDate;
    const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));

    // Ensure we return null if the date is in the new year or beyond
    return differenceInDays >= 0 ? differenceInDays : null;
}

export function formatWithWeekday(date) {
    // Check if the date is valid
    if (!date || !(date instanceof Date)) return '';
  
    // Array of weekday and month names
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Format the date parts
    const weekday = weekdays[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${weekday}, ${day}, ${month} ${year}`;
}

export function isValidDate(date) {
   // Check if date is an instance of Date and is a valid date
   return date instanceof Date && !isNaN(date.getTime());
}

export function isAfter(date, dateToCompare) {
    // Check if both dates are valid using isValidDate
    if (!isValidDate(date) || !isValidDate(dateToCompare)) return false;

    // Compare the timestamps of the dates
    return date.getTime() > dateToCompare.getTime();
}

export function formatDistanceToNow(date) {
    // Check if the date is valid
    if (!isValidDate(date)) return 'Date is unknown';

    const now = new Date();
    const secondsDiff = Math.floor((now - date) / 1000); // Difference in seconds

    // Determine the appropriate string to return based on the difference
    if (secondsDiff < 30) {
        return 'less than a minute';
    } else if (secondsDiff < 90) {
        return '1 minute';
    } else if (secondsDiff < 2700) { // 44 minutes in seconds
        const minutes = Math.floor(secondsDiff / 60);
        return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    } else if (secondsDiff < 5400) { // 89 minutes in seconds
        return 'about 1 hour';
    }

    // Format the date if it is more than 1 hour ago
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

