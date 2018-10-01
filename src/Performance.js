import React from 'react';

import links from "./links";
import {
  CodeSnippet,
  usageSample,
  utf8Sample
} from './code-samples';

const Performance = () => (
  <div>
    <h2>Performance</h2>

    <div className="alert alert-warning"><strong>Warning:</strong> encoding strings into
    bytes <a href={links['jsPerf']} target="_blank">is much more expensive</a> than calling <code>charCodeAt</code> on
    every character.</div>

    <p>If you <em>know</em> that your input is predominanty made of single byte ASCII characters,
      you can try to decode only when you detect multibyte characters:</p>

    <CodeSnippet source={utf8Sample} language="javascript" />

    <div className="alert alert-warning"><strong>Warning:</strong> <a href={links['caniuse']} target="_blank">older
    browsers don't have <code>TextEncoder</code></a> and the polyfills I've tried were ~10x slower.</div>

    <p><a href={links['jsPerf']} target="_blank">See a JSPerf evaluation of this method</a>.</p>

    <h3>Input validation</h3>
    <CodeSnippet source={usageSample} language="javascript" />

  </div>
);

export default Performance;
