# IO

Files handler.

## Installation

npm install @vimlet/io

It will be also installed as a module within @vimlet/io

## Usage

> ## getFiles(dir, options)
> 
> Get files from directory and return an array of object with relative path and root folder. `[{root:"root_path",files:["file1_path","file2_path"...]}]`
> * dir: Array of patterns to search or single pattern.
> * options: 
> * - exclude: patterns to exclude from search 
> * - ignoreExtension: ignore file extensions 
> * - includeFolders: Boolean to include folders as paths, default false.

> ## absoluteFiles(index)
> 
> Return an array of absolute paths from a file index.
> * index: Array of objects with root and relative file paths. Like the result of getFiles.

> ## getRootFromPattern(pattern)
> 
> Get root from a pattern. Removes magic and file name.
> * pattern.

> ## isDirectory(path)
> 
> Check if a path is directory or file.
> * path.

> ## getFileSize(path)
> 
> Returns the size of a file.
> * path.

> ## deleteFolderRecursive(path, callback)
> 
> Delete a folder and its content.
> * path.
> * callback.

> ## deleteFolderRecursiveSync(path)
> 
> Delete a folder and its content.
> * path.

> ## isInPattern(path, pattern, options)
> 
> Check if a given path belongs to a pattern.
> * path.
> * pattern.
> * options: 
> * - exclude: patterns to exclude from search.

> ## writeToDisk(output, data, callback)
> 
> Write given data to disk.
> * output: Destination folder.
> * data: Data to write.
> * callback.

> ## getCommonBasePath(paths)
> 
> Return base path, what all have in common, for given paths.
> * paths.


## License
This project is under MIT License. See [LICENSE](https://github.com/vimlet/vimlet-commons/blob/master/LICENSE) for details.