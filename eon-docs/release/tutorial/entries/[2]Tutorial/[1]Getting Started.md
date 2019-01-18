# Getting Started

This tutorial assumes you are familiarized with the basics of HTML, CSS and JavaScript.

## Downloading eon
They are several ways to get the latest eon release.

- NPM:

    This is the recommended method since it provides a painless way to keep eon up to date on all your projects.

    First install [NodeJS](https://nodejs.org), then run on the terminal

    ```
    npm install @vimlet/eon-cli -g   
    ```

    Once eon-cli is done installing, simply open the terminal on the desired working directory and type
    ```
    eon-cli install
    ```

    This will download the latest version of eon and extract it for you.

- BROWSER: 
        
    You can download it directly from the website download section:
    [https://vimlet.com/downloads](https://vimlet.com/downloads). 

## Creating a project

Once eon is downloaded to our working directory, simply add to the `head` of your html file:

```[html]
<head>
    <script src="eon/eon.js"></script>
</head>
```

Note eon/eon.js is the default location but you can use any other path if you wish.

## Importing components

Now we can start importing components, you can think of components as the parts of what your application would be made of. This "parts" can be built by others or by you, by default eon comes with a rich library of UI components that will fulfill most of your needs.

For now, we will use a simple button component as an example, but you can read more about custom components creation on the [Components Creation tutorial](/vimlet/VimletComet/master/docs/release/index.html#!version=1.0.0&mode=tutorial&file=entries/Component%20Creation.md).

```[html]
<head>
    <script>
        eon.import([
            "eon/ui/eon-button.html"
        ]);
    </script>
</head>
``` 

Once a component is imported it can be used as any other html element.

```[html]
<body>
    <eon-button label="Button"><eon-button>
</body>
``` 

## eon Asynchronism
Due to the super fast asynchronous nature of eon, in order to use it programmatically we need to wait for the component to be initialized with all its features. Although eon provides many callbacks that you can hook to, the easiest one to get started is `eon.onReady`

```[javascript]
eon.onReady(function () {
    var el = document.querySelector("eon-button");
    el.value = "Hello World";
});
```

## Learn more...

You can keep learning more about using eon components in the To-Do List Tutorial and more about creating your own and managing state in the Game of Life Tutorial.

 You can also learn about the guts of eon components and its patterns in the Core Introduction.

