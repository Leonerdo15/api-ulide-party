function Player(game){
    this.game = game;
}

Player.prototype = {

    play:function() {
        console.log("I am a player and I play " + this.game);
    }
}

module.exports = Player;