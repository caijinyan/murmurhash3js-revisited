# murmurhash3js-revisited

JavaScript implementation of the [MurmurHash3](https://github.com/aappleby/smhasher) algorithms.

All the other JS murmurhash3 implementations I've tried either didn't match the C++ reference implementation in all cases or didn't implement all three variants (x86 32bit, x86 128bit and x64 128bit).

This implementation was forked from [pid/murmurhash3js](https://github.com/pid/murmurHash3js). The core algorithm is the same, but there is one important distinction: all variants now expect an array of bytes (i.e. Uint8 or just plain numbers between 0 and 255) as input instead of a string.

## [Documentation and comparison](http://cimi.io/murmurhash3js-revisited)

Authors
-------

-	[Karan Lyons](https://github.com/karanlyons/)
-	[Sascha Droste](https://github.com/pid/)
- [Alex Ciminian](https://github.com/cimi/)

### Other implementations

* https://github.com/karanlyons/murmurHash3.js
* https://github.com/garycourt/murmurhash-js
* https://github.com/kazuyukitanimura/murmurhash-js
* https://github.com/jensyt/imurmurhash-js
* https://github.com/matthewmueller/murmur.js
* https://github.com/ajoslin/murmurhash-v3
* https://github.com/saintplay/murmurhash
* https://github.com/levitation/murmurhash-js
* https://github.com/whitequark/murmurhash3-js
* https://github.com/vnykmshr/murmur-hash
* https://github.com/LinusU/murmur-128
(implicitly uses UCS2 instead of utf-8)
* https://github.com/chriskr/murmurhash3_128
(no `package.json`, Uses textEncoder internally)
* https://github.com/aggregateknowledge/js-murmur3-128
(no package.json, has pom.xml, guava compat)
