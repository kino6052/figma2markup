import { Subject, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators'

const NodeSubject = new Subject();

const RectangeNodeSubject = NodeSubject.pipe(filter(() => true), tap(() => {

}));

const HierarchySubject = new BehaviorSubject()

interface INode {

}

export class Generator {
  constructor(public hierarchy: INode[] = []) {
  
  }
  generate() {

  }
}

InitSubject.subscribe(() => {
  const generator = new Generator();
  generator.generate();
  
})