<p align="center">
<a href="https://eonjs.org/">
<img src="https://vimlet.com/resources/img/eon-h-flat.png" height="100"></img>
</a>
</p>

<p align="center">
<strong>Fast, Light & Productive UX</strong>
</p>

![GitHub release](https://img.shields.io/github/release/vimlet/eon.svg)
![Travis (.org) branch](https://img.shields.io/travis/vimlet/eon/master.svg)
![Codacy grade](https://img.shields.io/codacy/grade/a08a454edeac4b12b6c58b7aac866a2b.svg)
![GitHub](https://img.shields.io/github/license/vimlet/eon.svg)

Eon is an **ultra light and fast web framework** that focuses on user experience and developer experience, allowing you to create intuitive interfaces across any device with little effort. Eon harness state of the art technologies to provide a smooth developing experience without compromising **compatibility and performance**, so you can stay highly productive while retaining full control of your user interface.

Bundled with Eon there is a comprehensive library of **flexible and themeable** components that will suit most of your needs but you can also create your own with ease.

At is heart Eon takes care of the hassles of user interface creation, effectively simplifying a plethora of issues that any interface designer faces in a daily basis (compatibility, performance, responsiveness, data binding, extensibility...) so you can stay focused on what really matters, your app!

## Features

- **Light:** Core of less than 16kb (minified and gzipped).
- **Fast:** With its asynchronous patterns and natively supported specs.
- **Intuitive:** The DOM is your API; HTML and JavaScript are enough to work with Eon.
- **Semantic:** Non-verbose declarative and programmatic API.
- **Templating:** Data binding capabilities.
- **Compatible:** Designed for all modern browsers.
- **Customizable:** Themeable and customizable components.
- **Extensible:** Write once, reach everywhere.
- **Responsive:** Mobile first, visual and functionality adaptation.

## Installation

- You can download the latest version [here](https://github.com/vimlet/eon/releases) and add it to your project.

- Via NPM:
  `npm install @vimlet/eon-cli -g`

      Once it is installed

      ```eon-cli install```

      > You can execute ```eon-cli install``` to update it later.

## How to use

Once it's downloaded, simply import it into your head.

```html
<head>
  <script src="eon/eon.js"></script>
</head>
```

_Ensure that you use the path to your Eon location folder_

### Importing components

You have to import the components that you wish to use in your head too.

```html
<head>
  <script>
    eon.import(["eon/ui/eon-button.html"]);
  </script>
</head>
```

Now it can be use anywhere in the body as any other html element.

```html
<body>
    <eon-button label="Click Me!"><eon-button>
</body>
```

To use it programmatically due to its asynchronous nature you need to wait for eon.onReady

```javascript
eon.onReady(function () {
  document.querySelector("eon-button").label = "Hello World";
});
```

Keep reading the full [documentation](https://eonjs.org/docs/#!version=latest&mode=tutorial&file=entries%2FTutorial%2FWelcome.md)

## License

Eon is released under MIT License. See [LICENSE](https://github.com/vimlet/eon/blob/master/LICENSE) for details.
