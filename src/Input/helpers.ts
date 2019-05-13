export function formatNumber (num: string, separator: '.' | ',' | ' ') {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${separator}`)
}
