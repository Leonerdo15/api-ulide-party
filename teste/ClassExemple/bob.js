const Human = require("./human");
const Worker = require("./worker");
const Player = require("./player");

function Bob(job, game) {

    Human.call(this, "Bob");
    Worker.call(this, job);
    Player.call(this, game);

}

Bob.prototype = Object.create(Human.prototype);
Object.assign(Bob.prototype, Worker.prototype, Player.prototype);

module.exports = Bob;