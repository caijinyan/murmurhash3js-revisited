import React, { Component } from 'react';
import 'hack';
import logo from './logo.svg';

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

// order of the names must be consistent
// name, variant => hashes[name][variant]
// variant, name => hashes[variant][name]
const Table = ({ hashes, variant, inputs }) => {
  return (
    <table>
      <Heading hashes={hashes} variant={variant} />
      <tbody>
        {inputs.map(input => <Result key={input} hashes={hashes} variant={variant} input={input} />)}
      </tbody>
    </table>
  );
};

const shortTests = [
  "My hovercraft is full of eels.",
  "My 🚀 is full of 🦎.",
  "吉 星 高 照",
  "🌈 utf-8"
];

const allTests = [
  "I will not buy this record, it is scratched.",
  "I will not buy this tobaconnists, it is scratched.",
].concat(shortTests);

class App extends Component {
  render() {
    const { hashes } = this.props;
    return (
      <div className="container">
        <p>Only implementations published on npm were tested.</p>
        <p>The output was made to match murmurhash3js.</p>
        <p>The C++ reference implementation is run in the browser through WebAssembly
        (<a href=''>see how it was compiled</a>).</p>
        <Table hashes={hashes} variant="x86  32bit" inputs={shortTests} />
        {/* the long tests cases are not used in the first table for aesthetic reasons */}
        <Table hashes={hashes} variant="x86 128bit" inputs={allTests} />
        <Table hashes={hashes} variant="x64 128bit" inputs={allTests} />
      </div>
    );
  }
}

export default App;
