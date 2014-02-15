
describe 'Ogre Dataset API', ->

  describe '.path', ->
    xit '.path'

  describe '.get()', ->

    xit '.get() returns clone of source data'
    xit '.get( path )'
    xit '.get( or:default )'
    xit '.get( path, or:default )'

  describe '.set()', ->
    xit '.set( path, value )'
    xit '.set( path, value, silent:yes )'
    xit '.set( value )'
    xit '.set( value, silent:yes )'
    xit '.set( value, merge:no )'
    xit '.set( value, insert:pos )'
    xit '.set( value, append:yes )'

  describe '.onChange()', ->
    xit '.onChange( callback )'
    xit '.onChange( path, callback )'


  describe '.stopListening()', ->
    xit '.stopListening()'

  describe '.stopListeningAt()', ->
    xit '.stopListeningAt()'

  describe '.hasChanged()', ->
    xit '.hasChanged()'

  describe '.cursor()', ->
    xit '.cursor( path ) Returns a cursor to sub-path (same API as Dataset, scoped to new path)'
    xit '.cursor( path, readonly ) Returns a cursor to sub-path that ignores calls to .set()'

  describe '.map()', ->
    xit '.map()'

  describe '.exists()', ->
    xit '.exists()'

  describe '.isNull()', ->
    xit '.isNull()'

  describe '.isEmpty()', ->
    xit '.isEmpty()'

  describe '.isMissing()', ->
    xit '.isMissing()'

  describe '.isNotEmpty()', ->
    xit '.isNotEmpty()'

  describe '.listenerCount()', ->
    xit '.listenerCount()'

  describe '._listenerSummary()', ->
    xit '._listenerSummary()'

  describe '.dispose()', ->
    xit '.dispose()'

  describe "ChangeEvent", ->
    xit '{path, value, newValue}'





describe 'Cursor API', ->
