// const epoch = Date.UTC(2025)
// console.log(epoch) // 1735689600000

class SnowFlake {
    constructor({ workId = 1, clusterId = 1, epoch = 1735689600000 } = {}) {
        // this.signBits = 1
        this.timeInMillisecondsBits = 41
        this.workIdBits = 5
        this.clusterIdBits = 5
        this.sequenceBits = 12

        this.maxWorkId = (1 << this.workIdBits) - 1
        this.maxclusterId = (1 << this.clusterIdBits) - 1
        this.maxSequence = (1 << this.sequenceBits) - 1

        if (workId < 1 || workId > this.maxWorkId) {
            throw new Error(`WorkId must between 1n and ${this.maxWorkId}`)
        }
        if (clusterId < 1 || clusterId > this.maxclusterId) {
            throw new Error(`ClusterId must between 1n and ${this.maxclusterId}`)
        }

        this.timePartLeftShifts = this.clusterIdBits + this.workIdBits + this.sequenceBits
        this.clusterIdLeftShifts = this.workIdBits + this.sequenceBits
        this.workIdLeftShifts = this.sequenceBits

        this.workId = workId
        this.clusterId = clusterId
        this.epoch = epoch

        this.sequence = 0
        this.lastTimeStamp = -1
    }

    timeGenerator() {
        return Date.now()
    }

    nextMilliseconds(lastTimeStamp) {
        let currentTime = this.timeGenerator()
        // block/wait until next milliseconds
        while (currentTime <= lastTimeStamp) {
            currentTime = this.timeGenerator()
        }

        return currentTime
    }

    nextId() {
        let currentTimeStamp = this.timeGenerator()

        if (currentTimeStamp < this.lastTimeStamp) {
            throw new Error("clock moved backwards")
        }

        if (currentTimeStamp === this.lastTimeStamp) {
            // same milliseconds
            this.sequence = (this.sequence + 1) & this.maxSequence
            if (this.sequence === 0) {
                // sequence overflow in the same ms -> wait next ms
                currentTimeStamp = this.nextMilliseconds(this.lastTimeStamp)
            }
        } else {
            // new milliseconds, resetting sequence , start form 1
            this.sequence = 1
        }

        this.lastTimeStamp = currentTimeStamp

        // compose an id
        const timePart = (BigInt(currentTimeStamp) - BigInt(this.epoch)) << BigInt(this.timePartLeftShifts)
        const clusterIdPart = BigInt(this.clusterId) << BigInt(this.clusterIdLeftShifts)
        const workIdPart = BigInt(this.workId) << BigInt(this.workIdLeftShifts)

        const id = timePart | clusterIdPart | workIdPart | BigInt(this.sequence)
        return id.toString()
    }

    idDecode(id) {
        id = BigInt(id)

        const sequence = parseInt(((1n << BigInt(this.sequenceBits)) - 1n) & id)
        const machineId = parseInt(((1n << BigInt(this.workIdBits)) - 1n) & (id >> BigInt(this.sequenceBits)))
        const clusterId = parseInt(((1n << BigInt(this.clusterIdBits)) - 1n) & (id >> BigInt(this.clusterIdLeftShifts)))
        let time = ((1n << BigInt(this.timeInMillisecondsBits)) - 1n) & (id >> BigInt(this.timePartLeftShifts))
        time = time.toString()
        time = parseInt(time)
        time = time + this.epoch
        time = new Date(time).toString()

        return {
            sequence,
            machineId,
            clusterId,
            time,
        }
    }
}

const snowFlake = new SnowFlake();
console.log(snowFlake.nextId())
console.log(snowFlake.nextId())
console.log(snowFlake.nextId())
console.log(snowFlake.idDecode(snowFlake.nextId()))