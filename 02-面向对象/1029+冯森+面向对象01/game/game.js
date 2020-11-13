// game =  {login:function(){},palyer:{heroes:[yase:{name:'',ico:'',skills:[技能一,技能二...]},luban...]}}
import Player from './player.js';
export default class Game{
    constructor(){
        this.player = null;
    }
    login(name){
        this.player = new Player(name);
    }
}