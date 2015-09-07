import Ember from 'ember';

let TodoComponent = Ember.Component.extend({

  classNames: ['todo-item'],
  classNameBindings: [
    'isComplete:todo-item--complete',
    'isEditing:todo-item--editing'
  ],

  tagName: "li",
  todo: null,

  isEditing: false,

  isComplete: Ember.computed('model:isComplete', {

    get: function get() {
      return this.todo.get('isComplete');
    },

    set: function set (key, value) {
      this.todo.set('isComplete', value);
      this.todo.save();
      return value;
    }
  }),


  actions: {

    setToEditing: function setToEditing () {
      this.set('isEditing', true);
    },

    removeTodo: function removeTodo () {
      debugger;
      this.todo.deleteRecord();
      this.todo.save();
    },

    verifyChanges: function verifyChanges () {

      if (Ember.isEmpty(this.todo.get('title'))) {
        this.send('removeTodo');

      } else {
        this.todo.save();
      }
    }

  }
});

export default TodoComponent;
