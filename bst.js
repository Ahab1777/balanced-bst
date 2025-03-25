//TODO
//remove duplicates from OR check for an existing value before inserting



class Node{
    constructor(data, leftChild = null, rightChild = null){
        this.data = data;
        this.left = leftChild;
        this.right = rightChild;
    }
    
    
}

 class Tree{
    constructor(array){
        this.array = array
        this._root = this.buildTree(array);
    }

    get root() {
        return this._root;
    }

    buildTree(array){
        //Remove duplicate values and sort array
        array = [...new Set(array)]
        //this.root = new Node (array[mid])
        
        //Create new Node out of an array
        function spliceArrayIntoNode(array){
            //base case
            if(array.length === 0 || array === null) return null
            //find mid array
            const midIndex = Math.floor((array.length - 1) / 2);
            const mid = array[midIndex];
            //Check if there are any remaining items to splice
            if(array.length !== 1){
                const leftArray = array.slice(0, midIndex);
                const rightArray = array.slice(midIndex + 1);
                const newNode = new Node(mid, spliceArrayIntoNode(leftArray), spliceArrayIntoNode(rightArray));
                return newNode;
            }
            const newNode = new Node(mid);
            return newNode
        }
        const returnValue = spliceArrayIntoNode(array)
        return returnValue
    }

    insert(newNode, referenceNode = this._root) {
        if (newNode.data < referenceNode.data) {
            // Check if it's a leaf
            if (referenceNode.left === null) {
                referenceNode.left = newNode;
                return;
            }
            // Recurse into the left subtree
            this.insert(newNode, referenceNode.left);
        } else if (newNode.data > referenceNode.data) {
            // Check if it's a leaf
            if (referenceNode.right === null) {
                referenceNode.right = newNode;
                return;
            }
            // Recurse into the right subtree
            this.insert(newNode, referenceNode.right);
        }
    }

    deleteItem(value, referenceNode = this._root){
        if (value = referenceNode.data) {
            
        }
    }
}

//Function to visualize the tree
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

const newTree = new Tree([1, 2, 3, 4, 5, 6, 7])
//const newTree = new Tree([11, 22, 33])

const newNode = new Node(5.2)

console.log(newTree)
prettyPrint(newTree.root)

newTree.insert(newNode)

console.log('after')
prettyPrint(newTree.root)
