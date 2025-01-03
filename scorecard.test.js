Scorecard = require('./scorecard')
Frame = require('./frame')

describe('scorecard', () => {
    
    let scorecard;

    beforeEach(() => {
        scorecard = new Scorecard;
    })

    // it('shows correct frames added to internal list', () => {
    //     scorecard.addFrame(2, 5)
    //     scorecard.addFrame(3, 5)
    //     expect(scorecard.framesPlayed).toEqual([[2, 5], [3, 5]])
        
    // })
    it('Correctly adds the final frame', () => {
        scorecard.addFrame(10, 10, 10)
        expect(scorecard.framesPlayed[0].thirdBall).toBe(10)
    })
    it('Gives the correct total when a basic game is played with no strikes or spares', () => {
        scorecard.addFrame(2, 5)
        scorecard.addFrame(3, 5)
        expect(scorecard.calculateScore()).toBe(15)
    })
    it("Gives correct score when there's a spare in the first frame", () => {
        scorecard.addFrame(5, 5)
        scorecard.addFrame(3, 6)
        expect(scorecard.calculateScore()).toBe(22)
    })
    it("Gives correct total when there's a strike in the first frame", () => {
        scorecard.addFrame(10, 0)
        scorecard.addFrame(3, 5)
        expect(scorecard.calculateScore()).toBe(26)
    })
    it("Gives correct total when a strike is followed by a spare", () => {
        scorecard.addFrame(10, 0)
        scorecard.addFrame(5, 5)
        scorecard.addFrame(3, 6)
        expect(scorecard.calculateScore()).toBe(42)
    })
    it("Gives correct total when there are two strikes in a row", () => {
        scorecard.addFrame(10, 0)
        scorecard.addFrame(10, 0)
        scorecard.addFrame(3, 6)
        expect(scorecard.calculateScore()).toBe(51)
    })
    it('Gives correct score over full game with no strikes', () => {
        for (let i = 0; i < 10; i++) {
            scorecard.addFrame(9, 0)
        }
        expect(scorecard.calculateScore()).toBe(90)
    })
    it('Gives a correct score of for an almost perfect game', () => {
        for (let i = 0; i < 9; i++) {
            scorecard.addFrame(10, 0)
        }
        scorecard.addFrame(3, 2)
        expect(scorecard.calculateScore()).toBe(253)
    })
    it('Gives a score of 300 for a perfect game', () => {
        for (let i = 0; i < 9; i++) {
            scorecard.addFrame(10, 0)
        }
        scorecard.addFrame(10, 10, 10)
        expect(scorecard.calculateScore()).toBe(300)
    })
    it('Gives the correct score for a random game with a strike in the last two frames', () => {
        scorecard.addFrame(3, 5)
        scorecard.addFrame(2, 6)
        scorecard.addFrame(10, 0)
        scorecard.addFrame(8, 1)
        scorecard.addFrame(10, 0)
        scorecard.addFrame(4, 6)
        scorecard.addFrame(7, 2)
        scorecard.addFrame(10, 0)
        scorecard.addFrame(5, 5)
        scorecard.addFrame(10, 7, 3)
        expect(scorecard.calculateScore()).toBe(150)
    })
    it('Gives the correct score for a random game with a strike in the last two frames version 2', () => {
        scorecard.addFrame(3, 5)
        scorecard.addFrame(2, 6)
        scorecard.addFrame(10, 0)
        scorecard.addFrame(8, 1)
        scorecard.addFrame(10, 0)
        scorecard.addFrame(4, 6)
        scorecard.addFrame(7, 2)
        scorecard.addFrame(10, 0)
        scorecard.addFrame(5, 5)
        scorecard.addFrame(3, 7, 10)
        expect(scorecard.calculateScore()).toBe(143)
    })
    it('refuses non integer input', () => {
        expect(() => scorecard.addFrame("x", "y")).toThrow("Integer input only please.")
    })
})
