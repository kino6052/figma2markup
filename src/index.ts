// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.

// @ts-ignore
const _ = global.__DEPENDENCIES__;

const NodeSubject__index = new _.Subject<[BaseNode, BaseNode]>('node');
const OnLoadSubject__index = new _.Subject<{}>('load') as Subject<{}>;
const OnUnsubscribeSubject__index = new _.Subject<{}>('unsubscribe') as Subject<{}>;

const generateCSS = (x: number, y: number, width: number, height: number, color: { r: number, g: number, b: number}) => {
  const { r, g, b } = color || {};
  return `
  display: flex;
  position: absolute;
  width: ${width}px;
  height: ${height}px;
  left: ${x}px;
  top: ${y}px;
  background: rgb(${Math.round(r*255)},${Math.round(g*255)},${Math.round(b*255)});
  `
}

const recursive = (node: BaseNode, cb: (parent: BaseNode, child: BaseNode) => void) => {
  let __node = node as ChildrenMixin;
  if (!__node || !__node.children) return;
  for (const child of __node.children) {
    cb(__node as BaseNode, child as BaseNode);
    recursive(child as BaseNode, cb);
  }
}

const generate = () => {  
  const selection = figma?.currentPage?.selection;
  if (!selection) return;
  recursive(selection[0] as unknown as BaseNode, (parent, child) => {
    NodeSubject__index.next([parent, child]);
  })
}

OnLoadSubject__index.subscribe(() => {
  generate();
  OnUnsubscribeSubject__index.next({});
})

OnUnsubscribeSubject__index.subscribe(() => {
  OnLoadSubject__index.unsubscribe();
  NodeSubject__index.unsubscribe();
  OnUnsubscribeSubject__index.unsubscribe();
  figma.closePlugin();
})