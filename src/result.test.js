const { Result } = require('../dist/result')

test('result can be initialized', () => {
    const result = Result.ok(1)

    expect(result.isOk()).toBe(true)
    expect(result.isError()).toBe(false)

    const resultOfNull = Result.ok(null)
    expect(resultOfNull.isOk()).toBe(true)
    expect(resultOfNull.isError()).toBe(false)

    const resultOfUndefined = Result.error(undefined)
    expect(resultOfUndefined.isOk()).toBe(true)
    expect(resultOfUndefined.isError()).toBe(false)
})