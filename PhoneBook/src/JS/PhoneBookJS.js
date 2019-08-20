let vm = new Vue({
    el: "#app",
    data: {
        invalid: false,
        inputs: [],
        contacts: [],
        name: "",
        surname: "",
        phone: ""
    },
    methods: {
        addContact() {
            this.inputs = [];
            if (this.name === "" || this.surname === "" || this.phone === "") {
                if (this.name === "") {
                    this.invalid = true;
                    this.inputs.push("Name");
                }
                if (this.surname === "") {
                    this.invalid = true;
                    this.inputs.push("Surname");
                }
                if (this.phone === "") {
                    this.invalid = true;
                    this.inputs.push("Phone");
                }
                return;
            }

            let contact = {
                name: this.name,
                surname: this.surname,
                phone: this.phone
            };
            this.id++;
            this.contacts.push(contact);
            this.name = "";
            this.surname = "";
            this.phone = "";
            this.invalid = false;
            this.inputs = [];
        },
        deleteContact(contact) {
            this.contacts = this.contacts.filter(function (value) {
                return value !== contact;
            });
        }
    }
});
