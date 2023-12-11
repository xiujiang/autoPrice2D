import { _decorator, Component, Node,Vec2 } from 'cc';
import {Role} from "./Role";
const { ccclass, property } = _decorator;

@ccclass('PositionUtil')
export class PositionUtil extends Component {

    static getMinDistinceRole(startRole,enemys):Role{
        let distance = 9999;
        let finalEnemy;
        for (let i = 0; i < enemys.length; i++){
            let enemy = enemys[i];
            let dis = Math.sqrt(Math.pow(enemy.x - startRole.x, 2) + Math.pow(enemy.y - startRole.y, 2));
            distance = dis < distance ? dis : distance;
            if(dis < distance){
                distance = dis;
                finalEnemy = enemy;
            }
        }
        return finalEnemy;
    }


    static getMinDistinceByPosition(startRole,enemys):Vec2{
        let distance = 9999;
        let finalEnemy;
        for (let i = 0; i < enemys.length; i++){
            let enemy = enemys[i];
            let dis = Math.sqrt(Math.pow(enemy.x - startRole.x, 2) + Math.pow(enemy.y - startRole.y, 2));
            distance = dis < distance ? dis : distance;
            if(dis < distance){
                distance = dis;
                finalEnemy = enemy;
            }
        }
        return finalEnemy;
    }
}

