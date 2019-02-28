*(
<doc-playground label="Regular Button" html="true" js="true" css="true" selector="body">
  <template type="html-head">
    <script src='framework/eon/eon.js'></script>
    <script>
      eon.import([
        'framework/eon/ui/eon-button','framework/custom/app-playground/app-showcase'
        ]
      );
    </script>
  </template>
  <template type="html-body">
    <app-showcase title='Outline'>
      <eon-button value='Button'></eon-button>
      <eon-button value='Disabled' disabled='true'></eon-button>
      <eon-button value='Button' vicon='vicon-cog'></eon-button>
    </app-showcase>
      <app-showcase title='Flat'>
      <eon-button value='Button' design='flat'></eon-button>
      <eon-button value='Disabled' disabled='true' design='flat'></eon-button>
      <eon-button vicon='vicon-build' design='flat'></eon-button>
    </app-showcase>
      <app-showcase title='Filled'>
      <eon-button value='Button' design='filled'></eon-button>
      <eon-button value='Disabled' disabled='true' design='filled'></eon-button>
      <eon-button vicon='vicon-build' design='filled'></eon-button>
    </app-showcase>
  </template>
  <template type="js">
      function any(){// Do something }
  </template>
  <template type="css">
      doc-showcase .doc-showcase-title{color:red !important;}
  </template>
  <template type="header">
    {"eon":{"link":"http://www.eonjs.org","icon":"link"},"vimlet":{"action":"alert;","icon":"bin"},"buttonIcon":{"link":"http://www.vimlet.com","icon":"bin",
    "text":"buttonIcon"},"button":{"action":"test", "text":"alert"}}
  </template>
  <template type="footer">
    {"eon":{"link":"http://www.eonjs.org","icon":"link"},"vimlet":{"action":"alert","icon":"bin"},"buttonIcon":{"link":"http://www.vimlet.com","icon":"bin",
    "text":"buttonIcon"},"button":{"action":"test", "text":"alert"}}
  </template>
</doc-playground>
)*