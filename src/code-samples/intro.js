export default `import MurmurHash3 from 'murmurhash3js-revisited';

const str = "My hovercraft is full of eels.";
const bytes = new TextEncoder().encode(str);

MurmurHash3.x86.hash32(bytes); // 2953494853
MurmurHash3.x86.hash128(bytes); // "e3a186aee169ba6c6a8bd9343c68fa9c"
MurmurHash3.x64.hash128(bytes); // "03e5e14d358c16d1e5ae86df7ed5cfcb"
MurmurHash3.x86.hash32("any string"); // undefined
// (x86.hash128 and x64.hash128 also return undefined)`;
