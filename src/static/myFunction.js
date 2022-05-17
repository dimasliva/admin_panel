/*
 *  value json
 *  value = {
 *      year,
 *      month,
 *      day,
 *      hour,
 *      minute
 *  }
 *  If the value is empty, assign 0
 */

export const dateModify = (value) => {
  if (value.year === '') {
    value.year = '0000'
  }
  if (value.month === '') {
    value.month = '00'
  }
  if (value.day === '') {
    value.day = '00'
  }
  if (value.hour === '') {
    value.hour = '00'
  }
  if (value.minute === '') {
    value.minute = '00'
  }
  return value
}
