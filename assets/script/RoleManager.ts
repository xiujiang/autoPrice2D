import { _decorator, Component, Node,instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RoleManager')
export class RoleManager extends Component {

    isShow = false;

    players: Component[];

    enemy:Node;

    startComp:Node;

    end : Node;

    playerX = 0;

    playerY = 0;

    playerZ = 0;

    start() {
        let position = this.node.getPosition();
        console.log("position:"+position.x + "" + position.y +" "+position.z)

        let player = this.node.getChildByName("c1")
        for(let i = 1; i < 5; i++){
            let p = instantiate(player)
            p.setPosition(-this.playerX+ i,this.playerY,this.playerZ);
            this.node.addChild(p);
        }
        // let component = this.node.getChildByName("player")
        // console.log("position is: "+component);
        // component.setPosition(0,1,2);
        // this.node.addChild(component);
        // let enemy = instantiate(component);
        // enemy.setPosition(4,1,-3);
        // this.node.addChild(enemy);
        // this.startComp = component;
        // console.log("parent:"+this.node.getChildByName("player"))
        // let player = this.node.getComponent("player");
        // this.players.push(player)
        // let position = player.node.getPosition();
        // if(this.players.length == 0){
        //     for(let i = 0; i < 5; i++){
        //         let instantiate = player._instantiate();
        //         instantiate.node.setPosition(position.x - 1,position.y-1,position.z);
        //         instantiate.node.active = true;
        //         this.node.addChild(instantiate.node);
        //         this.players.push(instantiate)
        //     }
        // }
    }



    update(deltaTime: number) {
        if(deltaTime.valueOf() % 1000 == 0){
            this.startComp.setPosition(-0.1 + this.startComp.getPosition().x,this.startComp.getPosition().y,this.startComp.getPosition().z)
        }
    }

}

