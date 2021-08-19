class Snake{
    //蛇头
    head:HTMLElement
    // 蛇的身体（包括蛇头）
    // body:HTMLElement
    // 蛇的本身
    own:HTMLElement
    constructor(){
        this.head = document.querySelector('#snake > div')! as HTMLElement;
        this.own = document.getElementById('snake')!;
        // this.body = this.own.getElementsByTagName('div');
    }

    get X(){
        return this.head.offsetLeft;
    }
    get Y(){
        return this.head.offsetTop;
    }
    set X(value:number){
        this.head.style.left = value +'px';
    }
    set Y(value:number){
        this.head.style.top = value +'px';
    }
    // 添加身体
    addBody(){
        this.own.insertAdjacentElement('beforeend',document.createElement(`<div></div>`));
    }
}

export default Snake;