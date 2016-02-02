Backbone Singleton Collection
==============================

![Version 0.1.0](https://img.shields.io/badge/Version-0.1.0-blue.svg)

> Overrides `fetch` to only fetch one time and provides status properties: `hasFetched`, `isFetching`.

If the SingletonCollection is fetched multiple times while waiting for the server to respond, only one fetch request will be submitted while all `success` methods will be queued up and called when fetch is complete.

## Methods

### `fetch({update: true, success:successFn})`

A normal backbone fetch request with options.

> Pass `{force:true}` to force a new fetch from the server

### `fetch(successFn)`

If no fetch options are needed, you can pass a `success` callback directly.


### `reload(successFn)`

A `reload` method can be called to force a new server fetch. It is a shortcut for calling `fetch({force: true: success: successFn})`

## License

MIT © [Kevin Jantzer](http://kevinjantzer.com)
