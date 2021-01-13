import { Route } from "react-router-dom";
import {Nav as NewNav} from "./nav";
import IndexPage from "./view";
import AboutPage from "./view/about";
import AboutDetailsPage from "./view/aboutdetails";
/*
  Route 路由组件
    path 要匹配的路径
      - path 默认的匹配规则是模糊匹配: 及当前URL 以 path 开始则匹配
      - exact 精确匹配： URL === path， URL === path/
      - strict 严格匹配: URL === path。!!！ 严格匹配必须基于精确匹配，也就是说 设置  strict 时，必须也设置了 exact
    component 路径匹配成功之后，要显示的视图
*/
function App() {
  return <div>
      <NewNav />
      <Route path="/" exact component={IndexPage} />
      <Route path="/about" exact strict component={AboutPage} />
      <Route path="/about/details" exact strict component={AboutDetailsPage} />
  </div>;
}

export default App;
