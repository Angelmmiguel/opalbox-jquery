/*
 * Test to check personalized config. It checks callback, title, theme,
 * and result placeholdre.
 */
describe("An OpalBox with personalized config", function() {
  // Number of callback is called, title, theme and placeholder
  var calls = 0,
      title = 'Ruby Rocks!',
      theme = 'dark',
      result_placeholder = 'Magic!';

  // Function of callback
  function callback() { calls++; }

  // Prepare HTML
  beforeEach(function() {
    calls = 0;
    jQuery('body').html("");
    jQuery('body').append('<div class="ruby-code">return 1</div>');
    $('.ruby-code').opalBox({
      title: title,
      theme: theme,
      result: result_placeholder,
      onComplete: callback
    });
  });

  // Tests!
  it('changes title', function() {
    var rubyCode = $('.ruby-code');
    expect(rubyCode.find('.opbox-header').html()).to.equal(title);
  });

  it('changes default theme', function() {
    var rubyCode = $('.ruby-code');
    expect(rubyCode.hasClass(theme)).to.equal(true);
  });

  it('changes result\'s placeholder', function() {
    var rubyCode = $('.ruby-code');
    expect(rubyCode.find('.opbox-result p.empty').html()).to.equal(result_placeholder);
  });

  it('calls N times when click on run', function() {
    var rubyCode = $('.ruby-code');
    // Call 5 times
    for (i = 1; i <= 5; i++){
      rubyCode.find('.opbox-run').click();
      expect(calls).to.equal(i);
    }
  });
});