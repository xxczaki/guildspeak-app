import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import * as url from 'url'

let win: BrowserWindow | null
let loading: BrowserWindow | null

const installExtensions = async () => {
  const installer = require('electron-devtools-installer')
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS', 'APOLLO_DEVELOPER_TOOLS']

  return Promise.all(extensions.map(name => installer.default(installer[name], forceDownload))).catch(console.log)
}

const createWindow = async () => {
  if (process.env.NODE_ENV !== 'production') {
    await installExtensions()
  }

  win = new BrowserWindow({
    width: 1152,
    height: 648,
    minWidth: 800,
    minHeight: 600,
    title: 'Guildspeak',
    show: false,
    frame: false,
    backgroundColor: '#202020'
  })

  loading = new BrowserWindow({
    width: 350,
    height: 350,
    resizable: false,
    title: 'Guildspeak',
    show: false,
    frame: false,
    backgroundColor: '#202020'
  })

  loading.once('show', () => {
    win.webContents.once('dom-ready', () => {
      win.show()
      loading.hide()
      loading.close()
    })

    if (process.env.NODE_ENV !== 'production') {
      win.loadURL(`http://localhost:2003`)
    } else {
      win.loadURL(
        url.format({
          pathname: path.join(__dirname, 'index.html'),
          protocol: 'file:',
          slashes: true
        })
      )
    }
  })

  if (process.env.NODE_ENV !== 'production') {
    loading.loadURL(
      url.format({
        pathname: path.join(__dirname, '..', 'src', 'loading.html'),
        protocol: 'file:',
        slashes: true
      })
    )
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, 'loading.html'),
        protocol: 'file:',
        slashes: true
      })
    )
  }
  loading.show()

  if (process.env.NODE_ENV !== 'production') {
    // Open DevTools
    win.webContents.openDevTools()
  }

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
