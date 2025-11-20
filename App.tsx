import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Create from './pages/Create';
import Processing from './pages/Processing';
import Result from './pages/Result';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<Create />} />
        <Route path="/processing/:id" element={<Processing />} />
        <Route path="/result/:id" element={<Result />} />
      </Routes>
    </Router>
  );
};

export default App;