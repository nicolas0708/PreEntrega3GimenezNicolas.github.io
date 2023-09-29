let flavors = JSON.parse(localStorage.getItem('flavors')) || [];
let menuFlavors = [];

function addFlavor() {
    const flavorInput = document.getElementById('taskInput');
    const flavorText = flavorInput.value.trim();

    if (flavorText !== '') {
        const flavor = { text: flavorText, completed: false };
        flavors.push(flavor);
        saveFlavors();
        displayFlavors();
        flavorInput.value = '';
    }
}

function displayFlavors() {
    const flavorList = document.getElementById('taskList');
    flavorList.innerHTML = '';

    flavors.forEach((flavor, index) => {
        const li = document.createElement('li');
        li.textContent = flavor.text;

        if (flavor.completed) {
            li.classList.add('complete');
        }

        const emoji = document.createElement('span');
        emoji.textContent = '🍨';
        emoji.classList.add('emoji');

        li.appendChild(emoji);

        const button = document.createElement('button');
        button.textContent = 'Eliminar';
        button.addEventListener('click', () => deleteFlavor(index));

        li.appendChild(button);

        flavorList.appendChild(li);
    });
}

function toggleComplete(index) {
    flavors[index].completed = !flavors[index].completed;
    saveFlavors();
    displayFlavors();
}

function deleteFlavor(index) {
    flavors.splice(index, 1);
    saveFlavors();
    displayFlavors();
}

function clearCompletedFlavors() {
    flavors = flavors.filter(flavor => !flavor.completed);
    saveFlavors();
    displayFlavors();
}

function generateRandomFlavor() {
    const randomFlavors = ['Fresa', 'Vainilla', 'Chocolate', 'Menta', 'Mango', 'Nuez', 'Turrón', 'Café', 'Coco', 'Frutos del Bosque', 'Maní'];
    const randomIndex = Math.floor(Math.random() * randomFlavors.length);
    const randomFlavor = randomFlavors[randomIndex];

    const flavor = { text: randomFlavor, completed: false };
    flavors.push(flavor);
    saveFlavors();
    displayFlavors();
}

function clearAllFlavors() {
    flavors = [];
    saveFlavors();
    displayFlavors();
}

function saveFlavors() {
    localStorage.setItem('flavors', JSON.stringify(flavors));
}

function showMenu() {
    const menuContainer = document.getElementById('menuContainer');
    menuContainer.style.display = 'block';
    generateMenu();
}

function hideMenu() {
    const menuContainer = document.getElementById('menuContainer');
    menuContainer.style.display = 'none';
}

function handleMenuAction(action) {
    switch (action) {
        case 'agregar':
            addFlavor();
            break;
        case 'limpiar':
            clearAllFlavors();
            break;
        case 'generar':
            generateRandomFlavor();
            break;
        case 'limpiarCompletados':
            clearCompletedFlavors();
            break;
        default:
            console.log('Acción no válida');
    }
}

function generateMenu() {
    const menuList = document.getElementById('menuList');
    menuList.innerHTML = '';

    const availableFlavors = [...menuFlavors]; // Copiamos los sabores disponibles

    // Agregamos 10 sabores aleatorios al menú
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * availableFlavors.length);

        if (availableFlavors.length > 0) {
            const randomFlavor = availableFlavors.splice(randomIndex, 1)[0];

            const li = document.createElement('li');
            li.textContent = randomFlavor.text;
            
            menuList.appendChild(li);
        }
    }
}

// Llenamos la lista de sabores disponibles
menuFlavors = [
    { text: 'Fresa', completed: false },
    { text: 'Vainilla', completed: false },
    { text: 'Chocolate', completed: false },
    { text: 'Menta', completed: false },
    { text: 'Mango', completed: false },
    { text: 'Nuez', completed: false },
    { text: 'Turrón', completed: false },
    { text: 'Café', completed: false },
    { text: 'Coco', completed: false },
    { text: 'Frutos del Bosque', completed: false },
    { text: 'Maní', completed: false }
];

displayFlavors();