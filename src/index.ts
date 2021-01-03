import { DoublyLinkedList } from './DoublyLinkList';

const list = new DoublyLinkedList();

list.append('Harry');
list.append("Ron");
list.append('hermion')
list.insert(0, 'ali');

console.log(list.toArray());
console.log(list.length);