import { Link } from "react-router-dom";
function Nav() {
    return (
        <header className="header">
            <div className="wrap">
                <h1 id="logo">KaiKeBa</h1>
                <nav className="nav">
                    <Link to="index.html">首页</Link>
                    <Link to="about.html">关于我们</Link>
                    <Link to="joinUS.html">加入我们</Link>
                </nav>
            </div>
        </header>
    )
}

export default Nav