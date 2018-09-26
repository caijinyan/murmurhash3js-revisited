import React from 'react';
import ReactDOM from 'react-dom';
import murmurhash3jsOriginal from "murmurhash3js";
import murmurhash3jsModified from "@cimi/murmurhash3js";
import murmurGuava from "murmur-128";
import imurmurhash from "imurmurhash";
import murmurjs from 'murmur.js';

import App from "./App";
import './index.css';
import WasmLoader from "./SMHasher";

function bufferToHex(buffer) {
  console.log(new Uint32Array(buffer));
  return Array
      .from(new Uint32Array(buffer))
      .map(byte => byte.toString(16).padStart(8, "0"))
      .join("");
}

window.onload = () => {
  const module = WasmLoader({ locateFile: () => '/SMHasher.wasm' });

  const bytes = str => new TextEncoder().encode(str);

  const hashes = {
    "C++ reference": {
      "x86  32bit": module.cwrap('MurmurHash3_x86_32_reference', 'string', ['string']),
      "x86 128bit": module.cwrap('MurmurHash3_x86_128_reference', 'string', ['string']),
      "x64 128bit": module.cwrap('MurmurHash3_x64_128_reference', 'string', ['string'])
    },
    "@cimi/murmurhash3js": {
      "x86  32bit": str => murmurhash3jsModified.x86.hash32(bytes(str)),
      "x86 128bit": str => murmurhash3jsModified.x86.hash128(bytes(str)),
      "x64 128bit": str => murmurhash3jsModified.x64.hash128(bytes(str))
    },
    murmurhash3js: {
      "x86  32bit": murmurhash3jsOriginal.x86.hash32,
      "x86 128bit": murmurhash3jsOriginal.x86.hash128,
      "x64 128bit": murmurhash3jsOriginal.x64.hash128
    },
    "murmur.js": {
      "x86  32bit": str => parseInt(murmurjs(str), 36)
    },
    // cannot match output - Uint32Array[4] can't be converted to Uint64[2]
    // "murmur-128": {
    //   "x64 128bit": str => bufferToHex(murmurGuava(str))
    // },
    "imurmurhash.js": {
      "x86  32bit": str => imurmurhash(str).result()
    }
  };

  module.onRuntimeInitialized = () => {
    ReactDOM.render(<App hashes={hashes} />, document.getElementById('root'));
  }
};


