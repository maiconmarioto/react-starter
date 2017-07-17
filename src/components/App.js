import React, { Component } from 'react'

// Importing it like this is possible, but not conducive to tree shaking.
// Brings in errthing
// import { Link, Match, HashRouter } from 'react-router'

import { Link, Route, HashRouter } from 'react-router-dom'
import './App.css'

// Webpack understands to make a new "chunk" when it sees `import` used
// It will rewire './Foo' to the filename of the respective "chunk"



const App = () =>

    <div id="App">
      <div id="links">
        <Link to="/foo">Foo</Link>
        <Link to="/bar">Bar</Link>
        <Link to="/">Home</Link>
      </div>
    </div>

export default App
