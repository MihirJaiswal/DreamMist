
const battleBackgroundImage = new Image()
battleBackgroundImage.src = 'gameassests/Images/Images/battleBackGround.png'
const battleBackrgound = new Sprite({
    position:{
        x: 0,
        y: 0
    },
    image: battleBackgroundImage
})


const pokemon1 = new Sprite(monsters.pokemon1)


const pokemon2 = new Sprite(monsters.pokemon2)

const renderedSrites = [pokemon1, pokemon2]
const button = document.createElement('button')
button.innerHTML = 'SeedBomb'
document.querySelector('#attacksBox').append(button)
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