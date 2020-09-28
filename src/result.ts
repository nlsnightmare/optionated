import { Optional } from "./optional"

export class Result<T, S> {
    private constructor(
        private error: T,
        private value: S,
        private ok: boolean
    ) { }

    static ok<T, S>(value: S): Result<T, S> { return new Result<T, S>(null, value, true) }
    static error<T, S>(error: T): Result<T, S> { return new Result<T, S>(error, null, false) }

    isOk(): boolean { return this.ok }
    isError(): boolean { return ! this.isOk() }

    map<V>(onError: (arg: T) => V, onOk: (arg: S) => V): V {
        return this.isOk() ? onOk(this.value) : onError(this.error)
    }

    andThen<V>(callback: (arg: S) => V): Result<T, S> {
        if (this.isOk()) callback(this.value)

        return this
    }

    asOption(): Optional<S> {
        return Optional.of<S>(this.value)
    }
}