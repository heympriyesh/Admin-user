import React, { useState, useEffect } from 'react'
import './App.css';
import Routes from './components/Routes';
function App() {
  const [out, setOut] = useState()

  const [inn, setinn] = useState()
  useEffect(() => {
    var tok = sessionStorage.getItem('auth-token')
    console.log('token', tok)
    if (!tok) {
      setOut(true)
    }
    else { setOut(false) }

  }, [inn])



  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
