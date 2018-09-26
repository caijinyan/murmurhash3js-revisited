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

const ResetButton = ({ onClick, disabled }) => {
  const text = "Reset to original test cases";
  const className = disabled ? "disabled" : "";
  return <p><a onClick={onClick} className={className}>{text}</a></p>;
  console.log(disabled);
  if (disabled) {
    return (
      <button
        className="btn btn-default btn-ghost"
        onClick={onClick}
        disabled
        >{text}</button>
    );
  } else {
    return (
      <button
        className="btn btn-error btn-ghost"
        onClick={onClick}
        >{text}</button>
    );
  }
}

// order of the names must be consistent
// name, variant => hashes[name][variant]
// variant, name => hashes[variant][name]
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

class App extends Component {
  render() {
    const { hashes } = this.props;
    return (
      <div className="container">
        <p>Only implementations published on npm were tested.</p>
        <p>The output representation was chosen to match murmurhash3js.</p>
        <p>The C++ reference implementation is run in the browser through WebAssembly
        (<a href=''>see how it was compiled</a>).</p>

        <h3>x86  32bit</h3>
        <p>The output is represented as a 32 bit unsigned integer</p>
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
