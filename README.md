# write-json [![NPM version](https://badge.fury.io/js/write-json.svg)](http://badge.fury.io/js/write-json)

> Write a JSON to file disk, also creates directories in the dest path if they don't already exist.

## Install with [npm](npmjs.org)

```bash
npm i write-json --save
```


## Usage

```js
var writeJson = require('write-json'); 

// async
writeJson('foo.json', {abc: 'xyz'}, function(err) {
  if (err) console.log(err);
});

// sync
writeJson.sync('foo.json', , {abc: 'xyz'});
```

## Related
 * [delete](https://github.com/jonschlinkert/delete): Delete files and folders and any intermediate directories if they exist (sync and async).
 * [write](https://github.com/jonschlinkert/write): Write files to disk, creating intermediate directories if they don't exist.
 * [write-yaml](https://github.com/jonschlinkert/write-yaml): Write YAML. Converts JSON to YAML writes it to the specified file.
 * [read-yaml](https://github.com/jonschlinkert/read-yaml): Very thin wrapper around js-yaml for directly reading in YAML files.
 * [read-json](https://github.com/azer/read-json): Reads and parses a JSON file.
 * [read-data](https://github.com/jonschlinkert/read-data): Read JSON or YAML files.

## Running tests
Install dev dependencies:

```bash
npm i -d && npm test
```

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/write-json/issues)

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

## License
Copyright (c) 2015 Jon Schlinkert  
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on April 07, 2015._
<!-- deps:mocha -->
