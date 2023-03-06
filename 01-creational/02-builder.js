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

class MazeBuilder {
    buildMaze() {}
    buildRoom(roomNumber) {}
    buildDoor(room1Number, room2Number) {}
    getMaze() {}
}

class StandardMazeBuilder extends MazeBuilder {
    constructor() {
        super()
        this.currentMaze = null
    }
    buildMaze() {
        this.currentMaze = new Maze()
    }
    buildRoom(roomNumber) {
        if (!this.currentMaze.rooms.includes(roomNumber)) {
            const room = new Room(roomNumber)
            this.currentMaze.addRoom(room)
            room.setSide(DIRECTION.NORTH, new Wall())
            room.setSide(DIRECTION.EAST, new Wall())
            room.setSide(DIRECTION.SOUTH, new Wall())
            room.setSide(DIRECTION.WEST, new Wall())
        }
    }
    buildDoor(room1Number, room2Number) {
        const room1 = this.currentMaze.roomNumber(room1Number)
        const room2 = this.currentMaze.roomNumber(room2Number)
        const door = new Door(room1, room2)
        room1.setSide(this.commonWall(room1, room2), door)
        room2.setSide(this.commonWall(room2, room1), door)
    }
    commonWall(room1, room2) {
        // TODO: реализация, возвращающая индекс общей стены в массиве room.sides
    }
    getMaze() {
        return this.currentMaze
    }
}

function createMaze(builder) {
    builder.buildMaze()

    builder.buildRoom(1)
    builder.buildRoom(2)

    builder.buildDoor(1, 2)

    return builder.getMaze()
}

function createComplexMaze(builder) {
    builder.buildMaze()

    builder.buildRoom(1)
    builder.buildRoom(2)
    builder.buildRoom(3)

    builder.buildDoor(1, 2)
    builder.buildDoor(2, 3)

    return builder.getMaze()
}

const standardMazeBuilder = new StandardMazeBuilder()

console.dir(createMaze(standardMazeBuilder), { depth: 4 })
console.dir(createComplexMaze(standardMazeBuilder), { depth: 4 })

