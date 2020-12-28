import { Application } from "pixi.js"

export const game = new Application({
    width: 600,
    height: 800
})

document.body.appendChild(game.view)

export function getRootComponent() {
    return game.stage
}
