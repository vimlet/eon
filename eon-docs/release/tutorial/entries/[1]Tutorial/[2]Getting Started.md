# Getting Started

This tutorial assumes you are familiarized with the basics of HTML, CSS and JavaScript.

## Downloading Eon
They are several ways to get the latest Eon release.

- NPM:

    This is the recommended method since it provides a painless way to keep Eon up to date on all your projects.

    First install [NodeJS](https://nodejs.org), then run on the terminal

    ```
    npm install @vimlet/eon-cli -g   
    ```

    Once eon-cli is done installing, running the init command will get you the latest version of Eon in the current working directory and provide you with a template project if you choose so.

    ```
    eon-cli init
    ```

- Github Releases: 
        
    You can download it directly from the project repository releases section:
    [ https://github.com/vimlet/eon/releases ](https://github.com/vimlet/eon/releases)
     
- CDN: 
        
    You can also use it through the provided CDN:
    
    ```[html]
    <script src="https://cdn.jsdelivr.net/gh/vimlet/eon-cdn/build/eon/eon-bundle.min.js"></script>
    ```


## Creating a project

Once Eon is downloaded to our working directory, simply add to the `head` of your html file:

```[html]
<head>
    <script src="eon/eon.js"></script>
</head>
```

Note eon/eon.js is the default location but you can use any other path if you wish.

## Importing your first component

Now we can start importing components, you can think of components as the parts of what your application would be made of. This "parts" can be built by others or by you, by default Eon comes with a rich library of UI components that will fulfill most of your needs.

For now, we will use a simple button component as an example, but you can read more about custom components creation on the [ Components Creation tutorial ](/docs/#!version=1.0.0&mode=tutorial&file=entries%2FCore%20Introduction.md&link=Creation).

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

## Dealing with asynchronism
Due to the super fast asynchronous nature of Eon, in order to use it programmatically we need to wait for the component to be initialized with all its features. Although Eon provides many callbacks that you can hook to, the easiest one to get started is `eon.onReady`

```[javascript]
eon.onReady(function () {
    var el = document.querySelector("eon-button");
    el.value = "Hello World";
});
```

## Learn more...

You can keep learning more about using Eon following the [ To-Do List Tutorial ](/docs/#!version=1.0.0&mode=tutorial&file=entries%2FTutorial%2FTo-Do%20List%20Tutorial.md) or by checking the [ Core Introduction Section ](/docs/#!version=1.0.0&mode=tutorial&file=entries%2FCore%20Introduction.md&link=Components).

