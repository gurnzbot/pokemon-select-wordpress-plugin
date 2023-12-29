<h1>Pokemon Selector</h1>

<div class="pokesel-description-text">
    Select some of your favourite Pokemon and display them by placing
    <code id="shortcode-text">[pokeselect]</code> on a page!
</div>

<form class="pokesel-search-form">
    <div class="pokesel-search-input-wrapper">
        <input type="text" id="pokesel-search-input" name="pokesel-search-input" placeholder="Search Pokemon..." autofocus />

        <div class="pokesel-search-loader">
            <span aria-label="Loading" aria-live="polite" role="alert" class="pokesel-loader pokesel-loader--hidden">
                <svg class="pokesel-loader-circle" viewBox="25 25 50 50">
                    <circle class="pokesel-loader-path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miter-limit="10" />
                </svg>
            </span>
        </div>
    </div>
    <button type="submit" id="pokesel-search-button"><i></i>Find!</button>
</form>

<div id="pokesel-results"></div>