class Node {
    constructor(public value: any, public priority: number) { }
}
export class PriorityQueue {
    private _values: Node[] = [];
    constructor() { }

    private bubbleUp() {
        let idx = this._values.length - 1;
        const element = this._values[idx];

        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            let parent = this._values[parentIdx];
            if (element.priority > parent.priority) {
                this._values[parentIdx] = element;
                this._values[idx] = parent;

                idx = parentIdx;
            } else {
                break;
            }
        }
    }

    enqueue(value: any, priority: number) {
        const newNode = new Node(value, priority);
        this._values.push(newNode);
        this.bubbleUp();
    }

    private bubbleDown() {
        let idx = 0;
        const length = this._values.length;
        const element = this._values[0];

        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild;
            let rightChild;
            let swap = null;

            if (leftChildIdx < length) {
                leftChild = this._values[leftChildIdx];
                if (leftChild > element) {
                    swap = leftChildIdx;
                }
            }

            if (rightChildIdx < length) {
                rightChild = this._values[rightChildIdx];
                if (
                    (swap !== null && leftChild && rightChild.priority > leftChild.priority) ||
                    (swap === null && rightChild.priority > element.priority)
                ) {
                    swap = rightChildIdx;
                }
            }
            if (swap === null) { break }

            this._values[idx] = this._values[swap];
            this._values[swap] = element;
            idx = swap;
        }
    }

    dequeue() {
        const max = this._values[0];
        const end = this._values.pop() as Node;
        if (this._values.length > 0) {
            this._values[0] = end;
            this.bubbleDown();
        }
        return max;
    }
}