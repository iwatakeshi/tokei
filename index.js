/*jslint node: true, forin: true, jslint white: true, newcap: true, curly: false*/
/*
 * tokei
 * author : Takeshi Iwana
 * https://github.com/iwatakeshi
 * @license MIT
 */

(function() {
    'use strict';

    var tokei,
        global = require('./settings'),
        Proto = require('uberproto'),
        moment = require('moment-timezone'),
        intl = require('intl'),
        hasModule = (typeof module !== 'undefined' && module.exports);

    /** 
     * @constructor Tokei
     * @private
     */
    var Tokei = Proto.extend({
        init: function(locale) {
            this._intl = {};
            this._intl.date = intl.DateTimeFormat;
            this._intl.number = intl.NumberFormat;
            this._date = moment();
            this._number = 0;
            this._locale = locale || global.locale;
            //set moment
            this._moment = moment;
            //set moment to global locale
            this._moment.locale(locale || global.locale);

            this._isNumber = false;

            return this;
        },
        /**
         * @method now
         * @description Returns the current date or time.
         *
         * @example <caption>Get the current date</caption>
         *
         * //returns the current date
         * tokei().date().now();
         *
         * @example <caption>Get the current time</caption>
         *
         * //returns the current time
         * tokei().time().now();
         *
         * @public
         * @return {String} The current date or time.
         */
        now: function() {
            return new this._intl.date(this._locale, this._options).format(moment());
        },
        /**
         * @method date
         * @description Formats the date.
         * @param {Object} options The options for date formatting.
         *
         * @example <caption>Get the formatted date</caption>
         *
         * tokei().date().format(new Date(Date.UTC(2012, 11, 20, 3, 0, 0)));
         *
         * @example <caption> Get the formatted date with options</caption>
         *
         * var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
         * tokei('de-DE').date(options).format(new Date(Date.UTC(2012, 11, 20, 3, 0, 0)));
         *
         * @public
         * @return {String} The formatted date
         */
        date: function(options) {
            this._options = options || global.options.date;
            return this;
        },
        /**
         * @method time
         * @description Formats the time. See {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/format | DateTimeFormat}.
         * @param {Object} options The options for time formatting.
         * 
         * @example <caption>Get the formatted time</caption>
         *
         * tokei('en-AU').time().format(new Date(Date.UTC(2012, 11, 20, 3, 0, 0)));
         *
         * @example <caption>Get the formatted time with options</caption>
         *
         * var options =  { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
         * tokei('en-AU').time(options).format(new Date(Date.UTC(2012, 11, 20, 3, 0, 0)));
         * 
         * @public
         * @return {String} The formatted time.
         */
        time: function(options) {
            this._options = options || global.options.time;
            return this;
        },
        /**
         * @method number
         * @description Formats the number. See {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat | NumberFormat}.
         * @param {Object} options The options for number formatting.
         * 
         * @example <caption>Get the formatted number</caption>
         *
         * tokei('de-DE').number().format(123456.789);
         *
         * @example <caption>Get the formatted number with options</caption>
         *
         * var options =  { style: 'currency', currency: 'EUR' };
         * tokei('de-DE').number(options).format(123456.789);
         * 
         * @public
         * @return {String} The formatted number.
         */
        number: function(options) {
            this._options = options || {};
            this.isNumber = true;
            return this;
        },
        /** 
         * @method format
         * @description Formats the object. 
         * See {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/format | Intl.DateTimeFormat.prototype.format} or 
         * for Date format and {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat/format | Intl.NumberFormat.prototype.format}.
         * for Number format.
         * @param  {(Date | Number)} obj The object to format.
         *
         * @example <caption>Get the formatted date, time, or number</caption>
         *
         * //format date
         * tokei().date().format([Date date]);
         * //format time
         * tokei().time().format([Date time]);
         * //format number
         * tokei().number().format([Number number]);
         * 
         * @return {(String | Number)}     The formatted date, time or number.
         * @public
         */
        format: function(obj) {
            var format;
            if(this.isNumber) format = new this._intl.number(this._locale, this._options).format(obj || this_.number);
            else format = new this._intl.date(this._locale, this._options).format(obj || this._date)
            return format;
        },
        /**
         * @method moment
         * @description The local moment. See {@link http://momentjs.com/| Moment.js}.
         *
         * @example <caption>Using moment with Tokei</caption>
         *
         * //use moment just as you would normally
         * tokei().moment();
         * //you can even set a locale
         * tokei('ja').moment();
         * 
         * @return {Moment} See {@link http://momentjs.com/| Moment.js}.
         */
        moment: function() {
            return this._moment.apply(this, arguments);
        }
    });

    /**
     * @function tokei
     * @description Creates an instance of Tokei.
     * @param  {String} locale The local locale to set.
     * 
     * @example <caption>Get the formatted date, time, or number</caption>
     *
     * tokei().date().format();
     * //usage:
     * //tokei().[api]().format()
     * 
     * @example <caption>Setting the locale</caption>
     *
     * tokei('ja').date().format()
     * //usage:
     * //tokei([String locale]).[api]().format()
     * 
     * @return {Tokei}        The Tokei instance.
     * @public
     */
    tokei = function(locale) {
        return Tokei.create(locale);
    };

    /**
     * @method  locale
     * @static
     * @description Sets the global locale for Tokei.
     * @param  {Object} opt The global locale.
     * @return {Object}     The global locale.
     * @public
     */
    tokei.locale = function(locale) {
        global.locale = locale;
        return global.locale;
    }

    /**
     * @method  config
     * @static
     * @description Sets the global options for Tokei.
     * @param  {Object} options The global options.
     * @return {Object}     The global options.
     * @public
     */
    tokei.config = function(options) {
        global.options = options || global.options;
        return global.options;
    }

    /**
     * @description The global moment. See {@link http://momentjs.com/| Moment.js}.
     * @type {Moment}
     * @public
     */
    tokei.moment = moment;

    // CommonJS module is defined
    if (hasModule) {
        /**
         * @private
         * @type {Tokei}
         */
        module.exports = tokei;
    }

    /*global ender:false */
    if (typeof ender === 'undefined') {
        // here, `this` means `window` in the browser, or `global` on the server
        // add `tokei` as a global object via a string identifier,
        // for Closure Compiler 'advanced' mode
        this.tokei = tokei;
    }

    /*global define:false */
    if (typeof define === 'function' && define.amd) {
        define([], function() {
            return tokei;
        });
    }
}).call(this);