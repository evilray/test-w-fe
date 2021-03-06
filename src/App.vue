<template>
  <div id="app">
    <div class="container">
      <div class="form-group">
        <form @submit.prevent="addTask">
          <input placeholder="What needs to be done?" class="form-control mb-1 todo-add-input"
                 :class="{'large': !tasks.length}"
                 v-model="newTask">
          <button class="btn btn-primary btn-block d-block d-lg-none"
                  :disabled="!newTask.trim()">Add
          </button>
        </form>
      </div>
      <ul class="todo-list">
        <li class="todo-item" v-for="task in tasks">
          <input class="todo-checkbox" type="checkbox"
                 v-model="task.completed">
          <label class="todo-item-title"
                 @click="editTask(task)">
            <span
              :class="{completed: task.completed}"
              v-if="task !== editingTask">{{task.title}}</span>
            <input class="todo-edit-input form-control" type="text"
                   v-focus
                   v-model="task.title"
                   v-if="task === editingTask"
                   @blur="doneEdit(task)"
                   @keyup.enter="doneEdit(task)"
                   @keyup.esc="cancelEdit(task)">
          </label>
          <span class="todo-item-remove" @click="removeTask(task)">✕</span>
        </li>
      </ul>
      <div v-if="tasks.length" class="todo-actions d-flex justify-content-between">
        <div>
          <span v-if="remaining" class="todo-action-info tasks-count">{{ remaining }} {{ remaining | pluralize }} left</span>
          <span v-else class="todo-action-info">All tasks completed!</span>
        </div>
        <div v-if="completed">
          <button class="btn btn-link" @click="removeCompleted">Remove completed</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const STORAGE_KEY = 'test-w-todo-list';

  export default {
    name: 'app',
    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
    },
    data() {
      return {
        tasks: [],
        newTask: '',
        editingTask: null
      }
    },
    computed: {
      remaining() {
        return this.tasks.filter(function (task) {
          return !task.completed;
        }).length;
      },
      completed() {
        return this.tasks.filter(function (task) {
          return task.completed;
        }).length;
      }
    },
    watch: {
      tasks: {
        handler: function () {
          this.saveTasks();
        },
        deep: true
      }
    },
    created: function () {
      this.fetchTasks();
    },
    filters: {
      pluralize: function (n) {
        return n === 1 ? 'item' : 'items'
      }
    },
    methods: {
      fetchTasks() {
        this.tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      },
      addTask() {
        this.tasks.push({
          title: this.newTask,
          completed: false
        });
        this.sortTasks();
        this.newTask = '';
      },
      sortTasks() {
        this.tasks.sort(function (a, b) {
          if (a.title > b.title) {
            return 1;
          }
          if (a.title < b.title) {
            return -1;
          }
          return 0;
        });
        this.tasks.reverse();
      },
      editTask(task) {
        this.beforeEditCache = task.title;
        this.editingTask = task;
      },
      doneEdit(task) {
        this.editingTask = null;
        task.title = task.title.trim();
        if (!task.title) {
          this.removeTask(task);
        }
      },
      cancelEdit(task) {
        this.editingTask = null;
        task.title = this.beforeEditCache;
      },
      removeTask(task) {
        this.tasks.splice(this.tasks.indexOf(task), 1);
      },
      removeCompleted() {
        this.tasks = this.tasks.filter(function (task) {
          return !task.completed;
        });
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
    border-radius: 0.25rem;
    border: 1px solid #EEE;
  }

  .todo-item {
    padding: 0 35px 0 45px;
    position: relative;
    border-bottom: 1px solid #EEE;
  }

  .todo-item:hover {
    background: #fffada;
  }

  .todo-item-title {
    cursor: pointer;
    display: block;
    padding: 12px 0 6px;
  }

  .todo-edit-input {
    padding: 0;
    border: none;
    background: transparent;
    outline: none;
    box-shadow: none;
  }

  .todo-item-remove {
    display: block;
    position: absolute;
    padding: 5px 10px;
    right: 0;
    top: 7px;
    color: #FFF;
    transition: all .3s ease;
    cursor: pointer;
  }

  .todo-item:hover .todo-item-remove {
    color: #CC6666;
  }

  .todo-item:hover .todo-item-remove:hover {
    color: #CC0000;
  }

  .todo-checkbox {
    background: none;
    -webkit-appearance: none;
    appearance: none;
    width: 40px;
    height: 40px;
    top: 5px;
    left: 0;
    outline: none;
    position: absolute;
    cursor: pointer;
  }

  .completed {
    color: #CCC;
    text-decoration: line-through;
  }

  .todo-checkbox:after {
    content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
  }

  .todo-checkbox:checked:after {
    content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
  }

  .container {
    margin-top: 40px;
  }

  .todo-actions {
    color: #666;
  }
  .todo-action-info {
    font-size: 1rem;
    vertical-align: middle;
    font-weight: 400;
    padding: 0.375rem 0.75rem;
    border: 1px solid transparent;
    display: block;
  }
  .todo-add-input {
    transition: all .6s ease-in-out;
  }
  .large {
    font-size: 35px;
    padding: .6rem 1.2rem;
  }
</style>
