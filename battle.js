
const battleBackgroundImage = new Image()
battleBackgroundImage.src = 'gameassests/Images/Images/battleBackGround.png'
const battleBackrgound = new Sprite({
    position:{
        x: 0,
        y: 0
    },
    image: battleBackgroundImage
})


const pokemon1 = new Monster(monsters.pokemon1)
const pokemon2 = new Monster(monsters.pokemon2)

const renderedSrites = [pokemon1, pokemon2]

pokemon2.attacks.forEach ((attack) => {
    const button = document.createElement('button')
    button.innerHTML = attack.name
    document.querySelector('#attacksBox').append(button)
})

let battleAnimationId

function animateBattle(){
   battleAnimationId =  window.requestAnimationFrame(animateBattle)
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

     if (pokemon1.health <= 0){
        queue.push(()=>{
           pokemon1.faint()
         })
         queue.push(() => {
            gsap.to('#overlappingDiv',{
                opacity: 1,
                onComplete: () => {
                    cancelAnimationFrame(battleAnimationId)
                    animate()
                    gsap.to('#overlappingDiv',{
                        opacity: 0
                    })
                }
            })
         })
     }

     const randomAttack = pokemon1.attacks[Math.floor(Math.random() * pokemon1.attacks.length)]

     queue.push(()=>{
        pokemon1.attack({ attack: randomAttack,
            recipient: pokemon2, renderedSrites
         })
         if (pokemon2.health <= 0){
            queue.push(()=>{
               pokemon2.faint()
             })
             return
         }
     })
     
    })
    button.addEventListener('mouseenter', (event) => {
        const selectedAttack = attacks[event.currentTarget.innerHTML]
       document.querySelector('#attackType').innerHTML = selectedAttack.type
       document.querySelector('#attackType').style.color = selectedAttack.color
    })
})

document.querySelector('#dialogueBox').addEventListener('click', (event) => {
    if (queue.length > 0) {
        queue[0]()
        queue.shift()
    } else event.currentTarget.style.display = 'none'
})