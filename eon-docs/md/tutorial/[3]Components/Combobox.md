# Combobox

## Introduction
The combobox element is a component meant for selecting an option between the given ones, a dropdown with the available options appears giving the users the ability to choose among the different items.

<app-playground vtitle="Common Usage" html ="<head><script src='framework/eon/eon.js'></script><script>eon.import(['framework/eon/ui/eon-combobox', 'framework/eon/ui/eon-item','framework/custom/app-playground/app-showcase']);</script></head><body><app-showcase title='Active'><eon-combobox label='Colors' placeholder='Select an item' filter='true'><eon-item value='red' display-value='Red'></eon-item><eon-item value='green' display-value='Green'></eon-item><eon-item value='pink' display-value='Pink'></eon-item><eon-item value='grey' display-value='Grey'></eon-item></eon-combobox></app-showcase><app-showcase title='Disabled'><eon-combobox disabled='true' label='States' name='comboTest2' placeholder='Ohio'><eon-item value='tomato' display-value='Tomato'></eon-item><eon-item value='avocado' display-value='Avocado'></eon-item><eon-item value='strawberry' display-value='Strawberry'></eon-item><eon-item value='onion' display-value='Onion'></eon-item></eon-combobox></app-showcase></body>" js="function test(){alert('soy JS');}" css="#main{background-color:red; cursor:pointer;}" selector="body">
</app-playground>

## Filters
Enables the user to type in the input so that the options provided by the dropdown are filtered, this is usefull when there are large amounts of options, like countries for instance.

<app-playground vtitle="Filtering" html ="<head><script src='framework/eon/eon.js'></script><script>eon.import(['framework/eon/ui/eon-combobox', 'framework/eon/ui/eon-item','framework/custom/app-playground/app-showcase']);</script></head><body><app-showcase title='Active'><eon-combobox name='myCombobox' placeholder='Pick a color' filter='true'><eon-item value='r' display-value='Red'></eon-item><eon-item value='p' display-value='Pink'></eon-item><eon-item value='pu' display-value='Purple'></eon-item></eon-combobox></app-showcase></body>" js="function test(){alert('soy JS');}" css="#main{background-color:red; cursor:pointer;}"  selector="body">
</app-playground>
