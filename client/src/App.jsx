import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from 'react-router-dom';

function App() {
  useEffect(()=>{
    document.title="Welcome to USSR!"
  })

  return (
  <><Link to="/login">Admin Login</Link></>
  );
}

export default App
