const escapeCell = (value: unknown) => {
  const text = value === null || value === undefined ? '' : String(value)

  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

/** Rows → CSV text with a header line, using `columns` as both the header and the field order. */
export const toCsv = <TRow extends object>(rows: TRow[], columns: (keyof TRow & string)[]) =>
  [columns.join(','), ...rows.map(row => columns.map(column => escapeCell(row[column])).join(','))].join('\n')

/** Triggers a browser download of `csv` as `filename`. */
export const downloadCsv = (filename: string, csv: string) => {
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  const link = Object.assign(document.createElement('a'), { href: url, download: filename })

  link.click()
  URL.revokeObjectURL(url)
}

/** Minimal RFC-4180 parser (quoted fields, escaped quotes). Returns one object per data row, keyed by header. */
export const parseCsv = (text: string): Record<string, string>[] => {
  const rows: string[][] = []
  let row: string[] = []
  let cell = ''
  let inQuotes = false

  for (let index = 0; index < text.length; index++) {
    const char = text[index]

    if (inQuotes) {
      if (char === '"' && text[index + 1] === '"') {
        cell += '"'
        index++
      } else if (char === '"') inQuotes = false
      else cell += char
    } else if (char === '"') inQuotes = true
    else if (char === ',') {
      row.push(cell)
      cell = ''
    } else if (char === '\n' || char === '\r') {
      if (char === '\r' && text[index + 1] === '\n') index++
      row.push(cell)
      rows.push(row)
      row = []
      cell = ''
    } else cell += char
  }

  if (cell || row.length) rows.push([...row, cell])

  const [header = [], ...body] = rows.filter(cells => cells.some(value => value.trim() !== ''))
  const keys = header.map(key => key.trim().toLowerCase())

  return body.map(cells => Object.fromEntries(keys.map((key, index) => [key, (cells[index] ?? '').trim()])))
}
