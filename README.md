# ts-architecture-patterns

Zero-dependency TypeScript patterns, strict compile-time utilities, and resilient runtime primitives for production web and backend systems.

---

### Overview

Modern TypeScript engineering requires more than basic interface declarations. At scale, type systems serve as compile-time proofs that eliminate entire classes of runtime exceptions across API boundaries, state machines, and asynchronous workflows.

This repository serves as a modular reference implementation for strict TypeScript system design—enforcing `"noUncheckedIndexedAccess": true` and `"exactOptionalPropertyTypes": true` with zero reliance on `any` or unsafe type assertions.

---

### Architectural Modules

| Module                            | Directory           | Core Engineering Pattern                                                                                                            |
| :-------------------------------- | :------------------ | :---------------------------------------------------------------------------------------------------------------------------------- |
| **Discriminated State & Results** | `src/primitives/`   | Railway-oriented `Result<T, E>` error handling and deterministic `AsyncState<T>` unions that prevent impossible UI/server states.   |
| **Boundary Type Guards**          | `src/narrowing/`    | Defensive runtime narrowing (`is`, `in`, structural predicates) for validating untrusted `unknown` payloads at API/webhook edges.   |
| **Constrained Generics**          | `src/generics/`     | Type-safe `EventBus<TEvents>` and deep property selectors leveraging `keyof` constraints and indexed access types.                  |
| **Mapped & Conditional Types**    | `src/mapped-types/` | Compile-time schema transformations (`DeepReadonly<T>`, `StrictRequired<T>`) for immutable application configuration.               |
| **Polymorphic Adapters (OOP)**    | `src/oop-adapters/` | Abstract contract boundaries and dependency inversion patterns for swappable infrastructure providers (e.g., S3 vs. local storage). |

---

### Engineering Standards Enforced

- **Strict Indexed Access (`noUncheckedIndexedAccess`):** Every dynamic dictionary lookup and array index explicitly accounts for `undefined`, preventing unhandled null-pointer crashes in production.
- **Compile-Time + Runtime Verification:** Tested via **Vitest** using both runtime assertions (`expect`) and static type-level assertions (`expectTypeOf`).
- **Architectural Decision Records (`/docs/adr`):** Short technical memos documenting type-system trade-offs and boundary rules.

---

### Local Verification

```bash
# Install dependencies
npm install

# Run strict tsc compiler verification
npm run typecheck

# Execute unit and type-level test suites
npm test
```
