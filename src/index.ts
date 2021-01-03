import { DoublyLinkedList } from './DoublyLinkList';

const list = new DoublyLinkedList();

list.append(5);
list.append(6);
list.append(7);

console.log(list.toArray());
console.log(list.length);