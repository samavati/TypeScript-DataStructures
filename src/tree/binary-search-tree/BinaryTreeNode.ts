export class BinaryTreeNode<U> {
    /**
     * left hand side of the node
     */
    public left: null | BinaryTreeNode<U> = null;
    /**
     * right hand side of the node
     */
    public right: null | BinaryTreeNode<U> = null;

    constructor(public value: U) { }

}
