<p align='center'>
<img src='https://vimlet.com/resources/img/copy-txt.png' title='Vimlet Copy' alt='Vimlet Copy' height="150">
</p>

This is a tool that copy files.

## Features

* Copy files.
* Watcher to look for changes and update files on the fly.

## Installation

npm install @vimlet/copy

## Usage

>## copy.copy(include, output, options, callback);
>
 >   Copy files in given pattern.
  >  * include: Directory to look for files.
   > * output: Directory where files will be written.
>* options: 
>1. exclude: Used to skip files that you don't want to copy.
>2. clean: Empty output directory before copy.
>* callback.
    
>## copy.watch(include, output, options);
>
 >   Watch for file changes in given pattern.
  >  * include: Directory to look for files.
   > * output: Directory where files will be written.
>* options: 
>1. exclude: Used to skip files that you don't want to copy.
>2. clean: Empty output directory before copy.


### Command mode:

* `vimlet-copy -i include -o output -e exclude -c`

    Calls copy.copy

* `vimlet-copy -i include -o output -e exclude -c -w`

    Calls copy.watch



## License
This project is under MIT License. See [LICENSE](https://github.com/vimlet/vimlet-commons/blob/master/LICENSE) for details.