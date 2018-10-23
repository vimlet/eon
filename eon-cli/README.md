# eon-cli

This module is a eon downloader and installer. It also helps you to keep it updated.

[eon](https://vimlet.com/eon) is an ultra light and fast web framework that focuses on user experience and developer experience.
At Vimlet we care about our customers so we did an installer just to make developers life easier.

## Features
eon-cli will download the latest eon version in your project folder. 
It creates a file called `eon.json` with configuration data such as:
* Destination folder.
* eon version to use.
* Add folders to ignore list to not be deleted while updating eon version letting the user create his custom components within eon directory.

###Incoming features
* Dependencies to download third partners eon components.

## Installation
* NPM: npm install@vimlet/eon-cli -g

## How to use
After installation just run `eon-cli install` in your project folder.
You can run this command later to keep it updated. 
Read [docmumentation]() for more information about `eon.json`

## Examples
If you run `eon-cli init` a full example project will be downloaded ready to run. It is like a template project easy to modify.

## License
eon is released under MIT License. See [LICENSE](https://github.com/vimlet/eon/blob/master/eon-framework/LICENSE) for details.
