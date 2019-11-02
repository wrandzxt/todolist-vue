<template>
  <div class="contentBox">
    <div id="change">
      <a href="#" @click="showTodo=true,showDone=true">All</a>
      <a href="#" @click="showTodo=true,showDone=false">Todo</a>
      <a href="#" @click="showTodo=false,showDone=true">Done</a>
    </div>
    <div id="todo" v-show="showTodo">
      <h3>Todo</h3>
      <ul id="todoUl">
        <transition-group appear>
          <li v-for="(item,index) in todoList" :key="item.id" @click="del(index)">{{ index + 1 }}--{{ item.text }}</li>
        </transition-group>

      </ul>
    </div>
    <div id="done" v-show="showDone">
      <h3>Done</h3>
      <ul id="doneUl">
        <li v-for="(item,index) in doneList" :key="item.id">{{ index + 1 }}--{{ item.text }}</li>
      </ul>
    </div>
    <div id="clear">
      <a href="#" @click="clear">clear</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'contentBox',
    data() {
      return {
        showTodo: true,
        showDone: true,
      }
    },
    computed: {
      list() {
        return this.infoObj
      },
      todoList() {
        return this.list.filter(item => {
          if (!item.done) return item
        })
      },
      doneList() {
        return this.list.filter(item => {
          if (item.done) return item
        })
      }
    },
    props: ['infoObj'],
    methods: {
      del(index) {
        this.todoList[index].done = true;
        this.save()
      },
      clear() {
        for (let i = this.list.length - 1; i >= 0; i--) {
          if (this.list[i].done)
            this.list.splice(i, 1)
        }
        this.save();
      },
      save() {
        localStorage.setItem('todo', JSON.stringify(this.list));
      },
      // 动画函数

    },


  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .contentBox {
    width: 100%;
    height: 100%;


  }

  #change,
  #clear {
    display: flex;
    justify-content: center;
  }

  #change a,
  #clear a {
    color: blue;
    margin: 2px 8px;
    text-decoration: none;
  }

  #change a:active,
  #clear a:active {
    color: red;
  }


  #todo,
  #done {
    margin: auto;
    width: 80%;
    background-color: #CCC;
    border-radius: 8px;
  }

  #todo {
    color: #000;
  }

  #done {
    color: #555;
  }

  h3 {
    font-size: 2rem;
    margin: 5px 15px;
  }

  li {
    margin: 8px 5px;
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