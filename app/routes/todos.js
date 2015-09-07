import Ember from 'ember';

let TodosRoute = Ember.Route.extend({

  model() {
    return this.store.findAll('todo');
  }

});

export default TodosRoute;
