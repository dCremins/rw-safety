'use strict'
console.time('init')
const electron = require('electron')
const path = require('path')
const url = require('url')

const app = electron.app

// Adds debug features like hotkeys for triggering dev tools and reload

// Prevent window being garbage collected
let mainWindow

function onClosed() {
	// Dereference the window
	// For multiple windows store them in an array
	mainWindow = null
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		backgroundColor: '#FFFFFF',
		width: 1000,
		height: 700
	})

	win.loadURL(url.format({
		pathname: path.join(__dirname, 'app.html'),
		protocol: 'file:',
		slashes: true
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

console.timeEnd('init')
