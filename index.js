const OS = require('os');

const Logger = require('./logger');

const {EventEmitter} = require('events');

const logger = new Logger({
  buffer: false,
  bufferLimit: 5
});

const STATS = [
  'freemem',
  'loadavg',
  'totalmem',
  'uptime'
]

class Ops extends EventEmitter {
  constructor(options = {}) {
    super();

    this.interval = options.interval || 200;
    this.intervalId = null;
    this.started = false;

    this.log = (log) => {
      logger.log(log);
    }

    this.on('start', () => {
      if (!this.started) {
        this.started = true;
        this.intervalId = setInterval(() => {
          this.logStats();
        }, this.interval);
      }
    });

    this.on('stop', () => {
      clearInterval(this.intevalId);
      Logger.clear();
    });
  }

  logStats() {
    const stats = {};

    STATS.forEach(stat => {
      const osStat = OS[stat]();
      stats[stat] = osStat;
    });

    this.log(stats);
  }

  start() {
    this.emit('start');
  }

  stop() {
    this.emit('stop');
  }
}


module.exports = Ops;
