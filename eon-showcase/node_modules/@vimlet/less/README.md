<p align='center'>
<img src='https://vimlet.com/resources/img/less-txt.png' title='Vimlet Less' alt='Vimlet Less' height="150">
</p>

This is a tool that compile less files.

## Features

* Compile less files.
* Watcher to look for changes and update files on the fly.

## Installation

npm install @vimlet/less

## Usage

* `less.render(include, output, options, callback);`

    Compile .less files in given pattern.
    
* `less.watch(include, output, options);`

    Watch for .less files changes in given pattern.

    **options**

    `{
        "exclude": "glob patterns",
        "clean": false
    }`

    * include: Directory to look for files.
    * exclude: Used to skip files that you don't want to compile.
    * output: Directory where files will be written using.
    * clean: Empty output directory before compile.

### Command mode:

* `vimlet-less -i include -o output -e exclude -c`

    Calls less.render

* `vimlet-less -i include -o output -e exclude -c -w`

    Calls less.watch


## License
Vimlet Less is released under MIT License. See [LICENSE](https://github.com/vimlet/vimlet-less/blob/master/LICENSE) for details.

