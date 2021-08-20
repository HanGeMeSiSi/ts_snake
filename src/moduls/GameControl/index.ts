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
    // 游戏是否进行中
    isLive:boolean;
    // 定时器
    timer
    // 速度
    speed:number;
    // 多少分加一次速
    addSpeed:number;
    // 每次加速加多少
    addNum:number;
    // 最大速度
    maxSpeed:number;

    constructor(){
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();
        this.direction = 39;
        this.isLive = true;
        this.speed = 300;
        this.addSpeed = 10;
        this.addNum = 10;
        this.maxSpeed = 10;
        this.init();
        this.timer = this.startRun(this.speed);
    }
    //  开始跑步返回定时器
    startRun(speed:number){
        this.timer && clearInterval(this.timer);
        let timer = setInterval(()=>{
            this.run();
        },speed);
        return timer;
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
        if(!this.isLive)return;
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

        // 检查蛇是否吃到食物
        this.checkEat(x,y);
        

        // 修改蛇的xy
        try{
            this.snake.X = x;
            this.snake.Y = y;
        }catch(e){
            console.log(e);
            // 进入catch  说明出现了异常  游戏结束
            this.isLive = false;
            alert('游戏结束！总得分：'+this.scorePanel.score);
        }
    }

    // 定义一个方法，用来检查蛇是否吃到食物
    checkEat(X:number,Y:number):void{
        if(X === this.food.X && Y === this.food.Y){
           this.food.change();
           this.scorePanel.addScore();
           if(this.scorePanel.score !==0 && this.scorePanel.score % this.addSpeed === 0){
                this.speed = (this.speed - this.addNum) <= this.maxSpeed ? this.maxSpeed :(this.speed - this.addNum);
                this.timer = this.startRun(this.speed);
            }
           this.snake.addBody();
        }
    }
}

export default GameControl;

