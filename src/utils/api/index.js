const BASE_URL = 'https://api-node-paciente-postgres.herokuapp.com';

export const fetchHospitais = () => {
    const url = `${BASE_URL}/hospital`

    return fetch(url).then(response => response.json());
}

export const fetchPacientes = () => {
    const url = `${BASE_URL}/paciente`

    return fetch(url).then(response => response.json());
}