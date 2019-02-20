# Button

The eon-button component is a button with different facilities. It can be used as a form button using the property `type="submit"`, or as a button that activates a functionality.

## Button styles
By default the button style is outline, but they can be flat and filled using the property `design`. In addition, it is possible to make buttons with icons, with or without text.

<app-playground vtitle="Regular Button" html ="<head><script src='framework/eon/eon.js'></script><script>eon.import(['framework/eon/ui/eon-button','framework/custom/app-playground/app-showcase']);</script></head><body><app-showcase title='Outline'><eon-button value='Button'></eon-button><eon-button value='Disabled' disabled='true'></eon-button><eon-button value='Button' vicon='vicon-cog'></eon-button></app-showcase><app-showcase title='Flat'><eon-button value='Button' design='flat'></eon-button><eon-button value='Disabled' disabled='true' design='flat'></eon-button><eon-button vicon='vicon-build' design='flat'></eon-button></app-showcase><app-showcase title='Filled'><eon-button value='Button' design='filled'></eon-button><eon-button value='Disabled' disabled='true' design='filled'></eon-button><eon-button vicon='vicon-build' design='filled'></eon-button></app-showcase></body>" js="function test(){alert('soy JS');}" css="#main{background-color:red; cursor:pointer;}" selector="body">
</app-playground>

