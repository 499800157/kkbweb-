import S1 from '../skills/luban/s1.js';
import S2 from '../skills/luban/s2.js';
import S3 from '../skills/luban/s3.js';

import Skin1 from '../skins/luban/skin1.js'
import Skin2 from '../skins/luban/skin2.js'
import Skin3 from '../skins/luban/skin3.js'

import Hero from './hero.js';

export default class Luban extends Hero{
    constructor(){
        let opts = {
            name:"鲁班",
            ico:"./sources/heros/luban1.png",
            skills:[new S1(),new S2(),new S3()],
            skins:[new Skin1,new Skin2,new Skin3]
        }
        super(opts);
        // this.name = "鲁班";
        // this.ico = "./sources/heros/luban1.png";
        // this.skills = [new S1(),new S2(),new S3()];
        // this.skins = [new Skin1,new Skin2,new Skin3];
    }
}


// 多个玩家 ---》多个亚瑟（有鲁班没有的特性）  多个鲁班（有其他英雄没有的特性） ---》hero （所有英雄的共性）;


// 1.皮肤功能  2.抽象类的共性 （基类）;