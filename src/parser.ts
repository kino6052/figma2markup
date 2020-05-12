// @ts-ignore
const __parser__dep = global.__DEPENDENCIES__;

const sub = new __parser__dep.Subject('test') as Subject<{}>;
sub.subscribe(console.warn);
sub.next('test test test');
sub.unsubscribe();
sub.next('test test test');
sub.subscribe(console.warn);
sub.next('test test test');
