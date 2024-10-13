import './App.css';
import Dashboard from './components/Dashboard';

import { PrimeReactProvider } from 'primereact/api';
import Header from './components/Header';

function App() {

  return (
    <PrimeReactProvider>
      <Header/>
      <Dashboard/>
    </PrimeReactProvider>
  );
}

export default App;