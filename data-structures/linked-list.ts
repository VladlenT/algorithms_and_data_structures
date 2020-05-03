export class Node<T> {
  next: Node<T> = null;
  constructor(public value: T) {}
}

export class LinkedList<T> implements Iterable<Node<T>> {
  head: Node<T> = null;
  tail: Node<T> = null;
  length = 0;

  constructor() {}

  addAll(iterable: Iterable<T>): this {
    for (let item of iterable) {
      this.push(item);
    }
    return this;
  }

  push(value: T): this {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
    return this;
  }

  pop(): Node<T> {
    if (this.length === 0 || !this.head) return undefined;

    let currentNode = this.head;
    let newTail = currentNode;

    while (currentNode.next) {
      newTail = currentNode;
      currentNode = currentNode.next;
    }

    this.tail = newTail;
    this.tail.next = null;
    this.length--;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return currentNode;
  }

  unshift(value: T): this {
    const currentHead = this.head;
    this.head = new Node<T>(value);
    this.head.next = currentHead;

    if (!this.tail) {
      this.tail = this.head;
    }

    this.length++;

    return this;
  }

  shift(): Node<T> {
    if (this.length === 0 || !this.head) return undefined;

    const currentHead = this.head;
    this.head = currentHead.next;
    this.length--;

    if (this.length === 0) {
      this.tail = null;
    }

    return currentHead;
  }

  get(index: number): Node<T> {
    if (index < 0 || index >= this.length) return undefined;

    let node = this.head;
    for (let i = 1; i <= index; i++) {
      node = node.next;
    }
    return node;
  }

  set(index: number, value: T): boolean {
    const node = this.get(index);
    if (!node) return false;

    node.value = value;
    return true;
  }

  insert(index: number, value: T): boolean {
    if (index < 0 || index > this.length) return false;
    if (index === this.length) return !!this.push(value);
    if (index === 0) return !!this.unshift(value);

    const newNode = new Node(value);
    const prevNode = this.get(index - 1);

    newNode.next = prevNode.next;
    prevNode.next = newNode;
    this.length++;

    return true;
  }

  remove(index: number): Node<T> {
    if (index < 0 || index > this.length) return undefined;
    if (index === this.length - 1) return this.pop();
    if (index === 0) return this.shift();

    const prevNode = this.get(index - 1);
    const nodeToRemove = prevNode.next;
    prevNode.next = nodeToRemove.next;

    this.length--;
    return nodeToRemove;
  }

  reverse(): this {
    this.tail = this.head;

    let prevNode = this.head;
    let currentNode = this.head.next;
    let oldNextNode;

    while (currentNode) {
      oldNextNode = currentNode.next;
      currentNode.next = prevNode;
      prevNode = currentNode;
      currentNode = oldNextNode;
    }

    this.head = prevNode;
    this.tail.next = null;

    return this;
  }

  forEach(callback: (node: Node<T>) => void): void {
    for (let n of this) {
      callback(n);
    }
  }

  *[Symbol.iterator](): Iterator<Node<T>> {
    let current = this.head;

    while (current) {
      yield current;
      current = current.next;
    }
  }
}
