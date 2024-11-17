class Frame {
    constructor(score1, score2, score3 = null) {
        if (score3 != null) {
            this.firstBall = this.validateFinalFrame(score1)
            this.secondBall = this.validateFinalFrame(score2)
            this.thirdBall = this.validateFinalFrame(score3)
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
        if (score1 >= 0 && score1 <=10) {
            return score1
        }
        else {
            throw new Error("Scores must be between 0 and 10 for the first roll")
        }   
        
    }
    validateSecondBall = (score2) => {
        if (score2 > 10 - this.firstBall) throw new Error(`The total across both rolls cannot exceed 10. Current total: ${this.firstBall + score2}`)
        if (score2 < 0) throw new Error("input cannot be negative")
        return score2

    }
    validateFinalFrame = score => {
        if (score >= 0 && score <=10) {
            return score
        }
        else {
            throw new Error("Pins knocked down must be between 0 and 10")
        }
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