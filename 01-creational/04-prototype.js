const { Wall, Room, Maze, Door, DIRECTION } = require('./00-start-code')

// Note: use JS prototypes instead!

function clone(prototypeObj) {
    // Implement own deep copy!
    const copy = JSON.parse(JSON.stringify(prototypeObj))
    Object.setPrototypeOf(copy, prototypeObj)
    return copy
}

class MazePrototypeFactory {
    constructor(maze, wall, room, door) {
        this._prototypeMaze = maze
        this._prototypeWall = wall
        this._prototypeRoom = room
        this._prototypeDoor = door
    }
    makeMaze() {
        return clone(this._prototypeMaze)
    }
    makeRoom(roomNumber) {
        const room = clone(this._prototypeRoom)
        return Object.assign(room, { roomNumber })
    }
    makeWall() {
        return clone(this._prototypeWall)
    }
    makeDoor(room1, room2) {
        const door = clone(this._prototypeDoor)
        return Object.assign(door, { room1, room2 })
    }
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

const simpleMazeFactory = new MazePrototypeFactory(new Maze(), new Wall(), new Room(), new Door())
const bombedMazeFactory = new MazePrototypeFactory(new Maze(), new BombedWall(), new RoomWithABomb(), new Door())

function createMaze(mazeFactory) {
    const maze = mazeFactory.makeMaze()
    const room1 = mazeFactory.makeRoom(101)
    const room2 = mazeFactory.makeRoom(102)
    const door = mazeFactory.makeDoor(room1, room2)

    maze.addRoom(room1)
    maze.addRoom(room2)

    room1.setSide(DIRECTION.NORTH, mazeFactory.makeWall())
    room1.setSide(DIRECTION.EAST, door)
    room1.setSide(DIRECTION.SOUTH, mazeFactory.makeWall())
    room1.setSide(DIRECTION.WEST, mazeFactory.makeWall())

    room2.setSide(DIRECTION.NORTH, mazeFactory.makeWall())
    room2.setSide(DIRECTION.EAST, mazeFactory.makeWall())
    room2.setSide(DIRECTION.SOUTH, mazeFactory.makeWall())
    room2.setSide(DIRECTION.WEST, door)

    console.dir(maze, { depth: 5 })
}

const maze = createMaze(simpleMazeFactory)
const bombedMaze = createMaze(bombedMazeFactory)