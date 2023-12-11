import { _decorator, Component, Node,utils,Prefab,instantiate,loader,error,log,director,UITransform,Animation,Vec2} from 'cc';
import {ChessBoard} from "./ChessBoard";
import {RoleManager} from "./RoleManager";
import {Role} from "./Role"
import {PositionUtil} from "./PositionUtil"
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    @property({type: Prefab})
    P1:Prefab;

    @property({type: Prefab})
    P2:Prefab;

    @property
    aa:number;

    player1Arr = [];
    player2Arr = [];

    load(){

    }
    start() {
        console.log("create Player")
        console.log("P2:",this.P1,this.P2)
        let step = 120;
        let CanvasNode = director.getScene().getChildByName("Canvas");
        let leftPos= new Vec2(-640,-360)
        let rightPos = new Vec2(640,-360)

        for(let i = 1; i <= 4; i++){
            for(let j = 1; j <= 5; j++){
                const pl1 = instantiate(this.P1)
                pl1.parent = CanvasNode
                this.player1Arr.push(pl1)
                let component = pl1.getComponent(Role);
                console.log("comp:",component)
                pl1.setPosition(leftPos.x + i * step,leftPos.y + j * step)
            }
        }

        for(let i = 1; i <= 4; i++){
            for(let j = 1; j <= 5; j++){
                const pl2 = instantiate(this.P2);
                this.player2Arr.push(pl2)
                pl2.setRotationFromEuler(0,180,0);
                pl2.parent = CanvasNode
                let component = pl2.getComponent(Role);
                console.log("comp:",component)
                component.enemy = 1;
                pl2.setPosition(rightPos.x - i * step,rightPos.y + j * step)
            }
        }

        this.setTargetEnemy();
    }

    update(deltaTime: number) {
        this.setTargetEnemy();
    }

    setTargetEnemy(){
        for(let i = 0; i < this.player1Arr.length; i++){
            let player1ArrElement = this.player1Arr[i];
            let minDistinceRole = PositionUtil.getMinDistinceRole(player1ArrElement,this.player2Arr);
            player1ArrElement.targetEnemy = minDistinceRole;
        }
        for(let i = 0; i < this.player2Arr.length; i++){
            let player2ArrElement = this.player2Arr[i];
            let minDistinceRole = PositionUtil.getMinDistinceRole(player2ArrElement,this.player1Arr);
            player2ArrElement.targetEnemy = minDistinceRole;
        }
    }


}

