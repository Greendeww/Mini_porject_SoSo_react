import { Provider } from 'react-redux';
import './App.css';
import Router from './shared/Router';
import store from "./redux/configStore";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
<Provider store={store}>
      <BrowserRouter>
          <Router/>
      </BrowserRouter>
  </Provider>
  );
}

export default App;
