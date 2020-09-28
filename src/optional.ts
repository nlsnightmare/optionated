type None = null
type Some<T> = {
    value: T
}
export class Optional<T> {
    private inner: Some<T> | None

    constructor(value?: T | null | undefined) {
        if (value == null) this.inner = null as None
        else this.inner = { value }
    }

    static of<T>(value?: T): Optional<T> { return new Optional(value) }
    static none<T>() { return new Optional<T>(null) }

    isSome(): boolean { return this.inner !== null }
    isNone(): boolean { return ! this.isSome() }

    get(): T {
        if (this.isNone()) throw new Error('accessing empty optional value')

        return this.inner!.value
    }

    getOrThrow(error: Error): T {
        if (this.isNone()) throw error

        return this.inner!.value
    }

    getOrElse(callback: () => T): T {
        if (this.isSome()) return this.get()

        return callback()
    }

    getOr(def: T): T {
        if (this.inner == null) return def
        return this.inner.value
    }

    andThen(callback: (val: T) => any): Optional<T> {
        if (this.isSome()) callback(this.get())
        
        return this
    }

    map<S>(onSome: (val: T) => S, onNone?: () => S): S {
        if (this.isNone()) return onNone!()

        return onSome(this.inner!.value)
    }

}
