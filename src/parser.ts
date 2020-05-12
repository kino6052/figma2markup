// @ts-ignore
const _ = global.__DEPENDENCIES__;

const NodeSubject__parser = new _.Subject<[BaseNode, BaseNode]>(
  "node"
) as Subject<[BaseNode, BaseNode]>;
const OnLoadSubject__parser = new _.Subject<{}>("load") as Subject<{}>;
const OnUnsubscribeSubject__parser = new _.Subject<{}>(
  "unsubscribe"
) as Subject<{}>;

let count = 0;

interface IListItem {
  id: string;
  parentId: string;
  before: string;
  after: string;
}

class List {
  list: Array<IListItem> = [];
}

NodeSubject__parser.subscribe((nodes) => {
  count += 1;
  console.warn(count, "I have received", nodes);
});

OnLoadSubject__parser.next({});

OnUnsubscribeSubject__parser.subscribe(() => {
  OnLoadSubject__parser.unsubscribe();
  NodeSubject__parser.unsubscribe();
  OnUnsubscribeSubject__parser.unsubscribe();
});
