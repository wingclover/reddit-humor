import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { isGIF, gifDuration } from './index'

describe('isGif', () => {
    it('should return the `source` property of input image if input image does not contain gif', () => {
        const pic = {source: 1, variants: {others: 2}}
        expect(isGIF(pic)).to.eql(pic.source)
    })

    it('should return the gif version if input image is a gif', () => {
        const pic= {source: 1, variants:{gif: {source: 2}, others: 3}}
        expect(isGIF(pic)).to.eql(pic.variants.gif.source)
    })
})

describe('gifDuration', () => {
    it('should return the duration of input gif', async () => {
        const gifUrl = 'https://media.giphy.com/media/3oFzmikX9Uh3995dhC/giphy.gif'
        const result = await gifDuration(gifUrl)
        expect(result).to.be.a('number')
    })
})