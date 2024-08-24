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

const createWindow = async () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    show: false,
  })

  const startingWindow = new BrowserWindow({
    width: 400,
    height: 200,
    frame: false
  })

  await startingWindow.loadFile('bannerWindow/view.html')

  await loadPage(mainWindow, startingWindow)
}

app.whenReady().then(async () => {
  await createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})