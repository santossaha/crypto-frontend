function formatDate(dateInput, options = { year: 'numeric', month: 'long', day: 'numeric' }, locale) {
  if (!dateInput) return "";
  // Accept Date objects or parseable date strings / timestamps
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString(locale, options);
}

export default formatDate;
export { formatDate };
