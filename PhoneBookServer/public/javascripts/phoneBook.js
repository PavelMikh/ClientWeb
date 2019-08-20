function post(url, data) {
    return $.post({
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json"
    });
}

function get(url, data) {
    return $.get(url, data);
}

let vm = new Vue({
    el: "#app",
    data: {
        invalid: false,
        inputs: [],
        contacts: [],
        name: "",
        surname: "",
        phone: "",
        term: ""
    },
    created: function () {
        this.loadData();
    },
    methods: {
        addContact: function () {
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
            let data = {
                name: this.name,
                surname: this.surname,
                phone: this.phone
            };
            this.invalid = false;
            this.inputs = [];

            let self = this;

            post("/addContact", data).done(function (response) {
                if (!response.success) {
                    alert("Data input incorrectly " + response.message.join(", "));
                } else {
                    self.loadData();
                    self.name = "";

                    self.surname = "";
                    self.phone = "";
                }
                self.inputs = [];
                self.invalid = false;
            });
        },

        deleteContact: function (contact) {
            let self = this;
            post("/deleteContact", {id: contact.id}).done(function (response) {
                if (!response.success) {
                    alert(response.message);
                }

                self.loadData();
            })
        },

        search: function () {
            this.loadData();
        },

        loadData: function () {
            let self = this;

            let data = {
                term: this.term
            };

            get("/getContacts", data).done(function (contacts) {
                self.contacts = contacts;
            });
        }
    }
});