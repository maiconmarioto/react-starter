import React, { Component } from 'react'

// Importing it like this is possible, but not conducive to tree shaking.
// Brings in errthing
// import { Link, Match, HashRouter } from 'react-router'

import { Link, Route, HashRouter } from 'react-router-dom'

// Webpack understands to make a new "chunk" when it sees `import` used
// It will rewire './Foo' to the filename of the respective "chunk"



const App = () =>

    <div id="App">
      <div id="links">
        <br />
        <Link to="/foo">Foo</Link>
        <br />
        <Link to="/bar">Bar</Link>
        <br />
        <Link to="/">Home</Link>
      </div>
    </div>

export default App
