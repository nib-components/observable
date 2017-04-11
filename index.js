var emitter = require('emitter');
var type = require('type');
var get = require('lodash/get');
var set = require('lodash/set');

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

  if (val instanceof Object && !(val instanceof Array)) { //we don't want to set each method of an array p.s. objects should not be class objects with methods

    //TODO: what about deleted properties??
    //TODO: what about firing events up the key path?
    var self = this;
    Object.keys(val).forEach(function(childKey) {
      self._set(key+'.'+childKey, val[childKey], options);
    });

  } else {

    set(this.attributes, key, val);

  }

  if(!silent) {
    this.emit('change', key, val, previous);
    this.emit('change:'+key, val, previous);
    this.emit('change '+key, val, previous);
  }

};

Observable.prototype.get = function(key) {
  if (arguments.length === 0) {
    return this.attributes;
  } else {
    return get(this.attributes, key);
  }
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
