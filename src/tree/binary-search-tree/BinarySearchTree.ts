import { BinaryTreeNode } from "./BinaryTreeNode";

export class BinarySearchTree<U> {
    private _root: null | BinaryTreeNode<U> = null;
    private _size: number = 0;

    constructor(private _comparator: (a: U, b: U) => number, private key?: keyof U) { }

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

}