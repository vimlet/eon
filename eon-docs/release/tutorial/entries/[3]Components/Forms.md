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

[Radio]<>
The radio element allows selecting one option of a group of choices, for this, the radio elements have to be included within the `eon-group`, having to import only this component.


*(
<doc-playground label="Common Usage" html="true" js="true" css="true" selector="body">
    <template type="html">
        <head>
            <script src='framework/doc-eon/eon/eon.js'></script>
            <script>eon.import(['framework/doc-eon/eon/ui/eon-group', 'framework/doc-eon/eon/ui/eon-radio','framework/doc-eon/custom/doc-playground/doc-showcase']);</script>
            <style>
                .eon-group-label {
                    display:none;
                }
            </style>
        </head>
        <body>
            <doc-showcase label='Standard'>
                <eon-group class="d-radio-group" name="radioOptions">
                  <eon-radio class="d-top-margin" label="Orange" checked="true" value="Orange"></eon-radio>
                  <eon-radio class="d-top-margin" label="Red" value="Red"></eon-radio>
                  <eon-radio class="d-top-margin" label="Blue" value="Blue"></eon-radio>
                </eon-group>
            </doc-showcase>
            <doc-showcase label='Disabled'>
                <eon-group class="d-radio-group" name="disabledRadio">
                  <eon-radio class="d-top-margin" label="Mobile" checked="true" value="mobile" disabled="true"></eon-radio>
                  <eon-radio class="d-top-margin" label="Tablet" value="tablet" disabled="true"></eon-radio>
                  <eon-radio class="d-top-margin" label="Desktop" value="desktop" disabled="true"></eon-radio>
              </eon-group>
            </doc-showcase>
        </body>
    </template>
    <template type="css">
        .doc-showcase-content{display:flex;}
        .doc-showcase-content eon-button{margin:0 5px;}
    </template>
</doc-playground>
)*

[Slider]<>
Form component that allows selecting a value from a range of values by moving the slider thumb of the eon-slider. This can be horizontal or vertical and the value can be visible or not.

