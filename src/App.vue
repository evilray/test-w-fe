<template>
  <div id="app">
    <input class="form-control">
    <ul class="todo-list">
      <li class="todo-item" v-for="task in tasks">
        <label class="todo-label">
          <input class="todo-checkbox" type="checkbox"/>
        </label>
        {{task.title}}
      </li>
    </ul>
  </div>
</template>

<script>
  let task = {
    id: null,
    title: 'sd',
    completed: false
  };
  const STORAGE_KEY = 'test-w-todo-list';
  export default {
    name: 'app',
    data() {
      return {
        tasks: [],
      }
    },
    computed: {
      totalTasks() {
        if (this.tasks) {
          return this.tasks.length;
        }
      }
    },
    watch: {
      tasks: {
        handler: function () {
          this.saveTasks()
        },
        deep: true
      }
    },
    created: function () {
      this.fetchTasks();
    },
    methods: {
      fetchTasks() {
        this.tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      },
      addTask(task) {

      },
      sortTasks() {

      },
      editTask(task) {

      },
      markTask(task) {

      },
      removeTask(task) {

      },
      saveTasks() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
      }
    }
  }
</script>

<style scoped>
  .todo-list, .todo-item {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .todo-list {
    background: #FFF;
  }

  .todo-item {
    padding: 0 0 0 40px;
    position: relative;
    border-bottom: 1px solid #EEE;
    line-height: 40px;
  }

  .todo-checkbox {
    background: none;
    -webkit-appearance: none;
    appearance: none;
    width: 40px;
    height: 40px;
    top: 0;
    left: 0;
    outline: none;
    position: absolute;
    cursor: pointer;
  }

  .todo-checkbox:after {
    content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
  }
  .todo-checkbox:checked:after {
    content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
  }
</style>
