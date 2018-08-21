export const isEmpty = value => {
  if (value == null) {
    return true
  }

  return Object.keys(value).length === 0
}
