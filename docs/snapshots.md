# Snapshots / Undo

A simple way to facilitate undo in your app is to add an onChange listener to the cursor (or dataset) you'd like to make undoable and keep a list of snapshots. Since Dataset will return a clone of the data when calling `.get()` you're assured that the snapshots won't be mutated.

A naive implementation might look something like this:

```coffeescript
enable_undo= (dataset)->
  cursor= dataset.cursor()
  undo_stack= []
  redo_stack= []
  is_executing= no
  is_active= no

  api=   
    undo: ->
      return this unless @canUndo()
      is_executing= yes
      redo_stack.push undo_stack.pop()
      cursor.set undo_stack[ undo_stack.length - 1 ]
      is_executing= no
      this

    redo: ->
      return this unless @canRedo()
      is_executing= yes
      undo_stack.push redo_stack.pop()
      cursor.set redo_stack[ redo_stack.length - 1 ]
      is_executing= no
      this

    canUndo: ->
      undo_stack.length > 0
    
    canRedo: ->
      redo_stack.length > 0

    start: ->
      return this if is_active
      cursor.onChange (e)->
        return if is_executing
        undo_stack.push cursor.get()
      is_active= yes
      this

    stop: ->
      cursor.stopListening()
      is_active= no
      this

  api.start()
```