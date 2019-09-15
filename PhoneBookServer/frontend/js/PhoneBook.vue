<template>
    <div class="container">
        <v-dialog/>
        <h1 class="mb-4 text-center gray-font-color">Phone Book</h1>
        <div class="p-1 pale-blue-background">
            <form class="mb-3">
                <div class="form-row">
                    <div class="col-3">
                        <input v-model.trim="name" :class="this.name === '' && invalid ? 'invalid-input' : ''"
                               type="text" class="form-control" placeholder="Name"/>
                    </div>
                    <div class="col-3">
                        <input v-model.trim="surname" :class="this.surname === '' && invalid ? 'invalid-input' : ''"
                               type="text" class="form-control" placeholder="Surname"/>
                    </div>
                    <div class="col-3">
                        <input v-model.trim="phone"
                               :class="(this.phone === '' && invalid) || this.exist ? 'invalid-input' : ''"
                               type="tel" class="form-control" placeholder="Phone number"/>
                    </div>
                    <button @click="addContact" type="button" class="btn btn-primary">Add</button>
                </div>
            </form>
            <div class="form-row mb-3">
                <div class="col-5">
                    <input v-model="term" type="text" class="form-control" placeholder="Search"/>
                </div>
                <div class="col">
                    <button @click="search" type="button" class="btn btn-primary">Search</button>
                </div>
                <div class="col">
                    <button @click="clear" type="button" class="btn btn-primary">Clear</button>
                </div>
                <div class="col-4">
                    <transition name="slide">
                        <button v-if="this.selectedContactsId.length > 0"
                                @click="confirmDelete"
                                class="btn btn-danger"
                                type="button">Delete selected
                        </button>
                    </transition>
                </div>
            </div>
            <div class="form-row m-1 invalid-background-color">
                <div class="col">
                    <span class="green">Contacts count: {{ this.contactsCount }}</span>
                </div>
                <div class="col">
                    <transition name="slide">
                        <span v-cloak v-if="invalid" class="red-text"
                              v-text="this.inputs.length > 1 ? this.inputs.join(', ') + ' fields are not filled!' :
                                                                   this.inputs.join() + ' field is not filled!'">
                        </span>
                        <span v-cloak v-if="exist"
                              class="red-text">Contact with such number already exists!</span>
                    </transition>
                </div>
            </div>
        </div>
        <div class="position-relative">
            <div class="table-scroll">
                <table class="table table-bordered mt-2 pale-blue-background gray-font-color">
                    <thead>
                    <tr>
                        <th scope="col">
                            <label>All
                                <input :class="this.contacts.length <= 1 ? 'd-none' : ''"
                                       v-model="allContactsSelected"
                                       @change="selectAll"
                                       type="checkbox" class="form-check"/>
                            </label>
                        </th>
                        <th scope="col">№</th>
                        <th scope="col">Name</th>
                        <th scope="col">Surname</th>
                        <th scope="col">Phone number</th>
                        <th scope="col">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-cloak v-for="(contact, index) in contacts">
                        <td>
                            <input v-model="contact.selected" @change="selectContact(contact)" type="checkbox"
                                   class="form-check"/>
                        </td>
                        <td>{{ index + 1 }}.</td>
                        <td>{{ contact.name }}</td>
                        <td>{{ contact.surname }}</td>
                        <td>{{ contact.phone }}</td>
                        <td>
                            <button @click="confirmDelete(contact)" class="btn btn-danger" type="button">X</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import PhoneBookService from "./PhoneBookService";

    export default {
        data() {
            return {
                name: "",
                surname: "",
                phone: "",
                invalid: false,
                inputs: [],
                term: "",
                contacts: [],
                selectedContactsId: [],
                allContactsSelected: false,
                exist: false,
            }
        },
        created() {
            this.loadData();
        },
        computed: {
            contactsCount: function () {
                return this.contacts.length;
            }
        },
        methods: {
            selectAll() {
                this.contacts.forEach(item => {
                    item.selected = this.allContactsSelected;
                    this.selectContact(item);
                });
            },

            selectContact(contact) {
                if (contact.selected === true) {
                    this.selectedContactsId.push(contact.id);
                } else {
                    this.unselectContact(contact);
                }
            },

            unselectContact(contact) {
                this.selectedContactsId = this.selectedContactsId.filter(id => {
                    return id !== contact.id;
                });
            },

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
                    if (this.exist) {
                        this.exist = false;
                    }
                    return;
                }

                const contactsPhone = this.contacts.map(item => item.phone);

                if (contactsPhone.length === 0 || (contactsPhone.indexOf(this.phone) === -1)) {
                    const data = {
                        name: this.name,
                        surname: this.surname,
                        phone: this.phone
                    };
                    this.invalid = false;
                    this.inputs = [];

                    PhoneBookService.addContact(data).done(response => {
                        if (!response.success) {
                            alert(response.message);
                        } else {
                            this.loadData();
                            this.name = "";
                            this.surname = "";
                            this.phone = "";
                        }
                        this.inputs = [];
                        this.invalid = false;
                        this.selectedContactsId = [];
                        this.exist = false;
                    });
                } else {
                    if (this.invalid) {
                        this.invalid = false;
                    }
                    this.exist = true;
                }
            },

            deleteContact(contact) {
                if (this.selectedContactsId.length === 0) {
                    PhoneBookService.deleteContact(contact.id).done(response => {
                        if (!response.success) {
                            return;
                        }

                        this.loadData();
                    })
                } else {
                    this.deleteSelected();
                }
                this.$modal.hide("dialog");
            },

            deleteSelected() {
                PhoneBookService.deleteContact(this.selectedContactsId).done(response => {
                    if (!response.success) {
                        alert(response.message);
                    }

                    this.loadData();
                });
                this.selectedContactsId = [];
                this.allContactsSelected = false;
            },

            confirmDelete(contact) {
                this.$modal.show("dialog", {
                    title: "Confirmation of acton!",
                    text: "Are you sure you want to delete?",
                    buttons: [
                        {
                            title: "Yes",
                            handler: () => {
                                this.deleteContact(contact);
                            }
                        },
                        {
                            title: "No"
                        }
                    ]
                })
            },

            search() {
                if (this.selectedContactsId.length > 0) {
                    this.selectedContactsId = [];
                    this.allContactsSelected = false;
                }
                this.loadData();
            },

            clear() {
                this.term = "";
                this.search();
            },

            loadData() {
                PhoneBookService.getContact(this.term).done(contacts => {
                    this.contacts = contacts;
                });
            }
        }
    };
</script>
