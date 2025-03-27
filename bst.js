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

    insert(value, referenceNode = this._root) {
        const newNode = new Node(value)
        if (newNode.data < referenceNode.data) {
            // Check if it's a leaf
            if (referenceNode.left === null) {
                referenceNode.left = newNode;
                return;
            }
            // Recurse into the left subtree
            this.insert(value, referenceNode.left);
        } else if (newNode.data > referenceNode.data) {
            // Check if it's a leaf
            if (referenceNode.right === null) {
                referenceNode.right = newNode;
                return;
            }
            // Recurse into the right subtree
            this.insert(value, referenceNode.right);
        }
    }

    deleteItem(value, currentNode = this._root){
        if(currentNode === null) return null

        if(value < currentNode.data){
            currentNode.left = this.deleteItem(value, currentNode.left)
            return currentNode
        } else
        if (value > currentNode.data) {
            currentNode.right = this.deleteItem(value, currentNode.right)
            return currentNode
        }

        //If value matches
        if (value === currentNode.data) {
            //No children case
            if (currentNode.left === null && currentNode.right === null) {
                return null
            }
            //One child case
            if ((currentNode.left !== null) !== (currentNode.right !== null)) {
                //bypass target node
                if (currentNode.right !== null) {
                    return currentNode.right
                } else if (currentNode.left !== null) {
                    return currentNode.left;
                }
            }
            //Two children case
            if (currentNode.left !== null && currentNode.right !== null) {
                //1. Find next biggest
                //1.1 If next node has no child, it is the next biggest
                let nextNode = currentNode.right;
                if(nextNode.right === null && nextNode.left === null){
                    currentNode.data = nextNode.data;
                    currentNode.right = null;
                    return currentNode
                }
                //1.2 Else, look for the next biggest one down the tree
                //loop to the left until a node has no left, it will be the smallest one on right tree
                let parentNode = null;
                while(nextNode.left !== null){
                    parentNode = nextNode;
                    nextNode = nextNode.left
                }
                //set value to be changed from target
                currentNode.data = nextNode.data
                parentNode.left = nextNode.right
              
                return currentNode
            }
        }
    }

    find(value, currentNode = this._root){
        if(value === currentNode.data){
            return currentNode
        }
        if(value < currentNode.data){
            currentNode = this.find(value, currentNode.left)
            return currentNode
        }
        if (value > currentNode.data) {
            currentNode = this.find(value, currentNode.right)
            return currentNode
        }
        if (currentNode === null) {
            console.log('No such value in this tree')
            return null
        }
    }

    //Implement iteration and recursion
    levelOrder(callback){
        if(!callback){
            throw new Error('Callback is needed')
        }
        const queue = [];
        let currentNode = this._root;
        //push adds to the end
        //shift removes from the start


        //add currentNode to queue
        queue.push(currentNode)
        //while queue length is not zero, keep applying call back
        while (queue.length !== 0) {
            //use currentNode as variable for callback
            callback(currentNode.data)
            //add currentNode's left child to queue
            if (currentNode.left !== null) {
                queue.push(currentNode.left)
            }
            //add currentNode's right child to queue
            if (currentNode.right !== null) {
                queue.push(currentNode.right)
            }
            queue.shift()
            currentNode = queue[0]
        }
        return
    }

    preOrder(callback, currentNode = this._root){
        if(!callback) {
            throw new Error('Callback is needed')
        }
        if (currentNode === null) return
        //Provide currentNode data to callback
        callback(currentNode.data)
        //Call recursion on currentNode.left
        this.preOrder(callback, currentNode.left)
        //Call recursion on currentNode.right
        this.preOrder(callback, currentNode.right)

    }

    inOrder(callback, currentNode = this._root){
        if(!callback) {
            throw new Error('Callback is needed')
        }
        if (currentNode === null) return
        //Call recursion on currentNode.left
        this.inOrder(callback, currentNode.left)
        //Provide currentNode data to callback
        callback(currentNode.data)
        //Call recursion on currentNode.right
        this.inOrder(callback, currentNode.right)

    }

    postOrder(callback, currentNode = this._root){
        if(!callback) {
            throw new Error('Callback is needed')
        }
        if (currentNode === null) return
        //Call recursion on currentNode.left
        this.postOrder(callback, currentNode.left)
        //Call recursion on currentNode.right
        this.postOrder(callback, currentNode.right)
        //Provide currentNode data to callback
        callback(currentNode.data)

    }

    height(currentNode = this._root){
        
        if(currentNode === null) return 0
        //traverse the tree until reaching a null and save the number of steps on a variable
        const leftHeight = this.height(currentNode.left);
        const rightHeight = this.height(currentNode.right);
        //return biggest number
        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(targetNode, currentNode = this._root){
        if (targetNode === currentNode || targetNode === null) return 0;
        let currentDepth = 0;
        if(targetNode.data < currentNode.data){
            currentDepth ++
            currentDepth += this.depth(targetNode, currentNode.left)
            
        }
        if (targetNode.data > currentNode.data) {
            currentDepth ++
            currentDepth += this.depth(targetNode, currentNode.right)
        }
        return currentDepth
    }

    isBalanced(currentNode = this._root){
        if(currentNode === null) return true
        //Recursively check the rest of the tree;
        const leftTreeBalance = this.isBalanced(currentNode.left)
        const rightTreeBalance = this.isBalanced(currentNode.right)
        if (leftTreeBalance === false || rightTreeBalance === false){
            return false
        }
        // If the difference between the heights of the left and right subtrees of all nodes is no more than one, return true
        const leftTreeHeight = this.height(currentNode.left)
        const rightTreeHeight = this.height(currentNode.right)
        if (Math.abs(leftTreeHeight - rightTreeHeight) > 1) {
            return false
        }
        return true;
    }

    rebalance(){
        const treeArray = []
        const arrayPusher = (value) => {
            treeArray.unshift(value)
        }
        //generate ordered array;
        this.inOrder(arrayPusher)
        //pass array into buildTree
        this._root = this.buildTree(treeArray)
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

const newTree = new Tree(Array.from({ length: 99 }, (_, index) => index + 1))
//const newTree = new Tree([11, 22, 33])

//const newNode = new Node(5.2)
prettyPrint(newTree.root)

console.log('Is balanced?', newTree.isBalanced())

newTree.insert(111)
newTree.insert(222)
newTree.insert(444)
newTree.insert(777)
newTree.insert(999)

//console.log(newTree)
//prettyPrint(newTree.root)
//newTree.deleteItem(2)
//newTree.deleteItem(3)
//console.log('after')
prettyPrint(newTree.root)
console.log('Is balanced?', newTree.isBalanced())
newTree.rebalance()
prettyPrint(newTree.root)
console.log('Is balanced?', newTree.isBalanced())
//console.log(newTree.find(1))
// newTree.inOrder((value) => {
//     console.log(value)
// })
//console.log(newTree.height())
//console.log(newTree.depth(newTree.find(6)))
// console.log(newTree.isBalanced())