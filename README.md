# tokei

Time localization for node.js

[![Dependency Status](https://david-dm.org/iwatakeshi/tokei.png)](https://github.com/iwatakeshi/tokei/blob/master/package.json) [![License Status](http://img.shields.io/npm/l/tokei.svg)](https://github.com/iwatakeshi/tokei/blob/master/LICENSE) [![Downloads](http://img.shields.io/npm/dm/tokei.svg)]() [![Version](http://img.shields.io/npm/v/tokei.svg)]()

[![NPM](https://nodei.co/npm/tokei.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/tokei/)

Tokei is a date/time localization library that combines and wraps **Intl.DateTimeFormat** and **Moment.js** (including **Moment.js Timezone**). The API is very simple.

##Usage

```bash
npm install --save tokei
```

tokei can take two objects where locale is `String` and opt is a plain `Object`:

```js
var tokei = require('tokei');

//this will return 'this' (itself)
tokei(locale, opt);
```

See [Mozilla's documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat#Example:_Using_options) for examples on options.

##API

###Intl.DateTimeFormat

tokei wraps the format `Intl.DateTimeFormat` function and offers a convenience `now` method:

```js
//return the current date (use options to specify date or time)
tokei().now();

//return the formatted date
tokei(locale, opt).format(date);

//example:
tokei('ja').format(new Date());
//output: '2015年3月月8日(日曜日'
//note the above is caused by a known bug for Intl
//see https://github.com/andyearnshaw/Intl.js/pull/76
```


###Moment.js and Moment.js Timezone

tokei also allows you to use moment the way you would expect it.
The only difference between using moment and tokei is that the 
locale option works with moment.

```js
tokei('ja').moment().format('L') 
//output: '2015/03/08'

tokei('en').moment().format('L')
//output: '03/08/2015'
```

As expected, moment timezone also works

```js
 tokei().moment().tz("America/Los_Angeles").format();
```

##Static API

###Moment.js

If you need the moment object by itself, moment is available as a static API.

```js
tokei.moment
tokei.moment.tz
//...
```


###Locale

Also, if you would like the global locale to be different from the default `en-US`, then you can change it with:

```js
tokei.locale();
```

###Config

You can change the default option for `Intl.DateTimeFormat` by using:

```js
tokei.config(opt);
```

The default option is:

```js
{
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
}
```