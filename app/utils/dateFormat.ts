export const dateFormat = (dateStr: string) => {
  const date = dateStr.replace(/T.+$/g, '');
  return date;
};
