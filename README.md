# tokei
Time localization for node.js

Tokei is a date/time localization library that combines and wraps **Intl.DateTimeFormat** and **Moment.js** (including **Moment.js Timezone**). The API is very simple.

##Usage

```bash
npm install --save tokei
```

tokei can take two objects:

```js
var tokei = require('tokei');

//this will return 'this' (itself)
tokei(locale, opt);
```

##API

###Intl.DateTimeFormat

tokei wraps the format `Intl.DateTimeFormat` function and offers a convenience `now` method:

```js
//return the current date (use options to specify date or time)
tokei().now();

//return the formatted date
tokei(locale, opt).format(date);
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