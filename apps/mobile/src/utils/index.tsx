export const truncate = (string: string) => {
  if (string.length >= 15) {
    let ellipsis = string.trim().concat('...')
    return ellipsis
  } else return string
}
