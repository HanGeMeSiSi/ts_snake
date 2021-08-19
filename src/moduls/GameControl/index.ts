import ScorePanel from '../ScorePanel/index'
import Food from '../Food/index'
import Snake from '../Snake/index';

class GameControl{
    // 定义三个属性
    snake:Snake;
    food:Food;
    scorePanel:ScorePanel;
    direction:number;
    // 按键规则
    keyRules:Array<number> = [37,38,39,40];

    constructor(){
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();
        this.direction = 38;
        this.init();
    }

    // 游戏初始化
    init(){
        // 给document添加键盘按下事件
        document.addEventListener('keydown',this.keydownHandler.bind(this));
    }

    /** 
     * 创建一个键盘按下的函数
     * ArrowUp  上  keycode -> 38
     * ArrowDown 下         -> 40
     * ArrowLeft 左         -> 37
     * ArrowRight 右        -> 39
     */
    keydownHandler(event:KeyboardEvent){
        // 检查是否按键合法
        if(!this.keyRules.includes(event.keyCode))return;
        this.direction = event.keyCode;
        this.run();
    }

    // 创建一个控制蛇移动的方法
    /**
     * 根据this.direction来使蛇的位置改变
     * 向上 top 减少
     * 向下 top 增加
     * 向左 left 减少
     * 向右 left 增加
     */
    run(){
        // 获取蛇的现在的坐标
        let x =  this.snake.X;
        let y = this.snake.Y;
        switch(this.direction){
            case 37:
                // 左
                x -= 10;
                break;
            case 38:
                // 上
                y -= 10;
                break;
            case 39:
                // 右 
                x += 10;
                break;
            case 40:
                // 下
                y += 10;
                break;
        }
        // 修改蛇的xy
        this.snake.X = x;
        this.snake.Y = y;
    }
}

export default GameControl;

