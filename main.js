const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')//calling canvas API
//import and render map
canvas.width = 1520
canvas.height= 690

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)//creating canvas rectangle

const image = new Image() //image constructor
image.src = 'gameassests/Images/Images/townMap.png'

//player creation
const playerImage = new Image()
playerImage.src = 'gameassests/Images/Images/playerDown.png'

image.onload = ()=>{
    //bgimage should be fully loaded before rendering
    c.drawImage(image, -700, -1000)
    //for bg image to load before character image
    c.drawImage(playerImage, canvas.width/2-playerImage.width/2, canvas.height/2)
}



 