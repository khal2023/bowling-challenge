class Frame {
    constructor(score1, score2, score3 = null) {
        if (score3 != null) {
            this.firstBall = score1 <= 10 ? score1: "Error"
            this.secondBall = score2 <= 10 ? score2: "Error"
            this.thirdBall = score3 <= 10 ? score3: "Error"
        }
        else {
            this.firstBall = this.validateFirstBall(score1)
            this.secondBall = this.validateSecondBall(score2)
            this.thirdBall = null
        }
        this.isStrike = this.getStrike()
        this.isSpare = this.getSpare()
    }
    validateFirstBall = (score1) => {
        return score1 <= 10 ? score1: "You must have made a mistake"
    }
    validateSecondBall = (score2) => {
        return score2 <= 10 - this.firstBall ? score2: "You must have made a mistake"
    }
    getStrike = () => {
        if (this.thirdBall != null){
            return this.firstBall === 10 || this.secondBall === 10
        }
        return this.firstBall === 10;
    }
    getSpare = () => {
        return this.firstBall + this.secondBall === 10 && !this.isStrike;
    }
    getFrameTotal = () => {
        return this.thirdBall == null ? this.firstBall + this.secondBall:
        this.firstBall + this.secondBall + this.thirdBall
    }
}

module.exports = Frame