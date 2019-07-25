document.addEventListener("DOMContentLoaded", function () {
    var newTodoList = document.getElementById("new-todo-list");
    var newTodoText = document.getElementById("new-todo-text");
    newTodoText.focus();
    var validationMessage = document.querySelector(".validation-message");
    var addTodoButton = document.getElementById("add-new-todo");

    function createNote(text) {
        var li = document.createElement("li");
        li.innerHTML = "<span class='text'></span><button type='button'>x</button>" +
            "<button type='button'>редактировать</button>";
        li.children[0].textContent = text;
        return li;
    }

    addTodoButton.addEventListener("click", function () {
        var newNote = newTodoText.value;
        if (newNote === "") {
            validationMessage.style.display = "block";
            newTodoText.focus();
            return;
        }

        newTodoList.style.display = "block";

        validationMessage.style.display = "none";

        var li = createNote(newNote);
        li.children[1].addEventListener("click", function () {
            newTodoList.removeChild(li);
            if (newTodoList.getElementsByTagName("li").length === 0) {
                newTodoList.style.display = "none";
            }
            newTodoText.focus();
        });

        li.children[2].addEventListener("click", function () {
            var editingPanel = document.createElement("div");
            var newValueInput = document.createElement("input");
            newValueInput.type = "text";
            newValueInput.value = li.children[0].innerText;
            editingPanel.appendChild(newValueInput);
            var saveButton = document.createElement("button");
            saveButton.type = "button";
            saveButton.innerHTML = "сохранить";
            editingPanel.appendChild(saveButton);
            var cancelButton = document.createElement("button");
            cancelButton.type = "button";
            cancelButton.innerHTML = "отменить";
            editingPanel.appendChild(cancelButton);
            newTodoList.replaceChild(editingPanel, li);
            newValueInput.focus();
            saveButton.addEventListener("click", function () {
                li.children[0].textContent = newValueInput.value;
                newTodoList.replaceChild(li, editingPanel);
                newTodoText.focus();
            });
            cancelButton.addEventListener("click", function () {
                newTodoList.replaceChild(li, editingPanel);
                newTodoText.focus();
            });
        });
        newTodoList.appendChild(li);
        newTodoText.value = "";
        newTodoText.focus();
    });
});