# Component Life-cycle

vComet components pass through a series of events that determine their life-cycle. Understanding this events is crucial for an optimal performance implementation. 

## Sequential events

All sequential events are guaranteed to, trigger only once and in order.

Events by execution order:

- **onCreated** - Triggers on element creation, grants access to custom element properties and functions, note at this point the element has no children since its declarative content is temporally stored as a "source" fragment property and the default component layout is also temporally stored as a "template" fragment property.

- **onInit** - Triggers on element first attach and before its transformation.

- **onTransformed** - Triggers after transform, which mean its template fragment and source fragment has been imported to the dom using element slotting approach.

- **onRender** - Triggers after **ALL** elements has been transformed. This is the main event to define element behaviour with trickle flow where parents triggers always before its children.

- **onBubbleRender** - Triggers after **ALL** elements has been transformed and rendered. This is an auxiliary event to define element behaviour with an inverse rendering order. Triggers with a bubble flow where children always triggers before its parents.

- **onReady** - Triggers after all events are completed.

## Recurrent events

Recurrent events might be triggered more than once:

- **onResize** - By default triggers each time window is resized unless element config properties selfResize is set to true, in this case it adds a element resize listener and triggers on element resize. 

- **onAttached** - Triggers each time element is attached to the DOM.

- **onDetached** - Triggers each time element is detached from the DOM.

- **onPropertyChanged** - Triggers each time a property is changed.

- **onAttributeChanged** - Triggers each time an attribute is changed.

