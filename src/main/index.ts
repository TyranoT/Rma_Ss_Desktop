import { app, shell, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icone from '../../resources/icon.svg'
import jwt from 'jsonwebtoken'
import prisma from './lib/prisma'
import bcrypt from 'bcryptjs'

const generateToken = (user: { id: any; email: any }) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    import.meta.env.MAIN_VITE_AUTH_SECRET,
    { expiresIn: '3h' }
  )
}

const authenticateUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { 
      email: email
    }
  })

  if(user && bcrypt.compareSync(password, user.hashPassword)){
    return user;
  } else {
    return null;
  }
}

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icone } : {}),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


ipcMain.handle('login', async (event, { email, password }) => {
  const user = await authenticateUser(email, password)

  if(user){
    const token = generateToken(user);
    return { token, user };
  } else {
    throw new Error('Usuário ou senha inválidos');
  }
})

ipcMain.handle('verificacao_token', (event, token) => {
  try {
    const decoded = jwt.verify(token, import.meta.env.MAIN_VITE_AUTH_SECRET);
    return { isAutenticado: true, decoded };
  } catch (e) {
    return { isAutenticado: false };
  }
})