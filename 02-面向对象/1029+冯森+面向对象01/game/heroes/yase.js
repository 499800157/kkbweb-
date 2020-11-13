import S1 from '../skills/yase/s1.js';
import S2 from '../skills/yase/s2.js';
import S3 from '../skills/yase/s3.js';

export default class Yase{
    constructor(){
        this.name = "亚瑟";
        this.ico = "./sources/heros/yase1.png";
        this.skills = [new S1(),new S2(),new S3()];
        this.selectSkin = "./sources/skins/301660.png"
    }
}


// 多个玩家 ---》多个亚瑟（有鲁班没有的特性）  多个鲁班（有其他英雄没有的特性） ---》hero （所有英雄的共性）;