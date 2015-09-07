import Ember from 'ember';

let ChoicePopOutButtonComponent = Ember.Component.extend({

  popOutMessage: null,
  title: null,

  actions: {

    showPopOutButton() {
      this.toggleProperty('isShowingPopOutButton');
    },

    responseAction() {
      this.toggleProperty('isShowingPopOutButton');
      this.sendAction('action', this.get('actionParam'));
    }

  }
});

export default ChoicePopOutButtonComponent;
