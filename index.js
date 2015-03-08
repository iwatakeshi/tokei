/*jslint node: true, forin: true, jslint white: true, newcap: true, curly: false*/
/*
 * tokei
 * author : Takeshi Iwana
 * https://github.com/iwatakeshi
 * license : MIT
 */

(function() {
    'use strict';

    var tokei,
        global = {
            locale: 'en-US'
        },
        Proto = require('uberproto'),
        moment = require('moment-timezone'),
        intl = require('intl'),
        hasModule = (typeof module !== 'undefined' && module.exports);

    var Time = Proto.extend({
        init: function(locale, opt) {
            this._intl = intl.DateTimeFormat;
            this._date = moment();
            this._locale = locale || global.locale;
            this._opt = opt || {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            };
            //set moment
            this._moment = moment;
            //set moment to global locale
            this._moment.locale(locale || global.locale);
            return this;
        },
        now: function() {
            return new this._intl(this._locale, this._opt).format(moment());
        },
        format: function(date) {
            return new this._intl(this._locale, this._opt).format(date || this._date);
        },
        moment: function() {
            return this._moment.apply(this, arguments);
        }
    });


    tokei = function(date, opt) {
        return Time.create(date, opt);
    };

    tokei.locale = function(locale) {
        global.locale = locale;
    }

    tokei.moment = moment;

    // CommonJS module is defined
    if (hasModule) {
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
