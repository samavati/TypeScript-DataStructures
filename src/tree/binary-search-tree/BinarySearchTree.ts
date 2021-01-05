import { Queue } from "../../Queue";
import { BinaryTreeNode } from "./BinaryTreeNode";

export class BinarySearchTree<U> {
    private _root: null | BinaryTreeNode<U> = null;
    private _size: number = 0;
    private _key: keyof U | null;
    private _comparator: (a: U, b: U) => number

    constructor(comparator: (a: U, b: U) => number);
    constructor(comparator: (a: U, b: U) => number, key: keyof U);
    constructor(comparator: (a: U, b: U) => number, key?: keyof U) {
        this._comparator = comparator;
        key ? this._key = key : this._key = null;
    }

    get root() {
        return this._root;
    }

    get size() {
        return this._size;
    }

    insert(value: U): void {

        const newNode = new BinaryTreeNode(value);

        if (!this._root) {
            this._root = newNode;
            this._size++;
            return;
        }
        let current = this._root;
        while (true) {
            if (this._comparator(value, current.value) > 0) {
                if (!current.right) {
                    current.right = newNode;
                    this._size++;
                    return
                } else {
                    current = current.right
                }
            } else if (this._comparator(value, current.value) < 0) {
                if (!current.left) {
                    current.left = newNode;
                    this._size++;
                    return
                } else {
                    current = current.left
                }
            } else {
                // ignore when nodes are same
                return;
            }
        }
    }

    find(value: U) {
        let current = this._root;
        while (current) {
            if (this._comparator(value, current.value) < 0) {
                current = current.left;
            } else if (this._comparator(value, current.value) > 0) {
                current = current.right;
            } else {
                return current.value;
            }
        }
        return -1;
    }

    /**
     * Breadth-first search
     */
    BFS() {
        let node = this._root;
        const queue = new Queue();
        const visited = [];

        queue.enqueue(node);

        while (queue.size) {
            node = queue.dequeue();
            visited.push(node?.value);
            if (node?.left) { queue.enqueue(node.left) }
            if (node?.right) { queue.enqueue(node.right) }
        }

        return visited;
    }

    DFSPreOrder() {
        const visited: U[] = [];
        let current = this._root;

        function visit(current: null | BinaryTreeNode<U>) {
            if (current) {
                visited.push(current.value);
                if (current.left) { visit(current.left) }
                if (current.right) { visit(current.right) }
            }
        }
        visit(current);
        return visited;
    }

    DFSPostOrder() {
        const visited: U[] = [];
        let current = this._root;

        function visit(current: null | BinaryTreeNode<U>) {
            if (current) {
                if (current.left) { visit(current.left) }
                if (current.right) { visit(current.right) }
                visited.push(current.value);
            }
        }
        visit(current);
        return visited;
    }

}
