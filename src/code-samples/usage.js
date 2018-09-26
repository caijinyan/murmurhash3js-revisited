export default `import MurmurHash3 from 'murmurhash3js-revisited';

const str = "My hovercraft is full of eels.";
const bytes = new TextEncoder().encode(str);

MurmurHash3.x86.hash32(bytes);
// output: 2953494853

MurmurHash3.x86.hash128(bytes);
// output: "e3a186aee169ba6c6a8bd9343c68fa9c"

MurmurHash3.x64.hash128(bytes);
// output: "03e5e14d358c16d1e5ae86df7ed5cfcb"

MurmurHash3.x86.hash32("any string");
// output: undefined
// (x86.hash128 and x64.hash128 also return undefined)


// since validating the input adds overhead you can disable it
// this assumes you trust your input, string will always yield wrong results!
MurmurHash3.inputValidation = false;

MurmurHash3.x86.hash32("this now returns wrong results")
MurmurHash3.x86.hash128(["as", "does", "this", "and", "the", "next", "one"]);
MurmurHash3.x64.hash128([1234, 5678, 9999]);
murmurHash3.x86.hash32(10001);
// output: incorrect hashes

murmurHash3.x86.hash32(undefined);
// Error!

// re-enabling the validation makes it return undefined for unexpected inputs
MurmurHash3.inputValidation = true;

MurmurHash3.x86.hash32(["a", "b", "c"]);
MurmurHash3.x86.hash32([256]);
MurmurHash3.x86.hash32([3, 133, "foo"]);
murmurHash3.x86.hash32(10001);
murmurHash3.x86.hash32(undefined);
// output: undefined
// (x86.hash128 and x64.hash128 also return undefined)
`;
