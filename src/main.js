// main.js
import { getBroth, getProteins, sendOrder } from './api.js';
import { updateBrothCarousel} from './brothCarousel.js';
import { updateProteinCarousel } from './proteinCarousel.js';

window.onload = function() {
    getBroth().then(function(data) {
        updateBrothCarousel(data);
    });

    getProteins().then(function(data) {
        updateProteinCarousel(data);
    });

    document.querySelector('#send-order').addEventListener('click', function() {
        sendOrder().then(function(response) {
            document.getElementById('main-page').style.display = 'none';
            document.getElementById('success-page').style.display = 'flex';

            document.getElementById('order-description').innerText = response.data.description;
            document.getElementById('ramen-img').src = response.data.image;
            
            document.querySelector('#re-order').addEventListener('click', function() {
                location.reload();
            });
        }).catch(function(error) {
            console.error('Erro ao enviar o pedido:', error);
        });
        this.classList.add('active');
    });
};
