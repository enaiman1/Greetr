//immediately invoked function that accepts and takes in a global object and a jquery object
(function (global, $) {

    var Greetr = function (firstname, lastname, language) {
        // this is where prototype will point to when a new object is created
        return new Greetr.init(firstname, lastname, language);
    }

    // an unexposed array that supportes various languages
    var supportedLangs = ['es', 'es'];

    // variables that prevent developer from changing but allows them to access the data
    var greetings = {
        en: 'Hello ',
        es: 'Hola '
    };

    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };

    var logMessages = {
        en: 'Logged in ',
        es: 'Inició sesión '
    }

    //this will allow any objects built, to have access to any methods and properties
    Greetr.prototype = {
        // method to add name
        fullname: function () {
            return this.firstname + ' ' + this.lastname;
        },
        // method to check supported lanquage that are in the supportLang array
        validate: function () {
            // if language is not support we will throw an error
            if (supportedLangs.indexOf(this.language) === -1) {
                throw "Invalid language";
            };
        },
        // method to create a informal greeting
        greeting: function () {
            return greetings[this.language] + '' + this.firstname + "!";
        },
        // method to create formal greeting
        formalGreetings: function () {
            return formalGreetings[this.language] + ', ' + this.fullname();
        },
        //method that makes the greeting chainable and will allow us to choose if it formal or not formal
        greet: function (formal) {
            var msg;
            //if undefined or null it will be coerced to 'false'
            if (formal) {
                msg = this.formalGreetings();
            }
            else {
                msg = this.greeting()
            }
            if (console) {
                console.log(msg);
            }
            // 'this' refers ti tge calling object art execution time and make this method chainable
            return this;
        },
        // method to make sure that something is logged
        log: function() {
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullname());
            }
            return this;
        },
        //allows us to change language on the fly
        setLang: function(lang) {
            this.language = lang;

            this.validate()

            return this
        },

        // method to accept a jquery selector and then updates whatever the selector is
        HTMLGreeting: function(selector, formal) {
            if (!$) {
                throw 'jQuery not loaded';
            }
            if(!selector) {
                throw 'missing jQuery selector'
            }

            var msg;
            if(formal) {
                msg = this.formalGreetings();
            }
            else {
                msg = this. greeting();
            }
            // set jquery object and will set the html to the greeting
            $(selector).html(msg)

            // makes this chainable
            return this
        }

    };

    Greetr.init = function (firstname, lastname, language) {
        // set up object for my constructor
        var self = this;
        self.firstname = firstname || '';
        self.lastname = lastname || '';
        self.language = language || 'en';
    }

    // an object created with this function will point here for it prototype chain
    Greetr.init.prototype = Greetr.prototype;

    /*Allow us to expose greeter to outside this file
    and sets up an alias for easy type structure */
    global.Greetr = global.G$ = Greetr

}(window, jQuery));