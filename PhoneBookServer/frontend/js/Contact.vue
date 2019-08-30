<template>
    <div class="container">
        <td>
            <input v-model="checked" type="checkbox" class="form-check">
        </td>
        <td>{{ index + 1 }}.</td>
        <td>{{ contact.name }}</td>
        <td>{{ contact.surname }}</td>
        <td>{{ contact.phone }}</td>
        <td>
            <button @click="confirmDelete(contact)" class="btn btn-danger" type="button">X</button>
        </td>
        <td>
            <transition name="slide">
                <button v-cloak v-if="checked" @click="deleteAll(contactGroup)" class="btn btn-danger" type="button">d.all</button>
            </transition>
        </td>
    </div>
</template>

<script>
    import PhoneBookService from "./PhoneBookService";

    export default {
        name: "contact",
        data() {
            return {
                checked: false,
                name: "",
                surname: "",
                phone: ""
            }
        },
        methods: {
            deleteContact(contact) {
                PhoneBookService.deleteContact(contact.id).done(response => {
                    if (!response.success) {
                        alert(response.message);
                    }

                    this.loadData();
                })
            },

            confirmDelete(contact) {
                if (confirm("Are you sure?")) {
                    return this.deleteContact(contact);
                } else {
                    return false;
                }
            }
        }
    }
</script>