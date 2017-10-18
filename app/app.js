'use strict'
const electron = require('electron')
const path = require('path')
const url = require('url')
const app = electron.app

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')()
require('electron-reload')(__dirname)
// prevent window being garbage collected
let mainWindow

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null
}

function createMainWindow() {
	const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
//  win = new BrowserWindow({width * .5, height * .5})
	const win = new electron.BrowserWindow({
		//width: width,
		//height: height
		width: 1000,
		height: 700
	})

	win.loadURL(url.format({
    pathname: path.join(__dirname, 'app.html'),
    protocol: 'file:',
    slashes: true,
  }))

	win.on('closed', onClosed)

	return win
}

app.on('window-all-closed', () => {
	app.quit()
})

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow()
	}
})

app.on('ready', () => {
	mainWindow = createMainWindow()
})
