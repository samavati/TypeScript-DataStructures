class Node {
    constructor(public value: any, public next: null | Node = null) { }
}

export class Queue {

    private _first: null | Node = null;
    private _last: null | Node = null;
    private _size = 0;
    constructor() { }

    get size() {
        return this._size;
    }

    enqueue(value: any) {
        // Add to the end
        const newNode = new Node(value);
        if (!this._last) {
            this._first = newNode;
            this._last = newNode;
        } else {
            this._last.next = newNode;
            this._last = newNode;
        }

        this._size++;
    }

    dequeue() {

        // get from begining
        if (!this._first) {
            return null;
        }

        let current = this._first;

        if (this._first === this._last) {
            this._last = null;
        }

        this._first = this._first.next;
        current.next = null;
        this._size--;

        return current.value;
    }

}