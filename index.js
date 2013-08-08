var emitter = require('emitter');
var type = require('type');

function Observable(obj){
  if( !(this instanceof Observable) ) return mixin(obj);
  this.set(obj);
};

emitter(Observable.prototype);

function mixin(obj) {
  for (var key in Observable.prototype) {
    obj[key] = Observable.prototype[key];
  }
  return obj;
}

Observable.prototype.set = function(key, value, options) {
  this.attributes = this.attributes || {};
  var self = this;
  options = options || {};
  if( type(key) === "object" ) {
    options = value;
    Object.keys(key).forEach(function(name){
      self._set(name, key[name], options);
    });
  }
  else {
    this._set(key, value, options);
  }
  return this;
};

Observable.prototype._set = function(key, val, options) {
  this.attributes = this.attributes || {};
  options = options || {};
  var silent = options.silent || false;
  var previous = this.attributes[key];
  if( previous === val ) return; // No change
  this.attributes[key] = val;
  if(!silent) {
    this.emit('change', key, val, previous);
    this.emit('change:'+key, val, previous);
    this.emit('change '+key, val, previous);
  }
};

Observable.prototype.get = function(key) {
  return this.attributes[key];
};

module.exports = Observable;