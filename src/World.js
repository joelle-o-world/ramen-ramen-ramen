import { Camera } from "./Camera";

export class World {
  constructor() {
    this.canvas = undefined;
    this.ctx = undefined;

    this.frameRate = 32;
    this.camera = new Camera();

    this.dontClear = false;

    this.clock = 0;
    this.going = false;

    this.things = [];
  }

  setCanvas(canvas) {
    if(typeof canvas == 'string')
      canvas = document.getElementById(canvas);

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  draw() {
    if(this.ctx == undefined)
      throw "Can't draw world because there is no canvas";

      let shouldClear = !this.dontClear || (this.dontClear.constructor == Number && this.clock%this.dontClear == 0)
      if(shouldClear)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      for(let thing of this.things)
        thing.draw();
  }

  tick() {
    ++this.clock;

    if(this.ontick)
      this.ontick();

    this.camera.tick();

    for(var z=0; z<this.things.length && this.going; z++)
      this.things[z].tick();

    this.draw();
  }

  addThing(thing) {
    thing.world = this;
    this.things.push(thing);
  }

  play() {
    this.going = true;
    this.tick(); 
    this.timer = setInterval(function(world) { world.tick(); }, this.frameLength, this)
  }

  stop() {
    this.going = false;
    clearInterval(this.timer);
  }

  get frameLength() {
    return 1000/this.frameRate;
  }
}