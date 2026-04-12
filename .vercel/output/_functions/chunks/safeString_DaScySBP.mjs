function convertToSafeString(string) {
  return string.replace(/[^a-zA-Z0-9]/g, "_").replace(/^_+|_+$/g, "").toLowerCase();
}

export { convertToSafeString as c };
