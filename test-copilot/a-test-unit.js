import request from 'supertest';
import { calculateDaysBetweenDates } from './test-copilot'; // Adjust the path accordingly

describe('calculateDaysBetweenDates', () => {
    test('should return 0 for the same date', () => {
        expect(calculateDaysBetweenDates('2023-10-01', '2023-10-01')).toBe(0);
    });

    test('should return 1 for dates one day apart', () => {
        expect(calculateDaysBetweenDates('2023-10-01', '2023-10-02')).toBe(1);
    });

    test('should return 30 for dates 30 days apart', () => {
        expect(calculateDaysBetweenDates('2023-09-01', '2023-10-01')).toBe(30);
    });

    test('should return the correct number of days for negative difference', () => {
        expect(calculateDaysBetweenDates('2023-10-01', '2023-09-01')).toBe(30);
    });

    test('should handle invalid dates', () => {
        expect(calculateDaysBetweenDates('invalid-date', '2023-10-01')).toBeNaN();
        expect(calculateDaysBetweenDates('2023-10-01', 'invalid-date')).toBeNaN();
    });
});