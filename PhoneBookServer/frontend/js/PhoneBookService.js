import Ajax from "./ajax"

export default {
    addContact(data) {
        return Ajax.post("/addContact", data);
    },

    deleteContact(id) {
        return Ajax.post("/deleteContact", { id })
    },

    getContact(term) {
        const data = {
            term
        };

        return Ajax.get("/getContacts", data);
    }
}