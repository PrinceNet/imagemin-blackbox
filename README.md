# imagemin-blackbox

imagemin-blackbox is a node CLI tool for minify images written in Javascript.

## Installation

Use the package manager [npm](https://www.npmjs.com) to install imagemin-blackbox.

```bash
npm i -g imagemin-blackbox
```

## Usage

Simple as that

```shell
imagemin-blackbox --srcFolder="/absolute_path/in" --targetFolder="/absolute_path/out"
```

You can even use optimal lossless compression by passing `--isOptimum`

```shell
imagemin-blackbox --srcFolder="/absolute_path/in" --targetFolder="/absolute_path/out" --isOptimum
```

Or if you want a portion of files to be compressed you can pass `--activePath` to work as a subpath

```shell
imagemin-blackbox --srcFolder="/absolute_path/in" --targetFolder="/absolute_path/out" --activePath="only_this_folder"
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)