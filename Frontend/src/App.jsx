import React from "react"
import {Routes, Route} from "react-router-dom"
import Login from "./Pages/Login/Login.jsx"
import Home from "./Pages/Home/Home.jsx"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
