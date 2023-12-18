class Room {
    constructor(name) {
        this._name = name;
        this._description = "";
        this._linkedRooms = {};
        this._character = "";
        this._item = "";
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get character() {
        return this._character
    }

    get item() {
        return this._item
    }

    set name(value) {
        if (value.length < 4) {
            alert("Name is too short.");
            return;
        }
        this._name = value;
    }

    set description(value) {
        if (value.length < 4) {
            alert("description is too short.");
            return;
        }
        this._description = value;
    }

    set character(value) {
        this._character = value;
    }

    set item(value) {
        this._item = value;
    }

    set itemDescription(value) {
        this._itemDescription = value;
    }

    describe() {
        return "Looking around the " + this._name + " you can see " + this._description;
    }

    linkRoom(direction, roomToLink) {
        this._linkedRooms[direction] = roomToLink;
    }

    getDetails() {
        const entries = Object.entries(this._linkedRooms);
        let details = []
        for (const [direction, room] of entries) {
            let text = " The " + room._name + " is to the " + direction;
            details.push(text);
        }
        return details;
    }

    //method to move to a new room
    move(direction) {
        if (direction in this._linkedRooms) {
            return this._linkedRooms[direction];
        } else {
            alert("You can't go this way",);
            alert(this._name)
            return this;
        }
    }
}


class Item {
    constructor(name) {
        this._name = name,
            this._description = ""
    }

    set name(value) {
        if (value.length < 4) {
            alert("Name is too short.");
            return;
        }
        this._name = value;
    }

    set description(value) {
        if (value.length < 4) {
            alert("Decription is too short.");
            return;
        }
        this._description = value;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    describe() {
        return `you see ${this._name} on the table`;
    }
    takeItem(item) {
        console.log(currentRoom)

        if (item._name === "letter") {
            takeLetter = true
            console.log(takeLetter)
            currentRoom._item = "";
            takeItem.push("a letter")
            document.getElementById("item").innerText = takeItem
        } else if (item._name === "bottle") {
            takeBottle = true
            console.log(takeBottle)
            currentRoom._item = "";
            takeItem.push("a bottle")
            document.getElementById("item").innerText = takeItem
        } else {
            return "There's nothing in this room."
        }
    }
}

// create individual items

const Bottle = new Item("a bottle of wine");
Bottle.description = "a dusty bottle of Domaine de la Romanée-Conti Grand Cru 1945";

const Letter = new Item("a letter");
Letter.description = "a letter addressed to you";


class Character {
    constructor(name) {
        this._name = name,
            this._description = ""
        this._conversation = ""
        this._enemy = ""

    }
    set name(value) {
        if (value.length < 4) {
            alert("Name is too short.");
            return;
        }
        this._name = value;
    }

    set description(value) {
        if (value.length < 4) {
            alert("Decription is too short.");
            return;
        }
        this._description = value;
    }

    set enemy(value) {
        this._enemy = value;
    }

    set conversation(value) {
        if (value.length < 4) {
            alert("conversation is too short.");
            return;
        }
        this._conversation = value;
    }
    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get conversation() {
        return this._conversation;
    }

    get enemy() {
        return this._enemy;
    }

    describe() {
        return `You see ${this._name} and they are in a bad mood.`;
    }

    converse() {
        return this._name + " says " + "'" + this._conversation + "'";
    }
}

// create character objects

let Gnome = new Character("Gnome");
Gnome.description = "a large green gnome";
Gnome.conversation = "You are not welcome here";
Gnome.enemy = true;



//create the indiviual room objects and add their descriptions
const EntranceHall = new Room("Entrance Hall");
EntranceHall.description = "an elegantly furnished Hall with large paintings around the wall.";

const WineCellar = new Room("Wine Cellar");
WineCellar.description = "an ancient wine cellar filled with a musty smell";
WineCellar.item = Bottle;

const WestWing = new Room("West wing");
WestWing.description = "a grandiose wing that leads to other parts of the mansion";
WestWing.item = Letter;

const MirrorRoom = new Room("Mirror room");
MirrorRoom.description = "a mysterious room thoroughly covered by mirrors";


//link the rooms together
EntranceHall.linkRoom("west", WestWing);
EntranceHall.linkRoom("east", WineCellar);
WestWing.linkRoom("north", MirrorRoom);
WestWing.linkRoom("east", EntranceHall);
WineCellar.linkRoom("west", EntranceHall);
MirrorRoom.linkRoom("south", WestWing);



// addItem(item) {
//     this._items.push(item);
// }

// getItems() {
//     return this._items;
// }
// let inventory = [];


let takeItem = [];
let takeBottle = false;
let takeLetter = false;
itemsTaken = document.getElementById("item");

function displayRoomInfo(room) {
    let occupantMsg = ""

    if (room.character === "") {
        occupantMsg = ""
    } else {
        occupantMsg = room.character.describe() + ". " + room.character.converse()
    }

    textContent = "<p>" + room.describe() + "</p>" + "<p>" +
        occupantMsg + "</p>" + "<p>" + room.getDetails() + "</p>";

    document.getElementById("textarea").innerHTML = textContent;
    document.getElementById("usertext").innerHTML = '><input type="text" id="usertext" />';
    document.getElementById("usertext").focus();
}


function startGame() {
    //set and display start room
    currentRoom = EntranceHall
    console.log(currentRoom)
    displayRoomInfo(currentRoom);

    //

    //handle commands
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            command = document.getElementById("usertext").value;
            const directions = ["north", "south", "east", "west"]

            if (directions.includes(command.toLowerCase())) {
                currentRoom = currentRoom.move(command)
                document.getElementById("usertext").value = ""
                displayRoomInfo(currentRoom);
            } else {
                document.getElementById("usertext").value = ""
                alert("that is not a valid command please try again")
            }

        }
    });
}
startGame();