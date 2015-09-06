import Ember from 'ember';

let CompletedTodosRoute = Ember.Route.extend({

  model: function () {
    return this.store.filter('todo', function (todo) {
      return todo.get('isComplete');
    });
  },

  renderTemplate: function (controller) {
    this.render('todos/index', { controller: controller });
  }
});

export default CompletedTodosRoute;
