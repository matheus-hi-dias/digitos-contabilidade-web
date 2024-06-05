/* eslint-disable import/prefer-default-export */
export function formatDate(date) {
  const splitDate = date.split('T');
  const formattedDate = splitDate[0];
  return formattedDate;
}

export function setEmptyValues(data) {
  if (!data || data.length === 0) return;
  const emptyValue = data.find((item) => item.id === '' || item.document_code === '');
  if (emptyValue) return;

  const objectData = data[0];
  const objectWithEmptyValue = Object.keys(objectData).reduce((acc, key) => {
    acc[key] = '';
    return acc;
  }, {});

  const dataResponse = [objectWithEmptyValue, ...data];
  return dataResponse;
}
