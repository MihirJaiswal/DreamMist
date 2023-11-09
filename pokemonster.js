const monsters = {
    pokemon2: {
        
            position: {
                x:330,
                y:333
            },
            image: {
                src: 'gameassests/Images/Images/venasaurSprite.png'
            },
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
        image:{
            src: 'gameassests/Images/Images/quagsireSprite.png'
        },
        frames:{
            max:2,
            hold: 60
        },
        animate: true,
        isEnemy: true,
        name: 'Quagsire',
        attacks: [attacks.BodySlam, attacks.MudShot, attacks.SludgeBomb, attacks.Surf]
    }

}