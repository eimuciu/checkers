function testWorks() {
  console.log("It works");
}

// Recursion example

function recursiveTest(x) {
  if (x > 0) {
    return x + recursiveTest(x - 1)
  }

  return x

}

// console.log(recursiveTest(5))

/*package whatever //do not write package name here */
class Node {
  constructor() {
    this.data = 0;
    this.next = null;
    this.child = null;
  }
}

// A function to create a linked list
// with n(size) nodes returns head pointer
function createList(arr, n) {
  var head = null;
  var tmp = null;

  // Traversing the passed array
  for (var i = 0; i < n; i++) {

    // Creating a node if the list
    // is empty
    if (head == null) {
      tmp = head = new Node();
    }
    else {
      tmp.next = new Node();
      tmp = tmp.next;
    }

    // Created a node with data and
    // setting child and next pointer
    // as NULL.
    tmp.data = arr[i];
    tmp.next = tmp.child = null;
  }
  return head;
}

// To print the linked list
function printMultiLevelList(head) {

  // While head is not null
  while (head != null) {
    if (head.child != null) {
      printMultiLevelList(head.child);
    }
    console.log(head.data + " ");
    head = head.next;
  }
}

// Driver code

var arr1 = [1, 2, 3];
var arr2 = [5, 6];
var arr3 = [4];
var arr4 = [7, 8, 9];

// creating Four linked lists
// Passing array and size of array
// as parameters
var head1 = createList(arr1, 3);
var head2 = createList(arr2, 2);
var head3 = createList(arr3, 1);
var head4 = createList(arr4, 3);

// Initializing children and next pointers
// as shown in given diagram
head1.child = head2;
head1.next.next.child = head3;
head2.next.child = head4;

// Creating a null pointer.
var head = null;
head = head1;

// Function Call to print
// printMultiLevelList(head);

// This code is contributed by Rajput-Ji