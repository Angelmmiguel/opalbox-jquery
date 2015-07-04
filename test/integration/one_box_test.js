/*
 * Test the generation and run of ruby code in a HTML
 */
describe("A HTML with one OpalBox", function() {
  // Prepare fixtures
  before(function(){
    fixture.setBase('test/fixtures')
  });

  beforeEach(function() {
    this.result = fixture.load('one_box_fix.html');
  });

  afterEach(function() {
    fixture.cleanup();
  });

  // Tests!
  it('should create the HTML structure', function() {
    var rubyCode = $('.ruby-code');
    expect(rubyCode.find('.opbox-header').length).to.equal(1);
    expect(rubyCode.find('.opbox-code').length).to.equal(1);
    expect(rubyCode.find('.opbox-output').length).to.equal(1);
    expect(rubyCode.find('.opbox-execute').length).to.equal(1);
    expect(rubyCode.find('.opbox-result').length).to.equal(1);
  });

  it('should run the Ruby code and get the result', function() {
    var rubyCode = $('.ruby-code');
    rubyCode.find('.opbox-run').click();
    expect(rubyCode.find('.opbox-result').html().replace(/(\r\n|\n|\r|^\s+)/gm,''))
      .to.equal('<p>Hi Hacker</p><p>1</p>');
  });
});