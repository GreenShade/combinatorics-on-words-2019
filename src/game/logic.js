export function initWord() {
  return [space()]
}

export function space() {
  return {
    value: "\xa0",
    chosen: false,
    pattern: 0,
    space: true
  }
}

export function letter(key) {
  return {
    value: key,
    chosen: false,
    pattern: 0,
    space: false
  }
}