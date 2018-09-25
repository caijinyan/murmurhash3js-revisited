import React from 'react';
import ReactDOM from 'react-dom';
import murmurhash3jsOriginal from "murmurhash3js";
import murmurhash3jsModified from "@cimi/murmurhash3js";

import App from "./App";
import './index.css';
import WasmLoader from "./SMHasher";
import { validator } from "./validator";

function bufferToHex(buffer) {
  return Array
      .from(new Uint8Array(buffer))
      .map(byte => byte.toString(16).padStart(2, "0"))
      .join(" ");
}

window.onload = () => {
  const module = WasmLoader({ locateFile: () => '/SMHasher.wasm' });

  const ref_x86_32 = module.cwrap('MurmurHash3_x86_32_reference', 'string', ['string']);
  const ref_x86_128 = module.cwrap('MurmurHash3_x86_128_reference', 'string', ['string']);
  const ref_x64_128 = module.cwrap('MurmurHash3_x64_128_reference', 'string', ['string']);

  // const hashToTest = (input) => bufferToHex(murmur128(input));
  // const reference = murmurhash3js.x86.hash128;

  const hashToTest = str => {
    const bytes = new TextEncoder().encode(str);
    // console.log('JS input bytes:', bufferToHex(bytes));
    return murmurhash3jsModified.x86.hash128(bytes);
  }

  const reference = ref_x86_128;

  const verify = validator(hashToTest, reference);
  module.onRuntimeInitialized = () => {
    verify("0");
    verify("I will not buy this record, it is scratched.");
    verify("I will not buy this tobacconist's, it is scratched.");
    verify("My hovercraft is full of eels.");
    verify("utf-8 supported 🌈");
    verify("👻☠️💩");
    verify("這個有效");
  }
};

ReactDOM.render(<App />, document.getElementById('root'));
