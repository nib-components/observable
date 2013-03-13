var Observable = component('observable');

describe('Observable', function(){

  beforeEach(function(){
    this.obj = new Observable();
  });

  it('should set key and value', function(){
    this.obj.set('foo', 'bar');
    expect(this.obj.attributes.foo).to.equal('bar');
  });

  it('should set key and value with options', function(){
    this.obj.set('foo', 'bar', { silent: true });
    expect(this.obj.attributes.foo).to.equal('bar');
  });

  it('should set key and value with an object', function(){
    this.obj.set({ 'foo' : 'bar' });
    expect(this.obj.attributes.foo).to.equal('bar');
  });

  it('should set key and value with an object and options', function(){
    this.obj.set({ 'foo' : 'bar' }, { silent: true });
    expect(this.obj.attributes.foo).to.equal('bar');
  });

  it('should be silent with an object', function(){
    var match = false;
    this.obj.on('change:foo', function(){
      match = true;
    });
    this.obj.set({ 'foo' : 'bar' }, { silent: true });
    expect(match).to.equal(false);
  });

  it('should be silent with a key value', function(){
    var match = false;
    this.obj.on('change:foo', function(){
      match = true;
    });
    this.obj.set('foo', 'bar', { silent: true });
    expect(match).to.equal(false);
  });

});