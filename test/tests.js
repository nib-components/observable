var Observable = require('observable');
var assert = require('assert');

describe('Observable', function(){

  beforeEach(function(){
    this.obj = new Observable();
  });

  it('should set key and value', function(){
    this.obj.set('foo', 'bar');
    assert( this.obj.attributes.foo === 'bar' );
  });

  it('should set key and value with options', function(){
    this.obj.set('foo', 'bar', { silent: true });
    assert( this.obj.attributes.foo === 'bar' );
  });

  it('should set key and value with a value object', function(){
    this.obj.set('foo', { 'bar' : 'bar' });
    assert( this.obj.attributes.foo.bar === 'bar' );
  });

  it('should set key and value with an array in a value object', function(){
    this.obj.set('foo', { 'bar' : [] });
    console.log(this.obj.attributes.foo.bar);
    assert(this.obj.attributes.foo.bar instanceof Array);
    assert.deepEqual(this.obj.attributes.foo.bar, []);
  });

  it('should set key and value with an object and options', function(){
    this.obj.set({ 'foo' : 'bar' }, { silent: true });
    assert( this.obj.attributes.foo === 'bar');
  });

  it('should be silent with an object', function(){
    var match = false;
    this.obj.on('change:foo', function(){
      match = true;
    });
    this.obj.set({ 'foo' : 'bar' }, { silent: true });
    assert( match === false );
  });

  it('should be silent with a key value', function(){
    var match = false;
    this.obj.on('change:foo', function(){
      match = true;
    });
    this.obj.set('foo', 'bar', { silent: true });
    assert( match === false );
  });

  it('should emit reactive-style events', function(){
    var match = false;
    this.obj.on('change foo', function(){
      match = true;
    });
    this.obj.set('foo', 'bar');
    assert(match === true);
  });

  it('should set properties in constructor', function(){
    var obj = new Observable({ 'foo':'bar' });
    assert( obj.get('foo') === 'bar' );
  });

  it('should work as a mixin', function(){
    var obj = {};
    Observable(obj);
    obj.set('foo', 'bar');
    assert( obj.get('foo') === 'bar' );
  });

  it('should set nested properties', function(){
    this.obj.set('foo.bar', 'baz');
    assert( this.obj.attributes.foo.bar === 'baz' );
  });

  it('should get nested properties', function(){
    this.obj.set('foo.bar', 'baz');
    assert( this.obj.get('foo.bar') === 'baz' );
  });

  it('should emit change events for nested properties', function(){
    var match = false;
    this.obj.set('foo.bar', 'baz');
    this.obj.on('change foo.bar', function(){
      match = true;
    });
    this.obj.set('foo.bar', 'zab');
    assert( match === true );
  });

  it('should emit change events for nested properties on value objects', function(){
    var match = false;
    var parent = false;
    this.obj.on('change foo.bar', function(){
      match = true;
    });
    this.obj.on('change foo', function(){
      parent = true;
    });
    this.obj.set('foo', {bar: 'foo'});
    assert( match === true );
    assert( parent === true );
  });

  it('should create attributes', function(){
    this.obj.attr('name').set('name', 'Barry');
    assert( this.obj.name() === 'Barry' );
  });

  it('should create setters', function(){
    this.obj.attr('name').name('Barry');
    assert( this.obj.name() === 'Barry' );
  });

  it('should emit events with setters', function(){
    var match = false;
    this.obj.on('change name', function(){
      match = true;
    });
    this.obj.attr('name').name('Barry');
    assert( match === true );
  });

});