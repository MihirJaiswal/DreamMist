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

const foregroundImage = new Image()
foregroundImage.src = 'gameassests/Images/Images/foreGroundObject.png'

//player creation
const playerImage = new Image()
playerImage.src = 'gameassests/Images/Images/playerDown.png'

const playerUpImage = new Image()
playerUpImage.src = 'gameassests/Images/Images/playerUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = 'gameassests/Images/Images/playerLeft.png'

const playerRightImage = new Image()
playerRightImage.src = 'gameassests/Images/Images/playerRight.png'


const player = new Sprite({
    position:{
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height /2  - 68/2,
    },
    image: playerImage,
    frames: {
        max: 4
    },
    sprites : {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerImage

    }
})

const background = new Sprite({
    position: {
    x:offset.x,
    y:offset.y
},
image: image
})

//foreGroundObjects
const foreground = new Sprite({ 
    position: {
    x:offset.x,
    y:offset.y
},
image: foregroundImage
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


const movables = [background, ...boundaries, foreground]

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
    foreground.draw()
    
   
     
   
    //moving map if player pressed a key and it sets its value to true
    let moving = true
    player.moving = false

    if(keys.w.pressed && lastKey ==='w'){
    player.moving = true
    player.image = player.sprites.up
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
        player.moving = true
        player.image = player.sprites.left
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
        player.moving = true
        player.image = player.sprites.down
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
        player.moving = true
        player.image = player.sprites.right
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



 