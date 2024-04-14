To search through an array of objects to find a matching value and then remove the object containing that value from the array in JavaScript, you can use a combination of `Array.prototype.findIndex()` and `Array.prototype.splice()` methods. Here's how you can do it:

```javascript
// Sample array of objects
var arrayOfObjects = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Alice' },
    { id: 3, name: 'Bob' }
];

// Function to remove object with matching value
function removeObjectWithValue(array, key, value) {
    // Find index of object with matching value
    var index = array.findIndex(function(obj) {
        return obj[key] === value;
    });

    // If index is found, remove object from array
    if (index !== -1) {
        array.splice(index, 1);
    }
}

// Example usage: Remove object with name 'Alice'
removeObjectWithValue(arrayOfObjects, 'name', 'Alice');

// Print the updated array
console.log(arrayOfObjects);
```

In this example:
- We have an array of objects named `arrayOfObjects`.
- We define a function `removeObjectWithValue` which takes three parameters: the array to search through, the key to match against in each object, and the value to match.
- Inside the function, we use `findIndex()` to find the index of the object in the array where the specified key has the specified value.
- If the index is found (i.e., not `-1`), we use `splice()` to remove that object from the array.
- We call the `removeObjectWithValue` function to remove an object with `name: 'Alice'`.
- Finally, we print the updated array to see that the object with `name: 'Alice'` has been removed.

You can adjust the key and value parameters as per your specific requirement.