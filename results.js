// results.js - Lógica da página de resultados

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const selectionsContainer = document.getElementById('selectionsContainer');
    const mostVotedGame = document.getElementById('mostVotedGame');
    const mostVotedCount = document.getElementById('mostVotedCount');
    const mostVotedImage = document.getElementById('mostVotedImage');
    const categoriesCount = document.getElementById('categoriesCount');
    const totalGames = document.getElementById('totalGames');
    const shareBtn = document.getElementById('shareBtn');
    const newVoteBtn = document.getElementById('newVoteBtn');
    const resultCard = document.getElementById('resultCard');
    
    // Mapa de imagens (mesmo do script.js)
    const gameImages = {
        // Adicione suas URLs aqui posteriormente
    };
    
    // Recuperar dados da votação
    const votingData = JSON.parse(localStorage.getItem('gameAwardsVotes'));
    
    // Se não houver dados, voltar para a página inicial
    if (!votingData) {
        alert('Nenhum dado de votação encontrado. Redirecionando para a página inicial.');
        window.location.href = 'index.html';
        return;
    }
    
    const { selections, mostVoted } = votingData;
    
    // Mapeamento de IDs para nomes de categorias
    const categoriesMap = {
        'game-of-the-year': 'Jogo do Ano',
        'best-direction': 'Melhor Direção',
        'best-esports-team': 'Melhor Time de Esports',
        'best-esports-athlete': 'Melhor Atleta de Esports',
        'best-esports-game': 'Melhor Jogo de Esports',
        'best-sports-racing': 'Melhor Jogo de Esporte/Corrida',
        'best-strategy-sim': 'Melhor Jogo de Simulação/Estratégia',
        'best-family-game': 'Melhor Jogo para a Família',
        'innovation-accessibility': 'Inovação em Acessibilidade',
        'best-action-game': 'Melhor Jogo de Ação',
        'best-fighting-game': 'Melhor Jogo de Luta',
        'best-rpg': 'Melhor Jogo de RPG',
        'best-action-adventure': 'Melhor Jogo de Ação/Aventura',
        'most-anticipated': 'Jogo Mais Aguardado',
        'content-creator-year': 'Criador de Conteúdo do Ano',
        'best-vr-ar': 'Melhor Jogo de Realidade Virtual/Realidade Aumentada',
        'best-debut-indie': 'Melhor Jogo de Estreia Independente',
        'best-indie-game': 'Melhor Jogo Independente',
        'best-multiplayer': 'Melhor Multiplayer',
        'games-for-impact': 'Games for Impact',
        'best-community-support': 'Melhor Apoio à Comunidade',
        'best-narrative': 'Melhor Narrativa',
        'best-adaptation': 'Melhor Adaptação',
        'best-audio-design': 'Melhor Direção de Som',
        'best-score-music': 'Melhor Trilha e Música',
        'best-art-direction': 'Melhor Direção de Arte',
        'best-mobile-game': 'Melhor Jogo para Dispositivos Móveis',
        'best-ongoing-game': 'Melhor Jogo em Atualização',
        'best-performance': 'Melhor Atuação'
    };
    
    // Exibir seleções
    displaySelections(selections);
    
    // Exibir jogo mais votado pelo usuário
    displayMostVoted(mostVoted);
    
    // Atualizar estatísticas
    updateStats(selections, mostVoted);
    
    // Configurar botões
    setupButtons();
    
    // Função para exibir as seleções
    function displaySelections(selections) {
        selectionsContainer.innerHTML = '';
        
        // Mostrar apenas as primeiras 8 categorias para manter minimalista
        const displayedSelections = Object.entries(selections).slice(0, 8);
        
        displayedSelections.forEach(([categoryId, gameName], index) => {
            const categoryName = categoriesMap[categoryId] || categoryId;
            
            const selectionItem = document.createElement('div');
            selectionItem.className = 'selection-item';
            selectionItem.style.animationDelay = `${index * 0.1}s`;
            
            selectionItem.innerHTML = `
                <div class="category-title">
                    <i class="fas fa-award"></i> ${categoryName}
                </div>
                <div class="game-title">${gameName}</div>
                <div style="font-size: 0.8rem; color: var(--light-green);">
                    Sua escolha para esta categoria
                </div>
            `;
            
            selectionsContainer.appendChild(selectionItem);
        });
        
        // Se houver mais categorias, mostrar contador
        if (Object.keys(selections).length > 8) {
            const remainingCount = Object.keys(selections).length - 8;
            const remainingItem = document.createElement('div');
            remainingItem.className = 'selection-item';
            remainingItem.style.textAlign = 'center';
            remainingItem.style.padding = '1rem';
            remainingItem.innerHTML = `
                <div class="category-title">
                    <i class="fas fa-ellipsis-h"></i> Mais ${remainingCount} categorias
                </div>
                <div style="color: var(--light-green); font-size: 0.9rem;">
                    Total de ${Object.keys(selections).length} categorias votadas
                </div>
            `;
            selectionsContainer.appendChild(remainingItem);
        }
    }
    
    // Função para exibir o jogo mais votado pelo usuário
    function displayMostVoted(mostVoted) {
        if (!mostVoted || !mostVoted.game) return;
        
        const gameName = mostVoted.game;
        mostVotedGame.textContent = gameName;
        
        const categoryText = mostVoted.count === 1 ? 
            '1 categoria' : 
            `${mostVoted.count} categorias`;
        
        mostVotedCount.textContent = `Indicado em ${categoryText}`;
        
        // Adicionar imagem do jogo favorito
        const imageUrl = getGameImageUrl(gameName);
        mostVotedImage.innerHTML = `
            <img src="${imageUrl}" 
                 alt="${gameName}"
                 onerror="this.src='https://via.placeholder.com/300x141/1a5e2c/ffffff?text=${encodeURIComponent(gameName.substring(0, 30))}'">
        `;
        
        // Adicionar destaque visual para o jogo favorito
        highlightFavoriteGame(gameName);
    }
    
    // Função para atualizar estatísticas
    function updateStats(selections, mostVoted) {
        // Contar categorias votadas
        categoriesCount.textContent = Object.keys(selections).length;
        
        // Contar total de jogos únicos votados
        const uniqueGames = new Set(Object.values(selections));
        totalGames.textContent = uniqueGames.size;
    }
    
    // Função para destacar o jogo favorito nas seleções
    function highlightFavoriteGame(favoriteGame) {
        const selectionItems = selectionsContainer.querySelectorAll('.selection-item');
        
        selectionItems.forEach(item => {
            const gameTitle = item.querySelector('.game-title');
            if (gameTitle && gameTitle.textContent === favoriteGame) {
                item.style.borderLeftColor = 'var(--gold)';
                item.style.background = 'rgba(255, 215, 0, 0.05)';
                
                // Adicionar ícone de coroa
                const categoryTitle = item.querySelector('.category-title');
                if (categoryTitle) {
                    const crownIcon = document.createElement('i');
                    crownIcon.className = 'fas fa-crown';
                    crownIcon.style.color = 'var(--gold)';
                    crownIcon.style.marginLeft = '10px';
                    categoryTitle.appendChild(crownIcon);
                }
            }
        });
    }
    
    // Função para obter URL da imagem do jogo
    function getGameImageUrl(gameName) {
        // Remove informações extras
        const cleanGameName = gameName.split(' - ')[0];
        
        // Verifica se há URL específica no mapa
        if (gameImages[cleanGameName]) {
            return gameImages[cleanGameName];
        }
        
        // Placeholder genérico
        return `https://via.placeholder.com/300x141/1a5e2c/ffffff?text=${encodeURIComponent(cleanGameName.substring(0, 30))}`;
    }
    
    // Configurar botões de ação
    function setupButtons() {
        // Botão de capturar card (screenshot)
        shareBtn.addEventListener('click', function() {
            captureCardScreenshot();
        });
        
        // Botão de nova votação
        newVoteBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
    
    // Função para capturar screenshot do card
    function captureCardScreenshot() {
        // Verificar se html2canvas está carregado
        if (typeof html2canvas === 'undefined') {
            alert('A funcionalidade de captura está carregando. Por favor, aguarde alguns segundos e tente novamente.');
            return;
        }
        
        // Mostrar mensagem de processamento
        shareBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
        shareBtn.disabled = true;
        
        // Capturar o card
        html2canvas(resultCard, {
            backgroundColor: null,
            scale: 2, // Maior resolução
            useCORS: true, // Permitir imagens externas
            logging: false
        }).then(canvas => {
            // Converter para data URL
            const imageData = canvas.toDataURL('image/png');
            
            // Criar link para download
            const link = document.createElement('a');
            link.download = `meu-voto-game-awards-${new Date().getTime()}.png`;
            link.href = imageData;
            
            // Disparar download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Restaurar botão
            shareBtn.innerHTML = '<i class="fas fa-camera"></i> Capturar Card';
            shareBtn.disabled = false;
            
            // Mostrar notificação
            showNotification('Card salvo como imagem! Agora você pode compartilhar.');
            
        }).catch(error => {
            console.error('Erro ao capturar screenshot:', error);
            
            // Restaurar botão
            shareBtn.innerHTML = '<i class="fas fa-camera"></i> Capturar Card';
            shareBtn.disabled = false;
            
            showNotification('Erro ao capturar o card. Tente novamente.');
        });
    }
    
    // Mostrar notificação
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-green);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            animation: slideInRight 0.3s ease-out;
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            max-width: 300px;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
        
        // Adicionar animações CSS se necessário
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
});