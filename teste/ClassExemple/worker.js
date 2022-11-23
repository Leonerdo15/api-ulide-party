function Worker(job) {

    this.job = job;

}

Worker.prototype = {

    work:function() {

        console.log("I am a worker and my job is " + this.job);

    }

};

module.exports = Worker;