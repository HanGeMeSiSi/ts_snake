import './style/index.less'
import GameControl from './moduls/GameControl/index'

let gameControl = new GameControl();
setInterval(()=>{
    console.log(gameControl.direction);
},100)