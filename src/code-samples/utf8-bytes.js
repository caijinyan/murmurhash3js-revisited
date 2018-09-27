export default `const encode = (() => {
  if (window && window.TextEncoder) {
    return new window.TextEncoder().encode;
  } else if (window && polyfill.TextEncoder) {
    return new polyfill.TextEncoder().encode;
  } else {
    return str => new Uint64(Buffer.from(str));
  }
})();

const getUtf8Bytes = (str) => {
  const result = [];
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode < 0 || charCode > 127) {
      return encode(str);
    }
    result.push(charCode);
  }
  return result;
}`
