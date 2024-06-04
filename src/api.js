import { getActiveBrothId } from "./carousels/brothCarousel";
import { getActiveProteinId } from "./carousels/proteinCarousel";
import { getDesktopActiveBrothId } from "./pageUtils/cardsController";
import { getDesktopActiveProteinId } from "./pageUtils/cardsController";

export function getBroth() {
    var apiKey = '4676677e-8a89-4331-bc32-89ad03576a4a';

    return axios.get('https://ramengo-backend.onrender.com/broths', {
        headers: {
            'x-api-key': apiKey
        }
    })
    .then(function(response) {
        return response.data;
    })
    .catch(function(error) {
        console.error('Erro ao buscar os dados da API:', error);
    });
}

export function getProteins() {
    var apiKey = '4676677e-8a89-4331-bc32-89ad03576a4a';

    return axios.get('https://ramengo-backend.onrender.com/proteins', {
        headers: {
            'x-api-key': apiKey
        }
    })
    .then(function(response) {
        return response.data;
    })
    .catch(function(error) {
        console.error('Erro ao buscar os dados da API:', error);
    });
}

export function sendOrder() {
    let activeBrothId = getActiveBrothId();
    let activeProteinId = getActiveProteinId();

    if (activeBrothId && activeProteinId) {
        activeBrothId = activeBrothId.replace(/\D/g, '');
        activeProteinId = activeProteinId.replace(/\D/g, '');
    } else {
        activeBrothId = getDesktopActiveBrothId();
        activeProteinId = getDesktopActiveProteinId();

        if (activeBrothId && activeProteinId) {
            activeBrothId = activeBrothId.replace(/\D/g, '');
            activeProteinId = activeProteinId.replace(/\D/g, '');
        }
    }

    if (activeBrothId && activeProteinId) {
        return axios.post('https://ramengo-backend.onrender.com/orders', 
            { brothId: activeBrothId, proteinId: activeProteinId },
            { headers: { 'x-api-key': '4676677e-8a89-4331-bc32-89ad03576a4a' }}
        )
        .then(function(response) {
            console.log('IDs enviados com sucesso:', response.data);
            return response;
        })
        .catch(function(error) {
            console.error('Erro ao enviar os IDs:', error);
            throw error; 
        });
    } else {
        console.log('IDs de broth e protein não encontrados');
    }
}
