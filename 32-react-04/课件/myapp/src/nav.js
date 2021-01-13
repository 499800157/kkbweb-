import { Link } from "react-router-dom";
// 应用内跳转使用 Link 组件，to 属性跳转地址
// 外链跳转还是使用 a 标签
function Nav() {
  return <nav>
      <Link to="/">首页</Link>
      <span> | </span>
      <Link to="/about">关于</Link>
      <span> | </span>
      <Link to="/about/details">关于-详情</Link>
      <span> | </span>
      <a href="https://www.baidu.com" target="_blank">百度</a>
  </nav>
}

export {Nav};