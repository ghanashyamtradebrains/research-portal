function convertToSnakeCase(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .replace(/&/g, "")
    .replace("--", "-");
}

export default convertToSnakeCase;
