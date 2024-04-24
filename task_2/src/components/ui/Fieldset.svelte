<script lang="ts">
    import { logger } from '../../lib/logger';

    // types
    type TInputType = 'text' | 'float' | 'int';
    type TInputRegex = {
        [key in TInputType]: RegExp;
    };

    // props
    export let inputType: TInputType;
    export let placeholder = 'some placeholder';
    export let legend = 'legend';
    export let value: string;
    export let onInput: (inputValue: string) => void;
    export let onSelect: () => void = () => {};
    $: onInput(value);

    // validation
    const InputRegex: TInputRegex = {
        float: /^[\d]?$|^[\d]+[,.]?$|^[\d]+[,.][\d]{1,2}$/g,
        int: /^[\d]*$/g,
        text: /^[a-zA-Z ]*$/g,
    };

    function handleInput() {
        const match = value.match(InputRegex[inputType]);
        if (!match) return (value = value.slice(0, -1));
        if (inputType === 'float') return (value = value.replace(',', '.'));
    }

    // Validate the value passed during the component's time mount.
    if (!value.match(InputRegex[inputType]))
        logger(`Matching ${value} with ${InputRegex[inputType]} failed`);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<fieldset class="fieldset" on:click={onSelect}>
    <legend class="fieldset__legend">{legend}</legend>
    <input class="fieldset__input" {placeholder} bind:value on:input={handleInput} />
</fieldset>

<style lang="scss">
    $focused-color: orange;

    .fieldset {
        height: 100%;
        width: 100%;
        background-color: $page-bg;
        border: {
            width: 0.1em;
            style: solid;
            color: gray;
            radius: 0.5em;
        }
        transition: border-color 0.2s ease-in;

        &:focus-within {
            border-bottom-color: $focused-color;
        }

        &__legend {
            padding-inline: 0.5em;
            height: 0;
            display: flex;
            align-items: center;
            white-space: nowrap;
            margin: auto;
            transition: color 0.2s ease-in;

            *:focus-within > & {
                color: $focused-color;
            }
        }

        &__input {
            width: 100%;
            height: 100%;
            text-align: center;

            &::placeholder {
                font-size: 0.8em;

                *:focus-within > & {
                    opacity: 0;
                }
            }
        }
    }
</style>
