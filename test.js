'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var writeJson = require('./');
var del = require('delete');

describe('write-json', function() {
  afterEach(function(cb) {
    del('actual', cb);
  });

  describe('async', function() {
    it('should write JSON asyncronously', function(cb) {
      var expected = {foo: {bar: "baz"} };
      writeJson('actual/test.json', expected, function(err) {
        if (err) return cb(err);

        fs.readFile('actual/test.json', 'utf8', function(err, res) {
          if (err) return cb(err);
          assert.deepEqual(JSON.parse(res), expected);
          cb();
        });
      });
    });

    it('should take additional JSON.stringify args', function(cb) {
      var data = {foo: {bar: "baz"}};
      var expected = JSON.stringify({foo: {bar: "baz"}}, null, 0);
      writeJson('actual/test.json', data, null, 0, function(err) {
        if (err) return cb(err);

        fs.readFile('actual/test.json', 'utf8', function(err, res) {
          if (err) return cb(err);
          assert.equal(res, expected);
          cb();
        });
      });
    });

    it('should take JSON.stringify args as an options object', function(cb) {
      var data = {foo: {bar: "baz"}};
      var expected = JSON.stringify({foo: {bar: "baz"}}, null, 2);
      writeJson('actual/test.json', data, {space: 2}, function(err) {
        if (err) return cb(err);

        fs.readFile('actual/test.json', 'utf8', function(err, res) {
          if (err) return cb(err);
          assert.equal(res, expected);
          cb();
        });
      });
    });

    it('should return a promise if no callback is passed', function(cb) {
      var expected = {foo: {bar: "baz"} };
      writeJson('actual/test.json', expected)
        .then(function() {
          fs.readFile('actual/test.json', 'utf8', function(err, res) {
            if (err) return cb(err);
            assert.deepEqual(JSON.parse(res), expected);
            cb();
          });
        })
        .catch(cb);
    });
  });

  describe('promise', function() {
    it('should return a promise', function(cb) {
      var expected = {foo: {bar: "baz"} };

      writeJson.promise('actual/test.json', expected)
        .then(function() {
          fs.readFile('actual/test.json', 'utf8', function(err, res) {
            if (err) return cb(err);
            assert.deepEqual(JSON.parse(res), expected);
            cb();
          });
        })
        .catch(cb);
    });

    it('should take additional JSON.stringify args', function(cb) {
      var data = {foo: {bar: "baz"}};
      var expected = JSON.stringify({foo: {bar: "baz"}}, null, 0);
      writeJson('actual/test.json', data, null, 0)
        .then(function() {
          fs.readFile('actual/test.json', 'utf8', function(err, res) {
            if (err) return cb(err);
            assert.equal(res, expected);
            cb();
          });
        })
        .catch(cb);
    });

    it('should take JSON.stringify args as an options object', function(cb) {
      var data = {foo: {bar: "baz"}};
      var expected = JSON.stringify({foo: {bar: "baz"}}, null, 2);
      writeJson('actual/test.json', data, {space: 2})
        .then(function() {
          fs.readFile('actual/test.json', 'utf8', function(err, res) {
            if (err) return cb(err);
            assert.equal(res, expected);
            cb();
          });
        })
        .catch(cb);
    });
  });

  describe('stream', function() {
    it('should write a JSON file using .stream', function(cb) {
      fs.createReadStream(path.resolve(__dirname, 'package.json'))
        .pipe(writeJson.stream('actual/test.json'))
        .on('close', cb);
    });
  });

  describe('sync', function() {
    it('should write JSON syncronously', function() {
      var expected = {foo: {bar: "baz"} };
      writeJson.sync('actual/test.json', expected);
      var res = fs.readFileSync('actual/test.json', 'utf8');
      assert.deepEqual(JSON.parse(res), expected);
    });

    it('should pass additional args to JSON.stringify', function() {
      var expected = {foo: {bar: "baz"} };
      writeJson.sync('actual/test.json', expected, null, 0);
      var res = fs.readFileSync('actual/test.json', 'utf8');
      assert.deepEqual(JSON.parse(res), expected);
    });

    it('should take a replacer function on the args', function() {
      var expected = {foo: {bar: "baz"} };
      var count = 0;

      writeJson.sync('actual/test.json', expected, function(key, value) {
        count++;
        return value;
      }, 0);

      var res = fs.readFileSync('actual/test.json', 'utf8');
      assert.deepEqual(JSON.parse(res), expected);
      assert(count >= 1);
    });

    it('should take a replacer function on the options', function() {
      var expected = {foo: {bar: "baz"} };
      var count = 0;

      writeJson.sync('actual/test.json', expected, {
        replacer: function(key, value) {
          count++;
          return value;
        }
      }, 0);

      var res = fs.readFileSync('actual/test.json', 'utf8');
      assert.deepEqual(JSON.parse(res), expected);
      assert(count >= 1);
    });
  });
});
