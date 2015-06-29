# OpalBox-JQuery
A box to compile and run Ruby code on your website. This plugin uses [OpalRB libraries](http://opalrb.org/).

# Installation
Add the `dist` files to your project. You will need `js/opalbox.jquery.min.js`, `css/opalbox.min.css` and a theme, for example `css/themes/opalbox.light.min.css`. You can add all themes adding `css/themes/all_themes.min.css` file.

Now, link it into your website. In `<head>` tag:

```HTML
<!-- Styles --> 
<link rel="stylesheet" type="text/css" href="<route to opalbox.min.css>" />
<link rel="stylesheet" type="text/css" href="<route to theme>" />
```

Javascript files can be defined on `<head>` tag or at bottom of your website.

```HTML
<!-- JS Dependencies (You can use CDN or local files) --> 
<script type="text/javascript" src="http://cdn.opalrb.org/opal/current/opal.min.js"></script>
<script type="text/javascript" src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
<!-- JS File --> 
<script type="text/javascript" src="<route to opalbox.jquery.min.js>"></script>
```

# Use

To create OpalBoxes, define an HTML element. Predefined ruby code can be inside of this tags:

```HTML
<div class="ruby-code">
	return 1
</div>
```

Next call to opalBox in a script:

```javascript
$(document).ready(function(){
	$('.ruby-code').opalBox();
});
```

This code create isolated opalBoxes to run your Ruby code.

<div class="text-align: center">
  <img src="https://raw.githubusercontent.com/Angelmmiguel/opalbox-jquery/master/example.png" title="Example of opalBox"/>
</div>

## Options

`opalBox()` function accepts an object with optios. Available options and default values are:

```javascript
// Default options!
defaults = {
  // Theme of the opalBox
  theme: 'light',
  // Listener when compile and show the data
  onComplete: null,
  // Title of the block
  title: 'Ruby code',
  // Placeholder when there aren't any result
  result: 'Result will appear here'
};
```

# Themes

List of available themes:

* Light (by [@laux_es](https://twitter.com/Laux_es))

## Create a theme

First of all, I recommend you to read [Develop section](#develop). To create theme, create a file on `src/sass/themes` with name `opalbox.your_theme.scss`. Insert all styles inside of a global class. The name of the class will be the string of `theme` option (see [options](#options)). For example, for `light` theme:

```css
.opbox.light {
  /* Your style... */
}
```

You can use [light theme](https://github.com/Angelmmiguel/opalbox-jquery/blob/master/src/sass/themes/opalbox.light.scss) as example.

# Develop

To work with opalBox-jquery you will need to install [NodeJS](https://nodejs.org/), [NPM](https://www.npmjs.com/) and [Gulp](http://gulpjs.com/).

After install base dependencies, clone the repository and run `npm install` to download development dependencies:

	https://github.com/Angelmmiguel/opalbox-jquery.git
	cd opalbox-jquery
	npm install

All changes must be performed on `src/sass` and `src/js` folders, because `src/css` and `dist` folders are generated automatically with Gulp.

When you finish your changes, execute `gulp` on your terminal and all minified/compiled files will be generated.

# Contribute

To contribute opalBox-jquery:

* Create an issue with the contribution: bug, enhancement (except when create a new theme)
* Fork the repository and make all changes you need (See [develop](#develop))
* Compile all files with `gulp`
* Create a pull request when you finish

# License

Opal is released under MIT License. See [Opal License](https://github.com/opal/opal#license).

OpalBox-Jquery is released under the MIT license. Copyright [@Laux_es](https://twitter.com/Laux_es) ;)
