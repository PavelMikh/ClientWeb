let express = require('express');
let router = express.Router();

let contacts = [];
let id = 1;

router.get("/getContacts", function (req, res) {
    let term = (req.query.term || "").toUpperCase();

    let result = term === "" ? contacts : contacts.filter(function (contact) {
        return contact.name.toUpperCase().indexOf(term) >= 0 ||
            contact.phone.toUpperCase().indexOf(term) >= 0 ||
            contact.surname.toUpperCase().indexOf(term) >= 0;
    });

    res.send(result);
});

router.post("/addContact", function (req, res) {
    let contact = req.body;
    if (contact.name === "" || contact.surname === "" || contact.phone === "") {
        let inputs = [];
        if (contact.name === "") {
            inputs.push("Name");
        }
        if (contact.surname === "") {
            inputs.push("Surname");
        }
        if (contact.phone === "") {
            inputs.push("Phone");
        }

        res.send({
            success: false,
            message: inputs
        });
    } else {
        contact.id = id;
        id++;

        contacts.push(contact);

        res.send({
            success: true,
            message: null
        });
    }
});

router.post("/deleteContact", function (req, res) {
    let id = req.body.id;

    if (id.length > 1) {
        contacts = contacts.filter(contact => {
            if (id.indexOf(contact.id) === -1) {
                return contact.id;
            }
        });
    } else {
        contacts = contacts.filter(function (contact) {
            return contact.id !== id;
        });
    }

    res.send({
        success: true,
        message: null
    });
});

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index');
});

module.exports = router;
