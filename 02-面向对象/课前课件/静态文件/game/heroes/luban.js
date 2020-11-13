import S1 from "../skills/luban/s1.js"
import S2 from "../skills/luban/s2.js"
import S3 from "../skills/luban/s3.js"


import P1 from "../skins/luban/p1.js"
import P2 from "../skins/luban/p2.js"
import P3 from "../skins/luban/p3.js"

export default class Luban{
    constructor(){
        this.name = "鲁班",
        this.ico = "./sources/heros/luban1.png",
        this.skills = [new S1,new S2, new S3],
        this.skins = [new P1,new P2,new P3]
    }
}