<script lang="ts">
    import { get } from 'svelte/store';
    import { currencies } from './components/converter/CurrencyConverter.store';
    import CurrencyConverter from './components/converter/CurrencyConverter.svelte';
</script>

<div class="container">
    {#await get(currencies)}
        ...wait
    {:then currencyCodes}
        <CurrencyConverter {currencyCodes} />
    {/await}
</div>

<style lang="scss">
    .container {
        max-width: 1000px;
        min-height: 100vh;
        margin-inline: max(3em, calc((100vw - 1000px) / 2));
    }
</style>
