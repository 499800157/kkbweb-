// 分析对象 （根据需求）；  --》对象特性；--》抽象（特性问题--》共性问题）--》类（复用性） ---》抽离基类（父类、继承）--》组织逻辑关系

// 玩家（英雄）（Player） --》（亚瑟、鲁班。。。）--》英雄（Hero）（基类）（图像、皮肤、名称、技能）--》管理类（Game） --》实例（game）；

// 和视图有关；
import Game from './game/game.js';
let game = new Game();
// let game2 = new Game();
// console.log(game===game2);
// game.login("张三");
// console.log(game);

Function.prototype.Decorator = function(fn,num){
  // console.log(this);
  this();
  fn(num);
}
function hurt(num){
  console.log("造成"+num+"伤害");
}

document.querySelector(".sub").onclick = function () {

  let username = document.querySelector(".username").value;
  game.login(username);
  document.querySelector(".chioseusername").innerHTML = username
  document.querySelector(".login").style.display = "none";
  document.querySelector(".game").style.display = "block";
  renderHeroes(game.player.heroes);

  console.log(game);
}
function renderHeroes(heroes) {
  document.querySelector(".heroView").innerHTML = "";
  heroes.forEach(hero => {
    let heroEle = document.createElement("div");
    heroEle.classList.add("heroItem");
    heroEle.innerHTML = `<img src="${hero.ico}" />
      <span>${hero.name}</span>`;
    document.querySelector(".heroView").appendChild(heroEle);

    heroEle.onclick = function () {
      //   渲染技能
      renderSkills(hero.skills);
      renderSkins(hero.skins);
      document.querySelector(".heroShow").innerHTML = `<img src="${hero.ico}" />`;
      // hero.release();
      hero.release.Decorator(hurt,100);
    }
  })
}

function renderSkills(skills) {
  document.querySelector(".skillsView").innerHTML = "";
  skills.forEach(skill => {
    let img = document.createElement("img");
    img.src = skill.ico;
    document.querySelector(".skillsView").appendChild(img);
  })
}


function renderSkins(skins) {
  document.querySelector(".skinView").innerHTML = "";
  skins.forEach(skin => {
    let skinEle = document.createElement("div");
    skinEle.innerHTML = `<div class="skinItem">
      <img src="${skin.ico}" />
      <span>${skin.name}</span>
  </div>`;
    document.querySelector(".skinView").appendChild(skinEle);
    skinEle.onclick = function () {
      document.querySelector(".skinShow").innerHTML = `<img src="${skin.img}" />`;
    }
  })

}

// 作业 模仿亚瑟： 扩展鲁班类； 属性  技能； 

// 暗号：中国

// 切换皮肤
document.querySelector(".skinBtn").onclick = function () {
  document.querySelector(".heroContainer").style.display = "none";
  document.querySelector(".skinContainer").style.display = "block";
}

document.querySelector(".heroBtn").onclick = function () {
  document.querySelector(".heroContainer").style.display = "block";
  document.querySelector(".skinContainer").style.display = "none";
}