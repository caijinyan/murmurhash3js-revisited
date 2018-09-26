import React from 'react';
import ReactDOM from 'react-dom';
import murmurhash3jsOriginal from "murmurhash3js";
import murmurhash3jsModified from "@cimi/murmurhash3js";
import murmur32x86 from "murmur-32";
import murmur128x86 from "murmur-128";
import imurmurhash from "imurmurhash";

import App from "./App";
import './index.css';
import WasmLoader from "./SMHasher";

function bufferToHex(buffer) {
  const hexBytes = Array
      .from(new Uint32Array(buffer))
      .map(byte => byte.toString(16).padStart(8, "0"));
  return hexBytes.join("");
}

window.onload = () => {
  // to run locally, the path prefix must be removed as the server runs on localhost:3000/
  const module = WasmLoader({ locateFile: () => '/murmurhash3js-revisited/SMHasher.wasm' });

  const bytes = str => new TextEncoder().encode(str);

  const hashes = {
    "C++ reference": {
      "x86  32bit": module.cwrap('MurmurHash3_x86_32_reference', 'string', ['string']),
      "x86 128bit": module.cwrap('MurmurHash3_x86_128_reference', 'string', ['string']),
      "x64 128bit": module.cwrap('MurmurHash3_x64_128_reference', 'string', ['string'])
    },
    "murmurhash3js-revisited": {
      "x86  32bit": str => murmurhash3jsModified.x86.hash32(bytes(str)),
      "x86 128bit": str => murmurhash3jsModified.x86.hash128(bytes(str)),
      "x64 128bit": str => murmurhash3jsModified.x64.hash128(bytes(str))
    },
    murmurhash3js: {
      "x86  32bit": murmurhash3jsOriginal.x86.hash32,
      "x86 128bit": murmurhash3jsOriginal.x86.hash128,
      "x64 128bit": murmurhash3jsOriginal.x64.hash128
    },
    // this implementation yields wrong results for all test cases and only implments 32 bit
    // excluding for now as it breaks formatting of the other two tables
    // import murmurjs from 'murmur.js';
    // "murmur.js": {
    //   "x86  32bit": str => parseInt(murmurjs(str), 36)
    // },
    "murmur-32/128": {
      "x86  32bit": str => new Uint32Array(murmur32x86(bytes(str).buffer))[0],
      "x86 128bit": str => bufferToHex(murmur128x86(bytes(str).buffer))
    },
    "imurmurhash.js": {
      "x86  32bit": str => imurmurhash(str).result()
    }
  };

  module.onRuntimeInitialized = () => {
    ReactDOM.render(<App hashes={hashes} />, document.getElementById('root'));
  }
};


