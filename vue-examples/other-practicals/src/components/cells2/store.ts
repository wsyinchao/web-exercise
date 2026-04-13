import { reactive } from 'vue'

const COLS = 5
const ROWS = 20

/**
 * It's more readable at least for me like this way,
 * instead of that in 'components/cells/store.ts' file.
 */
export const cells = reactive(
    Array.from(
        { length: COLS },
        () => Array.from({ length: ROWS }, () => ''),

        // Array.from({ length: ROWS }).fill(''):
        // This way is not working because .fill('') fills the array at runtime,
        // So Array.from({ length: ROWS }) becomes unknown type.
    ),
)

export function evalCell(exp: string): string {
    if (!exp.startsWith('=')) {
        return exp
    }

    try {
        exp = exp.slice(1).replace(/\b([A-Z])(\d{1,2})\b/g, (_, col, row) => {
            const c = col.charCodeAt(0) - 65
            const r = Number(row)
            return getCellValue(c, r)
        })

        if (!/^[0-9+\-*/().\s]+$/.test(exp)) {
            throw new Error('Invalid expression')
        }

        return String(eval(exp))
    } catch (e) {
        return `ERROR${e instanceof Error ? ` ${e.message}` : e}`
    }
}

function getCellValue(col: number, row: number): string {
    const value = evalCell(cells[col]?.[row] ?? '')
    const num = Number(value)
    return Number.isFinite(num) ? String(num) : value
}
