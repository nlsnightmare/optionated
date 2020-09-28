const { Result } = require('../dist/result')

test('result can be initialized', () => {
    const resultOfOne = Result.ok(1)
    expect(resultOfOne.isOk()).toBe(true)
    expect(resultOfOne.isError()).toBe(false)

    const resultOfNull = Result.ok(null)
    expect(resultOfNull.isOk()).toBe(true)
    expect(resultOfNull.isError()).toBe(false)

    const resultOfUndefined = Result.ok(undefined)
    expect(resultOfUndefined.isOk()).toBe(true)
    expect(resultOfUndefined.isError()).toBe(false)

    const errorOfOne = Result.error(1)
    expect(errorOfOne.isOk()).toBe(false)
    expect(errorOfOne.isError()).toBe(true)

    const errorOfNull = Result.ok(null)
    expect(errorOfNull.isOk()).toBe(true)
    expect(errorOfNull.isError()).toBe(false)

    const errorOfUndefined = Result.ok(undefined)
    expect(errorOfUndefined.isOk()).toBe(true)
    expect(errorOfUndefined.isError()).toBe(false)
})