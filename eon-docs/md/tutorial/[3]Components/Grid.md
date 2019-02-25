# Grid
Also known as `table`, displays a large number of data using rows and columns.

*(
<doc-playground label="Common Usage" html="true" js="true" css="true" selector="body">
    <template type="html">
        <head>
            <script src='framework/doc-eon/eon/eon.js'></script>
            <script>eon.import(['framework/doc-eon/eon/ui/eon-grid','framework/doc-eon/custom/doc-playground/doc-showcase']);</script>
        </head>
        <body>
            <doc-showcase label="Default">
                <eon-grid resizable="false" footer="true" entries-count="false" row-min-height="80" column-min-width="200"
                    columns="name, lastname, age, phone" headers="Name, Lastname, Age, Phone, DNI" style="height:340px" page-size="8" autofit="false">
                    <eon-grid-row>
                        <eon-grid-cell column="name">John</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Jill</eon-grid-cell>
                        <eon-grid-cell column="lastname">Smith</eon-grid-cell>
                        <eon-grid-cell column="phone">666676666</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Joseph</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">16</eon-grid-cell>
                        <eon-grid-cell column="phone">3345</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Charles</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Jaime</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">16</eon-grid-cell>
                        <eon-grid-cell column="phone">3345</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Johan</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="phone">666676666</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">David</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Samuel</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">16</eon-grid-cell>
                        <eon-grid-cell column="phone">3345</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Vera</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="phone">666676666</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Janine</eon-grid-cell>
                        <eon-grid-cell column="lastname">Jackson</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    </eon-grid>
            </doc-showcase>
            <doc-showcase label="Resizable">
                <eon-grid footer="true" entries-count="false" row-min-height="80" column-min-width="200"
                    columns="name, lastname, age, phone" headers="Name, Lastname, Age, Phone, DNI" style="height:340px" page-size="8" autofit="false">
                    <eon-grid-row>
                        <eon-grid-cell column="name">John</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Jill</eon-grid-cell>
                        <eon-grid-cell column="lastname">Smith</eon-grid-cell>
                        <eon-grid-cell column="phone">666676666</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Joseph</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">16</eon-grid-cell>
                        <eon-grid-cell column="phone">3345</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Charles</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Jaime</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">16</eon-grid-cell>
                        <eon-grid-cell column="phone">3345</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Johan</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="phone">666676666</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">David</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Samuel</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">16</eon-grid-cell>
                        <eon-grid-cell column="phone">3345</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Vera</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="phone">666676666</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Janine</eon-grid-cell>
                        <eon-grid-cell column="lastname">Jackson</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    </eon-grid>
            </doc-showcase>
        </body>
    </template>
    <template type="css">
        .doc-showcase-content{display:flex;}
        .doc-showcase-content eon-button{margin:0 5px;}
    </template>
</doc-playground>
)*

## Autofit Type

This type of grid is meant to reduce the amount of headaches when dealing with grid pages as it completely removes the need of scrolling vertically, it only shows the amount of rows that fit the in the available space.

*(
<doc-playground label="Autofit" html="true" js="true" css="true" selector="body">
    <template type="html">
        <head>
            <script src='framework/doc-eon/eon/eon.js'></script>
            <script>eon.import(['framework/doc-eon/eon/ui/eon-grid','framework/doc-eon/custom/doc-playground/doc-showcase']);</script>
        </head>
        <body>
            <doc-showcase label='Smaller Space'>
                <eon-grid resizable="false" footer="true" entries-count="false" row-min-height="80" column-min-width="200" autofit="true"
                    columns="name, lastname, age, phone" headers="Name, Lastname, Age, Phone, DNI" style="height:260px">
                    <eon-grid-row>
                        <eon-grid-cell column="name">John</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Jill</eon-grid-cell>
                        <eon-grid-cell column="lastname">Smith</eon-grid-cell>
                        <eon-grid-cell column="phone">666676666</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Joseph</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">16</eon-grid-cell>
                        <eon-grid-cell column="phone">3345</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Charles</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Jaime</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">16</eon-grid-cell>
                        <eon-grid-cell column="phone">3345</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Johan</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="phone">666676666</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">David</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Samuel</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">16</eon-grid-cell>
                        <eon-grid-cell column="phone">3345</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Vera</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="phone">666676666</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Janine</eon-grid-cell>
                        <eon-grid-cell column="lastname">Jackson</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    </eon-grid>
            </doc-showcase>
            <doc-showcase label='Larger Space'>
                <eon-grid resizable="false" footer="true" entries-count="false" row-min-height="80" column-min-width="200" autofit="true"
                    columns="name, lastname, age, phone" headers="Name, Lastname, Age, Phone, DNI" style="height:580px">
                    <eon-grid-row>
                        <eon-grid-cell column="name">John</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Jill</eon-grid-cell>
                        <eon-grid-cell column="lastname">Smith</eon-grid-cell>
                        <eon-grid-cell column="phone">666676666</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Joseph</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">16</eon-grid-cell>
                        <eon-grid-cell column="phone">3345</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Charles</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Jaime</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">16</eon-grid-cell>
                        <eon-grid-cell column="phone">3345</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Johan</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="phone">666676666</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">David</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Samuel</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">16</eon-grid-cell>
                        <eon-grid-cell column="phone">3345</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Vera</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="phone">666676666</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Janine</eon-grid-cell>
                        <eon-grid-cell column="lastname">Jackson</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    </eon-grid>
            </doc-showcase>
        </body>
    </template>
    <template type="css">
        .doc-showcase-content{display:flex;}
        .doc-showcase-content eon-button{margin:0 5px;}
    </template>
</doc-playground>
)*
