import { DEPRECATION_DECORATORS } from '../decorators';

describe('warnIfDeprecated', () => {
    it('produces new decorator factories', () => {
        const spy = jest.spyOn(process, 'emitWarning');

        const { IsString } = DEPRECATION_DECORATORS;

        class Example {
            @IsString({
                deprecated: true,
            })
            foo!: string;

            @IsString({
            })
            bar!: string;

            @IsString({
                deprecated: true,
            })
            baz!: string;
        }

        const example = new Example();
        example.foo = 'warning expected';
        example.foo = 'no warning expected';
        example.bar = 'no warning expected';
        example.baz = 'warning expected';

        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenCalledWith('Example.foo is deprecated.', {
            type: 'DeprecationWarning',
        });
        expect(spy).toHaveBeenCalledWith('Example.baz is deprecated.', {
            type: 'DeprecationWarning',
        });
    });
});
