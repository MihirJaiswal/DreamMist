class Sprite {
    constructor({position, velocity, image, frames= { max: 1, hold: 10  }, sprites, aniamte = false }) {
        this.position = position//created a position
        this.image = image
        this.frames = { ...frames, val: 0, elapsed: 0} 

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.animate =  animate
        this.sprites = sprites
        
    }
    

    draw() {
        c.drawImage(
            this.image, 
            this.frames.val * this.width,//represents the x coordinate where we wants to crop
            0,//represents the y coordinate where we wants to crop
            this.image.width / this.frames.max,//crop width how mmuch we want to crop 
            this.image.height,//crop height
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,//for positioning one more time 
            this.image.height
            )
            if(!this.animate) return
            if(this.frames.max > 1){
                this.frames.elapsed++
            }

            if (this.frames.elapsed % this.frames.hold === 0){
            if(this.frames.val < this.frames.max - 1 ) this.frames.val++
            else this.frames.val = 0 
        }
    }
} 

class Boundary{
    static width = 16.8
    static height = 16.8
    constructor({position}){
        this.position = position
        this.width = 16.8
        this.height = 16.8 
    }

    draw(){ 
        c.fillStyle= 'rgba(255, 0, 0, 0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}