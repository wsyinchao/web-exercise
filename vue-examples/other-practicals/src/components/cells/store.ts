import { reactive } from 'vue'

const COLS = 5
const ROWS = 20

/**
 * What does the keyword extends mean in TS?
 *
 * For t extends T, it means that t must be a subtype of T.
 * In other words, t is assignable to T.
 *
 * For example, n extends 5 means that n is assignable to literal type 5, which means n can only be 5.
 *
 * In the case of IntRange, it is a recursive type that builds up an array of numbers until it reaches the length of N.
 * When Acc['length'] extends N, it means that the length of the accumulated array has reached N,
 * and we can return the union of the numbers in the array.
 * Otherwise, we continue to build up the array by adding the current length of Acc to it.
 */

type IntRange<
    N extends number,
    Acc extends number[] = [],
> = Acc['length'] extends N ? Acc[number] : IntRange<N, [...Acc, Acc['length']]>

type ColIndex = IntRange<typeof COLS>
type RowIndex = IntRange<typeof ROWS>

/**
 * The const assertion can only be used on literal types,
 * such as string, number, boolean, array, and object literals.
 * It cannot be used on types that are not literals, such as functions, classes, or interfaces.
 * In this case, the type of cells is an array of arrays of numbers, which is not a literal type.
 * Therefore, we cannot use const assertion on it.
 *
 * LIKE `type colsType = Array.from(Array(COLS).keys()) as const` would not work because it is not a literal type.
 */

export const cells = reactive(
    Array.from(
        Array(COLS)
            .keys()
            .map((i) =>
                Array.from(
                    Array(ROWS)
                        .keys()
                        .map((i) => ''),
                ),
            ),
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

        // Any is assignable to type of string.
        // so the TS doesn't complain here.
        return eval(`${exp}`)
    } catch (error) {
        console.log(error)
        return `#ERROR ${error}`
    }
}

function getCellValue(c: number, r: number): string {
    const value = evalCell(cells[c]?.[r] || '')
    const num = Number(value)
    return Number.isFinite(num) ? String(num) : value
}
