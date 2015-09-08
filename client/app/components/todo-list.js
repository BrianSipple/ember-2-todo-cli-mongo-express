import Ember from 'ember';

let TodoListComponent = Ember.Component.extend({
  tagName: 'ul',
  classNames: ['todo-list content'],

  /**
   *  All of the todos
   */
  todos: null

});

export default TodoListComponent;
