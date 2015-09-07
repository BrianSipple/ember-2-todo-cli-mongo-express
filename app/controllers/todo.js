// import Ember from 'ember';
//
// let TodoController = Ember.Controller.extend({
//
//   isEditing: false,
//
//   isComplete: Ember.computed('model:isComplete', {
//
//     get: function () {
//       return this.get('model').get('isComplete');
//     },
//
//     set: function (key, value) {
//       let model = this.get('model');
//       model.set('isComplete', value);
//       model.save();
//       return value;
//     }
//   }),
//
//   actions: {
//
//     editTodo: function () {
//       debugger;
//       this.set('isEditing', true);
//     },
//
//     removeTodo: function () {
//       var todo = this.get('model');
//       todo.deleteRecord();
//       todo.save();
//     },
//
//     verifyChanges: function () {
//
//       this.set('isEditing', false);
// 
//       if (Ember.isEmpty(this.get('model.title'))) {
//         this.send('removeTodo');
//
//       } else {
//         this.get('model').save();
//       }
//     }
//   }
// });
//
// export default TodoController;
