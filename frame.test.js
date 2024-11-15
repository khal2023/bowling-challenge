Frame = require('./frame')

describe('Frame', () => {
    it("validates the first ball if below 10", () => {
        frame = new Frame(6, 7)
        expect(frame.firstBall).toBe(6)
    })
    it('refuses first ball if above 10', () => {
        frame = new Frame(11, 5)
        expect(frame.firstBall).toEqual("You must have made a mistake")
    })
    it('correctly sets strike to true if firstBall is 10', () => {
        frame = new Frame(10, 0)
        expect(frame.isStrike).toBe(true)
    })
    it('validates second ball if total pins for frame below 10', () => {
        frame = new Frame(1, 6)
        expect(frame.secondBall).toBe(6)
    })
    it('validates second ball if total pins for frame exactly 10', () => {
            frame = new Frame(3, 7)
            expect(frame.secondBall).toBe(7)
    })
    it('refuses second ball if total over frame now exceeds 10', () => {
        frame = new Frame(9, 5)
        expect(frame.secondBall).toEqual("You must have made a mistake")
    })
    it('sets spare to true if 10 is reached over the frame', () => {
        frame = new Frame(8, 2)
        expect(frame.isSpare).toBe(true)
    })
    it('correctly calculates the total over the frame', () => {
        frame = new Frame(3, 5)
        expect(frame.getFrameTotal()).toBe(8)
    })
    it("handles an extra ball in the final frame", () => {
        frame = new Frame(10, 3, 5)
        expect(frame.getFrameTotal()).toBe(18)
    })
    it("gives correct score for a perfect final frame", () => {
        frame = new Frame(10, 10, 10)
        expect(frame.getFrameTotal()).toBe(30)
    })
})