import S1 from "../skills/luban/s1.js"
import S2 from "../skills/luban/s2.js"
import S3 from "../skills/luban/s3.js"

class Luban{
    constructor(){
        this.name = "鲁班"
        this.skills = [new S1(),new S2(),new S3() ]
        this.ico = "./sources/heros/luban1.png"
        this.selectSkin = "./sources/skins/301120.png"
    }
}


export default Luban
