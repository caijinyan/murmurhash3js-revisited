import React, { Component } from 'react';

import Prism from 'prismjs';
import "../prism.css";

import introSample from "./intro";
import utf8Sample from './utf8-bytes';
import usageSample from './usage';
import cPrintx86Sample from './x86Output';
import cPrintx64Sample from './x64Output';

export class CodeSnippet extends Component {
  constructor(props) {
    super(props);

    this.containerRef = React.createRef();
  }
  componentDidMount() {
    Prism.highlightAllUnder(this.containerRef.current);
  }

  render() {
    const { source, language } = this.props;
    return (
      <pre ref={this.containerRef}>
        <code className={"language-" + language}>{source}</code>
      </pre>
    );
  }
}
export { introSample };
export { utf8Sample };
export { usageSample };
export { cPrintx86Sample };
export { cPrintx64Sample };
