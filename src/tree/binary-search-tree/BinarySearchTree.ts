import { BinaryTreeNode } from "./BinaryTreeNode";

export class BinarySearchTree<U> {
    private _root: null | BinaryTreeNode<U> = null;
    private _size: number = 0;
    constructor(private _comparator: (a: any, b: any) => number) { }

    insert(value: U): void {

        const newNode = new BinaryTreeNode(value);

        if (!this._root) {
            this._root = newNode;
            this._size++;
            return;
        }
        let current = this._root;
        while (true) {
            if (this._comparator(value, current) > 0) {

            } else if (this._comparator(value, current) < 0) {

            } else {
                // ignore when nodes are same
                return;
            }
        }
    }
}