<script lang="ts">
    import Menu from '../menu/Menu.svelte';
    import Fieldset from '../ui/Fieldset.svelte';
    import { codeFormat, getConversionRate } from '../../lib/currencies/core';
    import type { TCurrency } from '../../lib/currencies/types';

    export let currencyCodes: TCurrency[];
    let fromAmount = '';
    let toAmount = '';
    let fromCode = codeFormat('usd');
    let toCode = codeFormat('rub');
    let fromCurrency = currencyCodes.filter((currency) => currency.code === fromCode)[0];
    let toCurrency = currencyCodes.filter((currency) => currency.code === toCode)[0];
    let currentRate = getConversionRate(fromCurrency.code, toCurrency.code);

    let convertDirection: 'normal' | 'reversed' = 'normal';
    let fromLegendText = 'У меня есть';
    let toLegendText = 'Я получу';

    async function getConvertedValue() {
        if (fromCode !== fromCurrency.code || toCode !== toCurrency.code) {
            currentRate = getConversionRate(fromCurrency.code, toCurrency.code);
            [fromCode, toCode] = [fromCurrency.code, toCurrency.code];
        }

        const rate = await currentRate;

        const convert = (value: string, coefficient: number) => {
            if (!value) return '';
            return (parseFloat(value) * coefficient).toFixed(2);
        };

        switch (convertDirection) {
            case 'normal':
                toAmount = convert(fromAmount, rate.rate);
                break;
            case 'reversed':
                fromAmount = convert(toAmount, 1 / rate.rate);
                break;
        }
    }
</script>

<div class="calculator">
    <div class="calculator__section">
        <Fieldset
            inputType="float"
            legend={convertDirection === 'normal' ? fromLegendText : toLegendText}
            placeholder="Введите сумму"
            bind:value={fromAmount}
            onInput={getConvertedValue}
            onSelect={() => (convertDirection = 'normal')}
        />
        <Menu
            {currencyCodes}
            bind:selectedCurrency={fromCurrency}
            onSelect={getConvertedValue}
        />
    </div>
    <div class="calculator__section">
        <Fieldset
            inputType="float"
            legend={convertDirection === 'normal' ? toLegendText : fromLegendText}
            placeholder="Введите сумму"
            bind:value={toAmount}
            onInput={getConvertedValue}
            onSelect={() => (convertDirection = 'reversed')}
        />
        <Menu
            {currencyCodes}
            bind:selectedCurrency={toCurrency}
            onSelect={getConvertedValue}
        />
    </div>
</div>

<style lang="scss">
    .calculator {
        font-size: 2rem;
        display: flex;
        flex-direction: column;
        row-gap: 1em;
        padding-block: 1em;

        &__section {
            display: grid;
            grid-template-columns: 15em auto;
            column-gap: 1em;
        }
    }
</style>
