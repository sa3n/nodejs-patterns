const DIRECTION = {
    NORTH: 0,
    EAST: 1,
    SOUTH: 2,
    WEST: 3
}

class MapSite {
    constructor() {}
    enter() {}

}

class Room extends MapSite {
    constructor(roomNumber) {
        super()
        this.roomNumber = roomNumber
        this.sides = new Array(4)
    }
    getSide(direction) {}
    setSide(direction, mapSite) {
        this.sides[direction] = mapSite
    }
}

class Wall extends MapSite {
    constructor() {
        super()
    }
}

class Door extends MapSite {
    constructor(room1, room2) {
        super()
        this.isOpen = false
        this.room1 = room1
        this.room2 = room2
    }
    otherSideFrom(room) {

    }
}

class Maze {
    constructor() {
        this.rooms = []
    }
    addRoom(room) {
        this.rooms.push(room)
    }
    roomNumber(roomNumber) {
        for (const room of this.rooms) {
            if (room.roomNumber === roomNumber) {
                return room
            }
        }
        return null
    }  
}

// -----

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