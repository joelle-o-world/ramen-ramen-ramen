import {ThingFrame} from './ThingFrame'

export class Thing {
  constructor() {
    this.world = undefined;

    this.x = 0;
    this.y = 0;

    this._clock = undefined;
    this.frameLength = 5;
    this.frames = [];
  }

  addFrame(frame) {
    if(frame instanceof ThingFrame)
      this.frames.push( frame );
    else
      throw 'Frame must be a ThingFrame instance.'
  }

  draw() {
    let frame = this.currentFrame;
    let x = this.x - frame.pivotX - this.world.camera.x;
    let y = this.y - frame.pivotY - this.world.camera.y;

    if(!frame.crop) {
      if(this.width != undefined && this.height != undefined)
          this.world.ctx.drawImage(
            frame.img, 
            x, y, 
            this.width, this.height
          );
      else
          this.world.ctx.drawImage(frame.img, x, y);
    } else
        this.world.ctx.drawImage(
          frame.img, 
          frame.sx, frame.sy, 
          frame.swidth, frame.sheight, 
          x, y, 
          frame.swidth, frame.sheight
        );
  }

  tick() {
    if(this._clock != undefined)
      ++this._clock;

    if(this.ontick)
      this.ontick();
  }

  get clock() {
    if(this._clock == undefined)
      return this.world.clock;
    else
      return this._clock;
  }

  set clock(t) {
    this._clock = t;
  }

  get currentFrame() {
    return this.frames[
      Math.round(this.clock/this.frameLength)%this.frames.length
    ]
  }

  set animation(animation) {
    if(this.spriteFolder != undefined) {
      if(this.spriteFolder[animation+this.facing] != undefined)
          this.frames = this.spriteFolder[animation+this.facing]
      else if(this.spriteFolder[animation] != undefined)
          this.frames = this.spriteFolder[animation];
    }
  }
}