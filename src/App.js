import React, { Component } from 'react';
import 'hack';

const notImplemented = () => undefined;

const Result = ({ variant, input, hashes }) => {
  const hashFns = Object.keys(hashes).map(name => hashes[name][variant] || notImplemented);
  const outputs = hashFns.map(hashFn => hashFn(input));

  const status = output => {
    if (!output) {
      return 'not-implemented';
    } else if ((output + "") === (outputs[0] + "")) {
      return 'success';
    } else {
      return 'failure';
    }
  };

  const format = output => {
    if (!output) {
      return "N/A";
    } else if (output.length === 32) {
      return <span>{output.slice(0, 16)}<wbr />{output.slice(16)}</span>;
    } else if (output) {
      return output;
    }
  };

  return (
    <tr>
      <td className="input">{input}</td>
      {outputs.map((output, idx) =>
        (<td key={idx} className={status(output)}>{format(output)}</td>))}
    </tr>
  );
};

const Heading = ({ variant, hashes }) => {
  return (
    <thead>
      <tr>
        <th>{variant}</th>
        {Object.keys(hashes).map(name => <th key={name}>{name}</th>)}
      </tr>
    </thead>
  );
}

const ResetButton = ({ onClick }) => {
  const text = "Reset to original test cases";
  return <p><a onClick={onClick}>{text}</a></p>;
};

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
    this.state = { inputs: this.props.inputs };
  }

  handleChange(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  };

  handleKeyPress(evt) {
    if(evt.which === 13) {
      const { inputs, inputValue } = this.state;
      this.setState({ inputs: inputs.concat([inputValue]), inputValue: '' });
    }
  }

  handleReset() {
    this.setState({ inputs: this.props.inputs });
  }

  render() {
    const { hashes, variant } = this.props;
    const { inputs } = this.state;
    return (
      <div>
        <table>
          <Heading hashes={hashes} variant={variant} />
          <tbody>
            {inputs.map(input => <Result key={input} hashes={hashes} variant={variant} input={input} />)}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" className='input'>Try your own:</th>
              <td>
                <input
                  value={this.state.inputValue}
                  onChange={evt => this.handleChange(evt)}
                  onKeyPress={evt => this.handleKeyPress(evt)}
                />
              </td>
            </tr>
          </tfoot>
        </table>
        {inputs.length !== this.props.inputs.length
          ? <ResetButton onClick={() => this.handleReset()} /> : null}

      </div>
    );
  }
};

const shortTests = [
  "My hovercraft is full of eels.",
  "My 🚀 is full of 🦎.",
  "吉 星 高 照"
];

const allTests = [
  "I will not buy this record, it is scratched.",
  "I will not buy this tobaconnists, it is scratched.",
].concat(shortTests);


const links = {
  smhasherWasm: "https://github.com/cimi/smhasher",
  forkedFrom: "https://github.com/pid/murmurHash3js",
  jsPerfUtf8: "https://jsperf.com/string-to-utf-8-bytes",
  canIUse: "https://caniuse.com/#search=TextEncoder"
};

class App extends Component {
  render() {
    const { hashes } = this.props;
    return (
      <div className="container">
        <h1>MurmurHash3 revisited in JavaScript</h1>

        <h2>Why another variant?</h2>

        <p>All the JS murmurhash implementations I've tried either didn't match
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
          changed its representation.</p>

        <p>Please use the <a href="#comparison">interactive comparison below</a> to check the output
          from the JS functions against the C++ reference implementation. The C++ implementation is
          running in your browser through WebAssembly! <a href={links['smhasherWasm']}
          target="_blank">(see how it was compiled)</a></p>

        <h2>Usage</h2>

        <pre class="language-js"><code>
{`        import MurmurHash3 from 'murmurhash3js-revisited';

        const str = "My hovercraft is full of eels.";
        const bytes = new TextEncoder().encode(str);

        MurmurHash3.x86.hash32(bytes);
        // output: 2953494853

        MurmurHash3.x86.hash128(bytes);
        // output: e3a186aee169ba6c6a8bd9343c68fa9c

        MurmurHash3.x64.hash128(bytes);
        // output: 03e5e14d358c16d1e5ae86df7ed5cfcb

        MurmurHash3.x86.hash32("any string");
        // output: undefined
        // (x86.hash128 and x64.hash128 also return undefined)

        MurmurHash3.x86.hash32(["a", "b", "c"]);
        // output: undefined
        // (x86.hash128 and x64.hash128 also return undefined)

        MurmurHash3.x86.hash32(anyOtherInvalidInput);
        // output: undefined
        // (x86.hash128 and x64.hash128 also return undefined)
`}
        </code></pre>


        <div class="alert alert-warning"><strong>Warning:</strong> encoding strings into
        bytes <a href={links['jsPerfEncoder']} target="_blank">is much more expensive</a> than calling <code>charCodeAt</code> on
        every character.</div>

        <div class="alert alert-warning"><strong>Warning:</strong> <a href={links['canIuse']} target="_blank">older
        browsers don't have <code>TextEncoder</code></a> and the polyfills I've tried were ~10x slower.</div>

        <p>If you <em>know</em> that your input is predominanty made of single byte ASCII characters,
          you can try to decode only when you detect multibyte characters:</p>

        <pre><code>
{`        const getUtf8Bytes = (str) => {
          const result = [];
          for (let i = 0; i < str.length; i++) {
            const charCode = str.charCodeAt(i);
            if (charCode < 0 || charCode > 127) {
              return new TextEncoder().encode(str);
            }
            result.push(charCode);
          }
          return result;
        }
`}</code></pre>
        <p><a href={links['jsPerfEncoder']}>See a JSPerf evaluation of this method</a>.</p>

        <h2 id="comparison">Comparison with other implementations</h2>

        <h3>Notes</h3>

        <p>Only implementations published on npm were considered for testing.</p>
        <p>The output representation was chosen to match murmurhash3js. Each section describes how its output is represented.</p>
        <p>The C++ reference implementation is run in the browser through WebAssembly
        (<a href={links['smhasherWasm']} target="_blank">see how it was compiled</a>).</p>

        <h3>x86  32bit</h3>
        <p>The output is represented as a 32 bit unsigned integer.</p>
        <Table hashes={hashes} variant="x86  32bit" inputs={shortTests} />
        {/* the long tests cases are not used in the first table for aesthetic reasons */}

        <h3>x86 128bit</h3>
        <p>The output is a hex string: the little endian representation of four 32 bit unsigned integers.</p>
        <Table hashes={hashes} variant="x86 128bit" inputs={allTests} />

        <h3>x64 128bit</h3>
        <p>The output is a hex string: the little endian representation of two 64 bit unsigned integers.</p>
        <Table hashes={hashes} variant="x64 128bit" inputs={allTests} />
      </div>
    );
  }
}

export default App;
