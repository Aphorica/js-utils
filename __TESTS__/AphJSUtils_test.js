import {KeyCodes, AphJSUtils} from '../index.js'

describe('Test keycodes', ()=> {
  test('RETURN_KEY', ()=> {
    expect(KeyCodes.RETURN_KEY).toBe(13)
  })
})