const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')//calling canvas API

//import and render map
canvas.width = 1520
canvas.height= 690


//slicing up the collison array into sub arrays from 1 to 484+i for collison/boundaries
const collisionsMap = []
for (let i=0; i< collisions.length; i +=484) {
  collisionsMap.push(collisions.slice(i, 484 + i))
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
        c.fillStyle= 'rgba(255, 0, 0, 0.0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []
const offset = {
    x: -454,
    y: -1050
}
//looping over
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 222894)
        boundaries.push(
        new Boundary({
        position: {
           x:j * Boundary.width + offset.x,
           y:i * Boundary.height + offset.y
        }
       })
      )
    })
})

console.log(boundaries)

const image = new Image() //image constructor
image.src = 'gameassests/Images/Images/townMap.png'

//player creation
const playerImage = new Image()
playerImage.src = 'gameassests/Images/Images/playerDown.png'

/*image.onload = ()=>{
    //bgimage should be fully loaded before rendering
    c.drawImage(image, -454, -1030)
    //for bg image to load before character image
    c.drawImage(playerImage, 
        0,//represents the x coordinate where we wants to crop
        0,//represents the y coordinate where we wants to crop
        playerImage.width /4,//crop width how mmuch we want to crop 
        playerImage.height,//crop height
        canvas.width / 2 - playerImage.width / 4 / 2,
        canvas.height /2  - playerImage.height/2,
        playerImage.width / 4,//for positioning one more time 
        playerImage.height
    )
}*/

class Sprite {
    constructor({position, velocity, image, frames= { max: 1 } }) {
        this.position = position//created a position
        this.image = image
        this.frames = frames

        this.image.onload = ()=>{
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
            console.log(this.width)
            console.log(this.height)
        }
        
        
    }
    

    draw() {
        c.drawImage(
            this.image, 
            0,//represents the x coordinate where we wants to crop
            0,//represents the y coordinate where we wants to crop
            this.image.width / this.frames.max,//crop width how mmuch we want to crop 
            this.image.height,//crop height
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,//for positioning one more time 
            this.image.height
            )
    }
}  



const player = new Sprite({
    position:{
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height /2  - 68/2,
    },
    image: playerImage,
    frames: {
        max: 4
    }
})

const background = new Sprite({
    position: {
    x:offset.x,
    y:offset.y
},
image: image
})

//setting keys false if there are pressed or not
const keys ={
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}


const movables = [background, ...boundaries]

function rectangularCollision({rectangle1, rectangle2}){
    return(
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y 
    )
}
//animation loop
function animate(){
    window.requestAnimationFrame(animate)
    //bgimage should be fully loaded before rendering
    background.draw()
    //for bg image to load before character image
    boundaries.forEach(boundary => {
    boundary.draw()
    
   })
   
    player.draw()
   
     
   
    //moving map if player pressed a key and it sets its value to true
    let moving = true
    if(keys.w.pressed && lastKey ==='w'){
    for (let i = 0 ; i < boundaries.length; i++){
     const boundary = boundaries[i]
     if(
        rectangularCollision({
            rectangle1: player,
            rectangle2: {
                ...boundary,
                position: {
                   x: boundary.position.x,
                   y:boundary.position.y + 3
            }
            }
         }
        )
      ) 
      
      {
      console.log('coliding')
      moving = false 
      break
    }
     
   }

   if(moving)
    movables.forEach((movables)=>{
     movables.position.y += 4
    })

    }

    else if(keys.a.pressed && lastKey ==='a'){
        for (let i = 0 ; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(
               rectangularCollision({
                   rectangle1: player,
                   rectangle2: {
                       ...boundary,
                       position: {
                          x: boundary.position.x +  4,
                          y:boundary.position.y 
                   }
                   }
                }
               )
             ) 
             
             {
             console.log('coliding')
             moving = false 
             break
           }
            
          }
       
          if(moving)
        movables.forEach((movables)=>{
            movables.position.x += 4
        
        })
    }

    else if(keys.s.pressed && lastKey ==='s'){
        for (let i = 0 ; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(
               rectangularCollision({
                   rectangle1: player,
                   rectangle2: {
                       ...boundary,
                       position: {
                          x: boundary.position.x,
                          y:boundary.position.y - 4
                   }
                   }
                }
               )
             ) 
             
             {
             console.log('coliding')
             moving = false 
             break
           }
            
          }
       
          if(moving)
        movables.forEach((movables)=>{
            movables.position.y -= 4
        
        })
    }
    else if(keys.d.pressed && lastKey ==='d') {
        for (let i = 0 ; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(
               rectangularCollision({
                   rectangle1: player,
                   rectangle2: {
                       ...boundary,
                       position: {
                          x: boundary.position.x -4, 
                          y:boundary.position.y 
                   }
                   }
                }
               )
             ) 
             
             {
             console.log('coliding')
             moving = false 
             break
           }
            
          }
       
          if(moving)
        movables.forEach((movables)=>{
            movables.position.x -= 4
        
        })
    }
    
}
animate()

//move player through map
let lastKey = ''
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
})

//for setting false to a key if keyup so that multiple keys cant be true at a same time
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})



 