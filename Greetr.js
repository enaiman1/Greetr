//immediately invoked function that accepts and takes in a global object and a jquery object
(function (global, $){

    var Greetr = function(firstname, lastname, language) {
        // this is where prototype will point to when a new object is created
        return new Greetr.init(firstname, lastname, language);
    }

    Greetr.prototype ={};

    Greetr.init = function(firstname, lastname, language) {

        var self = this;
        self.firstname = firstname || '';
        self.lastname = lastname || '';
        self.language = language || 'en';
    }

    // an object created with this function should will point here for it prototype chain
    Greetr.init.prototype = Greetr.prototype;

    /*Allow us to expose greeter to the outside this file
    and sets up an alias for easy type structure */
    global.Greetr = global.G$ = Greetr

}( window, jQuery));