import React from 'react';
import { BrowserRouter as Router, Routes,  } from 'react-router-dom';
import LayoutPage from './common/layout/LayoutPage';


const App = () => {
  return (
    <Router>
      <LayoutPage>
        <Routes>
     
        </Routes>
      </LayoutPage>
    </Router>
  );
}

export default App;
