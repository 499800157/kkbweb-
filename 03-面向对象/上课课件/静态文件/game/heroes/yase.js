import S1 from '../skills/yase/s1.js';
import S2 from '../skills/yase/s2.js';
import S3 from '../skills/yase/s3.js';

import Skin1 from '../skins/yase/skin1.js'
import Skin2 from '../skins/yase/skin2.js'
import Skin3 from '../skins/yase/skin3.js'

import Hero from './hero.js';

export default class Yase extends Hero{
    constructor(){
        let opts = {
            name:"亚瑟1",
            ico:"./sources/heros/yase1.png",
            skills:[new S1(),new S2(),new S3()],
            skins:[new Skin1,new Skin2,new Skin3]
        }
        super(opts);
        // this.name = "亚瑟1";
        // this.ico = "./sources/heros/yase1.png";
        // this.skills = [new S1(),new S2(),new S3()];
        // this.skins = [new Skin1,new Skin2,new Skin3];
    }
   
}


// 多个玩家 ---》多个亚瑟（有鲁班没有的特性）  多个鲁班（有其他英雄没有的特性） ---》hero （所有英雄的共性）;