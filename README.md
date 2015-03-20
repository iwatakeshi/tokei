# tokei

Time localization for node.js

[![Dependency Status](https://david-dm.org/iwatakeshi/tokei.png)](https://github.com/iwatakeshi/tokei/blob/master/package.json) [![License Status](http://img.shields.io/npm/l/tokei.svg)](https://github.com/iwatakeshi/tokei/blob/master/LICENSE) [![Downloads](http://img.shields.io/npm/dm/tokei.svg)]() [![Version](http://img.shields.io/npm/v/tokei.svg)]()
![](https://img.shields.io/badge/nerd-approved-brightgreen.svg)

[![NPM](https://nodei.co/npm/tokei.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/tokei/)

Tokei is a localization library that combines and wraps **Intl.DateTimeFormat**, **Intl.NumberFormat**, and **Moment.js** (including **Moment.js Timezone**). The API is very simple.

##Usage

```bash
npm install --save tokei
```


```js
var tokei = require('tokei');

tokei(locale).date().now();
```

##Documentation

The beautifully generated and **nerd** approved docs can be found at [GitHub](http://iwatakeshi.github.io/tokei/).

##Contribution

I would gladly any contribution! The source is well commented and short (~70 without commments). Just fork and pull!

##Known Issues

This library uses [Intl](https://github.com/andyearnshaw/Intl.js) and not the one node has. The node version of Intl has not been configured. Therefore, until then, I will be using @andyearnshaw's version.

Other known issues that I have found are Japanese and Chinese formatting for dates. So I recommend you to use moment (See the beauty of having a backup plan? lol).