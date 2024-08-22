const {app, BrowserWindow} = require('electron')

const loadPage = async (mainWindow, startingWindow) => {
  try {
    await mainWindow.loadURL('http://localhost:3000')

    await startingWindow.close()
    await mainWindow.show()
  } catch(error) {
    loadPage(mainWindow, startingWindow)
  }
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 800
  })

  mainWindow.hide()

  const startingWindow = new BrowserWindow({
    width: 400,
    height: 200
  })

  startingWindow.loadFile('index.html')

  loadPage(mainWindow, startingWindow)
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})