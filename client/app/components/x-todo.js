import Ember from 'ember';

let TodoComponent = Ember.Component.extend({

  classNames: ['todo-item'],
  classNameBindings: [
    'isHidden:hidden:',
    'isComplete:todo-item--complete',
    'isEditing:todo-item--editing'
  ],

  tagName: "li",
  todo: null,
  isHidden: false,
  isEditing: false,

  isComplete: Ember.computed('todo:isComplete', {

    get: function get() {
      return this.todo.get('isComplete');
    },

    set: function set (key, value) {
      debugger;
      this.todo.set('isComplete', value);
      this.todo.save();
      return value;
    }
  }),


  actions: {

    setToEditing: function setToEditing () {
      this.set('isEditing', true);
    },

    deleteTodo: function deleteTodo () {
      debugger;
      let todo = this.todo;
      todo.deleteRecord();
      todo.save();
      //this.sendAction('action', this.todo);
    },

    verifyChanges: function verifyChanges () {

      if (Ember.isEmpty(this.todo.get('title'))) {
        this.sendAction('deleteTodo', this.todo);

      } else {
        this.todo.save();
      }
    }

  }
});

export default TodoComponent;
