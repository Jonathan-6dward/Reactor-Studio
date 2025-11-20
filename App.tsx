import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Create from './pages/Create';
import Processing from './pages/Processing';
import Result from './pages/Result';
import BatchDownload from './pages/BatchDownload';
import BatchStatus from './pages/BatchStatus';
import BatchHistory from './pages/BatchHistory';
import Preview from './pages/Preview';
import ChooseAvatar from './pages/ChooseAvatar';
import Customize from './pages/Customize';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Funnel */}
        <Route path="/" element={<Landing />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/choose-avatar" element={<ChooseAvatar />} />
        <Route path="/customize" element={<Customize />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<Create />} /> {/* Legacy/Power User route */}
        <Route path="/processing/:id" element={<Processing />} />
        <Route path="/result/:id" element={<Result />} />
        
        {/* Batch Download Routes */}
        <Route path="/batch-download" element={<BatchDownload />} />
        <Route path="/batch-download/history" element={<BatchHistory />} />
        <Route path="/batch-download/:id" element={<BatchStatus />} />
      </Routes>
    </Router>
  );
};

export default App;
