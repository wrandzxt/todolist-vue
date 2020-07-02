<template>
  <div id="app">
    <!-- 首部 -->
    <div class="head-container">
      <div class="head-title">TodoList</div>
    </div>
    <!-- input框 -->
    <div class="input-container">
      <input
        class="input-block"
        type="text"
        v-model="text"
        placeholder="请输入..."
        @keyup.enter="addition"
        v-focus
      />
      <input
        class="input-btn"
        type="button"
        value="添加"
        id="btn"
        @click="debounce(addition(), 1000)"
      />
    </div>
    <!-- 中间组件 -->
    <content-box :infoObj="list" ref="com1"></content-box>

    <!-- 尾部 -->
    <div class="footer">
      <p>Copyright © 2019-~ wr</p>
    </div>
  </div>
</template>

<script>
import contentBox from "./components/Content.vue";

export default {
  name: "App",
  data() {
    return {
      list: [],
      simInfo: {},
      text: "是时候展现真正的技术了",
      done: false,
      id: Date.now(),
    };
  },
  methods: {
    debounce(fn, wait) {
      //防抖动
      let timeout = null;
      return function () {
        let args = arguments;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          timeout = null;
          fn().apply(this, args);
        }, wait);
      };
    },
    addition() {
      //添加事件
      if (this.text == "") {
        alert("做个安排吧！");
        return;
      }
      this.simInfo = {
        text: this.text.trim(),
        done: this.done,
        id: Date.now(),
      };
      this.list.push(this.simInfo);
      this.save();
      this.text = "";
    },
    save() {
      //保存到localst
      this.$refs.com1.save();
    },
  },
  components: {
    contentBox,
  },
  created() {
    if (!localStorage.getItem("todo")) {
      localStorage.setItem("todo", "[]");
    }
    this.list = JSON.parse(localStorage.getItem("todo"));
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

.head-container {
  width: 100%;
  /* height: 5rem; */
  /* position: absolute; */
  top: 0;
  /* display: flex; */
  /* justify-content: start; */
  background-color: #aaa;
}

.head-title {
  height: 4rem;
  line-height: 4rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 2rem;
  margin: 0 2rem;
}

.input-container {
  /* position: absolute; */
  margin-top: 0.3rem;
  display: flex;
  justify-content: flex-end;
  flex-wrap: nowrap;
  /* align-items: center; */
  /* right: 1.5rem; */
}
.input-block {
  /* display: block; */
  height: 1.5rem;
  padding: 0.1rem 0.15rem 0;
  line-height: 1.5rem;
  align-items: center;
}
.input-btn {
  /* display: block; */
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  padding: 0.2rem 0.25rem;
  background-color: lightblue;
  border-radius: 0.3rem;
}

.footer {
  font-size: 1rem;
  display: flex;
  position: fixed;
  width: 100%;
  bottom: 0;
  justify-content: center;
  background-color: #aaa;
}
</style>
