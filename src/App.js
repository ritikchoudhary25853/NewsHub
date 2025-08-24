 import './App.css';
import React, {useState}from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import About from './components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const [progress, setProgress]= useState(0);
 
    return (
      <Router>
        <NavBar />
        <LoadingBar
          color="#f11946"
          progress={progress}
        />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} pagesize={5} key="general" category="general" />} />
          <Route exact path="/general" element={<News setProgress={setProgress} pagesize={5} key="general" category="general" />} />
          <Route exact path="/nation" element={<News setProgress={setProgress} pagesize={5} key="nation" category="nation" />} />
          <Route exact path="/world" element={<News setProgress={setProgress} pagesize={5} key="world" category="world" />} />
          <Route exact path="/business" element={<News setProgress={setProgress} pagesize={5} key="business" category="business" />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} pagesize={5} key="technology" category="technology" />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} pagesize={5} key="entertainment" category="entertainment" />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} pagesize={5} key="sports" category="sports" />} />
          <Route exact path="/science" element={<News setProgress={setProgress} pagesize={5} key="science" category="science" />} />
          <Route exact path="/health" element={<News setProgress={setProgress} pagesize={5} key="health" category="health" />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </Router>
    );
  
}

export default App;
