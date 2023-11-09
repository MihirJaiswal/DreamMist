class Sprite {
    constructor({
        position,
        velocity, 
        image, 
        frames= { max: 1, hold: 10  }, 
        sprites, 
        animate = false,
        rotation = 0,
        }) {
        this.position = position//created a position
        this.image = image
        this.frames = { ...frames, val: 0, elapsed: 0} 

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.animate =  animate
        this.sprites = sprites
        this.opacity = 1
        this.rotation = rotation
        
    }
    

    draw() {
        c.save()
        c.translate(this.position.x + this.width / 2, this.position.y + this.height /2)
        c.rotate(this.rotation)
        c.translate(-this.position.x - this.width / 2, -this.position.y - this.height /2)
        c.globalAlpha = this.opacity
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
            c.restore()

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
class Monster extends Sprite {
    constructor({
        position,
        velocity, 
        image, 
        frames= { max: 1, hold: 10  }, 
        sprites, 
        animate = false,
        rotation = 0,
        isEnemy = false,
        name,
        attacks
    }) {
        super({
            position,
            velocity, 
            image, 
            frames,
            sprites, 
            animate,
            rotation  
        })
        this.health = 100
        this.isEnemy = isEnemy
        this.name = name
        this.attacks = attacks
    }

    faint() {
        document.querySelector('#dialogueBox').innerHTML = this.name + ' has no energy left for the battle, ' + this.name + 'fainted!' 
        gsap.to(this.position, {
          y: this.position.y + 20
        })
        gsap.to(this, {
          opacity: 0
        })
    }

    attack({attack , recipient}) {
        document.querySelector('#dialogueBox').style.display = 'block'
        document.querySelector('#dialogueBox').innerHTML = this.name + ' used ' + attack.name
        let healthBar = '#enemyHealthBar'
        if(this.isEnemy) healthBar = '#playerHealthBar'

        let rotation = 1
        if(this.isEnemy) rotation = -2.2
        
        recipient.health -= attack.damage

        switch (attack.name){
            case 'SeedBomb':
              const seedbombImage = new Image()
              seedbombImage.src = 'gameassests/Images/Images/seedBomb.png'
              const seedbomb = new Sprite({
                position:{
                    x:this.position.x,
                    y:this.position.y
                },
                image: seedbombImage,

                frames:{
                    max: 4,
                    hold: 10
                },
                animate: true,
                rotation: rotation
              }) 

             //  renderedSrites.push(seedbomb)
               renderedSrites.splice(1,0, seedbomb)

               gsap.to(seedbomb.position, {
                x: recipient.position.x,
                y: recipient.position.y,
                onComplete: () => {
                    gsap.to(healthBar, {
                        width: recipient.health + '%'
                    })
        
                    gsap.to(recipient.position,{
                        x: recipient.position.x + 20,
                        yoyo: true,
                        repeat:5,
                        duration: 0.08
                    })
                    gsap.to(recipient, {
                        opacity: 0,
                        repeat: 5,
                        yoyo:true,
                        duration: 0.1
                    })
                    renderedSrites.splice(1, 1)
                }
               })

              break

            case 'BodySlam':
                const tl = gsap.timeline()
        
        

        let movementDistance = 20
        if(this.isEnemy) movementDistance = -20

          

       tl.to(this.position, {
        x: this.position.x - movementDistance
       }).to(this.position,{
         x: this.position.x + movementDistance * 10,
         duration: 0.1,
         onComplete: () => {

            gsap.to(healthBar, {
                width: recipient.health + '%'
            })

            gsap.to(recipient.position,{
                x: recipient.position.x + 20,
                yoyo: true,
                repeat:5,
                duration: 0.08
            })
            gsap.to(recipient, {
                opacity: 0,
                repeat: 5,
                yoyo:true,
                duration: 0.1
            })
         }
       }).to(this.position,{
        x: this.position.x 
      })
      break
      
      case 'MudShot':
        const MudShotImage = new Image()
        MudShotImage.src = 'gameassests/Images/Images/mudShot.png'
        const MudShot = new Sprite({
          position:{
              x:this.position.x,
              y:this.position.y
          },
          image: MudShotImage,

          frames:{
              max: 2,
              hold: 15
          },
          animate: true,
        }) 

       
         renderedSrites.splice(1,0, MudShot)

         gsap.to(MudShot.position, {
          x: recipient.position.x,
          y: recipient.position.y,
          onComplete: () => {
              gsap.to(healthBar, {
                  width: recipient.health + '%'
              })
  
              gsap.to(recipient.position,{
                  x: recipient.position.x + 20,
                  yoyo: true,
                  repeat:5,
                  duration: 0.08
              })
              gsap.to(recipient, {
                  opacity: 0,
                  repeat: 5,
                  yoyo:true,
                  duration: 0.1
              })
              renderedSrites.splice(1, 1)
          }
         })
         break
   
         case 'SludgeBomb':
            const SludgebombImage = new Image()
            SludgebombImage.src = 'gameassests/Images/Images/sludgeBomb.png'
            const Sludgebomb = new Sprite({
              position:{
                  x:this.position.x,
                  y:this.position.y
              },
              image: SludgebombImage,
    
              frames:{
                  max: 1,
                  hold: 10
              },
              animate: true,
              rotation: rotation
            }) 
    
           
             renderedSrites.splice(1,0, Sludgebomb)
    
             gsap.to(Sludgebomb.position, {
              x: recipient.position.x,
              y: recipient.position.y,
              onComplete: () => {
                  gsap.to(healthBar, {
                      width: recipient.health + '%'
                  })
      
                  gsap.to(recipient.position,{
                      x: recipient.position.x + 20,
                      yoyo: true,
                      repeat:5,
                      duration: 0.08
                  })
                  gsap.to(recipient, {
                      opacity: 0,
                      repeat: 5,
                      yoyo:true,
                      duration: 0.1
                  })
                  renderedSrites.splice(1, 1)
              }
             })
             break

             case 'Surf':
                const SurfImage = new Image()
                SurfImage.src = 'gameassests/Images/Images/surf.png'
                const Surf = new Sprite({
                  position:{
                      x:this.position.x,
                      y:this.position.y
                  },
                  image: SurfImage,
        
                  frames:{
                      max: 1,
                      hold: 15
                  },
                  animate: true,
                }) 
        
               
                 renderedSrites.splice(1,0, Surf)
        
                 gsap.to(Surf.position, {
                  x: recipient.position.x,
                  y: recipient.position.y,
                  onComplete: () => {
                      gsap.to(healthBar, {
                          width: this.health + '%'
                      })
          
                      gsap.to(recipient.position,{
                          x: recipient.position.x + 20,
                          yoyo: true,
                          repeat:5,
                          duration: 0.08
                      })
                      gsap.to(recipient, {
                          opacity: 0,
                          repeat: 5,
                          yoyo:true,
                          duration: 0.1
                      })
                      renderedSrites.splice(1, 1)
                  }
                 })
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