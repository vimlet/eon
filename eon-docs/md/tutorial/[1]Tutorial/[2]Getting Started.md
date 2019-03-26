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

Once [eon-cli](#!version=latest&mode=tutorial&file=entries%2FIntroduction%2Flink=eon-cli.md) is done installing, running the init command will get you the latest version of Eon in the current working directory and provide you with a template project if you choose so.

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

## Your firsts steps

Once Eon is downloaded to our working directory, go inside your head tag and import eon.js as you would import any other javascript file, this will bring you access to Eon and all its functionality.

```[html]
<head>
    <script src="eon/eon.js"></script>
</head>
```

Note eon/eon.js is the default location but you can use any other path if you wish.

## Importing your components

Now we can start importing components, you can think of components as the parts of what your application would be made of. These "parts" can be built by others or by you, by default Eon comes with a rich library of UI components that will fulfill most of your needs.


Once you decided which components you want to work with, you just have to call Eon's import function providing the paths of these components, there are two ways for providing these paths.


You can provide an array of path strings for the desired components like so:

```[html]
<head>
    <script>
        eon.import([
            "eon/ui/eon-component-1.html"
            "eon/ui/eon-component-2.html"
            "eon/ui/eon-component-3.html"
        ]);
    </script>
</head>
``` 

If you only want to import one component you can also privde an array with only one path, or you can just pass a single path string:

```[html]
<head>
    <script>
        eon.import("eon/ui/eon-component.html");
    </script>
</head>
``` 

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

## Using your components

Once your components are imported you can you use them either declaratively using HTML tags or programmatically creating and appending elements to the DOM with Javascript.


To use Eon components declaratively simply use their name tag as any other regular html element eg. `<div>, <span>, etc...`

```[html]
<body>
  <eon-button label="Declarative"></eon-button>
</body>
```

The programmatic way requires some Javascript knowledge, this approach is preferred when Eon components need to be created on the fly, to achieve this simply create them using the vanilla DOM API. 

```[html]
<script>
  var button = document.createElement("eon-button");
  document.body.appendChild(button);
</script>
``` 

Although you can create/append your component at any point, if you want to initialize it with different values or modify it later on it is strictly recommended to take advantage of Eon's onReady callback, since this callback ensures everything is initialized with all its features and ready to be tampered with.

```[html]
<script>
  eon.onReady(function () {
    var button = document.createElement("eon-button");
    button.addAttribute("label", "Programmatic");
    document.body.appendChild(button);
  });
</script>
``` 

## Learn more...

You can keep learning more about using Eon following the [ To-Do List Tutorial ](/docs/#!version=1.0.0&mode=tutorial&file=entries%2FTutorial%2FTo-Do%20List%20Tutorial.md) or by checking the [ Core Introduction Section ](/docs/#!version=1.0.0&mode=tutorial&file=entries%2FIntroduction.md&link=Creation).

