/*
 * Generate an HTML box to write ruby code an execute it on output.
 * This plugin uses http://opalrb.org/ to compile the Ruby code into
 * javascript.
 *
 * @author Angel M (@laux_es)
 * @version 1.0.0
 * @license MIT License
 */
;(function ($, window, document, undefined) {
  // Plugin name
  var pluginName = 'opalBox';

  function OpalBox( element, options ){
    // Store base
    this.element = element;
    this._name = pluginName;
    this.requirements = false;
    this._defaults = $.fn.opalBox.defaults;

    // Get options
    this.options = $.extend( {}, this._defaults, options );

    // Init the plugin
    this.init();
  }

  // Avoid Plugin.prototype conflicts
  $.extend(OpalBox.prototype, {
    // Initialization
    init: function () {
      this._initOpal();
      this._createBox();
      this._buildCache();
      this._bindEvents();
    },
    // Remove plugin instance.
    destroy: function() {
      this._unbindEvents();
      this.$element.removeData();
    },
    // Load compile OpalBox library
    _initOpal: function() {
      if (typeof Opal !== 'object' ||
          typeof Opal.modules["opal-parser"] !== 'function'){
        this._notLoadedError();
      } else {
        this.requirements = true;
        Opal.load('opal-parser');
      }
    },
    // Create the HTML elements
    _createBox: function() {
      // Base element
      this.$element = $(this.element);
      this.code = this.$element.text();
      // Show selected theme
      this.$element.addClass(this.options.theme + ' opbox');
      // Base structure
      this.$element.html("");
      this.$element.append(this._baseHTML());
    },
    // Base HTML of opalBox
    _baseHTML: function() {
      return '' +
        '<div class="opbox-header">' + this.options.title + '</div>' +
        '<div class="opbox-code-wrap">' +
          '<textarea class="opbox-code">' + this.code + '</textarea>' +
        '</div>' +
        '<div class="opbox-output">' +
          '<div class="opbox-execute">' +
            '<button class="opbox-run">Run</button>' +
            '<div class="opbox-loader"></div>' +
            '<div class="opbox-loader delayed"></div>' +
          '</div>' +
          '<div class="opbox-result">' +
            '<p class="empty">' + this.options.result + '</p>' +
          '</div>' +
        '</div>';
    },
    // Cache DOM nodes for performance
    _buildCache: function () {
      // Execute button
      this.$execute = this.$element.find('.opbox-run');
      // Loader
      this.$loader = this.$element.find('.opbox-loader');
      // Code area
      this.$code = this.$element.find('.opbox-code');
      // Result
      this.$result = this.$element.find('.opbox-result');
      // Standard console log
      this.standardLog = window.console.log;
    },
    // Bind events that trigger methods
    _bindEvents: function() {
      var self = this;
      // Execute the code
      self.$execute.on('click' + '.' + self._name, function() {
        self.execute.call(self);
      });
      // Adjust size of the box
      if (self.options.autoadjust) {
        self.$code.on('input', function() {
          // Force the height of the box
          $(this).height( this.scrollHeight - 25 );
        });
        // Call event to Adjust
        self.$code.trigger('input');
      }
    },
    // Show an error because Opal libraries are not loaded.
    _notLoadedError: function() {
      console.warn("Required Opal libraries are not loaded");
    },
    // Unbind events that trigger methods
    unbindEvents: function() {
      // Unbind click execute event.
      this.$execute.off('.' + this._name);
    },
    // Compile the code using Opal
    compile: function() {
      return Opal.compile(this.$code.val());
    },
    // Execute the code and show the output
    execute: function() {
      if (!this.requirements) {
        this._notLoadedError();
        this.$result.html("<p class='empty'>Libraries are not loaded.<p>");
        return;
      }

      // Show button as "Running"
      this._setButtonLoading();

      // Initialize
      var compiled = this.compile(),
          error,
          res;

      // Show a loading text
      this.$result.html("");

      // Modify the log to capture "puts" sentences
      try {
        var self = this;
        // Capture puts sentences
        window.console.log = function(msg){
          self._showResult(msg);
        };
        res = eval(compiled);
      } catch(compiled_error) {
        error = compiled_error.message;
      }
      // Return to normal console
      window.console.log = this.standardLog;

      // Show result
      if (error === undefined){
        this._showResult(res);
      } else {
        this._showResult(error, true);
      }

      // On complete
      this._setButtonRun();
      this.callback();
    },
    // Set the button as "Running"
    _setButtonLoading: function() {
      this.$execute.html('&nbsp;');
      this.$loader.show();
    },
    // Set the button as "Normal"
    _setButtonRun: function() {
      this.$loader.hide();
      this.$execute.html('Run');
    },
    // Show errors and results
    _showResult: function(msg, err){
      if (err === true){
        this.$result.append("<p class='opbox-error'>" + msg + "</p>");
      } else {
        this.$result.append("<p>" + msg + "</p>");
      }
    },
    callback: function() {
      // Cache onComplete option
      var onComplete = this.options.onComplete;
      if ( typeof onComplete === 'function' ) {
        // Callback when run the code
        onComplete.call(this.element);
      }
    }
  });

  $.fn.opalBox = function (options) {
    this.each(function() {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new OpalBox(this, options));
      }
    });
    // Return self Jquery object
    return this;
  };

  // Default options!
  $.fn.opalBox.defaults = {
    // Theme of the opalBox
    theme: 'light',
    // Listener when compile and show the data
    onComplete: null,
    // Title of the block
    title: 'Ruby code',
    // Placeholder when there aren't any result
    result: 'Result will appear here',
    // Autoadjust height of the textarea to the code
    autoadjust: false
  };

})( jQuery, window, document );
