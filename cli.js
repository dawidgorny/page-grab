#!/usr/bin/env node

const debug = require('debug')
const error = debug('selfie:error')
const log = debug('selfie:log')
log.log = console.log.bind(console)
debug.enable('selfie:*')

const tinydate = require('tinydate')
const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')
const argv = require('minimist')(process.argv.slice(2))

const url = argv.u || argv.url
const imageFilename = argv.i || argv.image
const htmlFilename = argv.h || argv.html

const width = argv.W || argv.width || 1280
const height = argv.H || argv.height || 480

if (argv.help) {
  console.info(`
  $ selfie --url https://github.com/dawidgorny --image dg-__STAMP__.png --html dg-__STAMP__.html

  --url     -u    URL to load (REQUIRED)
  --image   -i    Output image file name (PNG)
  --html    -h    Output HTML file name
  --width   -W    Viewport width
  --height  -H    Viewport height
  --help          Print help
  `)
  process.exit(0)
}

if (!url) {
  error('Required argument: %o. Try `--help`.', '--url')
  process.exit(1)
}

const stamp = tinydate('{YYYY}{MM}{DD}-{HH}{mm}{ss}')
let datetime = new Date()

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  page.setViewport({
    width: width,
    height: height,
    deviceScaleFactor: 2
  })
  await page.goto(url)

  datetime = new Date()

  if (imageFilename) {
    await page.screenshot({
      path: fillPlaceholders(imageFilename),
      fullPage: true
    })
  }
  const htmlContent = await page.content()
  if (htmlFilename) {
    fs.writeFileSync(path.join(__dirname, fillPlaceholders(htmlFilename)), htmlContent)
  }

  await browser.close()
})()

function fillPlaceholders (txt) {
  let ret = txt
  ret = ret.replace('__STAMP__', stamp(datetime))
  return ret
}