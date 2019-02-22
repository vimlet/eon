[Button]<>
The eon-button component is a button with different facilities. It can be used as a form button using the property `type="submit"`, or as a button that activates a functionality.

## Button styles
By default the button style is outline, but they can be flat and filled using the property `design`.

*(
<doc-playground label="Regular Buttons" html="true" js="true" css="true" selector="body">
    <template type="html">
        <head>
            <script src='framework/doc-eon/eon/eon.js'></script>
            <script>eon.import(['framework/doc-eon/eon/ui/eon-button','framework/doc-eon/custom/doc-playground/doc-showcase']);</script>
        </head>
        <body>
            <doc-showcase label='Outline'>
                <eon-button value='Button'></eon-button>
                <eon-button value='Disabled' disabled='true'></eon-button>
            </doc-showcase>
                <doc-showcase label='Flat'>
                <eon-button value='Button' design='flat'></eon-button>
                <eon-button value='Disabled' disabled='true' design='flat'></eon-button>
            </doc-showcase>
                <doc-showcase label='Filled'><eon-button value='Button' design='filled'></eon-button>
                <eon-button value='Disabled' disabled='true' design='filled'></eon-button>
            </doc-showcase>
        </body>
    </template>
    <template type="css">
        .doc-showcase-content{display:flex;}
        .doc-showcase-content eon-button{margin:0 5px;}
    </template>
</doc-playground>
)*

## Buttons with icons
To display buttons with icons just use the `vicon` property passing any of the icons provided in the Vimlet library. If you prefer to use other icons library you can use the property `icon` passing an `i` element directly.

*(
<doc-playground label="Icon Buttons" html="true" js="true" css="true" selector="body">
    <template type="html">
        <head>
            <script src='framework/doc-eon/eon/eon.js'></script>
            <script>eon.import(['framework/doc-eon/eon/ui/eon-button','framework/doc-eon/custom/doc-playground/doc-showcase']);</script>
        </head>
        <body>
            <doc-showcase label='Outline'>
                <eon-button value='Button' icon='<i class="vicon vicon-cog"></i>'></eon-button>
                <eon-button vicon='vicon-build'></eon-button>
                <eon-button vicon='vicon-build' disabled='true'></eon-button>
            </doc-showcase>
            <doc-showcase label='Flat'>
                <eon-button value='Button' icon='<i class="vicon vicon-cog"></i>' design='flat' icon-position="right"></eon-button>
                <eon-button vicon='vicon-build' design='flat'></eon-button>
                <eon-button vicon='vicon-build' disabled='true' design='flat'></eon-button>
            </doc-showcase>
            <doc-showcase label='Filled'>
                <eon-button value='Button' icon='<i class="vicon vicon-cog"></i>' design='filled'></eon-button>
                <eon-button vicon='vicon-build' design='filled'></eon-button>
                <eon-button vicon='vicon-build' disabled='true' design='filled'></eon-button>
            </doc-showcase>
        </body>
    </template>
    <template type="css">
        .doc-showcase-content{display:flex;}
        .doc-showcase-content eon-button{margin:0 5px;}
    </template>
</doc-playground>
)*

[Checkbox]<>
The checkbox element allows selecting multiple options of a group of choices. It can be used inside a eon-form component or inside an HTML form.


*(
<doc-playground label="Common Usage" html="true" js="true" css="true" selector="body">
  <template type="html">
    <doc-head>
      <script src="framework/doc-eon/eon/eon.js"></script>
      <script> 
        eon.import([
          "framework/doc-eon/eon/ui/eon-checkbox", "framework/doc-eon/custom/doc-playground/doc-showcase"
        ]);
      </script>
    </doc-head>
    <doc-body>
      <doc-showcase label="Standard">
        <eon-checkbox label="Checkbox" value='checkbox1' checked="true" name='checkboxOptions'></eon-checkbox>
      </doc-showcase>
      <doc-showcase label="Disabled">
        <eon-checkbox label='Disabled checked' value='checkbox2' checked="true" name='checkboxOptions' disabled='true'></eon-checkbox>
      </doc-showcase>
    </doc-body>
  </template>
</doc-playground>
)*

[Toggle]<>
This component is a simple on/off switch. It works almost the same way as an eon-checkbox since the user can toggle between two `checked` boolean values.  

*(
<doc-playground label="Common Usage" format="true" html="true" js="true" css="true" selector="body">
  <template type="html">
    <doc-head>
      <script src="framework/doc-eon/eon/eon.js"></script>
      <script> 
        eon.theme = "claro";
        eon.import([
          "framework/doc-eon/eon/ui/eon-toggle", "framework/doc-eon/custom/doc-playground/doc-showcase"
        ]);
      </script>
    </doc-head>
    <doc-body>
    <doc-showcase label="Standard">
      <eon-toggle label='Toggle label' value='toggle2' name='toggleOptions'></eon-toggle>
    </doc-showcase>
    <doc-showcase label="Disabled">
      <eon-toggle label='Disabled label' value='toggle3' name='toggleOptions' disabled='true'></eon-toggle>
    </doc-showcase>
    </doc-body>
  </template>
</doc-playground>
)*

It can be used as a specific state switcher which some logic blocks will depend on or as a form component as well.

