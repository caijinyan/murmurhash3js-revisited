import React, { Component } from 'react';
import 'hack';

import About from "./About";
import Performance from "./Performance";
import Comparison from "./Comparison";
import links from "./links";

const Button = ({ children, active, onClick }) => (
  <button
    className={`btn btn-default${active ? '': ' btn-ghost'}`}
    onClick={onClick}
    >{children}</button>
)

const tabs = {
  '#about': () => <About />,
  '#performance': () => <Performance />,
  '#comparison': hashes => <Comparison hashes={hashes} />
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { active: "#about" };
  }

  setActive(tabId) {
    this.setState({ active: tabId });
  }

  render() {
    const { hashes } = this.props;
    const { active } = this.state;
    return (
      <div className="container">
        <h1>MurmurHash3 revisited in JavaScript</h1>
        <div className="grid" style={{ textAlign: "center" }}>
          <div className="cell -4of12">
            <Button
              active={"#about" === active}
              onClick={() => this.setActive("#about")}
              >About</Button>
          </div>
          <div className="cell -4of12">
            <Button
              active={"#performance" === active}
              onClick={() => this.setActive("#performance")}
              >Performance</Button>
          </div>
          <div className="cell -4of12">
            <Button
              active={"#comparison" === active}
              onClick={() => this.setActive("#comparison")}
              >Comparison</Button>
          </div>
        </div>
        <br />
        {tabs[active](hashes)}

        <div style={{ textAlign: "center" }}>
          <hr />
          <p>If you're curious how this page was created, check out <a href={links['docs']}
            _target="_blank">the <code>docs</code> branch in the GitHub repo.</a></p>
          <p>Made with <span role="img" aria-label="love">❤️</span> in London</p>
        </div>
      </div>
    );
  }
}

export default App;
