// Load entries from local storage when the page loads
window.onload = function() {
    loadEntries();
};

function createSubEntry(event, element) {
    if (event.key === 'Enter') {
        event.preventDefault();

        // Create a new sub-bar input
        const subBar = document.createElement('input');
        subBar.type = 'text';
        subBar.className = 'sub-bar';
        subBar.placeholder = 'Enter sub text';

        // Add the sub-bar below the current main-bar
        const entryContainer = element.parentElement;
        entryContainer.appendChild(subBar);

        // Focus the new sub-bar
        subBar.focus();

        // Save the current entries to local storage
        saveEntries();
    }
}

// Save all entries to local storage
function saveEntries() {
    const entryContainers = document.querySelectorAll('.entry-container');
    const data = [];

    entryContainers.forEach(container => {
        const mainBar = container.querySelector('.main-bar');
        const subBars = container.querySelectorAll('.sub-bar');

        const entryData = {
            mainText: mainBar.value,
            subTexts: []
        };

        subBars.forEach(subBar => {
            entryData.subTexts.push(subBar.value);
        });

        data.push(entryData);
    });

    localStorage.setItem('entries', JSON.stringify(data));
}

// Load all entries from local storage
function loadEntries() {
    const storedEntries = JSON.parse(localStorage.getItem('entries'));

    if (storedEntries) {
        storedEntries.forEach(entryData => {
            const entryContainer = document.createElement('div');
            entryContainer.className = 'entry-container';

            const mainBar = document.createElement('input');
            mainBar.type = 'text';
            mainBar.className = 'main-bar';
            mainBar.placeholder = 'Enter main text';
            mainBar.value = entryData.mainText;
            mainBar.onkeypress = function(event) { createSubEntry(event, mainBar); };

            entryContainer.appendChild(mainBar);

            entryData.subTexts.forEach(subText => {
                const subBar = document.createElement('input');
                subBar.type = 'text';
                subBar.className = 'sub-bar';
                subBar.placeholder = 'Enter sub text';
                subBar.value = subText;

                entryContainer.appendChild(subBar);
            });

            document.getElementById('container').appendChild(entryContainer);
        });
    }
}

// Add a new main bar entry only when the user clicks a button
document.getElementById('addMainBar').onclick = function() {
    const entryContainer = document.createElement('div');
    entryContainer.className = 'entry-container';

    const mainBar = document.createElement('input');
    mainBar.type = 'text';
    mainBar.className = 'main-bar';
    mainBar.placeholder = 'Enter main text';
    mainBar.onkeypress = function(event) { createSubEntry(event, mainBar); };

    entryContainer.appendChild(mainBar);
    document.getElementById('container').appendChild(entryContainer);

    // Save after adding a new main bar
    saveEntries();
};

// Clear local storage and reload the page
document.getElementById('clearStorage').onclick = function() {
    localStorage.clear();
    location.reload();
};
