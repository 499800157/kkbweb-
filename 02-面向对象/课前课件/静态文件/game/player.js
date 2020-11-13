import Yase from './heroes/yase.js';
import Luban from './heroes/luban.js';



class Player{
    constructor(name){
        this.name = name
        this.heros = [new Yase,new Luban]
        // this.skins = {
        //     info: new
        // }
    }

}

export default Player