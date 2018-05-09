

[//]: # (badges)

[![license](https://vimlet.com/vimlet/VimletComet/master/docs/readme/1525801096800/license.svg?raw=true "License")](https://github.com/vimlet/VimletComet/blob/master/LICENSE)
[![build](https://vimlet.com/vimlet/VimletComet/master/docs/readme/1525801096800/build.svg?raw=true "Build")](https://vimlet.com/downloads)
[![docs](https://vimlet.com/vimlet/VimletComet/master/docs/readme/1525801096800/docs.svg?raw=true "Docs")](https://vimlet.com/vimlet/VimletComet/master/docs/release/index.html)

[//]: # (badges)


<p align="center">
<a href="https://vimlet.com/vcomet">
<img width="450" src="logo.png"></img>
</a>
</p>



<p align="center">
<strong>Fast, Light & Productive UX</strong>
</p>

vComet is an **ultra light and fast web framework** that focuses on user experience and developer experience, allowing you to create intuitive interfaces across any device with little effort. vComet harness state of the art technologies to provide a smooth developing experience without compromising **compatibility and performance**, so you can stay highly productive while retaining full control of your user interface. 

Bundled with vComet theres a comprehensive library of **flexible and themeable** components that will suite most of your needs but you can also create your own with ease. 

At is heart vComet takes care of the hassels of user interface creation, effectively simplifying a plethora of issues that any interface designer faces in a daily basis (compatibility, performance, responsiveness, data binding, extensibility...) so you can stay focused on what really matters, your app!

## Features

* **Light:** Core of less than 16kb (minimified and gzipped).
* **Fast:** It's asynchronous patterns and natively supported specs.
* **Intuitive:** The DOM is your API; HTML and JavaScript is enough to work with vComet.
* **Semantic:** Non-verbose declarative and programmatic API.
* **Templating:** Data binding capabilities.
* **Compatible:** Designed for all modern browsers.
* **Customizable:** Themeable and customizable components.
* **Extensible:** Write once, reach everywhere.
* **Responsive:** Mobile first, visual and funcionality adaptation.


## Installation

* You can download the latest version [here](https://vimlet.com/downloads) and add it to your project.

* NPM client:
```npm install @vimlet/vcomet-cli -g```

    Once it is installed

    ```vcomet-cli install```

    > You can excecute ```vcomet-cli install``` to update it later.


## How to use

Once it's downloaded, simply import it in your head.
```html
<head>
    <script src="vcomet/vcomet.js"></script>
</head>
```
*Ensure that you use the path to your vcomet location folder*

### Importing components

You have to import the components that you wish to use in your head too.
```html
<head>
    <script>
        vcomet.import([
            "vcomet/ui/vc-button.html"
        ]);
    </script>
</head>
```

Now it can be use anywhere in the body as any other html element.

```html
<body>
    <vc-button label="Click Me!"><vc-button>
</body>
```

To use it programmatically due to its asynchronous nature you need to wait for vcomet.onReady

```javascript
vcomet.onReady(function () {
    document.querySelector("vc-button").label = "Hello World";
});
```

Keep reading the full [documentation](https://vimlet.com/vimlet/VimletComet/master/docs/release/index.html)

## License

vComet is released under MIT License. See [LICENSE](https://github.com/vimlet/VimletComet/blob/master/LICENSE) for details.

