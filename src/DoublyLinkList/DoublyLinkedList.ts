import { DoublyLinkedListNode } from './DoublyLinkedListNode';

export class DoublyLinkedList {
    /**
     * First elemnt of the list
     */
    private _head: null | DoublyLinkedListNode = null;

    /**
     * Last element of the list
     */
    private _tail: null | DoublyLinkedListNode = null;

    /**
     * Gets the length of the LinkedList.
     */
    private _length = 0;

    constructor() { }

    /**
     * Gets the length of the array. This is a number represent how many elements are in the list.
     */
    get length() {
        return this._length;
    }

    /**
     * Append new Node to the LinkedList
     * @param value 
     */
    append(value: any): void {
        const newNode = new DoublyLinkedListNode(value, null, null);

        if (!this._head) {
            this._head = newNode;
        }

        if (this._tail) {
            this._tail.next = newNode;
            newNode.prev = this._tail;
        }

        this._tail = newNode;
        this._length++;
    }

    /**
     * appends new Node at the begining of the LinkedList
     * @param value 
     */
    prepend(value: any) {

        const newNode = new DoublyLinkedListNode(value, null, null);
        if (!this._head) {
            this._head = newNode;
            this._tail = newNode;
        } else {
            this._head.prev = newNode;
            newNode.next = this._head;
            this._head = newNode;
        }

        this._length++;
    }

    pop() {
        if (!this._tail) {
            return undefined;
        }

        const popedNode = this._tail;

        if (this._length === 1) {
            this._head = null;
            this._tail = null;
        } else {
            this._tail = popedNode.prev as DoublyLinkedListNode
            this._tail.next = null;

            // Remove linkage to the original list
            popedNode.prev = null;
        }

        this._length--;
        return popedNode;

    }

    /**
     * Gets element from the begining of the list and remove it from the list
     */
    shift() {
        if (!this._head) {
            return undefined;
        }

        const oldHead = this._head;
        if (this._length === 1) {
            this._head = null;
            this._tail = null;
        } else {
            this._head = oldHead.next as DoublyLinkedListNode;
            this._head.prev = null;

            // Remove linkage to the original list
            oldHead.next = null;
        }



        this._length--;
        return oldHead;

    }

    /**
     * delete all occurrences of value
     * @param value 
     */
    // delete(value: any) {
    //     if (!this._head) {
    //         return;
    //     }

    //     // if head is the node that should delete
    //     while (this._head && this._head.value === value) {
    //         this._head = this._head.next;
    //     }

    //     // if value is between head and tail
    //     let currentNode = this._head;
    //     //  check if head is not null yet
    //     if (currentNode) {
    //         while (currentNode.next) {
    //             // Deleting the node by delete it's reference in previous node
    //             if (currentNode.next.value === value) {
    //                 currentNode.next = currentNode.next.next;
    //             } else {
    //                 currentNode = currentNode.next;
    //             }
    //         }
    //     }

    //     // if head is the node that should delete
    //     if (this._tail?.value === value) {
    //         this._tail = currentNode;
    //     }
    // }

    // insertAfter(value: any, afterValue: any) {
    //     const existingNode = this.find(afterValue);

    //     if (existingNode) {
    //         const newNode = new DoublyLinkedListNode(value, existingNode.next);
    //         existingNode.next = newNode;
    //         return true;
    //     }

    //     return false;
    // }


    /**
     * remove element in specific index
     * @param index 
     */
    remove(index: number) {
        if (index < 0 || index >= this._length) { return false }
        if (index === 0) { return this.shift() }
        if (index === this._length) { return this.pop() }

        const removedNode = this.get(index);
        if (removedNode && removedNode.prev && removedNode.next) {
            removedNode.prev.next = removedNode.next;
            removedNode.next.prev = removedNode.prev;
            removedNode.next = null;
            removedNode.prev = null;
            this._length--;
            return removedNode;
        }
    }


    /**
     * access list element by it's index
     * @param index 
     */
    get(index: number) {
        // where to start? from the begining or start
        if (index < 0 || index >= this._length) {
            return null;
        }

        let count;
        let current;
        if (index <= this._length / 2) {
            // loop from the start
            count = 0;
            current = this._head;
            while ((count !== index) && (current)) {
                current = current.next;
                count++;
            }
            return current;
        } else {
            // loop from the end
            count = this._length - 1;
            current = this._tail;
            while (current && (count !== index)) {
                current = current.prev;
                count--;
            }
            return current;
        }

    }

    insert(index: number, value: any) {
        if (index < 0 || index > this._length) { return false }
        if (index === 0) { return this.prepend(value) }
        if (index === this._length) { return this.append(value) }

        const newNode = new DoublyLinkedListNode(value, null, null);
        const beforeNode = this.get(index - 1);
        const afterNode = beforeNode?.next;
        if (beforeNode && afterNode) {
            beforeNode.next = newNode;
            newNode.prev = beforeNode;

            newNode.next = afterNode;
            afterNode.prev = newNode;

            this._length++;
            return true;
        }

        return false;

    }

    /**
     * set value of a specified index
     * @param index 
     * @param value 
     */
    set(index: number, value: any) {
        const foundNode = this.get(index);
        if (foundNode !== null) {
            foundNode.value = value;
            return true;
        }
        return false;
    }

    /**
     * find first occurrence of the value
     * @param value 
     */
    find(value: any) {
        if (!this._head) {
            return null;
        }

        let currentNode: null | DoublyLinkedListNode = this._head;
        while (currentNode) {
            if (currentNode.value === value) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }

        return null;
    }

    /**
     * returns array of all nodes in LinkedList
     */
    toArray(): DoublyLinkedListNode[] {
        const nodes = [];

        let currentNode = this._head;

        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }

}
