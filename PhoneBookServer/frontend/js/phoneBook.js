import "bootstrap/dist/css/bootstrap.css"
import "../css/style.css";

import $ from "jquery";
import Vue from "vue";
import "bootstrap";

import PhoneBookService from "./PhoneBookService";
import ajax from "./ajax";

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

            PhoneBookService.addContact(data).done(function (response) {
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
            PhoneBookService.deleteContact(contact.id).done(function (response) {
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

            PhoneBookService.getContact(this.term).done(function (contacts) {
                self.contacts = contacts;
            });
        }
    }
});