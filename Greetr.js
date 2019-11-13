//immediately invoked function that accepts and takes in a global object and a jquery object
;(function (global, $) {

    var Greetr = function (firstname, lastname, language) {
        // this is where prototype will point to when a new object is created
        return new Greetr.init(firstname, lastname, language);
    }

    // an unexposed array that supportes various languages
    var supportedLangs = ['en', 'es'];
   

    // variables that prevent developer from changing but allows them to access the data
    var greetings = {
        en: 'Hello',
        es: 'Hola'
    };

    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };

    var logMessages = {
        en: 'Logged in',
        es: 'Inició sesión'
    };
    //this will allow any objects built, to have access to any methods and properties
    Greetr.prototype = {
        // method to add name
        // 'this' refers to the calling object at execution time
        fullName: function() {
            return this.firstName + ' ' + this.lastName;   
        },
        // method to check supported lanquage that are in the supportLang array
        validate: function() {
            // check that is a valid language
            // references the externally inaccessible 'supportedLangs' within the closure
             if (supportedLangs.indexOf(this.language)  === -1) {
                throw "Invalid language";   
             }
        },
        // method to create a informal greeting
        greeting: function() {
            return greetings[this.language] + ' ' + this.firstName + '!';
        },
         // method to create a formal greeting
        formalGreeting: function() {
            return formalGreetings[this.language] + ', ' + this.fullName();  
        },
        //method that makes the greeting chainable and will allow us to choose if it formal or not formal
        greet: function(formal) {
            var msg;
            
            // if undefined or null it will be coerced to 'false'
            if (formal) {
                msg = this.formalGreeting();  
            }
            else {
                msg = this.greeting();  
            }

            if (console) {
                console.log(msg);
            }

            // 'this' refers to the calling object at execution time
            // makes the method chainable
            return this;
        },
        // method to make sure that something is logged
        log: function() {
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullName()); 
            }
            
            // make chainable
            return this;
        },
        //allows us to change language on the fly
        setLang: function(lang) {
            
            // set the language
            this.language = lang;
        
            // validate
            this.validate();
            
            // make chainable
            return this;
        },

        // method to accept a jquery selector and then updates whatever the selector is
        HTMLGreeting: function(selector, formal) {
            if (!$) {
                throw 'jQuery not loaded';   
            }
            
            if (!selector) {
                throw 'Missing jQuery selector';   
            }
            
            // determine the message
            var msg;
            if (formal) {
                msg = this.formalGreeting();   
            }
            else {
                msg = this.greeting();   
            }
            
            // inject the message in the chosen place in the DOM
            $(selector).html(msg);
            
            // make chainable
            return this;
        }

    };
    // the actual object is created here, allowing us to 'new' an object without calling 'new'
    Greetr.init = function(firstName, lastName, language) {
        
        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';
        
        self.validate();
        
    }

    // an object created with this function will point here for it prototype chain

    Greetr.init.prototype = Greetr.prototype;

    /*Allow us to attach Greetr function to the global object
    and provides an alias "G$" for easy type structure */
    global.Greetr = global.G$ = Greetr;

}(window, jQuery));