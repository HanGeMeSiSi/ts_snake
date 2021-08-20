class Snake{
    //蛇头
    head:HTMLElement
    // 蛇的身体（包括蛇头）
    body:any
    // 蛇的本身
    own:HTMLElement
    constructor(){
        this.head = document.querySelector('#snake > div')! as HTMLElement;
        this.own = document.getElementById('snake')!;
        this.body = this.own.getElementsByTagName('div')
    }

    get X(){
        return this.head.offsetLeft;
    }
    get Y(){
        return this.head.offsetTop;
    }
    set X(value:number){
        if(this.X === value)return;
        // x 的合法范围 0-29之间
        // 蛇撞墙了
        if(value < 0 || value>290){
            throw new Error('蛇撞墙了！');
        };
        // 修改x时。实在修改水平坐标，蛇在左右移动，蛇在向左移动端时候，不准蛇向右掉头 反之
        if(this.body[1] && (this.body[1] as HTMLElement).offsetLeft === value){
            // 如果发生了掉头，让蛇向反方向继续移动

            // if(value > this.X){
            //     // 如果新值 vlaue 大于旧值x，则说明蛇在向右移动，此时发生掉头 ，则使蛇继续向左走
            //     value = this.X - 10 ;
            // }else{
            //     value = this.X + 10 ;
            // }
            value = value>this.X ? this.X-10 : this.X+10;
        }


        this.moveBody();
        this.head.style.left = value +'px';
    }
    set Y(value:number){
        if(this.Y === value)return;
        if(value < 0 || value>290){
            throw new Error('蛇撞墙了！');
        };
        if(this.body[1] && (this.body[1] as HTMLElement).offsetTop === value){
            // 如果发生了掉头，让蛇向反方向继续移动

            // if(value > this.X){
            //     // 如果新值 vlaue 大于旧值x，则说明蛇在向右移动，此时发生掉头 ，则使蛇继续向左走
            //     value = this.X - 10 ;
            // }else{
            //     value = this.X + 10 ;
            // }
            value = value>this.Y ? this.Y-10 : this.Y+10;
        }
        this.moveBody();
        this.head.style.top = value +'px';
    }
    // 添加身体
    addBody(){
        this.own.insertAdjacentElement('beforeend',document.createElement('div'));
    }

    // 蛇身体移动
    moveBody(){
        let body = this.body
        for(let i = body.length-1;i>0;i--){
            let x = (body[i-1] as HTMLElement).offsetLeft;
            let y = (body[i-1] as HTMLElement).offsetTop;
            body[i].style.left = x + 'px';
            body[i].style.top = y + 'px';
        }
    }
}

export default Snake;