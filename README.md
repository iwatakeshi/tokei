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

##Intl.DateTimeFormat

tokei wraps the format `Intl` function and offers a convenience `now` method:

```js
//return the current date (use options to specify date or time)
tokei().now();

//return the formatted date
tokei(locale, opt).format(date);
```


##Moment.js and Moment.js Timezone

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

If you need the moment object by itself, moment is avaibale as a static API.

```js
tokei.moment
tokei.moment.tz
//...
```


###Global locale

Also, if you would like the global locale to be different from the default `en-US`, the you can change it with:

```js
tokei.locale();
```

###Global opt

You can change the default options for `Intl.DateTimeFormat` by using:

```js
tokei.opt();
```

The default opt is:

```js
{
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
}
```