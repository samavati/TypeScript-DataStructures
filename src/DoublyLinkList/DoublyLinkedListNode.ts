export class DoublyLinkedListNode {
    constructor(
        public value: any,
        public next: null | DoublyLinkedListNode,
        public prev: null | DoublyLinkedListNode
    ) { }
}