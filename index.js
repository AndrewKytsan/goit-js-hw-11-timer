

const refs = {
  days: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[ data-value="hours"]'),
  mins: document.querySelector('[ data-value="mins"]'),
  secs: document.querySelector('[ data-value="secs"]')
}

class countdownTimer {
  constructor({ targetDate, selector }) {
    this.targetDate = targetDate;
    this.selector = selector;
    this.intervalId = null;
  }


  start() {
    const startTime = this.targetDate;
    this.intervalId = setInterval(() => {
      const curentTime = Date.now();
      const deltaTime = startTime - curentTime;
      const time = this.getTimeComponents(deltaTime);
      this.selector(time)
      
      if (time.days < 0) {
        clearInterval(this.intervalId)
        const time = this.getTimeComponents(0);
        this.selector(time)
      }
    }, 1000)
  }

    getTimeComponents(time) {
      const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
      const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
      const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

      return { days, hours, mins, secs };
    }

    pad(value) {
      return String(value).padStart(2, '0');
    }
  }

  function updateCountDown({ days, hours, mins, secs }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.mins.textContent = mins;
  refs.secs.textContent = secs;
}

const timer = new countdownTimer({
  targetDate: new Date('Oct 14, 2021'),
  selector: updateCountDown
});

timer.start();

