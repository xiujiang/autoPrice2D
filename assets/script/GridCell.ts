import { _decorator, Component, Node,Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GridCell')
export class GridCell extends Component {

    @property
    static startCell:GridCell;

    @property
    static endCells:GridCell[] = new Array();

    @property
    cost:number = 0;

    point:Vec3;

    distFromStart : number = -1;

    used = false;
    static finishedMap = new Map();

    BLOCK:number = Number.MAX_VALUE;




    start() {

    }

    update(deltaTime: number) {
        
    }


    constructor(point:Vec3){
        super();
        this.point = point;
    }

    toString():String{
        return this.point ? this.point.toString() : "()";
    }
    setBlock(){
        this.cost = this.BLOCK;
    }

    static getFinishCell(start:GridCell):GridCell{
        return GridCell.finishedMap.get(start);
    }

    static setFinishedCell(start:GridCell|null,end:GridCell|null){
        GridCell.finishedMap.set(start,end);
    }

    getDistFromStart():number{
        if(GridCell.startCell === this){
            return 0;
        }
        if(this.isTotalBlock()){
            return -1;
        }
        return this.distFromStart;
    }

    isTotalBlock():boolean{
        return this.cost == this.BLOCK;
    }


    addToPathFromStart(distSoFar:number){
        this.used = true;
        if(this.distFromStart == -1){
            this.distFromStart = distSoFar + this.cost;
        }
        if(distSoFar + this.cost < this.distFromStart){
            this.distFromStart = distSoFar + this.cost;
        }
    }
}

