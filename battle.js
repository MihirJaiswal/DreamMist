
const battleBackgroundImage = new Image()
battleBackgroundImage.src = 'gameassests/Images/Images/battleBackGround.png'
const battleBackrgound = new Sprite({
    position:{
        x: 0,
        y: 0
    },
    image: battleBackgroundImage
})


let pokemon1 
let pokemon2 
let renderedSrites 
let battleAnimationId
let queue



function initBattle(){
    document.querySelector('#userInterface').style.display = 'block'
    document.querySelector('#dialogueBox').style.display = 'none'
    document.querySelector('#enemyHealthBar').style.width = '100%'
    document.querySelector('#playerHealthBar').style.width = '100%'
    document.querySelector('#attacksBox').replaceChildren()

    pokemon1 = new Monster(monsters.pokemon1)
    pokemon2 = new Monster(monsters.pokemon2)
    renderedSrites = [pokemon1, pokemon2]
    queue = []


    pokemon2.attacks.forEach ((attack) => {
    const button = document.createElement('button')
    button.innerHTML = attack.name
    document.querySelector('#attacksBox').append(button)
    })

    document.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', (event) => {
           const selectedAttack = attacks[event.currentTarget.innerHTML]
            pokemon2.attack({ attack:selectedAttack,
            recipient: pokemon1, renderedSrites
         }) 
    
         if (pokemon1.health <= 0){
            queue.push(() => {
               pokemon1.faint()
             })
             queue.push(() => {
                gsap.to('#overlappingDiv',{
                    opacity: 1,
                    onComplete: () => {
                        cancelAnimationFrame(battleAnimationId)
                        animate()
                        document.querySelector('#userInterface').style.display = 'none'
                        gsap.to('#overlappingDiv',{
                            opacity: 0
                        })
                        battle.initiated = false
                    }
                })
             })
         }
    
         const randomAttack = pokemon1.attacks[Math.floor(Math.random() * pokemon1.attacks.length)]
    
         queue.push(() => {
            pokemon1.attack({ attack: randomAttack,
                recipient: pokemon2, renderedSrites
             })
             if (pokemon2.health <= 0){
                queue.push(()=>{
                   pokemon2.faint()
                 })
                 queue.push(() => {
                    gsap.to('#overlappingDiv',{
                        opacity: 1,
                        onComplete: () => {
                            cancelAnimationFrame(battleAnimationId)
                            animate()
                            document.querySelector('#userInterface').style.display = 'none'
                            gsap.to('#overlappingDiv',{
                                opacity: 0
                            })
                            battle.initiated = false
                        }
                    })
                 })
             }
         })
         
        })
        button.addEventListener('mouseenter', (event) => {
            const selectedAttack = attacks[event.currentTarget.innerHTML]
           document.querySelector('#attackType').innerHTML = selectedAttack.type
           document.querySelector('#attackType').style.color = selectedAttack.color
        })
    })
}

function animateBattle(){
   battleAnimationId =  window.requestAnimationFrame(animateBattle)
    battleBackrgound.draw()



    renderedSrites.forEach((sprite)=>{
        sprite.draw()
    })
}

initBattle()
animateBattle()
//animate()

document.querySelector('#dialogueBox').addEventListener('click', (event) => {
    if (queue.length > 0) {
        queue[0]()
        queue.shift()
    } else event.currentTarget.style.display = 'none'
})