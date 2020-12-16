#### 使用v-model修改：

通过props传入的值不能在组件中直接修改，需要通过$emit告诉父组件，父组件再修改，这样比较麻烦，所以可以使用v-model思想。

默认规定发起的事件只能是input事件，值只能是value，但是可以修改(上节课有讲)，这里我们就使用默认的吧，可以自己修改的哈。

案例中需要点击complete按钮让item默认的"active"状态变成"complete",那我们就可以使用v-model来绑定：

TodoList.vue中修改为：

```vue
<todo-item
	v-for="(item, index) in todoList"
	:key="index"
	:item="item"
	@remove="removeTodo"
	v-model="item.state"   
>
</todo-item>
```

这里用v-model="item.state"代替了原来的@*complete*="completeTodo"，因为我们要通过v-mdoel绑定，就不需要使用这个事件来控制了，把它删掉，那么completeTodo这个方法我们也就用不着了，可以注释/删掉。

接下来，在TodoItem.vue中修改：

1. 将原来的`props: ["item"]`修改为`props: ["item","value"]`，

2. 将原来的:

   ```js
   complete() {
   	this.$emit("complete", this.item.id, "completed");
   }
   ```

   修改为：

   ```js
   complete() {
   	this.$emit("input", "completed");
   }
   ```

这样就修改完成了

#### 也可以使用sync修改：

TodoList.vue中修改为：

```vue
<todo-item
	v-for="(item, index) in todoList"
	:key="index"
	:item="item"
	@remove="removeTodo"
	:complete.sync="item.state"
>
</todo-item>
```

这个方法就比较简单了，再修改一下TodoItem.vue：

将`this.$emit("complete", this.item.id, "completed")`

修改为：`complete() {this.$emit("update:complete", "completed");}`

即可。



然后大家可以再去看一下第二节课的回放，结合着看。