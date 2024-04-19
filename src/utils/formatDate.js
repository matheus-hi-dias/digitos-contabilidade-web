/* eslint-disable import/prefer-default-export */
export function formatDate(date) {
  const splitDate = date.split('T');
  const formattedDate = splitDate[0];
  return formattedDate;
}
