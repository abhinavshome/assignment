/**
 * Action triggered, when the user clicks on a search functionality,
 * that is linked with a text input box.
 *
 * @method onSearch
 * @public
 */
Spotify.UI.SearchBox.onSearch = function() {

    // We can get directly the search term from the input text or
    // from the url hash.
    // e.g https://what-can-possibly-go-wrong/#text-to-search
    var searchTerm = document.getElementById('search-text').value;
    if (searchTerm === '') {
        searchTerm = window.location.hash.substr(1);
    }

    Spotify.Ajax.call('./api/search-music.json?' + searchTerm).onCompleted(function(result) {
        var searchTitle = document.querySelector('.search-results-title');
        searchTitle.innerHTML = 'Search results for ' + searchTerm;
        Spotify.UI.SearchBox.renderResults(result);
    });

};

/**
 * The problem in the above code snippet seems to be of ajax race condition. If we make 2 searches in quick succession and the first one take much longer than
 * the second one, we might land up in a situation where the results of the second search are actually for the first search.
 * 
 * A possible solution could be -
 */

/**
 * Action triggered, when the user clicks on a search functionality,
 * that is linked with a text input box.
 *
 * @method onSearch
 * @public
 */
Spotify.UI.SearchBox.onSearch = function() {

    // We can get directly the search term from the input text or
    // from the url hash.
    // e.g https://what-can-possibly-go-wrong/#text-to-search
    var searchTerm = document.getElementById('search-text').value;
    if (searchTerm === '') {
        searchTerm = window.location.hash.substr(1);
    }
    
    //store the last search made
    Spotify.UI.SearchBox.setLastSearchItem(searchTerm);

    Spotify.Ajax.call('./api/search-music.json?' + searchTerm).onCompleted(function(result) {
        if (Spotify.UI.SearchBox.getLastSearchItem() === searchTerm) {
            var searchTitle = document.querySelector('.search-results-title');
            searchTitle.innerHTML = 'Search results for ' + searchTerm;
            Spotify.UI.SearchBox.renderResults(result);
        }
    });

};
