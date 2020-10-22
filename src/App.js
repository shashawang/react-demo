import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import BasicConcepts from './pages/basicConcepts';
import Hooks from './pages/hooks';
import MoreInfo from './pages/moreInfo';
import Api from './pages/api';
import './App.css';
// import Remarkable from 'remarkable'

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
  }

  render() {
    return (
      <div>

        {/* <MarkdownEditor />, */}

        <HelloWorld text={this.state.text} />
      </div>
    );
  }

}
// 3
class HelloWorld extends React.Component {
  render() {
    return (
      <div>
        {/* <BasicConcepts /> */}
        <Hooks />
        <MoreInfo />
        <Api />
      </div>
    );

    
  }
}
export default App;
