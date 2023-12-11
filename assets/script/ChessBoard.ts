import { _decorator, Component, Node,Vec3 } from 'cc';
import {GridCell} from "./GridCell";
const { ccclass, property } = _decorator;

@ccclass('ChessBoard')
export class ChessBoard extends Component {

    @property
    x:number = 20;

    @property
    y:number = 20;

    gridcell : GridCell[][] = new Array<Array<GridCell>>(this.x)

    start() {
        this.init();
    }

    init(){
        let node:Node = this.node;
        let position:Vec3 = node.position;
        for(let i = 0; i < this.gridcell.length; i++){
            this.gridcell[i] = new Array(this.y)
            for(let j = 0; j < this.gridcell[i].length; j++){
                this.gridcell[i][j] = new GridCell(new Vec3(i+position.x,j + position.y,position.z));
            }
        }
    }

    cell(i:number,j:number):GridCell{
        console.log(typeof this.gridcell[i][j]);
        return this.gridcell[i][j];
    }

    getAdjacent(g: GridCell): GridCell[]{
        let next:GridCell[] = new Array(8);
        let p:Vec3 = g.point;
        if(p.y != 0){
            next[0] = this.gridcell[p.x][p.y-1];
        }
        if(p.x != this.x -1){
            next[1] = this.gridcell[p.x+1][p.y];
        }
        if(p.y != this.y - 1){
            next[2] = this.gridcell[p.x][p.y+1];
        }
        if(p.x != 0){
            next[3] = this.gridcell[p.x-1][p.y];
        }
        if(p.y != 0 && p.x != 0 && (!next[0].isTotalBlock() || !next[3].isTotalBlock())){
            next[4] = this.gridcell[p.x-1][p.y-1];
            if(!next[4].isTotalBlock()){
                next[4].cost = 1.41;
            }
        }
        if(p.y != 0 && p.x != this.x - 1 && (!next[0].isTotalBlock() || !next[1].isTotalBlock())){
            next[5] = this.gridcell[p.x + 1][p.y - 1];
            if(!next[5].isTotalBlock()){
                next[5].cost = 1.41;
            }
        }
        if(p.x != 0 && p.y != this.y - 1 && (!next[3].isTotalBlock() || !next[2].isTotalBlock())){
            next[6] = this.gridcell[p.x - 1][p.y + 1];
            if(!next[6].isTotalBlock()){
                next[6].cost = 1.41;
            }
        }
        if(p.x != this.x - 1 && p.y != this.y - 1 && (!next[1].isTotalBlock() || !next[2].isTotalBlock())){
            next[7] = this.gridcell[p.x + 1][p.y + 1];
            if(!next[7].isTotalBlock()){
                next[7].cost = 1.41;
            }
        }
        return next;
    }

    update(deltaTime: number) {
        
    }
}

