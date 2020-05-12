

class Messenger<T extends {}> {
  private listeners: { [key: string]: Array<(message: T) => void>} = {};
  addListener(type: string, cb: (message: T) => void) {
    if (!this.listeners[type]) this.listeners[type] = [];
    this.listeners[type] = [...this.listeners[type], cb];
    return () => {
      this.listeners[type] = this.listeners[type].filter(listener => listener !== cb);
    }
  }
  post(type: string, message: T) {
    const listeners = this.listeners[type] || [];
    for (const listener of listeners) {
      listener(message);
    }
  }
}

const messenger = new Messenger<{}>();

class Subject<T extends {}> {
  listener = () => {};
  constructor(public name: string) {}
  next(value: T) {
    messenger.post(this.name, value);
  }
  subscribe(cb: (value: T) => void) {
    this.listener = messenger.addListener(this.name, (message) => {
      cb(message as T);
    })
  }
  unsubscribe() {
    this.listener();
  }
}

const __DEPENDENCIES__ = {
  Subject,
}

// @ts-ignore
global.__DEPENDENCIES__ = __DEPENDENCIES__;
