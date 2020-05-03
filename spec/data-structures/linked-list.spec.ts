import 'jasmine';
import { Node, LinkedList } from '../../data-structures/linked-list';

describe('Node', () => {
  it('should create a new Node with provided value and next === null', () => {
    const value = 'value';
    const node = new Node(value);

    expect(node).toBeTruthy();
    expect(node.value).toEqual(value);
    expect(node.next).toEqual(null);
  });
});

describe('LinkedList', () => {
  let list: LinkedList<any>;

  const firstValue = '123';
  const secondValue = ['big', 'array'];
  const thirdValue = { firstValue, secondValue };
  const addAllValuesToList = () => list.addAll([firstValue, secondValue, thirdValue]);

  beforeEach(() => {
    list = new LinkedList<any>();
  });

  it('should create', () => {
    expect(list.head).toEqual(null);
    expect(list.tail).toEqual(null);
    expect(list.length).toEqual(0);
  });

  describe('push()', () => {
    it('should add new Nodes to the end of the list', () => {
      expect(list.length).toEqual(0);
      list.push(firstValue);

      expect(list.head).toEqual(list.tail);
      expect(list.tail.next).toEqual(null);
      expect(list.tail.value).toEqual(firstValue);

      expect(list.length).toEqual(1);

      list.push(secondValue);

      expect(list.head.value).toEqual(firstValue);
      expect(list.head.next).toEqual(list.tail);
      expect(list.tail.value).toEqual(secondValue);
      expect(list.length).toEqual(2);

      list.push(thirdValue);

      expect(list.head.value).toEqual(firstValue);
      expect(list.head.next.value).toEqual(secondValue);
      expect(list.head.next.next).toEqual(list.tail);
      expect(list.tail.value).toEqual(thirdValue);
      expect(list.length).toEqual(3);
    });

    it('should return this list', () => {
      expect(list.push(123)).toEqual(list);
    });
  });

  describe('addAll()', () => {
    it('should add all values from iterable to the end of the list', () => {
      expect(list.length).toEqual(0);

      list.addAll([firstValue, secondValue, thirdValue]);

      expect(list.length).toEqual(3);
      expect(list.head.value).toEqual(firstValue);
      expect(list.tail.value).toEqual(thirdValue);
      expect(list.get(1).value).toEqual(secondValue);
    });
  });

  describe('pop()', () => {
    it('should remove last element from the list and return it', () => {
      expect(list.length).toEqual(0);
      list.push(firstValue).push(secondValue).push(thirdValue);

      const node = list.pop();

      expect(node).toEqual(new Node(thirdValue));
      expect(list.tail.value).toEqual(secondValue);
      expect(list.length).toEqual(2);
    });

    it('should return undefined if list is empty', () => {
      expect(list.length).toEqual(0);
      expect(list.pop()).toEqual(undefined);
      expect(list.length).toEqual(0);
    });
  });

  describe('unshift()', () => {
    it('should add new value to the start of the list and make it the new head', () => {
      expect(list.length).toEqual(0);
      expect(list.unshift(firstValue)).toEqual(list);
      expect(list.head.value).toEqual(firstValue);
      expect(list.head).toEqual(list.tail);
      expect(list.length).toEqual(1);

      list.unshift(secondValue);

      expect(list.head.value).toEqual(secondValue);
      expect(list.head.next.value).toEqual(firstValue);
      expect(list.tail.value).toEqual(firstValue);
      expect(list.length).toEqual(2);
    });
  });

  describe('shift()', () => {
    it('should remove first node from the list and return it', () => {
      expect(list.length).toEqual(0);

      list.push(firstValue).push(secondValue).push(thirdValue);

      expect(list.head.value).toEqual(firstValue);
      expect(list.length).toEqual(3);

      expect(list.shift().value).toEqual(firstValue);
      expect(list.head.value).toEqual(secondValue);
      expect(list.length).toEqual(2);
    });

    it('should return undefind if the list is empty', () => {
      expect(list.length).toEqual(0);
      expect(list.shift()).toEqual(undefined);
    });

    it('should make list empty if list has only 1 item', () => {
      expect(list.length).toEqual(0);

      list.unshift(firstValue);

      expect(list.length).toEqual(1);
      expect(list.head.value).toEqual(firstValue);
      expect(list.head).toEqual(list.tail);
      expect(list.head.next).toEqual(null);

      list.shift();

      expect(list.length).toEqual(0);
      expect(list.head).toEqual(null);
      expect(list.tail).toEqual(null);
    });
  });

  describe('get()', () => {
    it('should return item at provided index', () => {
      expect(list.length).toEqual(0);
      addAllValuesToList();
      expect(list.length).toEqual(3);

      expect(list.get(0)).toEqual(list.head);
      expect(list.get(2)).toEqual(list.tail);
      expect(list.get(1).value).toEqual(secondValue);
    });

    it('should return undefined if provided index does`nt exist', () => {
      expect(list.length).toEqual(0);
      expect(list.get(2)).toEqual(undefined);
      addAllValuesToList();
      expect(list.get(12344123)).toEqual(undefined);
      expect(list.get(-5)).toEqual(undefined);
    });
  });
});
