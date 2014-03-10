unless _?.isEqual?
  _= 
    isEqual: require('lodash-node/compat/objects/isEqual')

test_graph= ->
  page:
    current: 'home'
    params: null
  profile:
    name: null
    email: null
  prefs:
    firstRun: false

describe 'Dataset', ->
  [page_cursor, source_graph, dataset]= []

  beforeEach ->
    # console.log "@@@@@@@"
    source_graph= test_graph()
    dataset= ogre source_graph

    # window.graph= source_graph
    # window.ogdata= dataset

  it 'should exist', ->
    expect( 
      dataset
    ).to.exist

  it 'should return cloned data by default', ->
    expect( 
      dataset.get() 
    ).to.not.be.equal source_graph

  it 'should optionally return source data', ->
    expect( 
      dataset.get clone:no
    ).to.equal source_graph

  it 'should allow graph access via path', ->
    expect( 
      dataset.get 'page.current'
    ).to.equal 'home'

  it 'should return default value if path doesn\'t exist', ->
    expect( 
      dataset.get 'made.up.key', or:'DEFAULT'
    ).to.equal 'DEFAULT'
    ### Should return default value for null values in graph as well ###
    expect( 
      dataset.get 'page.params', or:'DEFAULT'
    ).to.equal 'DEFAULT'

  it 'should not return default value if path does exist', ->
    expect( 
      dataset.get 'page.current', or:'DEFAULT'
    ).to.not.equal 'DEFAULT'


  it 'should allow setting values at arbitrary paths', ->
    expect( 
      dataset.get 'tmp.new.key'
    ).to.not.exist
    
    dataset.set 'tmp.new.key', 'VALUE'
    
    expect(
      dataset.get 'tmp.new.key'
    ).to.equal 'VALUE'

  it 'should not allow setting non-collection values directly to dataset', ->
    expect(
      dataset.get clone:no
    ).to.equal source_graph
    
    dataset.set 'VALUE'
    
    expect(
      dataset.get clone:no
    ).to.equal source_graph

  it 'should trigger change event when setting arrays with keys', ->
    eventFired= 0
    dataset.onChange -> eventFired += 1

    dataset.set 'my.path', []
    expect(
      eventFired
    ).to.equal 1

    dataset.set 'my.path', []
    expect(
      eventFired
    ).to.equal 1


    dataset.set 'my.path', null
    expect(
      eventFired
    ).to.equal 2


    dataset.set 'my.path', ['test']
    expect(
      eventFired
    ).to.equal 3

    dataset.set 'my.path', []
    expect(
      eventFired
    ).to.equal 4

  it 'should trigger change event when setting arrays without keys', ->
    eventFired= 0
    dataset.onChange -> eventFired += 1

    dataset.set []
    expect(
      eventFired
    ).to.equal 1

    dataset.set []
    expect(
      eventFired
    ).to.equal 1


    dataset.set null
    expect(
      eventFired
    ).to.equal 2


    dataset.set ['test']
    expect(
      eventFired
    ).to.equal 3

    dataset.set []
    expect(
      eventFired
    ).to.equal 4


  describe "Edits locked to root (no cursor updates)", ->
    [lockeddatasetset, profile_cursor, change_count, profile_change_count]= []

    beforeEach ->
      lockeddatasetset= ogre source_graph, yes
      profile_cursor= lockeddatasetset.cursor 'profile'
      
      change_count= 0
      profile_change_count= 0
      
      lockeddatasetset.onChange -> change_count += 1
      profile_cursor.onChange -> profile_change_count += 1

    it 'should allow edits from dataset root.', ->
      
      lockeddatasetset.set 'page', null
      lockeddatasetset.set 'other', 'stuff'

      expect(
        change_count
      ).to.equal 2

    it 'should not allow edits from cursors', ->
      
      profile_cursor.set 'misc', 'data'
      profile_cursor.set null

      expect(
        change_count
      ).to.equal 0
      expect(
        profile_change_count
      ).to.equal 0

    it 'should trigger onChange handlers for cursor', ->

      lockeddatasetset.set 'profile.misc', 'from root'
      
      expect(
        change_count
      ).to.equal 1
      expect(
        profile_change_count
      ).to.equal 1

      ### It should allow getting scoped data from cursor ###
      expect(
        profile_cursor.get('misc')
      ).to.equal 'from root'

      expect(
        lockeddatasetset.get('profile.misc')
      ).to.equal 'from root'



  describe 'ogre.cursor', ->
    beforeEach ->
      page_cursor= dataset.cursor('page')
    
    afterEach ->
      page_cursor.dispose()

    it 'should trigger change event when setting arrays with keys', ->
      eventFired= 0
      page_cursor.onChange -> eventFired += 1

      page_cursor.set 'sub.key', []
      expect(
        eventFired
      ).to.equal 1

      page_cursor.set 'sub.key', []
      expect(
        eventFired
      ).to.equal 1

      page_cursor.set 'sub.key', null
      expect(
        eventFired
      ).to.equal 2

      page_cursor.set 'sub.key', ['test']
      expect(
        eventFired
      ).to.equal 3

      page_cursor.set 'sub.key', []
      expect(
        eventFired
      ).to.equal 4

    it 'should trigger change event when setting arrays without keys', ->
      eventFired= 0
      page_cursor.onChange -> eventFired += 1

      page_cursor.set []
      expect(
        eventFired
      ).to.equal 1

      page_cursor.set []
      expect(
        eventFired
      ).to.equal 1

      page_cursor.set null
      expect(
        eventFired
      ).to.equal 2

      page_cursor.set ['test']
      expect(
        eventFired
      ).to.equal 3

      page_cursor.set []
      expect(
        eventFired
      ).to.equal 4

  #   it 'should be returned from ogre', ->


