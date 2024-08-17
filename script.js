// script.js
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
    }
}
