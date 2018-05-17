# vComet/cli

This module is a vComet downloader and installer. It also helps you to keep it updated.

[vComet](https://vimlet.com/vcomet) is an ultra light and fast web framework that focuses on user experience and developer experience.
At Vimlet we care about our customers so we did an installer just to make developers life easier.

## Features
vComet/cli will download the latest vComet version in your project folder. 
It creates a file called `vcomet.json` with configuration data such as:
* Destination folder.
* vComet version to use.
* Add folders to ignore list to not be deleted while updating vComet version letting the user create his custom components within vComet directory.

###Incoming features
* Dependencies to download third partners vComet components.

## Installation
* NPM: npm install@vimlet/vcomet-cli -g

## How to use
After installation just run `vcomet-cli install` in your project folder.
You can run this command later to keep it updated. 
Read [docmumentation]() for more information about `vcomet.json`

## Examples
If you run `vcomet-cli init` a full example project will be downloaded ready to run. It is like a template project easy to modify.

## License
vComet is released under MIT License. See [LICENSE](https://github.com/vimlet/VimletComet/blob/master/LICENSE) for details.
