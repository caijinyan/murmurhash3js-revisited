import React, { Component } from 'react';
import 'hack';
import logo from './logo.svg';

const notImplemented = () => "N/A";

const Result = ({ variant, input, hashes }) => {
  const hashFns = Object.keys(hashes).map(name => hashes[name][variant] || notImplemented);
  const outputs = hashFns.map(hashFn => hashFn(input));
  const correct = output => (output + "") === (outputs[0] + "");
  const format = output => output.length === 32 ? <span>{output.slice(0, 16)}<wbr />{output.slice(16)}</span> : output;
  return (
    <tr>
      <td className="input">{input}</td>
      {outputs.map((output, idx) =>
        (<td key={idx} className={correct(output) ? 'success' : 'failure'}>{format(output)}</td>))}
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
        {inputs.map(input => <Result hashes={hashes} variant={variant} input={input} />)}
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
        <Table hashes={hashes} variant="x86  32bit" inputs={shortTests} />
        {/* the long tests cases are not used in the first table for aesthetic reasons */}
        <Table hashes={hashes} variant="x86 128bit" inputs={allTests} />
        <Table hashes={hashes} variant="x64 128bit" inputs={allTests} />
        <p>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
