import React, { Component } from 'react';
import 'hack';
import logo from './logo.svg';

class App extends Component {
  render() {
    return (
      <div className="container">
      <table>
        <thead>
        <tr>
        <th>editor</th>
        <th>speed</th>
        <th>extension</th>
        <th>interface</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td>sublime</td>
        <td>90</td>
        <td>80</td>
        <td>70</td>
        </tr>
        <tr>
        <td>atom</td>
        <td>60</td>
        <td>85</td>
        <td>80</td>
        </tr>
        <tr>
        <td>vscode</td>
        <td>80</td>
        <td>65</td>
        <td>60</td>
        </tr>
        </tbody>
      </table>
        <p>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
