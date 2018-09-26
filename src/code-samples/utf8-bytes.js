export default `const getUtf8Bytes = (str) => {
  const result = [];
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode < 0 || charCode > 127) {
      return new TextEncoder().encode(str);
    }
    result.push(charCode);
  }
  return result;
}`
