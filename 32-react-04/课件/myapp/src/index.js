import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";
/*
  路由模式的配置:
    BrowserRouter -- history
    HashRouter -- hash
*/
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
