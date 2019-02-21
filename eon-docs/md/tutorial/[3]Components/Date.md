# Date
The Date element is a component meant for typing or selecting a specific date, you have a wide variety of options such as being able to specify any format, output and locale among many others.

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
        <div style="height:150px;"></div>
        </body>
    </template>
    <template type="css">
        .doc-showcase-content{display:flex;}
        .doc-showcase-content eon-button{margin:0 5px;}
    </template>
</doc-playground>
)*





