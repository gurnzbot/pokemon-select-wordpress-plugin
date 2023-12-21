let Gurnzbot = Gurnzbot || {};

Gurnzbot.PokeSelAdmin = (function ($) {
    const searchButton = $("#pokesel-search-button");
    const searchInput = $("#pokesel-search-input");
    const shortcodeText = $("#shortcode-text");

    initializeShortcodeCopy();
    initializeSearch();

    function initializeShortcodeCopy() {
        // Clipboard API can only be used over HTTPS, so bail if it's not!
        if (!window.isSecureContext) {
            return;
        }

        // Style the active copy element
        shortcodeText.addClass("pokesel-enabled-copy");

        // Handle copy click event
        shortcodeText.click(async _e => {
            await navigator.clipboard.writeText(shortcodeText.html());
        });
    }

    function initializeSearch() {
        searchButton.click(e => {
            e.preventDefault();
            alert("OK");
        });
    }
})(jQuery);
