// 1.先分析有几个对象
// 玩家 游戏 英雄 技能 皮肤

// 2.对象有什么功能
// 玩家：名字 有什么英雄 有哪几个皮肤
// 游戏：登录 谁在玩
// 英雄：名字 技能 皮肤
// 皮肤：名字

// 3. 对象之间有什么关系
// 玩家要登录游戏，玩家的英雄池，玩家的皮肤池
// 英雄有名字，技能，皮肤

import Game from "./game/game.js";

let game = new Game();
// 登录按钮
let loginBtn = document.querySelector(".sub");
// 英雄池盒子
let heroViewBox = document.querySelector(".heroView");
// 皮肤池盒子
let skinViewBox = document.querySelector(".skinView");
// 技能视图盒子
let skillsView = document.querySelector(".skillsView")
// 查看英雄列表按钮
let heroBtn = document.querySelector(".heroBtn")
// 查看皮肤列表按钮
let skinBtn = document.querySelector(".skinBtn")
// 展示当前皮肤
let skinShow = document.querySelector(".skinShow");

loginBtn.addEventListener("click", function () {
    let username = document.querySelector(".username");
    if (username.value === "") {
        alert("请输入用户名！");
        username.focus();
        return;
    }
    game.login("sfeng");
    // 页面切换
    let loginPage = document.querySelector(".login");
    loginPage.style.display = "none";
    let gamePage = document.querySelector(".game");
    gamePage.style.display = "block";

    render(game.player.heros);
});

// 视图渲染
function render(heroesData) {
    // 玩家英雄池数据 heroesData
    // 英雄池列表
    heroViewBox.innerHTML = "";
    
    heroesData.forEach((item, key) => {
        console.log(item);
        let divEle = document.createElement("div");
        divEle.classList.add("heroItem");
        divEle.dataset.id = key;
        divEle.innerHTML = `
            <img src="${item.ico}" />
            <span>${item.name}</span>
        `;
        heroViewBox.appendChild(divEle);

        
    });
    


    // 绑定事件
    bindEvent(heroesData);

    // 渲染用户名
    let chioseusername = document.querySelector(".userView .chioseusername");
    chioseusername.innerHTML = game.player.name;
}

// 绑定事件函数
function bindEvent(heroesData) {
    
    // 选择英雄事件
    heroViewBox.addEventListener("click", (e) => {
        let node = null;
        if (e.target.className === "heroItem") {
            node = e.target;
        } else {
            if(e.target.parentNode.className === "heroItem"){
                node = e.target.parentNode;
            }
        }

        
        if (node) {
            [...node.parentNode.children].forEach((item)=>{
                item.classList.remove("active")
            })
            node.classList.add("active")

            // 展示英雄或皮肤事件
            heroBtn.addEventListener("click",()=>{
                document.querySelector(".heroContainer").style.display = "block"
                document.querySelector(".skinContainer").style.display = "none"
                heroBtn.style.color = "red"
                skinBtn.style.color = ""
            })
            skinBtn.addEventListener("click",()=>{
                document.querySelector(".heroContainer").style.display = "none"
                document.querySelector(".skinContainer").style.display = "block"
                skinBtn.style.color = "red"
                heroBtn.style.color = ""
            })
            
            let key = node.dataset.id;
            let itemData = heroesData[key];
            console.log(itemData)
            // 展示选择的英雄头像及皮肤
            let heroShow = document.querySelector(".userView .heroShow");
            heroShow.innerHTML = `<img src = "${itemData.ico}"/>`;
            // 皮肤渲染
            showSkin(itemData.skins[0].ico)
            // 渲染技能
            renderSkills(itemData.skills)
            // 渲染皮肤
            renderSkins(itemData.skins)
        }
    });
}

// 技能渲染
function renderSkills(skillsData){
    skillsView.innerHTML = ""
    skillsData.forEach((item)=>{
        let imgItem = document.createElement("img")
        imgItem.src = item.ico
        imgItem.title = item.name
        imgItem.alt = item.name
        skillsView.appendChild(imgItem)
    })
}

// 皮肤列表渲染
function renderSkins(skins){
    console.log(skins)
    // 皮肤池列表
    skinViewBox.innerHTML = ""

    skins.forEach((skin)=>{
        let skinEle = document.createElement("div");
        skinEle.classList.add("skinItem");
        skinEle.innerHTML = `
            <img src="${skin.ico}" />
            <span>${skin.name}</span>
        `;
        // 不是数据驱动了
        skinEle.onclick = function(){
            [...this.parentNode.children].forEach((item)=>{
                item.classList.remove("active")
            })
            this.classList.add("active")
            showSkin(skin.ico)

        }
        skinViewBox.appendChild(skinEle);
    })

}
// 皮肤展示
function showSkin (item){
    skinShow.innerHTML = `<img src = "${item}"/>`;
}
