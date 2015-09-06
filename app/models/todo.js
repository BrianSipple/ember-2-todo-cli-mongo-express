import DS from 'ember-data';

let Todo = DS.Model.extend({
  title: DS.attr('string'),
  isComplete: DS.attr('boolean')
});

// Todo.reopenClass({
//   FIXTURES: [
//     {
//       id: 1,
//       title: 'Learn Ember.js',
//       isComplete: false
//     },
//     {
//       id: 2,
//       title: '...',
//       isComplete: false
//     },
//     {
//       id: 3,
//       title: 'Profit',
//       isComplete: false
//     }
//   ]
// });

export default Todo;
