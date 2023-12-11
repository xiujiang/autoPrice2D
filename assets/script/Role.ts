import { _decorator, Component, Node,Animation,AnimationState,AnimationClip,Vec2,Vec3 } from 'cc';
const { ccclass, property } = _decorator;
import {PositionUtil} from "./PositionUtil";

@ccclass('Role')
export class Role extends Component {

    //0 角色，1敌人
    enemy:number = 0;
    //0 idle ,1 move,2 attacking, 3 dying
    state:number = 0;

    targetEnemy:Role = null;

    start() {
        this.state = 0
    }
    k = 0;
    update(deltaTime: number) {
       this.changeState()
    }

    changeState(){
        if(this.state == 0){
            this.doIdle()
        }else if(this.state == 1){
            this.doMove()
        }
    }

    doIdle(){
        let animations = this.node.getComponent(Animation);
        let animationState = animations.getState("Idle")
        if(!animationState.isPlaying){
            animationState.wrapMode = AnimationClip.WrapMode.Default
            animationState.play
        }
        if(!animationState.isPlaying){
            this.state = 1;
        }
    }

    doMove(){
        if(this.targetEnemy == null){
            console.log("找不到敌人了")
            this.state = 0;
            return;
        }
        let animations = this.node.getComponent(Animation);
        let animationState = animations.getState("move")
        if(!animationState.isPlaying){
            animations.play("move")
        }
        let calStep = this.calculateNextStep();
        if(calStep){
            this.node.setPosition(new Vec3(calStep.x,calStep.y,0))
        }
    }


    calculateNextStep(){
        let position;
        let top = 280,down = -350,left = -560,right = 560;

        let nextStepArr = [];
        let source = this.node.getPosition();
        let target = this.targetEnemy.node.getPosition();
        let distance = 9999;

        //left
        if(source.x > left){
            nextStepArr[0] = new Vec2(source.x - 1 ,source.y);
        }
        //right
        if(source.x < right){
            nextStepArr[1] = new Vec2(source.x + 1 ,source.y);
        }
        //top
        if(source.y < top){
            nextStepArr[2] = new Vec2(source.x,source.y + 1);
        }
        //down
        if(source.y > down){
            nextStepArr[3] = new Vec2(source.x,source.y - 1);
        }
        //left-top
        if(source.x > left && source.y < top){
            nextStepArr[4] = new Vec2(source.x - 1,source.y + 1);
        }
        //left-down
        if(source.x > left && source.y > down){
            nextStepArr[5] = new Vec2(source.x - 1, source.y - 1)
        }

        //right-top
        if(source.x < right && source.y < top){
            nextStepArr[6] = new Vec2(source.x + 1,source.y + 1);
        }

        //right-down
        if(source.x < right && source.y > down){
            nextStepArr[7] = new Vec2(source.x + 1, source.y - 1)
        }

       return PositionUtil.getMinDistinceByPosition(target,nextStepArr);
    }



}

