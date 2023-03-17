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

// USAGE EXAMPLE:

function createMaze() {
    const maze = new Maze()
    const room1 = new Room(1)
    const room2 = new Room(2)
    const door = new Door(room1, room2)

    maze.addRoom(room1)
    maze.addRoom(room2)

    room1.setSide(DIRECTION.NORTH, new Wall())
    room1.setSide(DIRECTION.EAST, door)
    room1.setSide(DIRECTION.SOUTH, new Wall())
    room1.setSide(DIRECTION.WEST, new Wall())

    room2.setSide(DIRECTION.NORTH, new Wall())
    room2.setSide(DIRECTION.EAST, new Wall())
    room2.setSide(DIRECTION.SOUTH, new Wall())
    room2.setSide(DIRECTION.WEST, door)

    console.dir(maze, { depth: 5 })
}

createMaze()

module.exports = {
    DIRECTION,
    MapSite,
    Room,
    Wall,
    Door,
    Maze
}