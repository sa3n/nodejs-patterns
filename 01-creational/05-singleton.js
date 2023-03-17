const MAZESTYLE = 'enchanted'

class MazeFactory {
    static _instance = null
    constructor() {
        if (MazeFactory._instance) {
            throw new Error('Singletone class!')
        }
        MazeFactory._instance = this
    }
    static get instance() {
        if (!MazeFactory._instance) {
            if (MAZESTYLE === 'bombed') {
                MazeFactory._instance = new BombedMazeFactory()
            } else if (MAZESTYLE === 'enchanted') {
                MazeFactory._instance = new EnchantedMazeFactory()
            } else {
                MazeFactory._instance = new MazeFactory()
            }
        }
        return MazeFactory._instance
    }
    //...
}

class BombedMazeFactory extends MazeFactory {
    constructor() {
        super()
    }
    //...
}
class EnchantedMazeFactory extends MazeFactory {
    constructor() {
        super()
    }
    //...
}

const maze1 = MazeFactory.instance
const maze2 = MazeFactory.instance
// new MazeFactory() will throw an Error!
console.log(maze1 === maze2)