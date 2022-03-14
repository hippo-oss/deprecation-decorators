# deprecation-decorators

DTO decorators with deprecation warnings.

Provides an implementation of a `dto-decorators` flavor that overrides property setters so that deprecated fields
produce system warnings.


## Usage

Decorate a class with `DEPRECATION_DECORATORS` (or any composition thereof):

```ts
import { METADATA_DECORATORS } from '@hippo-oss/deprecation-decorators';

const { IsString } = DEPRECATION_DECORATORS;

class Example {
    @IsString({
        deprecated: true,
        optional: true,
    })
    name?: string;
}
```

At runtime, setting the property `name` will produce a warning:

```sh
(node:3814) DeprecationWarning: Example.name is deprecated.
(Use `node --trace-deprecation ...` to show where the warning was created)
```
