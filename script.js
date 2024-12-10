document.getElementById('employeeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Coleta os dados do formulário
    const age = parseFloat(document.getElementById('age').value);
    const experience = parseFloat(document.getElementById('experience').value);
    const hours = parseFloat(document.getElementById('hours').value);
    const projects = parseFloat(document.getElementById('projects').value);
    const performance = parseFloat(document.getElementById('performance').value);

    // Normaliza os dados
    const normalizedAge = (age - 20) / (60 - 20);
    const normalizedExperience = (experience - 0) / (40 - 0);
    const normalizedHours = (hours - 20) / (60 - 20);
    const normalizedProjects = (projects - 0) / (30 - 0);
    const normalizedPerformance = (performance - 0) / (10 - 0);

    // Calcula a distância para cada cluster (distância euclidiana)
    const clusters = [
        { centroid: [0.763, 0.773, 0.766, 0.788, 0.957] },
        { centroid: [0.314, 0.377, 0.443, 0.453, 0.636] },
        { centroid: [0.2, 0.157, 0.217, 0.208, 0.34] }
    ];

    function euclideanDistance(a, b) {
        return Math.sqrt(a.reduce((sum, value, i) => sum + Math.pow(value - b[i], 2), 0));
    }

    const dataPoint = [normalizedAge, normalizedExperience, normalizedHours, normalizedProjects, normalizedPerformance];

    const distances = clusters.map(cluster => {
        return euclideanDistance(dataPoint, cluster.centroid);
    });

    const closestClusterIndex = distances.indexOf(Math.min(...distances));
    const clusterDescriptions = [
        'Funcionários mais velhos, com alta experiência, que trabalham muitas horas e concluem muitos projetos.',
        'Funcionários de idade intermediária com experiência moderada, envolvimento no trabalho moderado.',
        'Funcionários mais jovens, com pouca experiência.'
    ];

    const resultBox = document.getElementById('result');
    resultBox.style.display = 'block';
    resultBox.className = `result-box result-cluster-${closestClusterIndex}`;
    document.getElementById('clusterResult').textContent = `Você está no Cluster ${closestClusterIndex}.`;
    document.getElementById('description').textContent = clusterDescriptions[closestClusterIndex];

    document.getElementById('result').style.display = 'block';
    document.getElementById('clusterResult').textContent = `Você está no Cluster ${closestClusterIndex}.`;
    document.getElementById('description').textContent = clusterDescriptions[closestClusterIndex];
});

function showSection(sectionId) {
    document.querySelector('.form-section').style.display = 'none';
    document.querySelector('.graphs-section').style.display = 'none';
    document.getElementById(sectionId).style.display = 'block';
}

// Mostrar a seção de cadastro por padrão
document.addEventListener('DOMContentLoaded', () => {
    showSection('form-section');
});
