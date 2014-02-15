// Generated by CoffeeScript 1.7.1
var assert, chai, counts, data, expect, ogre, page, prof, state, test_graph, vehicles, _;

if (typeof require !== "undefined" && require !== null) {
  if (typeof ogre === "undefined" || ogre === null) {
    ogre = require('../ogre');
  }
  if (typeof _ === "undefined" || _ === null) {
    _ = require('underscore');
  }
  if (typeof chai === "undefined" || chai === null) {
    chai = require('chai');
  }
  expect = chai.expect;
} else {
  if (ogre == null) {
    throw "Dependency not met: ogre";
  }
  if (_ == null) {
    throw "Dependency not met: _";
  }
  if (chai == null) {
    throw "Dependency not met: chai";
  }
  if (expect == null) {
    throw "Dependency not met: expect";
  }
}

describe('Ogre Dataset API', function() {
  describe('.path', function() {
    return xit('.path');
  });
  describe('.get()', function() {
    xit('.get() returns clone of source data');
    xit('.get( path )');
    xit('.get( or:default )');
    return xit('.get( path, or:default )');
  });
  describe('.set()', function() {
    xit('.set( path, value )');
    xit('.set( path, value, silent:yes )');
    xit('.set( value )');
    xit('.set( value, silent:yes )');
    xit('.set( value, merge:no )');
    xit('.set( value, insert:pos )');
    return xit('.set( value, append:yes )');
  });
  describe('.onChange()', function() {
    xit('.onChange( callback )');
    return xit('.onChange( path, callback )');
  });
  describe('.stopListening()', function() {
    return xit('.stopListening()');
  });
  describe('.stopListeningAt()', function() {
    return xit('.stopListeningAt()');
  });
  describe('.hasChanged()', function() {
    return xit('.hasChanged()');
  });
  describe('.cursor()', function() {
    xit('.cursor( path ) Returns a cursor to sub-path (same API as Dataset, scoped to new path)');
    return xit('.cursor( path, readonly ) Returns a cursor to sub-path that ignores calls to .set()');
  });
  describe('.map()', function() {
    return xit('.map()');
  });
  describe('.exists()', function() {
    return xit('.exists()');
  });
  describe('.isNull()', function() {
    return xit('.isNull()');
  });
  describe('.isEmpty()', function() {
    return xit('.isEmpty()');
  });
  describe('.isMissing()', function() {
    return xit('.isMissing()');
  });
  describe('.isNotEmpty()', function() {
    return xit('.isNotEmpty()');
  });
  describe('.listenerCount()', function() {
    return xit('.listenerCount()');
  });
  describe('._listenerSummary()', function() {
    return xit('._listenerSummary()');
  });
  describe('.dispose()', function() {
    return xit('.dispose()');
  });
  return describe("ChangeEvent", function() {
    return xit('{path, value, newValue}');
  });
});

describe('Cursor API', function() {});

test_graph = {
  page: {
    current: 'home',
    params: null
  },
  profile: {
    name: null,
    email: null
  },
  prefs: {
    firstRun: false
  }
};

describe('Dataset', function() {
  beforeEach(function() {
    this.graph = _.clone(test_graph);
    return this.data = ogre(this.graph);
  });
  it('should exist', function() {
    return expect(this.data).to.exist;
  });
  it('should return cloned data by default', function() {
    return expect(this.data.get()).to.not.be.equal(this.graph);
  });
  it('should optionally return source data', function() {
    return expect(this.data.get({
      clone: false
    })).to.equal(this.graph);
  });
  it('should allow graph access via path', function() {
    return expect(this.data.get('page.current')).to.equal('home');
  });
  it('should return default value if path doesn\'t exist', function() {
    expect(this.data.get('made.up.key', {
      or: 'DEFAULT'
    })).to.equal('DEFAULT');

    /* Should return default value for null values in graph as well */
    return expect(this.data.get('page.params', {
      or: 'DEFAULT'
    })).to.equal('DEFAULT');
  });
  it('should not return default value if path does exist', function() {
    return expect(this.data.get('page.current', {
      or: 'DEFAULT'
    })).to.not.equal('DEFAULT');
  });
  it('should allow setting values at arbitrary paths', function() {
    expect(this.data.get('tmp.new.key')).to.not.exist;
    this.data.set('tmp.new.key', 'VALUE');
    return expect(this.data.get('tmp.new.key')).to.equal('VALUE');
  });
  return it('should not allow setting non-collection values directly to dataset', function() {
    expect(this.data.get({
      clone: false
    })).to.equal(this.graph);
    this.data.set('VALUE');
    return expect(this.data.get({
      clone: false
    })).to.equal(this.graph);
  });
});

