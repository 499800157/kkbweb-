import Player from "./player.js"
class Game {
    constructor(){
        this.player = null
    }

    login(name){
        this.player = new Player(name)
    }

}

export default Game