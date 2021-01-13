/*
  图片引入：
  1. http 的绝对路径
  2. base64
  3. 当做模块引入
*/
import img from "../img.jpg"
function AboutDetailsPage() {
  return <div>
      <h1>关于 - 详情</h1>
      <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1588620919,359805583&fm=26&gp=0.jpg" />
      <img src={img} />
      <img src={require("../img.jpg").default} />
  </div>
}

export default AboutDetailsPage;