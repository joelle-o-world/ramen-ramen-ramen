export class ThingFrame {
  constructor(img) {
    if(img == undefined)
      throw 'ThingFrame: image must not be undefined.';

    this.img = img;

    this.pivotX = 0;
    this.pivotY = 0;

    this.crop = false;
    this.sx = undefined;
    this.sy = undefined;
    this.swidth = undefined;
    this.sheight = undefined;
  }

  setCrop(sx, sy, swidth, sheight) {
    this.crop = true;
    this.sx = sx;
    this.sy = sy;
    this.swidth = swidth;
    this.sheight = sheight;
    
    return this;
}
}