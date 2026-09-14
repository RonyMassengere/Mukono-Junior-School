export interface FeeStructure {
  className: string
  dayFee: string
  boardingFee: string
  requirements: string
}

function normalizeHeader(value: string) {
  return value
    .replace(/\u00a0/g, ' ')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .toLowerCase()
}

function parseCsvLine(line: string) {
  const cells: string[] = []
  let current = ''
  let insideQuotes = false

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index]

    if (character === '"') {
      if (insideQuotes && line[index + 1] === '"') {
        current += '"'
        index += 1
      } else {
        insideQuotes = !insideQuotes
      }
      continue
    }

    if (character === ',' && !insideQuotes) {
      cells.push(current.trim())
      current = ''
      continue
    }

    current += character
  }

  cells.push(current.trim())
  return cells
}

function parseCsv(csvText: string) {
  return csvText
    .split(/\r?\n/)
    .map((line) => parseCsvLine(line))
    .filter((row) => row.some((cell) => cell && cell.trim() !== ''))
}

function findHeaderIndex(headers: string[], matchers: RegExp[]) {
  for (let index = 0; index < headers.length; index += 1) {
    const header = headers[index]
    if (matchers.some((matcher) => matcher.test(header))) {
      return index
    }
  }
  return -1
}

function cleanCellText(value: string | undefined) {
  return (value ?? '')
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export async function getFeesFromSheet(): Promise<FeeStructure[]> {
  const sheetUrl = process.env.NEXT_PUBLIC_FEES_SHEET_URL

  if (!sheetUrl) {
    return []
  }

  try {
    const response = await fetch(sheetUrl, {
      cache: 'no-store',
      next: { revalidate: 0 },
      headers: {
        Accept: 'text/csv, text/plain, */*',
      },
    })

    if (!response.ok) {
      throw new Error(`Unable to fetch fee sheet: ${response.status}`)
    }

    const csvText = await response.text()
    const rows = parseCsv(csvText)

    if (rows.length < 2) {
      return []
    }

    const headers = rows[0].map((cell) => normalizeHeader(cell))
    const classIndex =
      findHeaderIndex(headers, [/^class$/, /^class level$/, /class level/, /level/]) ??
      findHeaderIndex(headers, [/^class.*$/, /level/])
    const dayFeeIndex = findHeaderIndex(headers, [
      /day scholar fee/i,
      /day fee/i,
      /school fee/i,
      /tuition/i,
    ])
    const boardingFeeIndex = findHeaderIndex(headers, [
      /boarding fee/i,
      /board fee/i,
      /boarding/i,
    ])
    const requirementsIndex = findHeaderIndex(headers, [
      /requirements/i,
      /included/i,
      /items/i,
      /what.*included/i,
    ])

    const normalizedClassIndex = classIndex >= 0 ? classIndex : 0
    const normalizedDayFeeIndex = dayFeeIndex >= 0 ? dayFeeIndex : 1
    const normalizedBoardingFeeIndex = boardingFeeIndex >= 0 ? boardingFeeIndex : 2
    const normalizedRequirementsIndex = requirementsIndex >= 0 ? requirementsIndex : 3

    return rows.slice(1).reduce<FeeStructure[]>((accumulator, row) => {
      const className = cleanCellText(row[normalizedClassIndex] ?? '')
      const dayFee = cleanCellText(row[normalizedDayFeeIndex] ?? '')
      const boardingFee = cleanCellText(row[normalizedBoardingFeeIndex] ?? '')
      const requirements = cleanCellText(row[normalizedRequirementsIndex] ?? '')

      if (!className && !dayFee && !boardingFee && !requirements) {
        return accumulator
      }

      accumulator.push({
        className: className || 'Class entry',
        dayFee: dayFee || '—',
        boardingFee: boardingFee || '—',
        requirements: requirements || 'As communicated by the school',
      })

      return accumulator
    }, [])
  } catch (error) {
    console.error('Failed to load fee structure from Google Sheet:', error)
    return []
  }
}