*(
<doc-playground label="Common Usage" html="true" js="true" css="true" selector="body">
  <template type="html">
    <doc-head>
      <script src="framework/doc-eon/eon/eon.js"></script>
      <script> 
        eon.import([
          "framework/doc-eon/eon/ui/eon-slider", "framework/doc-eon/custom/doc-playground/doc-showcase"
        ]);
      </script>
      <style>
        doc-showcase {
          max-width: 500px;
        }
        doc-showcase eon-slider{
          width: auto !important;
        }
      </style>
    </doc-head>
    <doc-body>
      <doc-showcase label="Standard">
        <eon-slider display-visibility="true"></eon-slider>
      </doc-showcase>
      <doc-showcase label="Disabled">
        <eon-slider display-visibility="true" disabled="true"></eon-slider>
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

[Combobox]<>
The combobox element is a component meant for selecting an option between the given ones, a dropdown with the available options appears giving the users the ability to choose among the different items.

*(
<doc-playground label="Common Usage" html="true" js="true" css="true" selector="#content">
    <template type="html">
        <head>
            <script src='framework/eon/eon.js'></script>
            <script>eon.import(['framework/doc-eon/eon/ui/eon-combobox','framework/doc-eon/eon/ui/eon-item','framework/doc-eon/custom/doc-playground/doc-showcase']);</script>
        </head>
        <body>
        <div id="content" style="width:100%;">
            <doc-showcase label='Active'>
              <eon-combobox label='Colors' placeholder='Select an item' filter='true'>
                  <eon-item value='red' display-value='Red'></eon-item>
                  <eon-item value='green' display-value='Green'></eon-item>
                  <eon-item value='pink' display-value='Pink'></eon-item>
                  <eon-item value='grey' display-value='Grey'></eon-item>
              </eon-combobox>
          </doc-showcase>
          <doc-showcase label='Disabled'>
              <eon-combobox disabled='true' label='States' name='comboTest2' placeholder='Ohio'>
                  <eon-item value='tomato' display-value='Tomato'></eon-item>
                  <eon-item value='avocado' display-value='Avocado'></eon-item>
                  <eon-item value='strawberry' display-value='Strawberry'></eon-item>
                  <eon-item value='onion' display-value='Onion'></eon-item>
              </eon-combobox>
          </doc-showcase>
          </div>
          <div style="height:150px;"></div>
        </body>
    </template>
    <template type="css">
        .doc-showcase-content{display:flex;}
        .doc-showcase-content eon-button{margin:0 5px;}
    </template>
</doc-playground>
)*

## Filters
Enables the user to type in the input so that the options provided by the dropdown are filtered, this is usefull when there are large amounts of options, like countries for instance.

*(
<doc-playground label="Filtering" html="true" js="true" css="true" selector="#content">
    <template type="html">
        <head>
            <script src='framework/eon/eon.js'></script>
            <script>eon.import(['framework/doc-eon/eon/ui/eon-combobox','framework/doc-eon/eon/ui/eon-item','framework/doc-eon/custom/doc-playground/doc-showcase']);</script>
        </head>
        <body>
        <div id="content" style="width: 100%;">
        <doc-showcase>
              <eon-combobox label="Colors" name='myCombobox' placeholder='Pick a color' filter='true'>
                  <eon-item value='r' display-value='Red'></eon-item>
                  <eon-item value='p' display-value='Pink'></eon-item>
                  <eon-item value='pu' display-value='Purple'></eon-item>
              </eon-combobox>
          </doc-showcase>
        </div>
        <div style="height:150px;"></div>
        </body>
    </template>
    <template type="css">
        .doc-showcase-content{display:flex;}
        .doc-showcase-content eon-button{margin:0 5px;}
    </template>
</doc-playground>
)*

[Date]<>
The Date element is a component meant for typing or selecting a specific date, you have a wide variety of options such as being able to specify any format, output and locale among many others.

## Input Date
Classic input type date where you can either `type` the desired date or you can just open the `calendar` that will appear as a dropdown, which will allow you to easily select it.

*(
<doc-playground label="Input Type" html="true" js="true" css="true" selector="#content">
    <template type="html">
        <head>
            <script src='framework/doc-eon/eon/eon.js'></script>
            <script>eon.import(['framework/doc-eon/eon/ui/eon-date','framework/doc-eon/custom/doc-playground/doc-showcase']);</script>
        </head>
        <body>
        <div id="content" style="width:100%;">
            <doc-showcase label='Active'>
              <eon-date min="03/07/1969" default="1969-07-06" name="defaultInput" week-format="short" 
            value-format="YYYY-MM-DD">
          </eon-date>
          </doc-showcase>
          <doc-showcase label='Disabled'>
              <eon-date type="input" inline="true" day="9" month="2" year="1994" mask="DDMMYYYY" name="disabledInput" disabled="true"
            week-start=
            "monday" value-format="YYYY/MM/DD" >
          </eon-date>
          </doc-showcase>
          </div>
          <div style="height:150px;"></div>
        </body>
    </template>
    <template type="css">
        .doc-showcase-content{display:flex;}
        .doc-showcase-content eon-button{margin:0 5px;}
    </template>
</doc-playground>
)*

## Calendar Date
This type of date will only allow you to have a `calendar` directly leaving the input behind.

*(
<doc-playground label="Calendar Type" html="true" js="true" css="true" selector="#content">
    <template type="html">
        <head>
            <script src='framework/eon/eon.js'></script>
            <script>eon.import(['framework/doc-eon/eon/ui/eon-date','framework/doc-eon/custom/doc-playground/doc-showcase']);</script>
        </head>
        <body>
        <div id="content" style="width: 100%;">
        <doc-showcase label="Default">
              <eon-date selectable="dmy" type="calendar" name="defaultCalendar"></eon-date>
          </doc-showcase>
        <doc-showcase label="Months/Years">
              <eon-date selectable="my"  type="calendar" name="monthsCalendar"></eon-date>
          </doc-showcase>
        <doc-showcase label="Years">
              <eon-date selectable="y"  type="calendar" name="yearsCalendar"></eon-date>
          </doc-showcase>
        <doc-showcase label="Disabled">
              <eon-date disabled="true" selectable="dmy" type="calendar" name="disabledCalendar"></eon-date>
          </doc-showcase>
        </div>
        </body>
    </template>
    <template type="css">
        .doc-showcase-content{display:flex;}
        .doc-showcase-content eon-button{margin:0 5px;}
    </template>
</doc-playground>
)*


