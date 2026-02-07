/* using week 4's js example as a template and then tweaking it to suit my code */


// add event listener to the Add button, and call the onClickAdd function
document.getElementById("addButton").addEventListener("click", onClickAdd);

function onClickAdd() {
   // retrieves input
  var toDoItem = document.getElementById("toDoItem");

  // error handling
  if(toDoItem.value === ""){
    alert("This cannot be blank. Please add item.")
    return;
  }
 
  // retrieves unordered list
  var toDoContent = document.getElementById("todo");
  
  // creates list element
  var newLiEl = document.createElement("li");

  // creates delete button
  var deleteButton = document.createElement("button");
  deleteButton.textContent = "delete";
  // adds an id to the button so we can later identify it
  deleteButton.id = "deleteButton";

  // creates complete button
  var completeButton = document.createElement("button");
  completeButton.textContent = "complete";
  completeButton.id = "completeButton";

  // adds the list item and buttons to html
  newLiEl.textContent = toDoItem.value;
  newLiEl.appendChild(deleteButton);
  newLiEl.appendChild(completeButton);
  toDoContent.appendChild(newLiEl);
  // console.log(newLiEl);

  toDoItem.value = "" ;
}

// Note to self:
// cannot add event listener to the delete and complete buttons because these buttons and the list items do not yet exist
// instead add event listener to the unordered list as this exists from the start
// event --> an object automatically created by the browser when something happens, like a click
// function(event) --> the function takes the event object and can return info about the event
// event.target --> is the item that was clicked
// event.target.id = "deleteButton" --> checks if the item that was clicked has id = "deleteButton".
// If wanted to search by class and not id then would do the below
// event.target.classList.contains("deleteButton") --> checks if the item that was clicked has the class deleteButton
// event.type --> what kind of event it was
// event.target.parentElement.remove() --> deletes the parent element of the item that was clicked,
// so it removes the relevant (to do) list item from the page, as the button is the child of said (to do) list element

document.getElementById("todo").addEventListener("click", function(event) {
  // console.log(event.type);
  // console.log(event.target);
  // console.log(event.target.parentElement);
  
  if (event.target.id === "deleteButton") {
      event.target.parentElement.remove();
  } 
  else if (event.target.id === "completeButton") {
    // retrieve the to do list item so that we can insert it into the completed list. Need "firstChild" otherwise it also returns the text from the button
    var toDoItem = event.target.parentElement.firstChild.textContent;  
    // console.log(event.target.parentElement.firstChild.textContent)

    var completedList = document.getElementById("completed");
    var newLiEl = document.createElement("li");
    newLiEl.textContent = toDoItem;
    completedList.appendChild(newLiEl);

    // remove item from to do list
    event.target.parentElement.remove();
  }
});