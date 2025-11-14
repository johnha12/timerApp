class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks){ // constructor calls first each time class is used.
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    if (callbacks) {          // if, is to make callbacks optional
      this.onStart = callbacks.onStart;   // have reference to onStart method
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    this.startButton.addEventListener("click", this.start); //click on the this will be the html element
    this.pauseButton.addEventListener("click",this.pause);
    // value of this inside a class
  }

  start = () => {
    if (this.onStart) {     // if is in case there is no onStart callback
      this.onStart(this.timeRemaining);
    }
    this.tick();
    this.interval = setInterval(this.tick, 20)  //call tick every 1000ms
    
  }

  pause = () => {
    clearInterval(this.interval);
  }
  tick = () => {    // can change value of input to "time's up!"
    if (this.timeRemaining <= 0) {    // pause in case timer is done
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    }
    else{
      this.timeRemaining = this.timeRemaining - 0.02;
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
    
    // getter retrives value of this.timeRemaining
    // setter updates value
  }
  get timeRemaining() {       // now no need to add () in this.timeRemaining()
    return parseFloat(this.durationInput.value);
  }
  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2); 
  }
}