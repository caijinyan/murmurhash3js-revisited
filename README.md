Documentation website for the [murmurhash3js-revisited](https://github.com/cimi/murmurhash3js-revisited) JavaScript library.

See it online at: https://cimi.io/murmurhash3-revisited/

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

### Matching against the reference implementation

In order to maintain compatibility with the original JS library this variant was forked from, the encoding of the output has not been changed. The 32bit version returns an unsigned int, while the x86 and x64 128 bit variants return 32 character hex strings.

Here's how you could print the output from the reference C++ implementation to get the same hex string as the JS library:

```c
int *ints = (int*) bytes;
for (int i = 0; i < 4; i++) {
  printf("%08x", ints[i]);
}
printf("\n");
```

For x64 this is different:

```c
uint64_t *ints = (uint64_t*) bytes;
for (int i = 0; i < 2; i++) {
  printf("%016llx", ints[i]);
}
printf("\n");
```

### Rebinding

```
> somethingCompletelyDifferent = murmurHash3.noConflict()
> murmurHash3
  undefined
> somethingCompletelyDifferent.version
  "3.0.1"
```