state = {
  page: {
    current: 'home',
    params: null
  },
  profile: {
    details: {
      firstname: 'Matt',
      lastname: 'McCray'
    }
  },
  vehicles: [
    {
      name: 'corvette'
    }, {
      name: 'jeep'
    }
  ],
  app: {
    data: {
      codes: {
        states: null,
        makes: null
      }
    }
  }
};

data = ogre(state);

prof = data.cursor('profile.details');

page = data.cursor('page');

vehicles = data.cursor('vehicles');

counts = {
  data: 0,
  profile: 0,
  page: 0,
  vehicles: 0,
  assertions: 0
};

assert = function(condition, msg) {
  counts.assertions += 1;
  return expect(condition).to.be["true"];
};

describe('Ogre (old)', function() {
  return it('should do a lot of stuff (misc from inline tests during dev)', function() {
    var codes, d, data2, makes, roCodes, roMakes, roMakes2;
    data.onChange(function(key) {
      return counts.data += 1;
    });
    prof.onChange(function(key) {
      return counts.profile += 1;
    });
    page.onChange(function(key) {
      counts.page += 1;
      assert(page.hasChanged() === true, "page.hasChanged() should be true during a page onChange handler");
      return assert(prof.hasChanged() === false, "prof.hasChanged() should be false during a page onChange handler");
    });
    vehicles.onChange(function(key) {
      return counts.vehicles += 1;
    });
    assert(data.listenerCount() === 1, "Listener count should be 1, is " + (data.listenerCount()));
    assert(data.listenerCount(true) === 4, "Listener count should be 4, is " + (data.listenerCount(true)));
    assert(prof.listenerCount() === 1, "Listener count should be 1, is " + (data.listenerCount()));
    assert(prof.listenerCount(true) === 1, "Listener count should be 1, is " + (data.listenerCount(true)));
    assert(prof.get('firstname') === 'Matt', "firstname should be Matt");
    prof.set('firstname', 'Dog');
    assert(prof.get('firstname') === 'Dog', "firstname should be Dog");
    data.set('profile.details.firstname', 'Dan');
    assert(prof.get('firstname') === 'Dan', "firstname should be Dan");
    prof.stopListening();
    assert(counts.profile === 2, "counts.profile should be 2, is " + counts.profile);
    assert(data.listenerCount() === 1, "Listener count should be 1, is " + (data.listenerCount()));
    assert(data.listenerCount(true) === 3, "Listener count should be 3, is " + (data.listenerCount()));
    assert(prof.listenerCount() === 0, "Listener count should be 0, is " + (data.listenerCount()));
    data.set('profile.details.firstname', 'Sam');
    assert(prof.get('firstname') === 'Sam', "firstname should be Sam");
    assert(counts.profile === 2, "counts.profile should be 2, is " + counts.profile);
    page.set('current', 'about');
    assert(counts.page === 1, "counts.page should be 1, is " + counts.page);
    page.set({
      current: 'other'
    });
    assert(counts.page === 2, "counts.page should be 2, is " + counts.page);
    assert(page.get('current') === 'other', "hash value wasn't set correctly");
    assert(data.get('vehicles.0.name') === 'corvette', "vehicles.0.name should be corvette, is " + (data.get('vehicles.0.name')));
    assert(vehicles.get('0.name') === 'corvette', "vehicles.0.name should be corvette, is " + (vehicles.get('0.name')));
    data.set('vehicles.0.name', 'ferrari');
    assert(data.get('vehicles.0.name') === 'ferrari', "vehicles.0.name should be ferrari, is " + (data.get('vehicles.0.name')));
    assert(vehicles.get('0.name') === 'ferrari', "0.name should be ferrari, is " + (vehicles.get('0.name')));
    vehicles.set('1.name', 'toyota');
    assert(data.get('vehicles.1.name') === 'toyota', "vehicles.1.name should be toyota, is " + (data.get('vehicles.1.name')));
    assert(vehicles.get('1.name') === 'toyota', "1.name should be toyota, is " + (vehicles.get('1.name')));
    vehicles.set([
      {
        name: 'porshe'
      }
    ]);
    assert(data.get('vehicles.0.name') === 'porshe', "vehicles.0.name should be porshe, is " + (data.get('vehicles.0.name')));
    assert(vehicles.get('0.name') === 'porshe', "0.name should be porshe, is " + (vehicles.get('0.name')));
    vehicles.set('1.name', 'tesla');
    assert(data.get('vehicles.1.name') === 'tesla', "vehicles.1.name should be tesla, is " + (data.get('vehicles.1.name')));
    assert(vehicles.get('1.name') === 'tesla', "1.name should be tesla, is " + (vehicles.get('1.name')));
    assert(counts.profile === 2, "counts.profile should be 2, is " + counts.profile);
    assert(counts.page === 2, "counts.page should be 2, is " + counts.page);
    assert(counts.vehicles === 4, "counts.vehicles should be 4, is " + counts.vehicles);
    assert(counts.data === 9, "counts.data should be 9, is " + counts.data);
    assert(data.get('non.existing.path', {
      or: 'gone'
    }) === 'gone', "data.get(path, defaultValue) didn't return the defaultValue!");
    assert(data.listenerCount() === 1, "Listener count should be 1, is " + (data.listenerCount()));
    assert(data.listenerCount(true) === 3, "Listener count should be 3, is " + (data.listenerCount(true)));
    data.stopListening();
    assert(data.listenerCount(true) === 2, "Listener count should be 2, is " + (data.listenerCount(true)));
    assert(prof.listenerCount(true) === 0, "Listener count should be 0, is " + (data.listenerCount(true)));
    data.stopListening(true);
    assert(data.listenerCount() === 0, "Listener count should be 0, is " + (data.listenerCount()));
    d = ogre({
      a: 1,
      b: 1
    });
    d.onChange(function(key) {
      return d.set('a', d.get('a') + 1, null, true);
    });
    d.set('a', 2);
    assert(d.listenerCount() === 1, "Listener count should be 1, but is: " + (d.listenerCount()));
    d.dispose();
    assert(d.listenerCount() === 0, "Listener count should be 0, but is: " + (d.listenerCount()));
    codes = data.cursor('app.data.codes');
    makes = data.cursor('app.data.codes.makes');
    codes.set('test', true);
    assert(codes.get('test') === true, "codes.test should be true, is: " + (codes.get('test')));
    makes.set(['one', 'two']);
    assert(codes.get('makes.length') === 2, "codes.makes.length should be 2, is: " + (codes.get('makes.length')));
    makes.set(null);
    assert(codes.get('makes') === null, "codes.makes should be null, is: " + (codes.get('makes')));
    roCodes = data.cursor('codes', true);
    roCodes.set('makes', 'JUNK');
    assert(roCodes.get('makes') !== 'JUNK', "(ro) codes.makes should not be 'JUNK', is: " + (roCodes.get('makes')));
    roMakes = roCodes.cursor('makes');
    roMakes.set('JUNK');
    assert(roMakes.get() !== 'JUNK', "(ro) codes.makes should not be 'JUNK', is: " + (roMakes.get()));
    roMakes2 = roCodes.cursor('makes', false);
    roMakes2.set('JUNK');
    assert(roMakes2.get() !== 'JUNK', "(ro) codes.makes should not be 'JUNK', is: " + (roMakes2.get()));
    assert(codes.get('makes') === null, "codes.makes should be null, is: " + (codes.get('makes')));
    codes.set('makes', {
      name: 'test'
    });
    assert(codes.get('makes.name') === 'test', "codes.makes.name should be 'test', is: " + (codes.get('makes.name')));
    makes.set(null);
    assert(codes.get('makes') === null, "codes.makes should be null, is: " + (codes.get('makes')));
    makes.set({
      name: 'test'
    });
    assert(codes.get('makes.name') === 'test', "codes.makes.name should be 'test', is: " + (codes.get('makes.name')));
    assert(_.isEqual(makes.map(), ['test']), "Map didn't return the correct value.");
    assert(codes.exists() === true, "code.exists() should be true");
    assert(codes.exists('crap') === false, "code.exists('crap') should be false");
    assert(codes.isEmpty() === false, "code.isEmpty() should be false");
    assert(codes.isEmpty('crap') === true, "code.isEmpty('crap') should be true");
    assert(_.isEqual(state, data.get()), "State should have changed, but didn't!");
    data2 = ogre(state, true);
    console.log("All " + counts.assertions + " tests passed.");
    return data;
  });
});
