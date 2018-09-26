export default `import MurmurHash3 from 'murmurhash3js-revisited';

const str = "My hovercraft is full of eels.";
const bytes = new TextEncoder().encode(str);

MurmurHash3.x86.hash32(bytes);
// output: 2953494853

MurmurHash3.x86.hash128(bytes);
// output: e3a186aee169ba6c6a8bd9343c68fa9c

MurmurHash3.x64.hash128(bytes);
// output: 03e5e14d358c16d1e5ae86df7ed5cfcb

MurmurHash3.x86.hash32("any string");
// output: undefined
// (x86.hash128 and x64.hash128 also return undefined)

MurmurHash3.x86.hash32(["a", "b", "c"]);
// output: undefined
// (x86.hash128 and x64.hash128 also return undefined)

MurmurHash3.x86.hash32(anyOtherInvalidInput);
// output: undefined
// (x86.hash128 and x64.hash128 also return undefined)
`;
