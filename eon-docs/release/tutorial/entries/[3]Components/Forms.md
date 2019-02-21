[Button]<>

The eon-button component is a button with different facilities. It can be used as a form button using the property `type="submit"`, or as a button that activates a functionality.

## Button styles
By default the button style is outline, but they can be flat and filled using the property `design`.

*(
<doc-playground label="Regular Buttons" html="true" js="true" css="true" selector="body">
    <template type="html">
        <head>
            <script src='framework/eon/eon.js'></script>
            <script>eon.import(['framework/eon/ui/eon-button','framework/custom/app-playground/app-showcase']);</script>
        </head>
        <body>
            <app-showcase title='Outline'>
                <eon-button value='Button'></eon-button>
                <eon-button value='Disabled' disabled='true'></eon-button>
            </app-showcase>
                <app-showcase title='Flat'>
                <eon-button value='Button' design='flat'></eon-button>
                <eon-button value='Disabled' disabled='true' design='flat'></eon-button>
            </app-showcase>
                <app-showcase title='Filled'><eon-button value='Button' design='filled'></eon-button>
                <eon-button value='Disabled' disabled='true' design='filled'></eon-button>
            </app-showcase>
        </body>
    </template>
    <template type="css">
        .app-showcase-content{display:flex;}
        .app-showcase-content eon-button{margin:0 5px;}
    </template>
</doc-playground>
)*

## Buttons with icons
To display buttons with icons just use the `vicon` property passing any of the icons provided in the Vimlet library. If you prefer to use other icons library you can use the property `icon` passing an `i` element directly.

*(
<doc-playground label="Icon Buttons" html="true" js="true" css="true" selector="body">
    <template type="html">
        <head>
            <script src='framework/eon/eon.js'></script>
            <script>eon.import(['framework/eon/ui/eon-button','framework/custom/app-playground/app-showcase']);</script>
        </head>
        <body>
            <app-showcase title='Outline'>
                <eon-button value='Button' icon='<i class="vicon vicon-cog"></i>'></eon-button>
                <eon-button vicon='vicon-build'></eon-button>
                <eon-button vicon='vicon-build' disabled='true'></eon-button>
            </app-showcase>
            <app-showcase title='Flat'>
                <eon-button value='Button' icon='<i class="vicon vicon-cog"></i>' design='flat' icon-position="right"></eon-button>
                <eon-button vicon='vicon-build' design='flat'></eon-button>
                <eon-button vicon='vicon-build' disabled='true' design='flat'></eon-button>
            </app-showcase>
            <app-showcase title='Filled'>
                <eon-button value='Button' icon='<i class="vicon vicon-cog"></i>' design='filled'></eon-button>
                <eon-button vicon='vicon-build' design='filled'></eon-button>
                <eon-button vicon='vicon-build' disabled='true' design='filled'></eon-button>
            </app-showcase>
        </body>
    </template>
    <template type="css">
        .app-showcase-content{display:flex;}
        .app-showcase-content eon-button{margin:0 5px;}
    </template>
</doc-playground>
)*
