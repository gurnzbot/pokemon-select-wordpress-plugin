let Gurnzbot = Gurnzbot || {};

Gurnzbot.PokeSelAdmin = (function ($) {
    // const _searchButton = $("#pokesel-search-button");
    const _searchInput = $("#pokesel-search-input");
    const _shortcodeText = $("#shortcode-text");
    const _resultDiv = $("#pokesel-results");
    const _searchLoader = $(".pokesel-search-loader .pokesel-loader");

    const _isSearching = false;

    initializeShortcodeCopy();
    initializeSearch();

    function initializeShortcodeCopy() {
        // Clipboard API can only be used over HTTPS, so bail if it's not!
        if (!window.isSecureContext) {
            return;
        }

        // Style the active copy element
        _shortcodeText.addClass("pokesel-enabled-copy");

        // Handle copy click event
        _shortcodeText.click(async _e => {
            await navigator.clipboard.writeText(_shortcodeText.html());
        });
    }

    function initializeSearch() {
        $(".pokesel-search-form").submit(e => {
            e.preventDefault();
            performSearch();
        });
    }

    function performSearch() {
        const val = _searchInput.val();

        if (!val.length) {
            return;
        }

        _searchLoader.removeClass("pokesel-loader--hidden");
        $(".pokesel-search-form :input, .pokesel-search-form button").attr("disabled", true);

        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${val}/`,
            type: "GET",
            cache: true,
            dataType: "json",
            data: {
                limit: 20,
                offset: 0,
            },
            success: function (data) {
                // No response
                if (!data) {
                    console.log("no data");
                    return;
                }

                let itemHtml = "";

                itemHtml += '<div class="pokesel-pokemon">';
                itemHtml += `<div class="pokesel-pokemon--name">${data.name}</div>`;
                if (data.types.length) {
                    itemHtml += `<ul class="pokesel-pokemon-type-list>`;
                    data.types?.forEach(pokemonType => {
                        itemHtml += `<li class="pokesel-pokemon--type-value">${pokemonType.type.name}</li>`;
                    });
                    itemHtml += `</ul>`;
                }
                itemHtml += `<div class="pokesel-pokemon--image"><img src="${data.sprites?.front_default}" /></div>`;
                itemHtml += "</div>";

                _resultDiv.html(itemHtml);
            },
            error: function (err) {
                // __search_input.parents(".aftra-metabox-field").find(".ajax-msg").html(response);
                console.error(err);
            },
            complete: function () {
                _searchLoader.addClass("pokesel-loader--hidden");
                $(".pokesel-search-form :input, .pokesel-search-form button").attr("disabled", false);
            },
        });
    }
})(jQuery);
