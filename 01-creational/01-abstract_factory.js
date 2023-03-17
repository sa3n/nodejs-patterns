const { Room, Door, Wall, Maze, DIRECTION } = require('./00-start-code')

class MazeFactory {
    constructor() {}
    makeMaze() {
        return new Maze()
    }
    makeWall() {
        return new Wall()
    }
    makeRoom(roomNumber) {
        return new Room(roomNumber)
    }
    makeDoor(room1, room2) {
        return new Door(room1, room2)
    }
}

class EnchantedRoom extends Room {
    constructor(roomNumber, spellFn) {
        super(roomNumber)
        this.spellFn = spellFn
    }
}

class DoorNeedingSpell extends Door {
    constructor(room1, room2) {
        super(room1, room2)
    }
}

class EnchantedMazeFactory extends MazeFactory {
    constructor() {
        super()
    }
    makeRoom(roomNumber) {
        return new EnchantedRoom(roomNumber, this.castSpell)
    }
    makeDoor(room1, room2) {
        return new DoorNeedingSpell(room1, room2)
    }
    castSpell() {}
}

class BombedWall extends Wall {
    constructor() {
        super()
    }
}

class RoomWithABomb extends Room {
    constructor(roomNumber) {
        super(roomNumber)
    }
}

class BombedMazeFactory extends MazeFactory {
    constructor() {
        super()
    }
    makeWall() {
        return new BombedWall()
    }
    makeRoom(roomNumber) {
        return new RoomWithABomb(roomNumber)
    }
}

function createMaze(factory) {
    const maze = factory.makeMaze()
    const room1 = factory.makeRoom(1)
    const room2 = factory.makeRoom(2)
    const door = factory.makeDoor(room1, room2)

    maze.addRoom(room1)
    maze.addRoom(room2)

    room1.setSide(DIRECTION.NORTH, factory.makeWall())
    room1.setSide(DIRECTION.EAST, door)
    room1.setSide(DIRECTION.SOUTH, factory.makeWall())
    room1.setSide(DIRECTION.WEST, factory.makeWall())

    room2.setSide(DIRECTION.NORTH, factory.makeWall())
    room2.setSide(DIRECTION.EAST, factory.makeWall())
    room2.setSide(DIRECTION.SOUTH, factory.makeWall())
    room2.setSide(DIRECTION.WEST, door)

    console.dir(maze, { depth: 5 })
}

createMaze(new MazeFactory())
createMaze(new EnchantedMazeFactory())
createMaze(new BombedMazeFactory())
