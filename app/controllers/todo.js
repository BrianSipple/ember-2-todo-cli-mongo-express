import Ember from 'ember';

let TodoController = Ember.Controller.extend({

  isEditing: false,

  isComplete: Ember.computed('model:isComplete', {

    get: function () {
      return this.get('model').get('isComplete');
    },

    set: function (key, value) {
      let model = this.get('model');
      model.set('isComplete', value);
      model.save();
      return value;
    }
  }),

  removeTodo: function () {
    var todo = this.get('model');
    todo.deleteRecord();
    todo.save();
  },

  actions: {

    editTodo: function () {
      this.set('isEditing', true);
    },

    acceptChanges: function () {

      this.set('isEditing', false);

      if (Ember.isEmpty(this.get('model.title'))) {
        this.send('removeTodo');

      } else {
        this.get('model').save();
      }
    }
  }
});

export default TodoController;
