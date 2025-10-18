const certifications = [
    {
        name: "LEED Platinum",
        description: "LEED (Leadership in Energy and Environmental Design) is the most widely used green building rating system in the world. Platinum is the highest level of certification.",
        image: "https://via.placeholder.com/150"
    },
    {
        name: "BREEAM Outstanding",
        description: "BREEAM (Building Research Establishment Environmental Assessment Method) is a sustainability assessment method for masterplanning projects, infrastructure and buildings. Outstanding is the highest rating.",
        image: "https://via.placeholder.com/150"
    },
    {
        name: "WELL Certified Gold",
        description: "The WELL Building Standard is a performance-based system for measuring, certifying, and monitoring features of the built environment that impact human health and wellbeing.",
        image: "https://via.placeholder.com/150"
    }
];

const certGrid = document.querySelector('.cert-grid');

certifications.forEach(cert => {
    const certElement = document.createElement('div');
    certElement.classList.add('cert');
    certElement.innerHTML = `
        <img src="${cert.image}" alt="${cert.name}">
        <h3>${cert.name}</h3>
        <p>${cert.description}</p>
    `;
    certGrid.appendChild(certElement);
});