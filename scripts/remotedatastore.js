(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    function RemoteDataStore(url) {
        if(!url) {
            throw new Error('No remote URL supplied.');
        }
        this.serverUrl = url;
    }

    RemoteDataStore.prototype.add = function (key, val) {
        //call jQuery's $.post method to send the value to the serverUrl
        // when the server responds, call an anonymous function with serverResponse
        $.post(this.serverUrl, val, function (serverResponse) {
            console.log(serverResponse);
        });
    };
    RemoteDataStore.prototype.getAll = function (cb) {
        // make a "get" call to the server URL
        // pass in an anonymouse function that calls the "cb" callback function
        $.get(this.serverUrl, function (serverResponse) {
            console.log(serverResponse);
            cb(serverResponse);
        });
    };
    
    RemoteDataStore.prototype.get = function (key, cb) {
        //make a get call to the server, but pass an email address
        //so that it returns just one order
        //then call the fucntion"cb" on the response
        $.get(this.serverUrl + '?emailAddress=' + key, function (serverResponse) {
            console.log(serverResponse);
            cb(serverResponse);
        });
    };

    RemoteDataStore.prototype.remove = function (key) {
        //call the server url using the ajax 'DELETE' command
        $.ajax(this.serverUrl + '?emailAddress=' + key, {type: 'DELETE' });
    };

    App.RemoteDataStore = RemoteDataStore;
    window.App = App;
})(window);
