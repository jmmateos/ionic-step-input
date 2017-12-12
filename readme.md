ionic-step-input
==================

A custom user input for ionic 1. The input is somewhat similar to a native number-input.


## Features

- min/max values
- custom increment/decrement icons

## Usage & configuration


Directive usage:
`<ionic-step-input ng-model="foo" step-input-options="options"></ionic-step-input>`

Options:
```
options = {
  decrease: 'ion-chevron-left',   // ionicons icon class
  increase: 'ion-chevron-right',  // ionicons icon class
  minValue: 0,                    // min. value
  maxValue: 999,                  // max. value
};
```

## License

ionic-step-input is released under the [MIT license]
