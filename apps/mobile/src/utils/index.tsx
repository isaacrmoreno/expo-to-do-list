export const truncate = (string: string) => {
  if (string.length >= 15) {
    let ellipsis = string.trim().slice(0, 22).concat('...')
    return ellipsis
  } else return string
}
