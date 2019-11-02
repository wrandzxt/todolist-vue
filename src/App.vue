<template>
  <div id="app">
    <!-- 首部 -->
    <div id="head">
      <div id="title">TodoList</div>
      <div id="add-block">
        <input type="text" id="add" v-model="text" placeholder="请输入..." @keyup.enter="addition" v-focus>
        <!-- <p>{{ text }}</p> -->
        <input type="button" value="添加" id="btn" @click="debounce(addition(),1000)">
      </div>
    </div>
    <!-- 中间组件 -->
    <content-box :infoObj="list" ref="com1"></content-box>

    <!-- 尾部 -->
    <div id="footer">
      <p> Copyright © 2019-~ wr </p>
    </div>
  </div>
</template>

<script>
  import contentBox from './components/Content.vue'

  export default {
    name: 'App',
    data() {
      return {
        list: [],
        simInfo: {},
        text: '是时候展现真正的技术了',
        done: false,
        id: Date.now(),
      }
    },
    methods: {
      debounce(fn, wait) {  //防抖动
        let timeout = null;
        return function () {
          let args = arguments;
          if (timeout) clearTimeout(timeout);
          timeout = setTimeout(() => {
            timeout = null;
            fn().apply(this, args)
          }, wait)
        }
      },
      addition() {  //添加事件
        if (this.text == "") {
          alert('做个安排吧！');
          return;
        }
        this.simInfo = {
          text: this.text.trim(),
          done: this.done,
          id: Date.now()
        };
        this.list.push(this.simInfo);
        this.save();
        this.text = "";

      },
      save() {  //保存到localst
        this.$refs.com1.save();
      },
    },
    components: {
      contentBox
    },
    created() {
      if (!localStorage.getItem('todo')) {
        localStorage.setItem('todo', '[]')
      }
      this.list = JSON.parse(localStorage.getItem('todo'))
    },
  }
</script>

<style>
  * {
    padding: 0;
    margin: 0;
  }

  #head {
    width: 100%;
    height: 100%;
    margin: 5px 0;
    display: flex;
    justify-content: space-around;
    background-color: #AAA;
  }

  #title {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 50px;
    margin: 5px 0;
  }

  #add-block {

    display: flex;
    align-items: center;

  }

  #add {
    padding: 5px;
    font-size: 15px;
  }

  #btn {
    padding: 5px;
  }

  #footer {
    display: flex;
    position: fixed;
    width: 100%;
    bottom: 0;
    justify-content: center;
    background-color: #AAA;
  }
</style>