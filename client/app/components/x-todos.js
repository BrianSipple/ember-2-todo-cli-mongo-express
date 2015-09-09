import Ember from 'ember';

let TodosComponent = Ember.Component.extend({

  model: null,
  newTodo: {},
  todoFilters: {
    ALL: 'all',
    COMPLETED: 'completed',
    ACTIVE: 'active'
  },

  /**
   * The todos that we'll be showing -- based upon the filter selection
   */
  todosToShow: [],

  actions: {

    createTodo: function () {
      // Get the todo title set by the "New Todo" text field
      let title = this.get('newTodo.title');

      if (!title.trim()) { return; }

      // Create the new model
      let newTodo = this.model.store.createRecord('todo', {
        title: title,
        isComplete: false
      });

      // Clear the "New Todo" text field
      this.set('newTodo.title', '');

      // Persite the new model
      newTodo.save();
    },

    clearCompleted: function () {

      let completed = this.model.filterBy('isComplete', true);
      completed.invoke('deleteRecord');
      completed.invoke('save');
    },


    filterShownTodos: function filterShownTodos (selectedTab) {
      let todosToShow;

      debugger;
      this.model.forEach((todo) => {
        todo.set('isHidden', true);
      });

      if (selectedTab === this.todoFilters.COMPLETED) {
        todosToShow = this.model.filterBy('isComplete', true);
      } else if (selectedTab === this.todoFilters.REMAINING) {
        todosToShow = this.model.filterBy('isComplete', false);
      } else {
        todosToShow = this.model;
      }

      this.model.forEach((todo) => {
        debugger;
        todo.set('isHidden', ~this.todosToShow.indexOf(todo));
        todo.save();
      });
    }
  },

  numRemaining: function numRemaining () {
    return this.model.filterBy('isComplete', false).get('length');
  }.property('@each.isComplete'),

  inflection: function inflection () {
    var numRemaining = this.get('numRemaining');
    return numRemaining === 1 ? 'todo': 'todos';
  }.property('numRemaining'),

  anyAreComplete: function anyAreComplete () {
    return this.get('numCompleted') > 0;
  }.property('anyAreComplete'),

  numCompleted: function numCompleted () {
    return this.model.filterBy('isComplete', true).get('length');
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

export default TodosComponent;
