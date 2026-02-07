// using week 4's js example as a template and then tweaking it to suit my code 

// creating an array to store the to do list items, so that I can perform error handling
itemList = [];
document.getElementById("addButton").addEventListener("click", onClickAdd);

function onClickAdd() {
  var toDoItem = document.getElementById("toDoItem");

  // trim the value before inserting
  var toDoItemValue = toDoItem.value.trim();

  // check value not blank
  if(toDoItemValue === ""){
    alert("This cannot be blank. Please add item.")
    return;
  }
 
  // check value not already in list
  if(itemList.includes(toDoItemValue.toLowerCase())){
    alert("Item already in list.")
    return;
  }

  // add item to array, make lower case so that all items are comparable
  itemList.push(toDoItemValue.toLowerCase());

  var toDoContent = document.getElementById("todo");
  
  var newLiEl = document.createElement("li");

  // create delete button
  var deleteButton = document.createElement("button");
  deleteButton.textContent = "delete";
  deleteButton.id = "deleteButton";

  // create complete button
  var completeButton = document.createElement("button");
  completeButton.textContent = "complete";
  completeButton.id = "completeButton";

  // create edit button
  var editButton = document.createElement("button");
  editButton.textContent = "edit";
  editButton.id = "editButton";

  // adds the list item and buttons to html
  newLiEl.textContent = toDoItemValue;
  newLiEl.appendChild(completeButton);
  newLiEl.appendChild(editButton);
  newLiEl.appendChild(deleteButton);
  toDoContent.appendChild(newLiEl);
  // console.log(newLiEl);

  toDoItem.value = "" ;
  // console.log(itemList);
}

/* cannot add event listener to the delete and complete buttons because these buttons and the list items do not yet exist.
   Instead add event listener to the unordered list as this exists from the start. Then check when an event happens and if that 
   event is a button click. Then perform one of the 3 functions below depending on which button was clicked. */

document.getElementById("todo").addEventListener("click", function(event){
  // console.log(event.type);
  // console.log(event.target);
  // console.log(event.target.parentElement);
  
  if (event.target.id === "deleteButton") {
      // remove item from array
      var toDoItemValue = event.target.parentElement.firstChild.textContent;  
      itemList = itemList.filter(item => item !== toDoItemValue.toLowerCase());

      // remove item from to do list
      event.target.parentElement.remove();
      // console.log(itemList);
  } 
  else if (event.target.id === "completeButton") {
    /* get the to do list item so that we can insert it into the completed list. 
       Need "firstChild" otherwise it also returns the text from the button */
    var toDoItemValue = event.target.parentElement.firstChild.textContent;  
    // console.log(event.target.parentElement.firstChild.textContent)

    // remove item from array
    itemList = itemList.filter(item => item !== toDoItemValue.toLowerCase());

    var completedList = document.getElementById("completed");
    var newLiEl = document.createElement("li");
    newLiEl.textContent = toDoItemValue;
    completedList.appendChild(newLiEl);

    // remove item from to do list
    event.target.parentElement.remove();
    // console.log(itemList);
  }
    else if (event.target.id === "editButton") {
    currentItem = event.target.parentElement.firstChild.textContent;
    //
    newItem = prompt("Edit your item:", event.target.parentElement.firstChild.textContent);

    // if user does not enter anything then exit without changes
    if (!newItem || newItem.trim() === "") {
      return;
    }

    // check if user enters item already in the list
    if(itemList.includes(newItem.trim().toLowerCase())){
      alert("Item already in list.")
      return;
    }
    
    // need to remove edited item from array 
    itemList = itemList.filter(item => item !== currentItem.toLowerCase());

    // apply edit
    event.target.parentElement.firstChild.textContent = newItem.trim();

    // add new item to array
    itemList.push(newItem.trim().toLowerCase());
    // console.log(itemList);
  }
});

// Note to self:
// event --> an object automatically created by the browser when something happens, like a click
// function(event) --> the function takes the event object and can return info about the event
// event.target --> is the item that was clicked
// event.target.id = "deleteButton" --> checks if the item that was clicked has id = "deleteButton".
// If wanted to search by class and not id then would do the below
// event.target.classList.contains("deleteButton") --> checks if the item that was clicked has the class deleteButton
// event.type --> what kind of event it was
// event.target.parentElement.remove() --> deletes the parent element of the item that was clicked,
// so it removes the relevant (to do) list item from the page, as the button is the child of said (to do) list element