document.addEventListener("DOMContentLoaded", function () {
    var newTodoList = document.getElementById("todo-list");
    var newTodoText = document.getElementById("new-todo-text");
    newTodoText.focus();
    var validationMessage = document.querySelector(".validation-message");
    var addTodoButton = document.getElementById("add-new-todo");

    function createLi(text) {
        var li = document.createElement("li");
        li.innerHTML = "<span class='text'></span><button type='button'>x</button>" +
            "<button type='button'>edit</button>";
        li.children[0].textContent = text;
        return li;
    }

    addTodoButton.addEventListener("click", function () {
        var newText = newTodoText.value;
        if (newText === "") {
            validationMessage.style.display = "block";
            return;
        }

        validationMessage.style.display = "none";

        var li = createLi(newText);
        li.children[1].addEventListener("click", function () {
            newTodoList.removeChild(li);
        });

        li.children[2].addEventListener("click", function () {
            var div = document.createElement("div");
            var editInput = document.createElement("input");
            editInput.id = "edit_input";
            editInput.type = "text";
            editInput.value = li.children[0].innerText;
            div.appendChild(editInput);
            var saveButton = document.createElement("button");
            saveButton.type = "button";
            saveButton.innerHTML = "save";
            div.appendChild(saveButton);
            var deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.innerHTML = "cancel";
            div.appendChild(deleteButton);
            newTodoList.replaceChild(div, li);
            saveButton.addEventListener("click", function () {
                li.children[0].textContent = editInput.value;
                newTodoList.replaceChild(li, div);
            });
            deleteButton.addEventListener("click", function () {
                newTodoList.replaceChild(li, div);
            });
        });

        newTodoList.appendChild(li);
        newTodoText.value = "";
        newTodoText.focus();
    });
});