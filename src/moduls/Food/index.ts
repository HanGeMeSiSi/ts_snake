// 定义食物类
class Food{
    // 定义一个属性表示食物所对应的元素
    element:HTMLElement;
    constructor (){
        // ! 表示不可能为空
        this.element = document.getElementById('food')!;
    }
    // 定义食物的X轴的方法
    get X(){
        return this.element.offsetLeft;
    }
    get Y(){
        return this.element.offsetTop;
    }
    // 修改食物的位置
    change(left?:number,top?:number):void{
        // 生成一个随机位置
        // 食物的最小位置是0最大是290
        // 蛇移动一次就是一格，一格的大小就是10，所以要求食物的坐标必须是整10
        top = top??Math.round(Math.random() * 29) * 10; 
        left = left??Math.round(Math.random() * 29) * 10; 
        this.element.style.left = left+'px';
        this.element.style.top = top+'px';
    }
}
export default Food;