var currentBid = ""
var currentCards = ""

$(function() {
    updateCards()
    var cardSwap = new Draggable.Swappable(document.getElementById("bidding-cardbox"), {
        draggable: ".cardtile",
    })
    cardSwap.on('swappable:stop', () => {
        updateCards()
    });

    var bidTiles = []
    for (var box of ["bidbox", "east", "west", "north", "south"]) {
        bidTiles.push(document.getElementById("bidding-" + box))
    }
    var tileSwap = new Draggable.Swappable(bidTiles, {
        draggable: ".bidtile",
    })
    var lastTile = null

    tileSwap.on('swappable:swapped', (event) => {
        //console.log(event.dragEvent.source)
        var element = $(event.swappedElement)
        console.log()
        if (element.hasClass('bid-slot') && element.parent().attr("id") == "bidding-pass") {
            lastTile = element
        }
    });
    tileSwap.on('swappable:stop', () => {
        if (lastTile != null) {
            lastTile.remove()
        }
        updateBids()
    });
});

function updateCards() {
    currentCards = ""
    for (side of ["w", "s", "e", "n"]) {
        var spades = ""
        var hearts = ""
        var diamonds = ""
        var clubs = ""
        for (child of $("#bidding-" + side).children()) {
            var target = $($(child).children().first())
            var id = target.attr("id")
            var suit = id.substr(id.length - 2, 1)
            if (suit == "c") {
                clubs += id.substr(id.length - 1)
            }
            if (suit == "d") {
                diamonds += id.substr(id.length - 1)
            }
            if (suit == "h") {
                hearts += id.substr(id.length - 1)
            }
            if (suit == "s") {
                spades += id.substr(id.length - 1)
            }
        }
        currentCards = currentCards + side + "=" + spades + "." + hearts + "." + diamonds + "." + clubs + "&"
    }
    console.log("Updated cards to " + currentCards)
}

function updateBids() {
    var bids = [{
        bids: [],
        name: "north"
    }, {
        bids: [],
        name: "east"
    }, {
        bids: [],
        name: "south"
    }, {
        bids: [],
        name: "west"
    }]
    for (obj of bids) {
        var name = obj.name
        var bid = obj.bids
        var index = -1
        bid.length = 0
        for (child of $("#bidding-" + name).children().first().children()) {
            index++
            var target = $($(child).children().first())
            if (target.attr("id") == undefined) {
                if (index > 0) {
                    continue
                }
                bid.push(undefined)
                continue
            }
            var id = target.attr("id")
            if (id.includes("pass")) {
                bid.push("p")
                continue
            }
            if (id.includes("xx")) {
                bid.push("xx")
                continue
            }
            if (id.includes("x")) {
                bid.push("x")
                continue
            }
            if (id.includes("clubs")) {
                bid.push(id.substr(id.length - 1) + "c")
                continue
            }
            if (id.includes("diamonds")) {
                bid.push(id.substr(id.length - 1) + "d")
                continue
            }
            if (id.includes("hearts")) {
                bid.push(id.substr(id.length - 1) + "h")
                continue
            }
            if (id.includes("spades")) {
                bid.push(id.substr(id.length - 1) + "s")
                continue
            }
            if (id.includes("notrump")) {
                bid.push(id.substr(id.length - 1) + "n")
                continue
            }
        }
    }
    var lastbid = ""
    var nextbid = ""
    currentBid = "h="
    for (var i = 0; i < 7; i++) {
        var bidIndex = 0
        for (obj of bids) {
            bidIndex++
            if (obj.bids[i] == undefined) {
                continue
            }
            if (lastbid == obj.name) {
                console.log(obj.name + " bid out of order! This will confuse GIB.")
                // Display on screen warning, change bid button color
            }
            currentBid = currentBid + obj.bids[i] + "-"
            lastbid = obj.name
            if (bidIndex == 4) {
                bidIndex = 0
            }
            nextbid = bids[bidIndex].name
        }
        if (lastbid == "") {
            console.log("No players bid first! Error!")
            currentBid = ""
            // Display on screen warning, disable bid button
            return
        }
    }
    if (currentBid.includes("p-p-p-p")) {
        console.log("All players passed during a round! This will confuse GIB.")
        // Display on screen warning, change bid button color
    }
    currentBid = currentBid.substr(0, currentBid.length - 1)
    console.log("Current bid is " + currentBid)
    console.log("Next to bid is " + nextbid)
}

function httpGet(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
}
