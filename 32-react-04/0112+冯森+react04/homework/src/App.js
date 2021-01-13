import { Route, Redirect } from "react-router-dom"
import "./css/index.css"
import IndexPage from "./views/index"
import AboutPage from "./views/about"
import JoinUsPage from "./views/joinUs"
import Nav from "./components/Nav"
function App() {
  return (
    <div className="App">
      <Route component={Nav}></Route>
      <Route path="/index.html" exact component={IndexPage}></Route>
      <Route path="/about.html" exact component={AboutPage}></Route>
      <Route path="/joinUS.html" exact component={JoinUsPage}></Route>
      <Redirect path="/" to="/index.html"></Redirect>
    </div>
  );
}

export default App;
