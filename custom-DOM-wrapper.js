/**
 * Constructor for the SpotifyDOM object.
 *
 * @param selector {String}, it can follow the following formats:
 *  - class e.g. '.element'
 *  - identifier e.g. '#element'
 *  - tag name e.g. 'li'
 * @return {SpotifyDOM}
 */
var SpotifyDOM = function(selector) {
    //create a new constructor function and set its prototype as SpotifyDOM's prototype 
    F = function() {
    };
    F.prototype = SpotifyDOM.prototype;
    f = new F();
    f.init(selector);
    return f;
};

/**
 * Returns a SpotifyDOM wrapper like the constructor.
 *
 * @param selector {String}, it can follow the following formats:
 *  - class e.g. '.element'
 *  - identifier e.g. '#element'
 *  - tag name e.g. 'li'
 * @return {SpotifyDOM}
 */
SpotifyDOM.get = function(selector) {
    return SpotifyDOM(selector);
};

/**
 * Changes or returns the content of the element.
 *
 * @param content {String}
 * @return {SpotifyDOM}
 * @method html
 * @return {String} The content of the element
 * @throws {SpotifyDOMInvalidElement} When the current content of the wrapper
 * is a collection,
 *  e.g. SpotifyDOM(‘li’).html(‘test’)
 */
SpotifyDOM.prototype.html = function(content) {
    //dont do anything if the wrapper object has no element set
    if (this.el === null)
        return this;

    //return innerHTML if function is called without arguements
    if ('undefined' === typeof content)
        return this.el.innerHTML;

    //throw Exception if it is a collection
    if (this.isCollection())
        throw new SpotifyDOMInvalidElement("Expected Element but got Collection");

    //set innerHTML if function called with string arguements
    this.el.innerHTML = content;
    return this;
};

/**
 * Applies the callback to every element of the collection, the callback will
 * receive the current SpotifyDOM object of the iteration.
 *
 *  e.g. SpotifyDOM(‘li’).each(function(element) { element.html(‘test’); });
 *
 * @method each
 * @param {Function} callback
 * @return {SpotifyDOM}
 */
SpotifyDOM.prototype.each = function(callback) {
    //dont do anything if the wrapper object has no element set
    if (this.el === null)
        return this;

    //throw Exception if it is not a collection
    if (!this.isCollection())
        throw new SpotifyDOMInvalidElement("Expected Collection but got Element");

    //call the callback function for each element of NodeList 
    for (var i = 0; i < this.el.length; i++) 
        callback(SpotifyDOM(this.el[i]));

    return this;
};

/**
 * @method isCollection
 * @return {Boolean} true if the currently selected element is a collection(e.g. ‘li’).
 */
SpotifyDOM.prototype.isCollection = function() {
    //check if el is a NodeList
    return (this.el instanceof NodeList || this.el instanceof StaticNodeList);
};

/**
 * Used internally by constructor to initialize the attributes
 * @method init
 */
SpotifyDOM.prototype.init = function(selector) {
    //if selector is an html dom element, directly set it as el
    if (selector.nodeType) {
        this.el = selector;
        return;
    }

    //if it is a string check if is an ID selector
    //if yes, el will have a single dom element
    if (selector.charAt(0) === '#') {
        this.el = document.querySelector(selector);
    }
    
    //if not, il will have a node list
    else {
        this.el = document.querySelectorAll(selector);
    }
};

/**
 * Constructor method for Exceptions
 * @method SpotifyDOMInvalidElement
 * @param {String} message message of the Exception
 */
var SpotifyDOMInvalidElement = function(message) {
    this.message = message;
};