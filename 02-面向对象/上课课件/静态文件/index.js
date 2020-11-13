// 分析对象 （根据需求）；  --》对象特性；--》抽象（特性问题--》共性问题）--》类（复用性） ---》抽离基类（父类、继承）--》组织逻辑关系

// 玩家（英雄）（Player） --》（亚瑟、鲁班。。。）--》英雄（Hero）（基类）（图像、皮肤、名称、技能）--》管理类（Game） --》实例（game）；

// 和视图有关；
import Game from './game/game.js';
let game = new Game();
// game.login("张三");
// console.log(game);

document.querySelector(".sub").onclick = function(){
    
    let username = document.querySelector(".username").value;
    game.login(username);
    document.querySelector(".chioseusername").innerHTML = username
    document.querySelector(".login").style.display = "none";
    document.querySelector(".game").style.display = "block";
    renderHeroes(game.player.heroes);
}
function renderHeroes(heroes){
    document.querySelector(".heroView").innerHTML = "";
    heroes.forEach(hero=>{
      let heroEle =   document.createElement("div");
      heroEle.classList.add("heroItem");
      heroEle.innerHTML = `<img src="${hero.ico}" />
      <span>${hero.name}</span>`;
      document.querySelector(".heroView").appendChild(heroEle);
      heroEle.onclick = function(){
        //   渲染技能
        renderSkills(hero.skills);
        document.querySelector(".heroShow").innerHTML = `<img src="${hero.ico}" />`
      }
    })
}

function renderSkills(skills){
    document.querySelector(".skillsView").innerHTML = "";
    skills.forEach(skill=>{
        let img = document.createElement("img");
        img.src = skill.ico;
        document.querySelector(".skillsView").appendChild(img);
    })
}

// 作业 模仿亚瑟： 扩展鲁班类； 属性  技能； 

// 暗号：中国