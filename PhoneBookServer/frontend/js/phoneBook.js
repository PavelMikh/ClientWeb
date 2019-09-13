import "bootstrap/dist/css/bootstrap.css"
import "../css/style.css";

import "bootstrap";
import Vue from "vue";
import VModal from 'vue-js-modal'

Vue.use(VModal, {dialog: true});

import PhoneBookComponent from "./PhoneBook.vue";

new Vue({
    el: "#app",
    components: {
        "phone-book": PhoneBookComponent
    }
});
