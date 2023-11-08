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

const battleZonesMap = []
for (let i=0; i< battleZonesData.length; i +=484) {
  battleZonesMap.push(battleZonesData.slice(i, 484 + i))
}
console.log(battleZonesMap)
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

const battleZones = []

battleZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 222894)
        battleZones.push(
        new Boundary({
        position: {
           x:j * Boundary.width + offset.x,
           y:i * Boundary.height + offset.y
        }
       })
      )
    })
})


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
        max: 4,
        hold: 10
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


const movables = [background, ...boundaries, foreground, ...battleZones]

function rectangularCollision({rectangle1, rectangle2}){
    return(
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y 
    )
}

const battle = {
    initiated: false
}

//animation loop
function animate(){
   const animationId = window.requestAnimationFrame(animate)
    //bgimage should be fully loaded before rendering
    background.draw()
    //for bg image to load before character image
    boundaries.forEach(boundary => {
    boundary.draw()
    
   })
   
   battleZones.forEach(battleZones => {
     battleZones.draw()
   } ) 

    player.draw()
    foreground.draw()

     //moving map if player pressed a key and it sets its value to true
     let moving = true
     player.animate = false
    
    
    if (battle.initiated) return
     // activate a battle
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
    for (let i = 0; i < battleZones.length; i++) {
      const battleZone = battleZones[i]
      /*const overlappingArea =
        (Math.min(
          player.position.x + player.width,
          battleZone.position.x + battleZone.width
        ) -
          Math.max(player.position.x, battleZone.position.x)) *
        (Math.min(
          player.position.y + player.height,
          battleZone.position.y + battleZone.height
        ) -
          Math.max(player.position.y, battleZone.position.y))*/
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: battleZone
        }) &&
        /*overlappingArea > (player.width * player.height) / 2 &&*/
        Math.random() < 0.0007
      ) {
        
        window.cancelAnimationFrame(animationId)

        battle.initiated = true
        gsap.to('#overlappingDiv', {
            opacity: 1,
            repeat: 3,
            yoyo: true,
            duration: 0.4,
            onComplete() {
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    duration: 0.4,
                    onComplete(){

                        animateBattle()
                        gsap.to('#overlappingDiv', {
                            opacity: 0,
                            duration: 0.4
                           
                        })
                    }
                })

            }
        })
        break
      }
    }
}
   
     
   
   

    if(keys.w.pressed && lastKey ==='w'){
    player.animate = true
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
        player.animate = true
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
        player.animate = true
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
        player.animate = true
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
//animate()

const battleBackgroundImage = new Image()
battleBackgroundImage.src = 'gameassests/Images/Images/battleBackGround.png'
const battleBackrgound = new Sprite({
    position:{
        x: 0,
        y: 0
    },
    image: battleBackgroundImage
})

const pokemon1Image = new Image()
pokemon1Image.src = 'gameassests/Images/Images/quagsireSprite.png'
const pokemon1 = new Sprite({
    position: {
        x: 900,
        y:180
    },
    image: pokemon1Image,
    frames:{
        max:2,
        hold: 60
    },
    animate: true
})

const pokemon2Image = new Image()
pokemon2Image.src = 'gameassests/Images/Images/venasaurSprite.png'
const pokemon2 = new Sprite({
    position: {
        x:330,
        y:333
    },
    image: pokemon2Image,
    frames:{
        max:2,
        hold: 60
    },
    animate: true
})


function animateBattle(){
    window.requestAnimationFrame(animateBattle)
    battleBackrgound.draw()
    pokemon1.draw()
    pokemon2.draw()
}

animateBattle()
//animate()
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



 