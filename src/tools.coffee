changeEvent= require './change-event'

module.exports= _=
  extend: require('lodash-node/compat/objects/assign')
  clone: require('lodash-node/compat/objects/clone')
  compact: require('lodash-node/compat/arrays/compact')
  isPlainObject: require('lodash-node/compat/objects/isPlainObject')
  isEqual: require('lodash-node/compat/objects/isEqual')
  keys: require('lodash-node/compat/objects/keys')
  
  startsWith: (str, starts) ->
      return yes if starts is ''
      return no if str is null or starts is null
      str= String str
      starts= String starts
      str.length >= starts.length and str.slice(0, starts.length) is starts
  
  type: do ->
    _toString= Object::toString
    elemParser= /\[object HTML(.*)\]/
    classToType= {}
    for name in "Array Boolean Date Function NodeList Null Number RegExp String Undefined ".split(" ")
      classToType["[object " + name + "]"] = name.toLowerCase()
    
    (obj) ->
      strType = _toString.call obj
      if found= classToType[ strType ]
        found
      else if found= strType.match elemParser
        found[1].toLowerCase()
      else
        "object"
  
  warnOnce: do ->
    count= 0
    
    api= (msg)->
      if count is 0
        console.warn msg
        # err= new Error()
        # console.dir err.stack
      count += 1
    
    api.clear= ->
      count= 0
    
    api
  
  getKeyParts: (keypath)-> _.compact keypath.split '.'
  
  getKeyPath: (source, keypath='', create=no)->
    parts= _.getKeyParts keypath
    obj= source
    
    while obj? and parts.length
      key= parts.shift()
      if not obj[ key ] 
        obj[ key ]= {} if create is yes
      obj= obj[ key ]
    
    obj

  
  setKeyPath: (source, keypath='', data, replace)->
    parts= _.getKeyParts keypath
    key= parts.pop()
    container= if parts.length 
        _.getKeyPath source, parts.join('.'), yes
      else
        source
    current= container[key]
    
    if replace is yes or not _.isPlainObject data 
      # console.log "$ replace key:", key, 'keypath:', keypath, 'type:', type(data), 'replace (forced):', replace
      return no if _.isEqual container[key], data
      container[key]= data
    
    else
      # console.log "$ merge key:", key, 'keypath:', keypath, 'type:', type(data), 'existing:', container[key], 'new:', data, 'replace (forced):', replace
      merged= _.extend _.clone(current or {}), data #data=
      return no if _.isEqual current, merged
      container[key]= merged
      data= merged

    changeEvent keypath, data, current

