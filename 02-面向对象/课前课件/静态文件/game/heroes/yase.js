import S1 from '../skills/yase/s1.js';
import S2 from '../skills/yase/s2.js';
import S3 from '../skills/yase/s3.js';

import P1 from "../skins/yase/p1.js"
import P2 from "../skins/yase/p2.js"
import P3 from "../skins/yase/p3.js"

export default class Yase{
    constructor(){
        this.name = "亚瑟";
        this.ico = "./sources/heros/yase1.png";
        this.skills = [new S1(),new S2(),new S3()];
        this.skins = [new P1,new P2 ,new P3]
    }
}

