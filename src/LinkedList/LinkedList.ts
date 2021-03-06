import { LinkedListNode } from './LinkedListNode';

export class LinkedList {
    /**
     * First elemnt of the list
     */
    private _head: null | LinkedListNode = null;

    /**
     * Last element of the list
     */
    private _tail: null | LinkedListNode = null;

    constructor() { }

    /**
     * Append new Node to the LinkedList
     * @param value 
     */
    append(value: any): void {
        const newNode = new LinkedListNode(value, null);

        if (!this._head) {
            this._head = newNode;
        }

        if (this._tail) {
            this._tail.next = newNode;
        }

        this._tail = newNode;
    }

    /**
     * appends new Node at the begining of the LinkedList
     * @param value 
     */
    prepend(value: any) {

        const newNode = new LinkedListNode(value, this._head);
        this._head = newNode;

        if (!this._tail) {
            this._tail = newNode;
        }
    }

    /**
     * delete all occurrences of value
     * @param value 
     */
    delete(value: any) {
        if (!this._head) {
            return;
        }

        // if head is the node that should delete
        while (this._head && this._head.value === value) {
            this._head = this._head.next;
        }

        // if value is between head and tail
        let currentNode = this._head;
        //  check if head is not null yet
        if (currentNode) {
            while (currentNode.next) {
                // Deleting the node by delete it's reference in previous node
                if (currentNode.next.value === value) {
                    currentNode.next = currentNode.next.next;
                } else {
                    currentNode = currentNode.next;
                }
            }
        }

        // if head is the node that should delete
        if (this._tail?.value === value) {
            this._tail = currentNode;
        }
    }

    insertAfter(value: any, afterValue: any) {
        const existingNode = this.find(afterValue);

        if (existingNode) {
            const newNode = new LinkedListNode(value, existingNode.next);
            existingNode.next = newNode;
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

        let currentNode: null | LinkedListNode = this._head;
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
    toArray(): LinkedListNode[] {
        const nodes = [];

        let currentNode = this._head;

        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }

}
