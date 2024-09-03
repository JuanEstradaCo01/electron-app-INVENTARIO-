import { app, BrowserWindow, Menu } from "electron";
import url, { fileURLToPath } from "url";
import path, { dirname } from "path";

//Configuro el dirname
const __dirname = dirname(fileURLToPath(import.meta.url));

let mainWindow
let newProductWindow

//app.disableHardwareAcceleration();

//Ventana principal
app.on("ready", () => {

    mainWindow = new BrowserWindow({
        title: "Inventario",
        width: 800,
        height: 600
    })

    setTimeout(() => {
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, `./views/index.html`),
            protocol: "file",
            slashes: true
        }))

        const mainMenu = Menu.buildFromTemplate(menuArray);

        Menu.setApplicationMenu(mainMenu)

    }, 2500)

    mainWindow.setMenu(null);

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, `./views/iniciando.html`),
        protocol: "file",
        slashes: true
    }))

    mainWindow.on("closed", () => {
        app.quit()
    })
});

//Menus
const menuArray = [
    {
        label: "Agregar",
        submenu: [
            {
                label: "Agregar producto",
                accelerator: "Ctrl + N",
                click() {
                    addNewProductWindow()
                }
            }
        ]
    },
    {
        label: "Salir",
        submenu: [
            {
                label: "Salir",
                accelerator: process.platform === "darwin" ? "command + Q" : "Ctrl + Q",
                click() {
                    app.quit()
                }
            }
        ]
    }
];

//Funcion para las URL de las vistas como primer parametro la window que se va enviar y como segundo parametro la ruta .html
function loadView(window, view) {
    window.loadURL(url.format({
        pathname: path.join(__dirname, `./views/${view}.html`),
        protocol: "file",
        slashes: true
    }))
};

//Ventana para agregar un producto
function addNewProductWindow() {
    newProductWindow = new BrowserWindow({
        width: 400,
        height: 300,
        title: "Agregar un producto"
    })

    loadView(newProductWindow, "addProduct")

    //Quitar menu de la ventana
    //newProductWindow.setMenu(null)

    newProductWindow.on("closed", () => {
        newProductWindow = null
    })
};

//Valido si la plataforma es MacOs y configuro el menu
if (process.platform === "darwin") {
    menuArray.unshift({
        label: app.getName()
    })
};

if (process.env.NODE_ENV !== "production") {
    menuArray.push({
        label: "Devtools",
        submenu: [
            {
                label: "Show/Hide DevTools",
                accelerator: "F12",
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools()
                }
            },
            {
                role: "reload"
            }
        ]
    })
};