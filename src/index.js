import React from 'react';
import ReactDOM from 'react-dom';
import murmurhash3jsOriginal from "murmurhash3js";
import murmurhash3jsModified from "@cimi/murmurhash3js";

import App from "./App";
import './index.css';
import WasmLoader from "./SMHasher";

function bufferToHex(buffer) {
  return Array
      .from(new Uint8Array(buffer))
      .map(byte => byte.toString(16).padStart(2, "0"))
      .join(" ");
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
    murmurhash3js: {
      "x86  32bit": murmurhash3jsOriginal.x86.hash32,
      "x86 128bit": murmurhash3jsOriginal.x86.hash128,
      "x64 128bit": murmurhash3jsOriginal.x64.hash128
    },
    "@cimi/murmurhash3js": {
      "x86  32bit": str => murmurhash3jsModified.x86.hash32(bytes(str)),
      "x86 128bit": str => murmurhash3jsModified.x86.hash128(bytes(str)),
      "x64 128bit": str => murmurhash3jsModified.x64.hash128(bytes(str))
    }
  };

  module.onRuntimeInitialized = () => {
    ReactDOM.render(<App hashes={hashes} />, document.getElementById('root'));
  }
};


