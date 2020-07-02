<template>
  <div class="contentBox">
    <div class="changeRoute">
      <a href="#" @click="(showTodo = true), (showDone = true)">All</a>
      <a href="#" @click="(showTodo = true), (showDone = false)">Todo</a>
      <a href="#" @click="(showTodo = false), (showDone = true)">Done</a>
    </div>
    <div class="todo-box" v-show="showTodo">
      <p class="todo-title">Todo</p>
      <ul id="todoUl">
        <transition-group appear>
          <li
            v-for="(item, index) in todoList"
            :key="item.id"
            @click="del(index)"
          >
            {{ index + 1 }} . {{ item.text }}
          </li>
        </transition-group>
      </ul>
    </div>
    <div class="done-box" v-show="showDone">
      <p class="done-title">Done</p>
      <ul class="doneUl">
        <li v-for="(item, index) in doneList" :key="item.id">
          {{ index + 1 }} . {{ item.text }}
        </li>
      </ul>
    </div>
    <div class="clear-btn-box">
      <input class="clear-btn" type="button" value="CLEAR" @click="clear" />
    </div>
  </div>
</template>

<script>
export default {
  name: "contentBox",
  data() {
    return {
      showTodo: true,
      showDone: true,
    };
  },
  computed: {
    list() {
      return this.infoObj;
    },
    todoList() {
      return this.list.filter((item) => {
        if (!item.done) return item;
      });
    },
    doneList() {
      return this.list.filter((item) => {
        if (item.done) return item;
      });
    },
  },
  props: ["infoObj"],
  methods: {
    del(index) {
      this.todoList[index].done = true;
      this.save();
    },
    clear() {
      for (let i = this.list.length - 1; i >= 0; i--) {
        if (this.list[i].done) this.list.splice(i, 1);
      }
      this.save();
    },
    save() {
      localStorage.setItem("todo", JSON.stringify(this.list));
    },
    // 动画函数
  },
};
</script>

<style scoped>
.contentBox {
  width: 100%;
  overflow: scroll;
}

.changeRoute,
.clear-btn-box {
  display: flex;
  justify-content: center;
}

.changeRoute a {
  color: blue;
  margin: 2px 8px;
  text-decoration: none;
}

.changeRoute a:active{
  color: red;
}

.todo-box,
.done-box {
  margin: auto;
  width: 95%;
  background-color: #ccc;
  border-radius: 0.7rem;
}

.todo-title {
  color: #000;
}

.done-title {
  color: #555;
}

.todo-title,
.done-title {
  font-size: 1.5rem;
  font-weight: 400;
  width: 4rem;
  margin: 0.5rem auto;
}
.clear-btn {
  font-size: 0.9rem;
  padding: 0.3rem 0.5rem;
  background-color: lightblue;

}
li {
  margin: 0.5rem 1rem 0;
  list-style-type: none;
}

#done li {
  text-decoration: line-through;
}

.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(80px);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.6s ease;
}

/* 下面的 v-move  和 v-leave-active配合使用  能够实现后续的元素  渐渐地飘上去的效果
  .v-move {
    transition: all 0.6s ease;

  }

  .v-leave-active {
    position: absolute;
  } */
</style>
