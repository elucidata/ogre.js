### 

ogre.js - MIT Licensed - http://github.com/elucidata/ogre.js 

An object graph manager built with ReactJS in mind.

All cursors are virtual, data operations happen on the root source object.

Meaning, you can create cursors for unpopulated paths and set onChange 
handlers for them, then when/if data is ever set for that path you'll get 
the callback.

###

_= require './tools'
DEBUG= if process.env.NODE_ENV is 'development' then yes else no
SETTABLE_VALUES= 'object array null undefined'.split ' '
changeEvent= require './change-event'

ogre= (source, lockEditsToRoot=no)->
  _callbacks= []

  _lastChangePath= null

  _fullpath= (root, key)-> _.compact([root, key]).join '.'

  # Right now this will probably fire them in the order they were registered
  # Should it sort and call events based on path ('page' before 'page.current')?
  # If so, it should probably do the sorting at onChange() time, not here.
  _triggerCallbacks= (e)->
    cb.exec e for cb in _callbacks when _.startsWith e.path, cb?.basepath 
    e

  _changeGraph= (fullpath, data, replace, silent)->
    if e= _.setKeyPath source, fullpath, data, replace
      return if silent
      _lastChangePath= e.path
      _triggerCallbacks e
      _lastChangePath= null
      _.warnOnce.clear()

  # The main cursor/view functionality is built here so that it can enclose the
  # source data (no need to have a reference to all that in sub-objects).
  cursor= (rootpath, readonly=no)->

    path: rootpath # can't change this, only for reference

    get: (path, opts)->
      if arguments.length is 1 and _.type(path) is 'object'
        opts= path
        path= ''

      data= _.getKeyPath source, _fullpath(rootpath, path)
      kind= _.type(data)
      
      if (kind is 'undefined' or kind is 'null') and opts?.or?
        opts.or
      else if opts?.clone is no
        data
      else
        _.clone data
        

    # Params: (OLD)
    #  .set( string path, any value, bool replace, bool silent)
    #  .set( object|array|null|undefined value, bool replace, bool silent)
    

    # Params:
    #  .set( string path, any value, object options)
    #  .set( object|array|null|undefined value, object options)
    # Options:
    #  - replace: (bool) When setting objects, it will replace instead of merge.
    #  - append: (bool) When setting arrays over arrays, it will push() instead of replace.
    #  - insert: (number) When setting into array path, will insert into array at position instead of replacing whole array.
    #  - silent: (bool) Won't fire onChange handlers.
    set: (path, data, replace=false, silent=false)->
      if readonly # essentially a noop on readonly cursors
        console.warn "You're trying to set data on a readonly cursor!"
        return this 

      if (kind= _.type path) isnt 'string'
        if kind in SETTABLE_VALUES
          silent= replace
          replace= data
          data= path
          path= ''
        else
          console.warn "The first parameter to .set() is an invalid _.type:", kind
          return this

      fullpath= _fullpath(rootpath, path)

      # If .set() is called in an onChange handler should it queue the changes,
      # or apply them immediately? If it's a change to the same sub-tree that's
      # being notified should it do it silently, or disallow it completely?
      if _lastChangePath? # NEED TO TEST THIS!
        if _.startsWith path, _lastChangePath
          _.warnOnce "You're making changes in the same path (#{ path }) within an onChange handler. 
                    This can lead to infinite loops, be careful."

      _changeGraph fullpath, data, replace, silent
      this

    ###
    #   Params: 
    #     .map string, callback
    #     .map callback
    #   Callback Format:
    #     callback(value, idx|key, array|object)
    ###
    map: (path, fn)->
      [..., fn]= arguments
      result= if arguments.length > 1
          @get arguments[0]
        else
          @get()
      fn or= (x)-> x
      switch _.type result
        when 'array'
          fn value, idx, result for value,idx in result
        when 'object'
          fn value, key, result for key,value of result
        when 'null', 'undefined'
          []
        else 
          [fn result]

    # It's only valid during an onChange event.
    hasChanged: (path='')-> # only cursor sub-paths are testable
      return no unless _lastChangePath?
      
      fullpath= _fullpath rootpath, path
      _.startsWith _lastChangePath, fullpath

    exists: (path='')->
      unlikelyValue= '*^%^*(*&!'
      @get(path, or:unlikelyValue) isnt unlikelyValue

    isEmpty: (path='')-> # was: _.isEmpty @get(path)
      kind= _.type @get path
      kind is 'null' or kind is 'undefined'

    isNotEmpty: (path='')-> # was: _.isEmpty @get(path)
      not @isEmpty path
      
    isNull: (path='')-> _.type( @get path ) is 'null'

    isMissing: (path='')-> _.type( @get path ) is 'undefined'

    cursor: (path, readonly)->
      fullpath= _fullpath(rootpath, path)
      if lockEditsToRoot
        cursor fullpath, yes
      else
        cursor fullpath, readonly

    listenerCount: (reportAll=no)-> 
      if reportAll is yes and rootpath is ''
        _callbacks.length
      else
        (cb for cb in _callbacks when cb.cursor is this).length
    
    _listenerSummary: ->
      paths= {}
      total= 0

      for info in _callbacks
        total += 1
        data= paths[info.basepath] or= 
          listeners: 0
          cursors: []
        data.listeners += 1
        data.cursors.push info.cursor unless info.cursor in data.cursors
        # console.log (info.basepath or '<root>'), info.exec

      content= ["#{total} listeners in ogre."]
      for key in _.keys(paths).sort()
        info= paths[key]
        content.push "  #{ key or '<root>'}:"
        content.push "    - listeners #{info.listeners}"
        content.push "    -   cursors #{info.cursors.length}"
        # content.push ""
      content.join "\n"


    onChange: (callback, path)->
      ###* path is optional, defaults to path of cursor ###
      console.log ':cursor: start listening for changes', rootpath or '<root>' if process.env.NODE_ENV is 'development'
      fullpath= if path?
          _fullpath rootpath, path
        else
          rootpath

      _callbacks.push exec:callback, basepath:fullpath, cursor:this
      this

    # Will remove all event handlers setup by this cursor object.
    stopListening: (clearAll=no)->
      if clearAll is yes and rootpath is ''
        console.log ':cursor: clearing all callbacks', rootpath or '<root>' if process.env.NODE_ENV is 'development'
        _callbacks.length= 0
      
      else
        for callback,i in _callbacks by -1 when callback.cursor is this
          _callbacks.splice i, 1
          # console.log ':cursor: stop listening for changes', rootpath or '<root>' if process.env.NODE_ENV is 'development'
        
        # idx= []
        # idx.push i for callback,i in _callbacks when callback.cursor is this
        # console.log ':cursor: stop listening for changes', rootpath or '<root>' if process.env.NODE_ENV is 'development'
        # _callbacks.splice i, 1 for i in idx.sort().reverse()

      this

    # Removes all listeners for a given path, regardless which cursor is using it.
    # Treats path as a base path, it will remove all listeners that start with path.
    # (Should this be allowed from any cursor, Or perhaps only the root cursor?)
    stopListeningAt: (path)->
      if path? and not _.isEmpty path
        _fullpath rootpath, path
        for callback,i in _callbacks by -1 when _.startsWith path, callback.basepath 
          _callbacks.splice i, 1
        # idx= []
        # idx.push i for callback,i in _callbacks when _.startsWith path, callback.basepath 
        # console.log ':cursor: stop listening for changes at', fullpath if process.env.NODE_ENV is 'development'
        # _callbacks.splice i, 1 for i in idx.sort().reverse()
      else
        console.warn "You must specify a path to stop listening to." if process.env.NODE_ENV is 'development'
      this
    
    dispose: ->
      # console.log ':cursor: disposing', rootpath
      @stopListening(rootpath is '')

  # Return the public interface, which is a cursor to the root path
  cursor('', lockEditsToRoot)

module.exports= ogre
