const date = new Date()

// sv-SE consists of two parts: sv->Swedish language; SE -> Sweden
// its format is very close to ISO format.
const datetimeStr = Intl.DateTimeFormat('sv-SE', {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
}).format(date)

console.log(datetimeStr) // like 2026-06-20 15:03:09

export function datetimeFormat(date = new Date()) {
    return Intl.DateTimeFormat('sv-SE', {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }).format(date)
}

// A very simple way to output a time string in ISO-like format.
console.log(new Date().toLocaleString('sv-SE'), ", A more simple way to display a time in ISO-like format")
console.log(new Date().toLocaleString('sv-SE', {
    second: "numeric"
}))