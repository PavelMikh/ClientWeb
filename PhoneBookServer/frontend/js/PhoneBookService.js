import Ajax from "./ajax"

export default {
    addContact: function (data) {
        return Ajax.post("/addContact", data);
    },

    deleteContact: function (id) {
        return Ajax.post("/deleteContact", {id: id})
    },

    getContact: function (term) {
        let data = {
            term: term
        };

        return Ajax.get("/getContacts", data);
    }
}