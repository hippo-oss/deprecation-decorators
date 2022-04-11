import {
    NOOP_DECORATORS,
    BaseOptions,
    DTODecoratorFactories,
    Target,
} from '@hippo-oss/dto-decorators';

/* Defines a property decorator that emits a warning when a property is set.
 *
 * This function is meant to be comparable with `util.deprecate`, which we choose not to use
 * because various online discussions imply that while it  is supported in userland, but will
 * not be maintained.
 */
export function deprecate(
    target: Target,
    propertyKey: string | symbol,
): void {
    let value: unknown;

    function setter(newValue: unknown): void {
        const self = setter as unknown as { called?: boolean };

        if (!self.called) {
            process.emitWarning(
                `${target.constructor.name}.${String(propertyKey)} is deprecated.`,
                {
                    type: 'DeprecationWarning',
                },
            );
            self.called = true;
        }
        value = newValue;
    }

    Object.defineProperty(target, propertyKey, {
        get: () => value,
        set: setter,
    });
}

/* Define a dto decorator factory that warns on deprecation.
 */
export function withDeprecationWarnings<Options extends BaseOptions>(
    options?: Options,
): PropertyDecorator {
    return (
        target: Target,
        propertyKey: string | symbol,
    ): void => {
        if (options?.deprecated) {
            deprecate(target, propertyKey);
        }
    };
}

/* Define a dto decorator factory that saves decorator metadata.
 */
export const DEPRECATION_DECORATORS: DTODecoratorFactories = Object.keys(NOOP_DECORATORS).reduce(
    (acc, name) => ({
        ...acc,
        [name]: withDeprecationWarnings,
    }),
    {} as DTODecoratorFactories,
);

export const {
    IsBoolean,
    IsDate,
    IsDateString,
    IsEnum,
    IsInteger,
    IsNested,
    IsNumber,
    IsString,
    IsUUID,
} = DEPRECATION_DECORATORS;
