$(function () {
    var newTodoList = $("#new-todo-list");
    var newTodoText = $("#new-todo-text");
    newTodoText.focus();
    var validationMessage = $(".validation-message");
    var addTodoButton = $("#add-new-todo");

    function createNote(text) {
        var li = $("<li>");
        li.html("<span class='text'></span>" +
            "<button type='button'>x</button><button type='button'>редактировать</button>");
        li.children().eq(0).text(text);
        return li;
    }

    addTodoButton.click(function () {
        var newNote = $(newTodoText).val();
        if (newNote === "") {
            validationMessage.show();
            newTodoText.focus();
            return;
        }

        newTodoList.show();

        validationMessage.hide();

        var li = createNote(newNote);

        var deleteButton = li.children().eq(1);
        var editButton = li.children().eq(2);

        deleteButton.click(function () {
            li.remove();

            if (newTodoList.children().length === 0) {
                newTodoList.hide();
            }

            newTodoText.focus();
        });

        editButton.click(function () {
            var currentText = li.children().eq(0).text();

            var editingPanel = $("<div>");
            var newValueInput = $("<input type='text'>");
            editingPanel.append(newValueInput);

            var saveButton = $("<button type='button'>");
            saveButton.html("сохранить");
            editingPanel.append(saveButton);

            saveButton.click(function () {
                if ($(newValueInput).val() === "") {
                    $(newValueInput).val("Введите текст!").css({color: "red"});
                    newValueInput.focus();
                    return;
                }

                li.children().eq(0).text(newValueInput.val());
                $(editingPanel).replaceWith($(li));
                newTodoText.focus();
            });

            var cancelButton = $("<button type='button'>");
            cancelButton.html("отменить");
            editingPanel.append(cancelButton);

            cancelButton.click(function () {
                $(editingPanel).replaceWith(tmp);
                newTodoText.focus();
            });

            var tmp;
            newValueInput.val(currentText);
            li.before(editingPanel);
            tmp = li.detach();
            newValueInput.focus();
        });

        newTodoList.append(li);
        newTodoText.val("");
        newTodoText.focus();
    });
});