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

    // deleteItem(value, referenceNode = this._root){
    //     //Create reference to the previous node and the direction it came
    //     let previousNode = null;
    //     let wayHome = null
    //     //Find the node
    //     // While current node is different from target or null, search
    //     while (referenceNode !== null && value !== referenceNode.data) {
    //         if (value === referenceNode.data) {
    //             break;
    //         } else 
    //         if (value < referenceNode.data) {
    //             //go left
    //             previousNode = referenceNode
    //             referenceNode = referenceNode.left
    //             wayHome = 'left'
    //         } else
    //         if (value > referenceNode.data) {
    //             //go right
    //             previousNode = referenceNode
    //             referenceNode = referenceNode.right
    //             wayHome = 'right'
    //         }
    //     }
    //     //------------------------
    //     //Check how many children it has
    //     //No children
    //     if(referenceNode.left === null && referenceNode.right === null){
    //         //set the wayHome on referenceNode to null
    //         if (wayHome === 'right') {
    //             previousNode.right = null
    //         } else
    //         if (wayHome === 'left') {
    //             previousNode.left = null
    //         }
    //     }
    //     //One children
    //     //Check if node has exactly only one branch null
    //     if ((referenceNode.left === null) !== (referenceNode.right === null)) {
    //         previousNode.data = referenceNode.data
    //     }
    //     //Two children
        
    //     //-------------------------           
        
        
    //     //Recursive deletion
    //     //if target is to be deleted, continue recursion bypassing it

        
    // }


    //recursion attempt #2
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
                //change value of node to be deleted for the next biggest one down the tree
                //if the next biggest one has any child, make its parent link directly to its child

                let nextNode = currentNode.right;
                let parentNode;
                //loop until next node do the right has no left, it will be the smallest one on right tree
                if (nextNode.left !== null) {
                    while(nextNode.left !== null){
                        parentNode = nextNode;
                        nextNode = nextNode.left;
                    }
                } 
                else {
                    parentNode = currentNode;
                    nextNode = nextNode.left
                }
               
                
                
                //set value to be changed from target
                currentNode.data = nextNode.data
                //bypass reference node's parent into its remaining child (if they exist)
                if (nextNode !== null) {
                    parentNode.left = nextNode.right
                }
                return currentNode
            }
         
        }



    }


    //steps fot BST deletion - two children case
    //https://www.youtube.com/watch?v=wcIRPqTR3Kc
    //find de node
    // recursiveDeletion (value, currentNode = this._root){
    //     if(currentNode === null) return null
    //     //delete value if it matches
    //     if (value === currentNode.data) {
    //         //two children case
    //         if (currentNode.left !== null && currentNode.right !== null) {
    //             //if next node has no left, it is the smallest one on right tree
    //             let nextNode = currentNode.right;
    //             let parentNode;
    //             while(nextNode.left !== null){
    //                 parentNode = nextNode;
    //                 nextNode = nextNode.left;
    //             }
    //             //set value to be changed from target
    //             currentNode.data = nextNode.data
    //             //bypass reference node's parent into its remaining child (if they exist)
    //             parentNode.left = nextNode.right
    //             return
    //         }
    //         //one child case
    //         if ((currentNode.left !== null) !== (currentNode.right !== null)) {
    //             //change path 
    //             if (currentNode.right === null) {
    //                 nextNode = currentNode.left;
    //                 currentNode.data = nextNode.data
    //             } else if (currentNode.left === null) {
    //                 nextNode = currentNode.right;
    //             }

    //             let parentNode;
    //             while(nextNode.left !== null){
    //                 parentNode = nextNode;
    //                 nextNode = nextNode.left;
    //             }
    //             //set value to be changed from target
    //             currentNode.data = nextNode.data
    //             //bypass reference node's parent into its remaining child (if they exist)
    //             parentNode.left = nextNode.right
    //             return 
    //         }
            
    //     }
    //     //find node to be deleted
    //     if(value < currentNode.data){
    //         return this.recursiveDeletion(value, currentNode.left)
    //     } else
    //     if (value > currentNode.data) {
    //         return this.recursiveDeletion(value, currentNode.right)
    //     }

        
    // }
    //find the next biggest node on its right side(the smallest one on targets right subtree)
        //it will be the first with left === null on its right subtree
    //if next biggest one has right child, link its parent to its child to erase it
    //replace target node value for the next biggest one's


    //attempt at deletion function for two children

    // recursiveDeletion (value, currentNode = this._root, direction){
    //     if (currentNode === null) return null

    //     if (value < currentNode.data) {
    //         //Continue down the tree
    //         currentNode.left = this.recursiveDeletion(currentNode.left)
    //     }
        
    //     if (value > currentNode.data) {
    //         currentNode.right = this.recursiveDeletion(currentNode.right)
    //     }

    //     if (value === currentNode.data) {
    //         return this.recursiveDeletion(value, currentNode)

    //     }
    // }
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

const newTree = new Tree(Array.from({ length: 50 }, (_, index) => index + 1))
//const newTree = new Tree([11, 22, 33])

//const newNode = new Node(5.2)
//newTree.insert(newNode)

console.log(newTree)
prettyPrint(newTree.root)

newTree.deleteItem(49)
//newTree.deleteItem(3)
console.log('after')
prettyPrint(newTree.root)