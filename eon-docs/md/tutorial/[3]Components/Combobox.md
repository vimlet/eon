# Combobox
The combobox element is a component meant for selecting an option between the given ones, a dropdown with the available options appears giving the users the ability to choose among the different items.

*(
<doc-playground label="Common Usage" html="true" js="true" css="true" selector="#content">
    <template type="html">
        <head>
            <script src='framework/eon/eon.js'></script>
            <script>eon.import(['framework/eon/ui/eon-combobox','framework/eon/ui/eon-item','framework/custom/app-playground/app-showcase']);</script>
        </head>
        <body>
        <div id="content" style="width:100%;">
            <app-showcase title='Active'>
              <eon-combobox label='Colors' placeholder='Select an item' filter='true'>
                  <eon-item value='red' display-value='Red'></eon-item>
                  <eon-item value='green' display-value='Green'></eon-item>
                  <eon-item value='pink' display-value='Pink'></eon-item>
                  <eon-item value='grey' display-value='Grey'></eon-item>
              </eon-combobox>
          </app-showcase>
          <app-showcase title='Disabled'>
              <eon-combobox disabled='true' label='States' name='comboTest2' placeholder='Ohio'>
                  <eon-item value='tomato' display-value='Tomato'></eon-item>
                  <eon-item value='avocado' display-value='Avocado'></eon-item>
                  <eon-item value='strawberry' display-value='Strawberry'></eon-item>
                  <eon-item value='onion' display-value='Onion'></eon-item>
              </eon-combobox>
          </app-showcase>
          </div>
          <div style="height:150px;"></div>
        </body>
    </template>
    <template type="css">
        .app-showcase-content{display:flex;}
        .app-showcase-content eon-button{margin:0 5px;}
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
            <script>eon.import(['framework/eon/ui/eon-combobox','framework/eon/ui/eon-item','framework/custom/app-playground/app-showcase']);</script>
        </head>
        <body>
        <div id="content" style="width: 100%;">
        <app-showcase>
              <eon-combobox label="Colors" name='myCombobox' placeholder='Pick a color' filter='true'>
                  <eon-item value='r' display-value='Red'></eon-item>
                  <eon-item value='p' display-value='Pink'></eon-item>
                  <eon-item value='pu' display-value='Purple'></eon-item>
              </eon-combobox>
          </app-showcase>
        </div>
        <div style="height:150px;"></div>
        </body>
    </template>
    <template type="css">
        .app-showcase-content{display:flex;}
        .app-showcase-content eon-button{margin:0 5px;}
    </template>
</doc-playground>
)*

