const searchInput = document.getElementById('searchInput');
const resultList = document.getElementById('resultList');

searchInput.addEventListener('input', async (event) => {
    const searchTerm = event.target.value.trim();

    try {
        const response = await axios.get(`/api/search?q=${searchTerm}`);
        const results = response.data;

        // Limpiar la lista antes de agregar nuevos elementos
        resultList.innerHTML = '';

        // Mostrar los resultados en la lista
        results.forEach(result => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.textContent = result.name; // Supongamos que el objeto tiene una propiedad 'name'
            resultList.appendChild(listItem);
        });
    } catch (error) {
        console.error(error);
    }
});
