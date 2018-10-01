import React from 'react';

import links from "./links";
import {
  CodeSnippet,
  cPrintx86Sample,
  cPrintx64Sample
} from './code-samples';

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
      inputValue: '',
      inputs: this.props.inputs
    };
  }

  handleChange(evt) {
    this.setState({
      inputValue: evt.target.value || ''
    });
  };

  handleKeyPress(evt) {
    const { inputs, inputValue } = this.state;
    if (evt.which === 13 && inputValue) {
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
            {/* results are re-computed every time a key is pressed - hey, this is a demo! */}
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

const Comparison = ({ hashes }) => (
  <div>
    <h2 id="comparison">Comparison with other implementations</h2>

    <ul>
      <li>Only implementations published on npm were considered, and I didn't have time to go through all of them.</li>
      <li>All inputs are received as strings, then converted to the format expected by each implementation.</li>
      <li>The output representation was chosen to match murmurhash3js. Each section describes its format.</li>
      <li>The C++ reference implementation is runing in the browser through WebAssembly - check the console! (<a href={links['smhasherWasm']} target="_blank">project</a>)</li>
      <li>If you'd like me to include another implementation in the test, <a href={links['issues']} target="_blank">I'm happy to do it</a>.</li>
    </ul>

    <h3>x86  32bit</h3>
    <p>The output is represented as a 32 bit unsigned integer.</p>
    <Table hashes={hashes} variant="x86  32bit" inputs={shortTests} />
    {/* the long tests cases are not used in the first table for aesthetic reasons */}

    <h3>x86 128bit</h3>
    <p>The output is a hex string: the little endian representation of four 32 bit unsigned integers.</p>
    <CodeSnippet source={cPrintx86Sample} language="clike" />
    <Table hashes={hashes} variant="x86 128bit" inputs={allTests} />

    <h3>x64 128bit</h3>
    <p>The output is a hex string: the little endian representation of two 64 bit unsigned integers.</p>
    <CodeSnippet source={cPrintx64Sample} language="clike" />
    <Table hashes={hashes} variant="x64 128bit" inputs={allTests} />
  </div>
);

export default Comparison;
