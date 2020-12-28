import { createRenderer } from "vue"
import { Container, Sprite, Texture, Text } from "pixi.js"
const renderer = createRenderer({
    createElement(type) {
        let element;
        switch (type) {
            case "container":
                element = new Container();
                break;
            case "sprite":
                element = new Sprite();
                break;
            default:
                break;
        }
        return element;
    },
    insert(el, parent) {
        if (el) {
            parent.addChild(el)
        }
    },
    patchProp(el, key, prevValue, nextValue) {
        switch (key) {
            case "texture":
                el.texture = Texture.from(nextValue);
                break;
            case "onClick":
                el.on("pointertap", nextValue);
                break;
            default:
                el[key] = nextValue;
                break;
        }
    },
    parentNode(el) {
        return el.parent;
    },
    remove(el) {
        if (el && el.parent) {
            // removeChild(el)
            el.parent.removeChild(el);
        }
    },
    createText(text) {
        return new Text(text);
    },
    nextSibling() { },
    createComment() { },
})

export function createApp(rootComponent) {
    return renderer.createApp(rootComponent)
}