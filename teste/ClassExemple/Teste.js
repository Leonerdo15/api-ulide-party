// Frank Poth 08/03/2017

/*function Human(name) {

    this.name = name;

}

Human.prototype = {

    talk:function() {

        console.log("Hey, I'm a human and my name is " + this.name);

    }

};*/

/*function Worker(job) {

    this.job = job;

}

Worker.prototype = {

    work:function() {

        console.log("I am a worker and my job is " + this.job);

    }

};*/

/*function Player(game){
    this.game = game;
}

Player.prototype = {

    play:function() {
        console.log("I am a player and I play " + this.game);
    }
}*/


/*function Bob(job, game) {

    Human.call(this, "Bob");
    Worker.call(this, job);
    Player.call(this, game);

}

Bob.prototype = Object.create(Human.prototype);
Object.assign(Bob.prototype, Worker.prototype, Player.prototype);*/


const Bob = require("./bob");
const Human = require("./human");

var bob = new Bob("rocket ship captain", ["Starcraft", "minecraft"]);
var human = new Human("Leo");

human.talk();
bob.talk();
bob.work();
bob.play();

// const comboios = require('comboios')
//
// comboios.stations()
//     .then(console.log)
//     .catch(console.error)


