import { globalShortcut } from "electron";

export default function registerArrowShortcuts(window) {
    
    const pixelDistanceHorizontal = 75
    const pixelDistanceVertical = 50

    globalShortcut.register('Alt+Left', () => {
        const [x, y] = window.getPosition();
        window.setPosition(x - pixelDistanceHorizontal, y)
    });

    globalShortcut.register('Alt+Right', () => {
        const [x, y] = window.getPosition();
        window.setPosition(x + pixelDistanceHorizontal, y)
    });

    globalShortcut.register('Alt+Up', () => {
        const [x, y] = window.getPosition();
        window.setPosition(x, y - pixelDistanceVertical)
    });

    globalShortcut.register('Alt+Down', () => {
        const [x, y] = window.getPosition();
        window.setPosition(x, y + pixelDistanceVertical)
    });
}

