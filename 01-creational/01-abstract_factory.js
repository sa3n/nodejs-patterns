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
        // поиск комнаты по номеру
    }  
}

// -----

class MazeFactory { // Abstract Factory
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
        super()
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
