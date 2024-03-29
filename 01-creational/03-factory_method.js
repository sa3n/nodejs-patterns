const { Wall, Room, Door, Maze, DIRECTION } = require('./00-start-code')

class MazeGame { 
    createMaze() { // Factory Method
        const maze = this.makeMaze()

        const room1 = this.makeRoom(1)
        const room2 = this.makeRoom(2)

        const door = this.makeDoor(room1, room2)

        maze.addRoom(room1)
        maze.addRoom(room2)

        room1.setSide(DIRECTION.NORTH, this.makeWall())
        room1.setSide(DIRECTION.EAST, door)
        room1.setSide(DIRECTION.SOUTH, this.makeWall())
        room1.setSide(DIRECTION.WEST, this.makeWall())

        room2.setSide(DIRECTION.NORTH, this.makeWall())
        room2.setSide(DIRECTION.EAST, this.makeWall())
        room2.setSide(DIRECTION.SOUTH, this.makeWall())
        room2.setSide(DIRECTION.WEST, door)

        return maze
    }
    makeMaze() {
        return new Maze()
    }
    makeRoom(roomNumber) {
        return new Room(roomNumber)
    }
    makeWall() {
        return new Wall()
    }
    makeDoor(room1, room2) {
        return new Door(room1, room2)
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

class BombedMazeGame extends MazeGame {
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

class EnchantedMazeGame extends MazeGame {
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

const mazeGame = new MazeGame()
const bombedMazeGame = new BombedMazeGame()
const enchantedMazeGame = new EnchantedMazeGame()

const maze = mazeGame.createMaze()
const bombedMaze = bombedMazeGame.createMaze()
const enchantedMaze = enchantedMazeGame.createMaze()

console.dir(maze, { depth: 5 })
console.dir(bombedMaze, { depth: 5 })
console.dir(enchantedMaze, { depth: 5 })