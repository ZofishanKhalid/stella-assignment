'use strict';

// Service to handle user sessions throughout the app
app.factory('sessionService', [function() {
    return {
        set: function(key, value) {
            return sessionStorage.setItem(key, value);
        },
        get: function(key) {
            return sessionStorage.getItem(key);
        },
        destroy: function(key) {
            return sessionStorage.removeItem(key);
        },
    };
}])