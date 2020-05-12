// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__);
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
const generateCSS = (x, y, width, height, color) => {
    const { r, g, b } = color || {};
    return `
  display: flex;
  position: absolute;
  width: ${width}px;
  height: ${height}px;
  left: ${x}px;
  top: ${y}px;
  background: rgb(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)});
  `;
};
const generate = () => {
    for (const item of figma.currentPage.selection) {
        if (item.type !== "FRAME")
            return;
        for (const node of item.children) {
            if (node.type === "RECTANGLE") {
                const test = node.fills[0];
                let color = { r: 0, g: 0, b: 0 };
                if (test.type === 'SOLID') {
                    color = test.color;
                }
                return `<div style="${generateCSS(node.x, node.y, node.width, node.height, color)}"></div>`;
            }
        }
    }
};
console.warn(generate());
figma.ui.onmessage = msg => {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    if (msg.type === 'create-rectangles') {
        const nodes = [];
        for (let i = 0; i < msg.count; i++) {
            const rect = figma.createRectangle();
            rect.x = i * 150;
            rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
            figma.currentPage.appendChild(rect);
            nodes.push(rect);
        }
        figma.currentPage.selection = nodes;
        figma.viewport.scrollAndZoomIntoView(nodes);
    }
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    figma.closePlugin();
};
