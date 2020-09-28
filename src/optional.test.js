const { Optional } = require('../dist/optional')

test('optional is none only on none and undefined', () => {
    expect(Optional.of(null).isSome()).toBe(false)
    expect(Optional.of(undefined).isSome()).toBe(false)

    // falsy types
    expect(Optional.of(0).isSome()).toBe(true)
    expect(Optional.of({}).isSome()).toBe(true)
    expect(Optional.of([]).isSome()).toBe(true)
})

test('optional gets initialized correctly', () => {
    const emptyOption = Optional.of(undefined)

    expect(emptyOption.isSome()).toBe(false)
    expect(emptyOption.isNone()).toBe(true)

    const someOption = Optional.of(0)

    expect(someOption.isSome()).toBe(true)
    expect(someOption.isNone()).toBe(false)
})

test('optional value can be accessed safely', () => {
    expect(() => Optional.of(null).get()).toThrowError('accessing empty optional value')
    expect(Optional.of(123).get()).toBe(123)
})

test('optional getOr returns the correct value', () => {
    expect(Optional.of(null).getOr(123)).toEqual(123)
    expect(Optional.of("hello").getOr("world")).toEqual("hello")
})

test('optional getOrElse returns the correct value', () => {
    expect(Optional.of(null).getOrElse(() => 123)).toEqual(123)
    expect(Optional.of("hello").getOrElse(() => "world")).toEqual("hello")
})

test('optional getOrThrow throws the correct error', () => {
    expect(() => Optional.of(null).getOrThrow(new Error('empty'))).toThrowError('empty')
    expect(Optional.of('not empty').getOrThrow(new Error('empty'))).toEqual('not empty')
})

test('optional andThen executes correctly', () => {
    let variable = 1;
    Optional.of(null).andThen(value => variable += value)

    expect(variable).toBe(1)

    Optional.of(9)
        .andThen(value => variable += value)
        .andThen(value => variable += value)

    expect(variable).toBe(19)
})

test('optional map works as intended', () => {
    expect(Optional.of(null).map(
        _value => 'on some',
        ()     => 'on none'
    )).toBe('on none')

    expect(Optional.of(0).map(
        _value => 'on some',
        ()     => 'on none'
    )).toBe('on some')

})