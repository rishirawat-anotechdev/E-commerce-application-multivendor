import React from 'react';
import {  Route, Routes,  } from 'react-router-dom';
import LayoutPage from './common/layout/LayoutPage';
import { routeDefinitions } from './routes/RouteDefinations';


const App = () => {
  return (
    <Routes>
      {
        routeDefinitions.map(({path, element}, index) => (
          <Route key={index}  path={path} element={<LayoutPage>{element}</LayoutPage>} />
        ))
      }
    </Routes>
  );
}

export default App;
