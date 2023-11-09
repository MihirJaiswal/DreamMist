const pokemon2Image = new Image()
pokemon2Image.src = 'gameassests/Images/Images/venasaurSprite.png'

const pokemon1Image = new Image()
pokemon1Image.src = 'gameassests/Images/Images/quagsireSprite.png'

const monsters = {
    pokemon2: {
        
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
            name: 'Venusaur',
            attacks: [attacks.BodySlam , attacks.SeedBomb, attacks.MudShot, attacks.SludgeBomb]
        
    },

    pokemon1: {
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
        name: 'Quagsire',
        attacks: [attacks.Surf, attacks.MudShot, attacks.SludgeBomb, attacks.Surf]
    }

}