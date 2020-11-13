// 所有英雄的共性特征；
export default class Hero{
    constructor({name,ico,skills,skins}){
        this.name = name;
        this.ico = ico;
        this.skills = skills;
        this.skins = skins;
    }
    release(){
        console.log("释放技能");
    }
}