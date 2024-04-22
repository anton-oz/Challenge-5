To search through an array of objects for a matching key-value pair and then alter the value of another key in the same object, you can use various methods depending on the programming language you're using. Here's a generalized approach using JavaScript:

```javascript
// Sample array of objects
let arrayOfObjects = [
    { id: 1, name: "Alice", age: 30 },
    { id: 2, name: "Bob", age: 35 },
    { id: 3, name: "Charlie", age: 40 }
];

// Function to search and alter
function searchAndUpdate(array, keyToSearch, valueToSearch, keyToUpdate, newValue) {
    // Loop through each object in the array
    for (let i = 0; i < array.length; i++) {
        // Check if the current object has the specified key-value pair
        if (array[i][keyToSearch] === valueToSearch) {
            // If found, update the value of another key in the same object
            array[i][keyToUpdate] = newValue;
            // If you only want to update the first matching object and stop searching, you can break out of the loop here
            // break;
        }
    }
}

// Example usage
searchAndUpdate(arrayOfObjects, "name", "Bob", "age", 40);

// Output the updated array
console.log(arrayOfObjects);
```

This code will search through the `arrayOfObjects` for objects where the value of the key `"name"` is `"Bob"`, and if found, it will update the value of the key `"age"` to `40` in that same object.

Remember to adapt the code to your specific use case and the language you're using. If you're using a different programming language, let me know, and I can provide an example in that language.