if require?
  ogre= require '../ogre' unless ogre?
  _= require 'underscore' unless _?
  chai= require 'chai' unless chai?
  expect = chai.expect
else
  throw "Dependency not met: ogre" unless ogre?
  throw "Dependency not met: _"  unless _?
  throw "Dependency not met: chai"  unless chai?
  throw "Dependency not met: expect"  unless expect?
