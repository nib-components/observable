observable
==========

Get and set attributes and watch for changes. The simplest type of model there is. Will work
with Reactive and emits both Backbone-style and Reactive-style events ('change:foo' vs 'change foo').

## Installation

Component:

    component install anthonyshort/observable

npm:

    npm install observable-component

## Usage

```js
var Observable = require('observable');
var model = new Observable();

model.on('change color', function(val, previous){
  console.log('Color was ' + previous + ', now it is ' + val);
});

model.set('color', 'red'); // Color was undefined, now it is red
model.set('color', 'blue'); // Color was red, now it is blue

// Set many at once
model.set({
  color: 'green',
  background: 'lightGreen'
});

// Set attributes silently
model.set('color', 'red', { silent: true });

// Get the attribute
model.get('color') // red
```

You can mix it in too:

```js
function Thingy(){
   this.set('color', 'red');
}

Observable(Thingy.prototype);

var thing = new Thingy();
thing.get('color') // 'red'
```

Create attributes that work with Reactive:

```js
var model = new Observable();

model.attr('name')
    .attr('surname')
    .attr('title');
    
model.name('Barry');
model.name(); // Barry
```

Access deep object properties using [tea-properties](https://github.com/qualiancy/tea-properties):

```js
var model = new Observable();

model.on('change foo.bar.baz', function(val){
   console.log(val);
});

model.set('foo.bar.baz', 'doobie');
model.get('foo.bar.baz'); // 'doobie'
```
