describe("Engine", function() {
  var engine;

  beforeEach(function() {
    engine = new Engine();
  });

  it("should have an initial state", function() {
    expect(engine.state).toEqual(1);
    expect(engine.state).toNotEqual(2);
  });

  it("should have a title of ''", function() {
    engine.setTitle('Aliens');
    expect(engine.title).toContain('Aliens');
  });

});
