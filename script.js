
var toDoItem = document.getElementById("toDoItem");

var addButton = document.getElementById("addButton");

addButton.addEventListener("click", onClickSearhButton);

function onClickSearhButton() {
  
  var toDoContent = document.querySelector("#todo");
  
  var newLiEl = document.createElement("li");

  newLiEl.innerHTML = `
            ${toDoItem.value} 
            <div>
                <button id="deleteButton">delete</button>
                <button id="completeButton">complete</button>
            </div>
  `;

  toDoContent.appendChild(newLiEl);

  toDoItem.value = "" ;
}