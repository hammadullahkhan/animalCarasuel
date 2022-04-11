import './App.css';
import Carasuel from './components/Carasuel/Carasuel';
import { getAuthToken } from './services/dataService';

function App() {

  
  const getToken = async () => {
    const authTokenResp = await getAuthToken();
    setSessionToken(authTokenResp.data)
  };

  const setSessionToken = (token) => {
    sessionStorage.setItem('authToken',`Bearer ${token}`);
  };

  getToken();

  return (
    <div className="App">
      <Carasuel></Carasuel>
    </div>
  );
}

export default App;
