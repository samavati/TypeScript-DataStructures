class Node {
    constructor(public value: any, public next: null | Node = null) { }
}

/**
 * LIFO data structure
 */
export class Stack {

    private _first: null | Node = null;
    private _last: null | Node = null;
    private _size: number = 0;
    constructor() { }

    get size(): number {
        return this._size;
    }

    push(value: any) {
        const newNode = new Node(value);

        if (!this._first) {
            this._first = newNode;
            this._last = newNode;
        } else {
            newNode.next = this._first;
            this._first = newNode;
        }

        this._size++;
    }

    pop() {
        if (!this._first) { return null }

        const current = this._first;
        if (this._first === this._last) {
            this._last = null;
        }
        this._first = this._first.next;
        current.next = null;
        this._size--;
        return current.value;
    }

    /**
     * returns array of all nodes in STack
     */
    toArray(): Node[] {
        const nodes = [];

        let currentNode = this._first;

        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }
}