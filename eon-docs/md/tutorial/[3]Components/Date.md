# Date
The Date element is a component meant for typing or selecting a specific date, you have a wide variety of options such as being able to specify any format, output and locale among many others.

*(
<doc-playground label="Input Date" html="true" js="true" css="true" selector="#content">
    <template type="html">
        <head>
            <script src='framework/eon/eon.js'></script>
            <script>eon.import(['framework/doc-eon/eon/ui/eon-date','framework/custom/app-playground/doc-showcase']);</script>
        </head>
        <body>
        <div id="content" style="width:100%;">
            <doc-showcase title='Active'>
              <eon-date type="input" inline="true" day="9" month="2" year="1994" mask="DDMMYYYY" name="disabledInput" label="Disabled" disabled="true"
            week-start=
            "monday" value-format="YYYY/MM/DD" >
          </eon-date>
          </doc-showcase>
          <doc-showcase title='Disabled'>
              <eon-date type="input" inline="true" day="9" month="2" year="1994" mask="DDMMYYYY" name="disabledInput" label="Disabled" disabled="true"
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



