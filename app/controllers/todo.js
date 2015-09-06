import Ember form 'ember';

let TodoController = Ember.Controller.extend({

  isEditing: false,

  isComplete: Ember.computed('model:isComplete', {
    get: () => {
      return this.get('model').get('isComplete');
    },
    set: (key, value) => {
      let model = this.get('model');
      model.set('isCompleted', value);
      model.save();
      return value;
    }
  }),

  removeTodo: () => {
    var todo = this.get('model');
    todo.deleteRecord();
    todo.save();
  },

  actions: {

    editTodo: () => {
      this.set('isEditing', true);
    },

    acceptChanges: () => {

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
