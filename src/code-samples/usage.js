export default `import MurmurHash3 from 'murmurhash3js-revisited';

// since validating the input adds overhead you can disable it
// this assumes you trust your input, string will always yield wrong results!
MurmurHash3.inputValidation = false;

MurmurHash3.x86.hash32("this now returns wrong results")
MurmurHash3.x86.hash128(["as", "does", "this", "and", "the", "next", "one"]);
MurmurHash3.x64.hash128([1234, 5678, 9999]);
MurmurHash3.x86.hash32(10001);
// output: incorrect hashes

murmurHash3.x86.hash32(undefined);
// Error!

// re-enabling the validation makes it return undefined for unexpected inputs
MurmurHash3.inputValidation = true;

MurmurHash3.x86.hash32(["a", "b", "c"]);
MurmurHash3.x86.hash32([256]);
MurmurHash3.x86.hash32([3, 133, "foo"]);
MurmurHash3.x86.hash32(10001);
MurmurHash3.x86.hash32(undefined);
// output: undefined
// (x86.hash128 and x64.hash128 also return undefined)
`;
