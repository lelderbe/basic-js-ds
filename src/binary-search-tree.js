const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
    constructor() {
        this.head = null;
    }

    root() {
        return this.head;
    }

    add(data) {
        if (this.head === null) {
            this.head = new Node(data);
            return;
        }

        let current = this.head;
        let prev = current;
        while (current) {
            prev = current;
            if (data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        const prop = data < prev.data ? 'left' : 'right';
        prev[prop] = new Node(data);
    }

    has(data) {
        return this.find(data) !== null;
    }

    find(data) {
        let current = this.head;
        while (current) {
            if (current.data === data) {
                return current;
            }
            if (data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return null;
    }

    _remove(root, data) {
        if (root === null) {
            return null;
        }

        if (root.data === data) {
            if (root.left === null && root.right === null) {
                // scenario 1
                return null;
            } else if (root.left === null) {
                // scenario 2
                return root.right;
            } else if (root.right === null) {
                // scenario 3
                return root.left;
            } else {
                // scenario 4
                let current = root.right;
                while (current.left !== null) {
                    current = current.left;
                }
                let minRightSubtree = current; // minimum data from right subtree
                root.data = minRightSubtree.data;
                root.right = this._remove(root.right, minRightSubtree.data);
            }
        } else {
            if (data < root.data) {
                root.left = this._remove(root.left, data);
            } else {
                root.right = this._remove(root.right, data);
            }
        }

        return root;
    }

    remove(data) {
        this.head = this._remove(this.head, data);
    }

    min() {
        let current = this.head;
        while (current && current.left) {
            current = current.left;
        }
        if (!current) {
            return null;
        }
        return current.data;
    }

    max() {
        let current = this.head;
        while (current && current.right) {
            current = current.right;
        }
        if (!current) {
            return null;
        }
        return current.data;
    }
}

module.exports = {
    BinarySearchTree,
};

// const tree = new BinarySearchTree();

// tree.add(20);
// tree.add(5);
// tree.add(42);
// // // tree.add(9);
// // tree.add(14);
// // tree.add(43);
// // tree.add(4);
// // tree.add(1);
// console.log(tree.root());

// tree.remove(20);
// console.log(tree.root());
