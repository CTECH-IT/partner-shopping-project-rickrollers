(function (window) {
    'use strict';

    const FORM_SELECTOR = '[data-keyboard-order="form"]'
    const CHECKLIST_SELECTOR = '[data-keyboard-order="checklist"]';
    const SERVER_URL = 'http://saturn.rochesterschools.org:8080/json';

    //Let's make sure we only have on of these:
    let App = window.App;
    let Truck = App.Truck
    let DataStore = App.DataStore;
    let RemoteDataStore = App.RemoteDataStore;
    let FormHandler = App.FormHandler
    let Validation = App.Validation;

    //remote database where we store orders
    let remoteDS = new RemoteDataStore(SERVER_URL);

    let myTruck = new Truck('1234', remoteDS);

    window.myTruck = myTruck;

    // find the form that is being submitted and create a FormHandler object
    let formHandler = new FormHandler(FORM_SELECTOR);


    // when the submit button is called, create the order and add a checkbox
    formHandler.addSubmitHandler(function (data) {
        myTruck.createOrder.call(myTruck, data);

    });
    // add the emaill validator to the email input field
    formHandler.addInputHandler(Validation.isCompanyEmail);


})(window);

