
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
    animate: true,
    isEnemy: true,
    name: 'Quagsire'
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
    animate: true,
    name: 'Venusaur'
})

const renderedSrites = [pokemon1, pokemon2]
function animateBattle(){
    window.requestAnimationFrame(animateBattle)
    battleBackrgound.draw()

    renderedSrites.forEach((sprite)=>{
        sprite.draw()
    })
}

animateBattle()
//animate()
const queue = []

document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (event) => {
       const selectedAttack = attacks[event.currentTarget.innerHTML]
        pokemon2.attack({ attack:selectedAttack,
        recipient: pokemon1, renderedSrites
     })
     queue.push(()=>{
        pokemon1.attack({ attack: attacks.BodySlam,
            recipient: pokemon2, renderedSrites
         })
     })
    })
})

document.querySelector('#dialogueBox').addEventListener('click', (event) => {
    if (queue.length > 0) {
        queue[0]()
        queue.shift()
    } else event.currentTarget.style.display = 'none'
})