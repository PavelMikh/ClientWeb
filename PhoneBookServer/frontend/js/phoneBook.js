import "bootstrap/dist/css/bootstrap.css"
import "../css/style.css";

import $ from "jquery";
import "bootstrap";

import Vue from "vue";

import PhoneBookComponent from "./PhoneBook.vue";

new Vue({
    el: "#app",
    components: {
        "phone-book": PhoneBookComponent
    }
});

