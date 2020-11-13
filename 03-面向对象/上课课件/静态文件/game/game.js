// game =  {login:function(){},palyer:{heroes:[yase:{name:'',ico:'',skills:[技能一,技能二...]},luban...]}}
import Player from './player.js';
class Game{
    constructor(){
        this.player = null;
    }
    login(name){
        this.player = new Player(name);
    }
}

function getSingle(fn){
    let instance;
    return function(...args){
        if(!instance){
            instance = new fn(...args);
        }
        return instance;
    }
}

export default getSingle(Game)