// @ts-ignore
const _ = global.__DEPENDENCIES__;

const NodeSubject__index = new _.Subject<[BaseNode, BaseNode]>("node");
const OnLoadSubject__index = new _.Subject<{}>("load") as Subject<{}>;
const OnUnsubscribeSubject__index = new _.Subject<{}>(
  "unsubscribe"
) as Subject<{}>;

const recursive = (
  node: BaseNode,
  cb: (parent: BaseNode, child: BaseNode) => void
) => {
  let __node = node as ChildrenMixin;
  if (!__node || !__node.children) return;
  for (const child of __node.children) {
    cb(__node as BaseNode, child as BaseNode);
    recursive(child as BaseNode, cb);
  }
};

const generate = () => {
  const selection = figma?.currentPage?.selection;
  if (!selection) return;
  recursive((selection[0] as unknown) as BaseNode, (parent, child) => {
    NodeSubject__index.next([parent, child]);
  });
};

OnLoadSubject__index.subscribe(() => {
  generate();
  OnUnsubscribeSubject__index.next({});
});

OnUnsubscribeSubject__index.subscribe(() => {
  OnLoadSubject__index.unsubscribe();
  NodeSubject__index.unsubscribe();
  OnUnsubscribeSubject__index.unsubscribe();
  figma.closePlugin();
});
