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
        if (data < prev.data) {
            prev.left = new Node(data);
        } else {
            prev.right = new Node(data);
        }
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

    remove(data) {
        if (this.head && this.head.data === data) {
            this.head = null;
            return;
        }

        let current = this.head;
        let prev = null;
        while (current) {
            if (current.data === data) {
                break;
            }
            prev = current;
            if (data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        if (!current) {
            return;
        }
        const prop = data < prev.data ? 'left' : 'right';
        if (current.right === null && current.left === null) {
            prev[prop] = null;
            return;
        }
        if (current.right !== null && current.left !== null) {
            prev[prop] = current.right;
            let node = current.right;
            while (node && node.left) {
                node = node.left;
            }
            node.left = current.left;
            return;
        }
        prev[prop] = current.left || current.right;
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
// tree.add(12);
// // tree.add(9);
// tree.add(14);
// tree.add(3);
// tree.add(4);
// tree.add(1);
// console.log(tree.root());

// tree.remove(5);
// console.log(tree.root());
