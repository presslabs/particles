function sortArtboard() {
    var doc = app.activeDocument,
        properties = [],
        i,
        max;

    function copyProperties(source) {
        var props = {},
            key;
        for (key in source) {
            try {
                props[key] = source[key];
            } catch (e) {
            }
        }
        return props;
    }

    function pasteProperties(source, destination) {
        var key;
        for (key in source) {
            destination[key] = source[key];
        }
    }

    function compareName(a, b) {
        var comparison = 0;
        if (a.name > b.name) {
            comparison = 1;
        } else if (a.name < b.name) {
            comparison = -1;
        }
        return comparison;
    }

    for (i = 0, max = doc.artboards.length; i < max; i += 1) {
        properties.push(copyProperties(doc.artboards[i]));
    }

    properties.sort(compareName);

    for (i = 0, max = doc.artboards.length; i < max; i += 1) {
        pasteProperties(properties[i], doc.artboards[i]);
    }

}

sortArtboard();  
