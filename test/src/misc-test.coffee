state=

  page:
    current: 'home'
    params: null

  profile:
    details:
      firstname: 'Matt'
      lastname: 'McCray'

  vehicles: [
    (name:'corvette')
    (name:'jeep')
  ]

  app:
    data:
      codes:
        states: null
        makes: null

data= ogre state
prof= data.cursor 'profile.details'
page= data.cursor 'page'
vehicles= data.cursor 'vehicles'

counts=
  data: 0
  profile: 0
  page: 0
  vehicles: 0
  assertions: 0

assert= (condition, msg)->
  counts.assertions += 1
  expect(condition).to.be.true
  # unless condition
  #   throw new Error "Assertion Error: #{ msg}"


# module.exports.runTests= ->

describe 'Ogre (old)', ->  

  it 'should do a lot of stuff (misc from inline tests during dev)', ->

    data.onChange (key)-> counts.data += 1
    prof.onChange (key)-> counts.profile += 1
    page.onChange (key)-> 
      counts.page += 1
      assert page.hasChanged() is true, "page.hasChanged() should be true during a page onChange handler"
      assert prof.hasChanged() is false, "prof.hasChanged() should be false during a page onChange handler"
    vehicles.onChange (key)-> counts.vehicles += 1

    assert data.listenerCount() is 1, "Listener count should be 1, is #{ data.listenerCount() }"
    assert data.listenerCount(true) is 4, "Listener count should be 4, is #{ data.listenerCount(true) }"
    assert prof.listenerCount() is 1, "Listener count should be 1, is #{ data.listenerCount() }"
    assert prof.listenerCount(true) is 1, "Listener count should be 1, is #{ data.listenerCount(true) }"

    assert prof.get('firstname') is 'Matt', "firstname should be Matt"

    prof.set 'firstname', 'Dog'
    assert prof.get('firstname') is 'Dog', "firstname should be Dog"

    data.set 'profile.details.firstname', 'Dan'
    assert prof.get('firstname') is 'Dan', "firstname should be Dan"

    prof.stopListening()
    assert counts.profile is 2, "counts.profile should be 2, is #{counts.profile}"
    assert data.listenerCount() is 1, "Listener count should be 1, is #{ data.listenerCount() }"
    assert data.listenerCount(true) is 3, "Listener count should be 3, is #{ data.listenerCount() }"
    assert prof.listenerCount() is 0, "Listener count should be 0, is #{ data.listenerCount() }"


    data.set 'profile.details.firstname', 'Sam'
    assert prof.get('firstname') is 'Sam', "firstname should be Sam"
    assert counts.profile is 2, "counts.profile should be 2, is #{counts.profile}"

    page.set 'current', 'about'
    assert counts.page is 1, "counts.page should be 1, is #{counts.page}"

    page.set current:'other'
    assert counts.page is 2, "counts.page should be 2, is #{counts.page}"
    assert page.get('current') is 'other', "hash value wasn't set correctly"
    
    assert data.get('vehicles.0.name') is 'corvette', "vehicles.0.name should be corvette, is #{ data.get('vehicles.0.name') }"
    assert vehicles.get('0.name') is 'corvette', "vehicles.0.name should be corvette, is #{ vehicles.get('0.name') }"
    
    data.set('vehicles.0.name', 'ferrari')
    assert data.get('vehicles.0.name') is 'ferrari', "vehicles.0.name should be ferrari, is #{ data.get('vehicles.0.name') }"
    assert vehicles.get('0.name') is 'ferrari', "0.name should be ferrari, is #{ vehicles.get('0.name') }"

    vehicles.set('1.name', 'toyota')
    assert data.get('vehicles.1.name') is 'toyota', "vehicles.1.name should be toyota, is #{ data.get('vehicles.1.name') }"
    assert vehicles.get('1.name') is 'toyota', "1.name should be toyota, is #{ vehicles.get('1.name') }"

    vehicles.set([
      (name:'porshe')
    ])
    assert data.get('vehicles.0.name') is 'porshe', "vehicles.0.name should be porshe, is #{ data.get('vehicles.0.name') }"
    assert vehicles.get('0.name') is 'porshe', "0.name should be porshe, is #{ vehicles.get('0.name') }"

    vehicles.set('1.name', 'tesla')
    assert data.get('vehicles.1.name') is 'tesla', "vehicles.1.name should be tesla, is #{ data.get('vehicles.1.name') }"
    assert vehicles.get('1.name') is 'tesla', "1.name should be tesla, is #{ vehicles.get('1.name') }"

    
    assert counts.profile is 2, "counts.profile should be 2, is #{counts.profile}"
    assert counts.page is 2, "counts.page should be 2, is #{counts.page}"
    assert counts.vehicles is 4, "counts.vehicles should be 4, is #{counts.vehicles}"

    assert counts.data is 9, "counts.data should be 9, is #{counts.data}"

    assert data.get('non.existing.path', or:'gone') is 'gone', "data.get(path, defaultValue) didn't return the defaultValue!"

    assert data.listenerCount() is 1, "Listener count should be 1, is #{ data.listenerCount() }"
    assert data.listenerCount(true) is 3, "Listener count should be 3, is #{ data.listenerCount(true) }"

    data.stopListening()
    assert data.listenerCount(true) is 2, "Listener count should be 2, is #{ data.listenerCount(true) }"
    assert prof.listenerCount(true) is 0, "Listener count should be 0, is #{ data.listenerCount(true) }"

    data.stopListening(true)
    assert data.listenerCount() is 0, "Listener count should be 0, is #{ data.listenerCount() }"


    d= ogre { a:1, b:1 }
    
    d.onChange (key)->
      # console.log ":changed", key
      d.set 'a', d.get('a')+ 1, null, true
    
    # console.log  "d", d.get()
    
    d.set('a', 2)
    
    # console.log  "d", d.get()

    assert d.listenerCount() is 1, "Listener count should be 1, but is: #{d.listenerCount()}"
    
    d.dispose()

    assert d.listenerCount() is 0, "Listener count should be 0, but is: #{d.listenerCount()}"



    codes= data.cursor 'app.data.codes'
    makes= data.cursor 'app.data.codes.makes'

    codes.set 'test', yes
    assert codes.get('test') is yes, "codes.test should be true, is: #{ codes.get 'test' }"

    makes.set ['one', 'two']
    assert codes.get('makes.length') is 2, "codes.makes.length should be 2, is: #{ codes.get 'makes.length' }"

    makes.set null
    assert codes.get('makes') is null, "codes.makes should be null, is: #{ codes.get 'makes' }"

    
    # Read-only cursor
    roCodes= data.cursor 'codes', yes

    # shouldn't be able to set values on it.
    roCodes.set 'makes', 'JUNK'
    assert roCodes.get('makes') isnt 'JUNK', "(ro) codes.makes should not be 'JUNK', is: #{ roCodes.get 'makes' }"

    # Sub-cursors should also be read-only
    roMakes= roCodes.cursor 'makes'
    roMakes.set 'JUNK'
    assert roMakes.get() isnt 'JUNK', "(ro) codes.makes should not be 'JUNK', is: #{ roMakes.get() }"

    # Read-only cursors should not allow creating editable cursors
    roMakes2= roCodes.cursor 'makes', no
    roMakes2.set 'JUNK'
    assert roMakes2.get() isnt 'JUNK', "(ro) codes.makes should not be 'JUNK', is: #{ roMakes2.get() }"


    assert codes.get('makes') is null, "codes.makes should be null, is: #{ codes.get 'makes' }"

    # makes.set name:'test'
    codes.set 'makes', name:'test'
    assert codes.get('makes.name') is 'test', "codes.makes.name should be 'test', is: #{ codes.get 'makes.name' }"

    makes.set null
    assert codes.get('makes') is null, "codes.makes should be null, is: #{ codes.get 'makes' }"

    makes.set name:'test'
    assert codes.get('makes.name') is 'test', "codes.makes.name should be 'test', is: #{ codes.get 'makes.name' }"

    assert _.isEqual(makes.map(), ['test']), "Map didn't return the correct value."


    assert codes.exists() is true, "code.exists() should be true"
    assert codes.exists('crap') is false, "code.exists('crap') should be false"

    assert codes.isEmpty() is false, "code.isEmpty() should be false"
    assert codes.isEmpty('crap') is true, "code.isEmpty('crap') should be true"

    assert _.isEqual(state, data.get()), "State should have changed, but didn't!" # { _.diff state, data.get() }
    # Root-only editable ogre
    data2= ogre state, yes
    # TODO...


    console.log "All #{counts.assertions} tests passed."

    data
