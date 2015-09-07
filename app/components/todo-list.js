import Ember from 'ember';

let TodoListComponent = Ember.Component.extend({
  tagName: 'ul',
  classNames: ['todo-list content'],
  todos: null
});

export default TodoListComponent;
