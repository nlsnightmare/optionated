Simple, opinionated `Option` and `Result` types for typescript.

Example Usage: 
```typescript
const optional = Optional.of("a nice value")

optional.isSome() // true
optional.isNone() // false

optional.get() // "a nice value"

const emptyOptional = Optional.of<string>(null)

emptyOptional.isSome() // false
emptyOptional.isNone() // true

emptyOptional.get() // throws error "accessing empty optional value"

emptyOptional.getOr("default") // "default"
emptyOptional.map((some) => some + " :)", () => "none :(") // "none :("

```