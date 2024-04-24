<script lang="ts">
    import Fieldset from '../ui/Fieldset.svelte';
    import type { TCurrency } from '../../lib/currencies/types';

    // props
    export let selectedCurrency: TCurrency;
    export let currencyCodes: TCurrency[];
    export let onSelect: () => void;

    // handlers
    function closeMenu() {
        menuIsOpen = false;
    }

    function openMenu() {
        menuIsOpen = true;
    }

    function switchMenuStatus() {
        menuIsOpen ? closeMenu() : openMenu();
    }

    function handleDocumentKeydown(event: KeyboardEvent) {
        if (menuIsOpen && event.key === 'Escape') return closeMenu();
    }

    // component functionality
    let filteredCurrencies = currencyCodes;
    let menuIsOpen = false;
    let currencyNameFilter = '';
    let currencyCodeFilter = '';

    function filterItems() {
        filteredCurrencies = currencyCodes.filter((item) => {
            const { code, name } = item;
            const byCode = currencyCodeFilter || code;
            const byName = currencyNameFilter || name;
            return (
                code.toLowerCase().includes(byCode.toLowerCase()) &&
                name.toLowerCase().includes(byName.toLowerCase())
            );
        });
    }

    function setSelectedItem(item: TCurrency) {
        selectedCurrency = item;
        closeMenu();
        onSelect();
    }
</script>

<svelte:document on:keydown={handleDocumentKeydown} />
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="menu" on:mouseenter={() => openMenu()} on:mouseleave={() => closeMenu()}>
    <button
        class="menu__opener button-style bordered"
        class:menuIsOpen
        on:click={() => switchMenuStatus()}
    >
        <div class="icon-with-text">
            <p>[icon]</p>
            <p>{selectedCurrency.code} ( {selectedCurrency.name} )</p>
        </div>
        <p>[icon]</p>
    </button>

    {#if menuIsOpen}
        <div class="menu__popup">
            <div class="filter">
                <Fieldset
                    inputType="text"
                    legend="Код"
                    placeholder="Фильтровать по коду"
                    bind:value={currencyCodeFilter}
                    onInput={filterItems}
                />
                <Fieldset
                    inputType="text"
                    legend="Название"
                    placeholder="Фильтровать по названию"
                    bind:value={currencyNameFilter}
                    onInput={filterItems}
                />
            </div>
            <div class="menu__options bordered">
                {#await filteredCurrencies}
                    <!-- promise is pending -->
                {:then value}
                    <!-- promise was fulfilled -->
                {/await}
                {#each filteredCurrencies as item, index}
                    <button
                        class="option button-style"
                        on:click={() => setSelectedItem(item)}
                    >
                        <div class="option__code icon-with-text">
                            <p>[icon]</p>
                            <p>{item.code}</p>
                        </div>
                        <p class="option__name">{item.name}</p>
                    </button>
                {:else}
                    <div class="menu__empty">
                        <p>No result found</p>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>

<style lang="scss">
    $item-height: 3em;

    .icon-with-text {
        display: flex;
        column-gap: 0.8em;
    }

    .button-style {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: $item-height;
        padding-inline: 1.2em;
        cursor: pointer;
        transition: color 0.3s ease-in;

        * {
            pointer-events: none;
        }

        &:hover {
            color: orange;
        }
    }

    .bordered {
        background-color: $page-bg;
        border: {
            width: 0.1em;
            style: solid;
            color: gray;
            radius: 0.5em;
        }
    }

    .menu {
        display: flex;
        flex-direction: column;
        position: relative;

        &__opener.menuIsOpen {
            z-index: 100;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            border-bottom: 0;
        }

        &__popup {
            z-index: 110;
            position: absolute;
            inset: 0;
            top: $item-height;
        }

        &__options {
            min-height: calc($item-height * 1);
            max-height: calc($item-height * 4);
            overflow-x: scroll;
            border-top: none;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }

        &__empty {
            height: $item-height;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .filter {
        height: $item-height;
        display: flex;
        justify-content: space-between;
        align-items: center;

        & :global(.fieldset) {
            border-radius: 0;

            &:not(:last-child) {
                border-right: none;
            }
        }
    }
</style>
