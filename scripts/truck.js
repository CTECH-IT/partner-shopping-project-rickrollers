(function (window) {
    'use strict';

    let App = window.App || {};

    function Truck (truckID, db) {
        this.truckID = truckID;
        this.db = db;
    }

    Truck.prototype.createOrder = function (keyboardOrder) {
        console.log('Adding order for ' + keyboardOrder.emailAddress);
        this.db.add(keyboardOrder.emailAddress, keyboardOrder);
    }

    Truck.prototype.deliverOrder = function (customerId) {
        console.log('Delivering order for ' + customerId);
        this.db.remove(customerId);
    }

    Truck.prototype.printOrders = function() {

        //first, get all the email addresses (keys)
        let customerIdArray = Object.keys(this.db.getAll());

        console.log('Truck#' + this.truckID + ' has pending orders:');
        //go through the list of emails and get the associated order
        customerIdArray.forEach(function (id) {
          console.log(this.db.get(id));    
        }.bind(this));
    }

    App.Truck = Truck;
    window.App = App; 

})(window);