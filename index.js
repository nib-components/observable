var emitter = require('emitter');
var type = require('type');
var properties = require('tea-properties');

function Observable(obj){
  if( !(this instanceof Observable) ) return mixin(obj);
  if(obj) this.set(obj);
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
  var previous = this.get(key);
  if( previous === val ) return; // No change
  properties.set(this.attributes, key, val);
  if(!silent) {
    this.emit('change', key, val, previous);
    this.emit('change:'+key, val, previous);
    this.emit('change '+key, val, previous);
  }
};

Observable.prototype.get = function(key) {
  return properties.get(this.attributes, key);
};

Observable.prototype.attr = function(name) {
  this[name] = function(val){
    if(val == null) return this.get(name);
    this.set(name, val);
  };
  return this;
};

Observable.reactive = function(reactive) {
  reactive.adapter = {
    get: function(obj, attr){
      if( typeof obj[attr] === 'function' ) {
        return obj[attr]();
      }
      return obj.get(attr);
    },
    set: function(obj, attr, value){
      obj.set(attr, value);
    },
    subscribe: function(obj, attr, fn){
      obj.on('change ' + attr, fn);
    },
    unsubscribe: function(obj, attr, fn){
      obj.off('change ' + attr, fn);
    }
  };
};

module.exports = Observable;
