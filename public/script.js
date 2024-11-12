// Obtener la lista de contactos al cargar la página
window.onload = () => {
    obtenerContactos();
};

// Función para obtener y mostrar la lista de contactos
function obtenerContactos() {
    fetch('/api/contactos')
        .then(response => response.json())
        .then(data => {
            const contactList = document.getElementById('contact-list');
            contactList.innerHTML = '';
            data.forEach(contact => {
                const contactDiv = document.createElement('div');
                contactDiv.className = 'contact-item';
                contactDiv.innerHTML = `<strong>${contact.nombre} ${contact.apellido}</strong><br>${contact.telefono}`;
                contactList.appendChild(contactDiv);
            });
        });
}

// Manejar el formulario para agregar contacto
document.getElementById('contact-form').onsubmit = (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;

    fetch('/api/contactos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, apellido, telefono })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
            obtenerContactos();
            document.getElementById('contact-form').reset();
        } else {
            alert('Error al agregar el contacto');
        }
    })
    .catch(error => console.error('Error:', error));
};
