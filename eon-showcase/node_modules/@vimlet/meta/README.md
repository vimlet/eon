<p align='center'>
<img src='https://vimlet.com/resources/img/Meta-txt.png' title='Vimlet Meta' alt='Vimlet Meta' height="150">
</p>

It is a tool that generate files from templates.

## Features

* Data binding.
* Inheritance templates.
* Glob patters to search for template files.
* Watcher to look for changes and update files on the fly.

## Installation

npm install @vimlet/meta

## Usage

* `meta.parse(template, options, callback);`

    Returns the result of given template.

* `meta.parseTemplateGlob(include, options, callback);`

    Returns an object with the result. `{"relativePath":"",
    "result":""}`

* `meta.parseTemplateGlobAndWrite(include, output, options, callback);`

    Write the results to output folder while keeping files structure.

* `meta.watch(include, output, options);`

    Do parseTemplateGlobAndWrite and keep looking for changes.

    **options**

    `{
        "exclude": "glob patterns",
        "data": {},
        "clean": false
    }`

    * exclude: Used to skip files that you don't want to parse.
    * output: Directory where files will be written using parseTemplateGlobAndWrite.
    * data: Data to be bind.
    * clean: Empty output directory before parse.

### Command mode:

* `vimlet-meta -i include -o output -e exclude -d data -c clean`

    Calls meta.parseTemplateGlobAndWrite

* `vimlet-meta -i include -o output -e exclude -d data -c clean -w`

    Calls meta.watch

### Extra

**vimlet-meta** remove comments if there are only meta code within it.

> <% teamplate("anothertemplate.vmi")%>
> 
> produce the same result as
> 
> // <% teamplate("anothertemplate.vmi")%>
>
> or
>
> /* <% teamplate("anothertemplate.vmi")%> */

This behaviour can be avoided using `-p`.


## Example

>* Template:
>` Hello I'm a template <%echo("Raw text");%>`
>
>* Result:
> `Hello I'm a template Raw text

>* Template:
>` Hello I'm a template <% data.name %>`
>
>* Data:
> `{"name":"vimlet-meta"}`
>* Result:
> `Hello I'm a template vimlet-meta`

>* Template1:
>` Hello I'm a template <%template(template2.vmi)%>`
>
>* Template2:
> `I'm another template`
>
>* Result:
> `Hello I'm a template I'm another template`


## Data binding

One of the meta advantages is the ability to bind data from a json. IE:

Template:

`Hello <%= data.name%>`

Data:

`{"name": "Peter"}`

Result:

```
Hello Peter
```

## File extension

We use .vmt for vimlet meta templates and .vmi for vimlet meta imported in our imported templates but any extension is welcome.

Note that meta respect file extension if it is included in template name:
* index.html.vmt after parsed will be written as index.html.




## License
vComet is released under MIT License. See [LICENSE](https://github.com/vimlet/vimlet-meta/blob/master/LICENSE) for details.
