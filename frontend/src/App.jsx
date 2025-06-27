import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

import { AppBar, Tabs, Tab, Container } from '@mui/material';
import LoggerPanel from '../components/LoggerPanel.jsx';

import Shortener from '../pages/Shortener.jsx';
import Statistics from '../pages/Statistics.jsx';
import Redirect from '../pages/Redirect.jsx';
import ErrorPage from '../pages/ErrorPage.jsx';

function App() {
  const location = useLocation();
  const [tabIndex, setTabIndex] = React.useState(0);

  React.useEffect(() => {
    if (location.pathname.startsWith('/stats')) setTabIndex(1);
    else setTabIndex(0);
  }, [location.pathname]);

  return (
    <>
      <AppBar position="static">
        <Tabs
          value={tabIndex}
          onChange={(e, newVal) => {
            setTabIndex(newVal);
            if (newVal === 0) window.location.href = '/';
            else if (newVal === 1) window.location.href = '/stats';
          }}
        >
          <Tab label="Shortener" />
          <Tab label="Statistics" />
        </Tabs>
      </AppBar>

      <Container sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={<Shortener />} />
          <Route path="/stats" element={<Statistics />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/:shortcode" element={<Redirect />} />
          <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
      </Container>

      <LoggerPanel />
    </>
  );
}

export function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
