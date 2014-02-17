if require?
  ogre= require '../dist/ogre' unless ogre?
  chai= require 'chai' unless chai?
  expect = chai.expect
else
  throw "Dependency not met: ogre" unless ogre?
  throw "Dependency not met: chai"  unless chai?
  throw "Dependency not met: expect"  unless expect?
