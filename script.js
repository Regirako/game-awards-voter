// script.js - Lógica da página de votação

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const votingForm = document.getElementById('votingForm');
    const submitBtn = document.getElementById('submitVote');
    const progressFill = document.getElementById('progressFill');
    const progressCount = document.getElementById('progressCount');
    
    // Contadores e estado
    let selectedGames = {
        'game-of-the-year': null,
        'best-direction': null,
        'best-art': null
    };
    
    let selectedCount = 0;
    const totalCategories = 3;
    
    // Inicializar cards de jogo
    initGameCards();
    updateProgress();
    
    // Função para inicializar os cards de jogo
    function initGameCards() {
        const gameCards = document.querySelectorAll('.game-card');
        
        gameCards.forEach(card => {
            const selectBtn = card.querySelector('.select-btn');
            const gameId = card.dataset.game;
            const category = card.dataset.category;
            
            // Configurar botão de seleção
            selectBtn.addEventListener('click', function(e) {
                e.preventDefault();
                selectGame(card, gameId, category);
            });
            
            // Permitir seleção clicando em qualquer lugar do card
            card.addEventListener('click', function(e) {
                if (!e.target.closest('.select-btn') && !e.target.closest('a')) {
                    e.preventDefault();
                    selectGame(card, gameId, category);
                }
            });
        });
    }
    
    // Função para selecionar um jogo
    function selectGame(card, gameId, category) {
        const categoryCards = document.querySelectorAll(`.game-card[data-category="${category}"]`);
        
        // Remover seleção anterior nesta categoria
        categoryCards.forEach(c => {
            c.classList.remove('selected');
            const radio = c.querySelector('.hidden-radio');
            if (radio) radio.checked = false;
        });
        
        // Adicionar seleção atual
        card.classList.add('selected');
        const radio = card.querySelector('.hidden-radio');
        if (radio) radio.checked = true;
        
        // Atualizar estado
        if (selectedGames[category] === null) {
            selectedCount++;
        }
        selectedGames[category] = gameId;
        
        updateProgress();
        
        // Efeito visual de confirmação
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = 'pulse 0.5s';
        }, 10);
    }
    
    // Atualizar barra de progresso
    function updateProgress() {
        const percentage = (selectedCount / totalCategories) * 100;
        progressFill.style.width = `${percentage}%`;
        progressCount.textContent = selectedCount;
        
        // Atualizar botão de envio
        if (selectedCount === totalCategories) {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
        } else {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            submitBtn.style.cursor = 'not-allowed';
        }
    }
    
    // Manipular envio do formulário
    votingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Verificar se todas as categorias foram preenchidas
        const allSelected = Object.values(selectedGames).every(game => game !== null);
        
        if (!allSelected) {
            alert('Por favor, selecione um jogo em todas as categorias antes de finalizar.');
            return;
        }
        
        // Calcular jogo mais votado
        const voteCount = {};
        Object.values(selectedGames).forEach(game => {
            voteCount[game] = (voteCount[game] || 0) + 1;
        });
        
        // Encontrar o jogo com mais votos
        let mostVotedGame = null;
        let maxVotes = 0;
        
        Object.entries(voteCount).forEach(([game, votes]) => {
            if (votes > maxVotes) {
                maxVotes = votes;
                mostVotedGame = game;
            }
        });
        
        // Preparar dados para a próxima página
        const votingData = {
            selections: selectedGames,
            mostVoted: {
                game: mostVotedGame,
                count: maxVotes
            },
            timestamp: new Date().toISOString()
        };
        
        // Salvar no localStorage e redirecionar
        localStorage.setItem('gameAwardsVotes', JSON.stringify(votingData));
        window.location.href = 'results.html';
    });
    
    // Adicionar animação de pulso
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
});