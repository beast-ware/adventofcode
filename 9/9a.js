var fs = require('fs');
const splitLines = require('split-lines');

fs.readFile('8/DATA', 'utf8', function (err, contents) {    

    var c = splitLines(contents);
    var gameInput  = c[0].split(" ");
    var playerCount = gameInput[0];
    var marbleCount = gameInput[6];

    class CircularList {
        
        constructor(item) {
            this.items = [];
            this.items.push(item);
            item.next = item;
            item.previous = item;
        }      
        insertAfter(after, item) {
            item.previous = after;
            item.next = after.next;

            after.next = item;
            item.next.previous = item;
            this.items.push(item);
            return item;
        }
        remove(item) {
            var itemPrev = item.previous;
            var itemNext = item.next;
            itemPrev.next = itemNext;
            itemNext.previous = itemPrev;
            return itemNext;
        }

    }

    class Player {
        constructor(id) {
            this.id = id;
            this.score = 0;
        }
    }

    class Game {
        constructor(playerCount, marbleCount) {
            this.marbleCount = marbleCount;
            this.currentMarble = {"value":0};
            this.circle = new CircularList(this.currentMarble);
            this.currentPlayer = new Player(1);
            this.players = new CircularList(this.currentPlayer);
            var playerInsert = this.currentPlayer;
            for (var i=1;i<playerCount;i++) {
                playerInsert= this.players.insertAfter(playerInsert, new Player(i+1));
            }             
        }
        placeNextMarble(marbleValue) {
            return this.circle.insertAfter(this.currentMarble.next, {"value": marbleValue});
        }
        playGame() {
            for (var i=1; i<=this.marbleCount; i++) {
                if (i % 23 === 0) {
                    this.currentPlayer.score += i;
                    var removeMarble = this.currentMarble.previous.previous.previous.previous.previous.previous.previous;
                    this.currentMarble = this.circle.remove(removeMarble); // returns item taking its place (removedItem.next)
                    this.currentPlayer.score += removeMarble.value;

                } else {
                    this.currentMarble = this.placeNextMarble(i);
                }
                this.currentPlayer = this.currentPlayer.next;                
            }


        }
    }
    
    var test = new Game(419, 71052);
    test.playGame();
  
    var highestScore = 0;
    for (var i=0; i<test.players.items.length; i++) {
        if (test.players.items[i].score > highestScore) {
            highestScore = test.players.items[i].score;
        }
    }
    console.log(highestScore);
    
})
