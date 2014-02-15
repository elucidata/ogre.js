
test_graph=
  page:
    current: 'home'
    params: null
  profile:
    name: null
    email: null
  prefs:
    firstRun: false

describe 'Dataset', ->
  beforeEach ->
    @graph= _.clone test_graph
    @data= ogre @graph

  it 'should exist', ->
    expect( 
      @data
    ).to.exist

  it 'should return cloned data by default', ->
    expect( 
      @data.get() 
    ).to.not.be.equal @graph

  it 'should optionally return source data', ->
    expect( 
      @data.get clone:no
    ).to.equal @graph

  it 'should allow graph access via path', ->
    expect( 
      @data.get 'page.current'
    ).to.equal 'home'

  it 'should return default value if path doesn\'t exist', ->
    expect( 
      @data.get 'made.up.key', or:'DEFAULT'
    ).to.equal 'DEFAULT'
    ### Should return default value for null values in graph as well ###
    expect( 
      @data.get 'page.params', or:'DEFAULT'
    ).to.equal 'DEFAULT'

  it 'should not return default value if path does exist', ->
    expect( 
      @data.get 'page.current', or:'DEFAULT'
    ).to.not.equal 'DEFAULT'


  it 'should allow setting values at arbitrary paths', ->
    expect( 
      @data.get 'tmp.new.key'
    ).to.not.exist
    
    @data.set 'tmp.new.key', 'VALUE'
    
    expect(
      @data.get 'tmp.new.key'
    ).to.equal 'VALUE'

  it 'should not allow setting non-collection values directly to dataset', ->
    expect(
      @data.get clone:no
    ).to.equal @graph
    
    @data.set 'VALUE'
    
    expect(
      @data.get clone:no
    ).to.equal @graph


  # describe 'ogre.cursor', ->
  #   beforeEach ->
  #     @page= @data.cursor('page')
    
  #   afterEach ->
  #     @page.dispose()

  #   it 'should be returned from ogre', ->


