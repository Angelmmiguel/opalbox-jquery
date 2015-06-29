/*
 * Generate an HTML box to write ruby code an execute it on output.
 * This plugin uses http://opalrb.org/ to compile the Ruby code into
 * javascript.
 *
 * @author Angel M (@laux_es)
 * @version 0.0.1
 * @license MIT License
 */
;(function ($, window, document, undefined) {
  // Plugin name
  var pluginName = 'opalBox';

  function OpalBox( element, options ){
    // Store base
    this.element = element;
    this._name = pluginName;
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
      this._createBox();
      this._buildCache();
      this._bindEvents();
    },
    // Remove plugin instance.
    destroy: function() {
      this._unbindEvents();
      this.$element.removeData();
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
      var credit = '';

      return ' \
        <div class="opbox-header">' + this.options.title + credit +'</div> \
        <div class="opbox-code-wrap"> \
          <textarea class="opbox-code">' + this.code + '</textarea> \
        </div> \
        <div class="opbox-output"> \
          <div class="opbox-execute"> \
            <button class="opbox-run">Run</button> \
          </div> \
          <div class="opbox-result"> \
            <p class="empty">' + this.options.result + '</p> \
          </div> \
        </div>'
    },
    // Cache DOM nodes for performance
    _buildCache: function () {
      // Execute button
      this.$execute = this.$element.find('.opbox-run');
      // Code area
      this.$code = this.$element.find('.opbox-code');
      // Result
      this.$result = this.$element.find('.opbox-result');
    },
    // Bind events that trigger methods
    _bindEvents: function() {
      var self = this;
      // Execute the code
      self.$execute.on('click' + '.' + self._name, function() {
        self.execute.call(self);
      });
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
      var compiled = this.compile(),
          error,
          res;
      // Modify the log to capture "puts" sentences
      // ...

      // Clear result form
      this.$result.html("");

      try {
        res = eval(compiled);
      } catch(compiled_error) {
        error = compiled_error.message;
      }

      if (error === undefined){
        this._showResult(res);
      } else {
        this._showResult(error, true);
      }

      // On complete
      this.callback();
    },
    // Show errors and results
    _showResult: function(msg, err){
      if (err === true){
        this.$result.append("<p style='color: red'>" + msg + "</p>");
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
    result: 'Result will appear here'
  };

})( jQuery, window, document );