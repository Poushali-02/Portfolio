import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Projects from './Components/Projects';
import Contact from './Components/Contacts';

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <main>  {/* Add padding to prevent content from hiding under navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;