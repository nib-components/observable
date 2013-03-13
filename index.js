var Observable = function(){
  this.attributes = {};
};

_.extend(Observable.prototype, Backbone.Events);

Observable.prototype.set = function(key, value, options) {
  options = options || {};
  
  if( _.isObject(key) === true ) {
    options = value;
    _(key).each(function(value, key) {
      this._set(key, value, options);
    }, this);
  }
  else {
    this._set(key, value, options);
  }

  return this;
};

Observable.prototype._set = function(key, val, options) {
  options = options || {};
  var silent = options.silent || false;
  var previous = this.attributes[key];
  if( previous === val ) return; // No change
  this.attributes[key] = val;

  if(!silent) {
    this.trigger('change', key, val, previous);
    this.trigger('change:'+key, val, previous);    
  }
};

Observable.prototype.get = function(key) {
  return this.attributes[key];
};

Observable.prototype.each = function(callback, context) {
  _(this.attributes).each(callback, context);
};

module.exports = Observable;