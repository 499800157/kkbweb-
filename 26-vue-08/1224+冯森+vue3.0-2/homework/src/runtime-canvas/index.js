import { createRenderer } from "vue";
import { Graphics } from "pixi.js";
export const renderer = createRenderer({

    createElement(type){
        let element;
        switch (type) {
            case "rect":
                element = new Graphics();
                element.beginFill(0xff0000);
                element.drawRect(0, 0, 500, 500);
                element.endFill();
                break;
            case "circle":
                element = new Graphics();
                element.beginFill(0xffff00);
                element.drawCircle(25, 50, 50);
                element.endFill();
                break;
        }

        return element;
    },
    parentNode(node) {
      // 获取当前 node 的父级节点
      // parent
      console.log(node)
      return node.parent;
    },
    patchProp(el, key, prevValue, nextValue) {
        switch (key) {
          case "x":
            el.x = nextValue;
            break;
          case "y":
            el.y = nextValue;
    
            break;
          
    
          default:
            break;
        }
      },
    insert(el, parent) {
        parent.addChild(el);
    },
})

export function createApp(rootComponent) {
    return renderer.createApp(rootComponent);
}