# Selfie

Captures website snapshot as an PNG screenshot and HTML source file. Uses [puppeteer](https://github.com/GoogleChrome/puppeteer) for content rendering.

## Usage

```
selfie --url https://github.com/dawidgorny --image dg-__STAMP__.png --html dg-__STAMP__.html
```

Available arguments:

```
--url     -u    URL to load (REQUIRED)
--image   -i    Output image file name (PNG)
--html    -h    Output HTML file name
--width   -W    Viewport width
--height  -H    Viewport height
--help          Print help

```

## Author

Dawid Górny

## License

MIT
