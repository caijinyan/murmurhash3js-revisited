import React from 'react';
import links from "./links";
import {
  CodeSnippet,
  introSample
} from './code-samples';

const About = () => (
  <div>
    <h2>What is this?</h2>

    <CodeSnippet source={'npm install murmurhash3js-revisited'} />

    <CodeSnippet source={introSample} language="javascript" />

    <h2>Why another library?</h2>

    <p>All the JS murmurhash3 implementations I've tried either didn't match
      the C++ reference implementation in all cases or didn't implement all three
      variants (x86 32bit, x86 128bit and x64 128bit).</p>

    <p>This implementation was forked from <a href={links['forkedFrom']} target="_blank">pid/murmurhash3js</a>.
      The core algorithm is the same, but there is one important distinction: all variants
      now expect an array of bytes (i.e. <code>Uint8</code> or just plain numbers between 0
      and 255) as input instead of a string.</p>

    <p>Most other implementations expect strings as input and do <code>string.charCodeAt(idx)</code>,
      some with a byte mask (<code>& 0xff</code>) on the characters from the input to get the bytes
      that need to be hashed. For strings made of single byte ASCII characters this representation
      is identical to e.g. the utf-8 byte representation, but if the string contains any other
      characters the output diverges compared to any string binary encoding.</p>

    <p>Because I was already using the output from the <code>murmurhash3js</code> library, I haven't
      changed its representation. You can check the output from the JS functions against the C++ reference
      implementation by navigating to the interactive comparison (button in the header).</p>

    <p>The C++ implementation is running in your browser through WebAssembly - check the console! (<a href={links['smhasherWasm']}
      target="_blank">details here</a>)</p>
  </div>
);

export default About;
