function Human(name) {

    this.name = name;

}

Human.prototype = {

    talk:function() {

        console.log("Hey, I'm a human and my name is " + this.name);

    }

};

module.exports = Human;