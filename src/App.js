import { Route, Routes } from 'react-router-dom';
import AppRoutes from './Routes';
import Layout  from './components/Layout';
import './assets/css/custom.css';

function App() {
  return (
    <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
      </Layout>
  );
}

export default App;
