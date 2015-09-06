import Ember from 'ember';


let TodosController = Ember.Controller.extend({

  newTodo: {},

  actions: {

    createTodo: function () {
      // Get the todo title set by the "New Todo" text field
      let title = this.get('newTodo.title');

      if (!title.trim()) { return; }

      // Create the new model
      let newTodo = this.store.createRecord('todo', {
        title: title,
        isComplete: false
      });

      // Clear the "New Todo" text field
      this.set('newTodo.title', '');

      // Persite the new model
      newTodo.save();
    },

    clearCompleted: function () {

      let completed = this.filterBy('isComplete', true);
      completed.invoke('deleteRecord');
      completed.invoke('save');
    }
  },

  numRemaining: function numRemaining () {
    return this.filterBy('isComplete', false).get('length');
  }.property('@each.isComplete'),

  inflection: function inflection () {
    var numRemaining = this.get('numRemaining');
    return numRemaining === 1 ? 'todo': 'todos';
  }.property('numRemaining'),

  hasCompleted: function hasCompleted () {
    return this.get('numCompleted') > 0;
  }.property('numCompleted'),

  numCompleted: function numCompleted () {
    return this.filterBy('isComplete', true).get('length');
  }.property('@each.isComplete'),

  allAreComplete: Ember.computed('@each.isComplete', {

    get: function () {
      return !!this.get('length') && this.everyProperty('isComplete', true);
    },

    set: function (key, value) {
      this.setEach('isComplete', value);
      this.invoke('save');
      return value;
    }
  })

});


export default TodosController;
