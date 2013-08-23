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
