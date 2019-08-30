<template>
    <div class="container">
        <h1 class="mb-4 text-center">Phone Book</h1>
        <form class="mb-3">
            <div class="form-row">
                <div class="col">
                    <input v-model.trim="name" :class="name === '' && invalid ? 'invalid-input' : ''"
                           type="text" class="form-control" placeholder="Name">
                </div>
                <div class="col">
                    <input v-model.trim="surname" :class="surname === '' && invalid ? 'invalid-input' : ''"
                           type="text" class="form-control" placeholder="Surname">
                </div>
                <div class="col">
                    <input v-model.trim="phone" :class="phone === '' && invalid ? 'invalid-input' : ''"
                           type="tel" class="form-control" placeholder="Phone number">
                </div>
                <button @click="addContact" type="button" class="btn btn-primary">add</button>
            </div>
        </form>
        <div class="form-row mb-3">
            <div class="col-6">
                <input v-model="term" type="text" class="form-control" placeholder="Search">
            </div>
            <div class="col">
                <button @click="search" type="button" class="btn btn-primary">Search</button>
            </div>
            <div class="col-4">
                <transition name="slide">
                            <span v-cloak v-if="invalid" style="color: red"
                                  v-text="this.inputs.length > 1 ? this.inputs.join(', ') + ' fields are not filled!' :
                                this.inputs.join() + ' field is not filled!'"></span>
                </transition>
            </div>
        </div>
        <table class="table table-bordered mt-2">
            <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col">№</th>
                <th scope="col">Name</th>
                <th scope="col">Surname</th>
                <th scope="col">Phone number</th>
                <th scope="col"></th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-cloak v-for="(contact, index) in contacts">
                <contact></contact>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import PhoneBookService from "./PhoneBookService";
    import Contact from "./Contact.vue";

    export default {
        components: {Contact},
        data() {
            return {
                invalid: false,
                inputs: [],
                contacts: [],

                term: ""
            }
        },
        created() {
            this.loadData();
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
                const data = {
                    name: this.name,
                    surname: this.surname,
                    phone: this.phone
                };
                this.invalid = false;
                this.inputs = [];

                PhoneBookService.addContact(data).done(response => {
                    if (!response.success) {
                        alert("Data input incorrectly " + response.message.join(", "));
                    } else {
                        this.loadData();
                        this.name = "";
                        this.surname = "";
                        this.phone = "";
                    }
                    this.inputs = [];
                    this.invalid = false;
                });
            },

            search() {
                this.loadData();
            },

            loadData() {
                PhoneBookService.getContact(this.term).done(contacts => {
                    this.contacts = contacts;
                });
            }
        }
    };
</script>
