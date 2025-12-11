// results.js - Lógica da página de resultados

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const selectionsContainer = document.getElementById('selectionsContainer');
    const mostVotedGame = document.getElementById('mostVotedGame');
    const mostVotedCount = document.getElementById('mostVotedCount');
    const totalVotes = document.getElementById('totalVotes');
    const shareBtn = document.getElementById('shareBtn');
    const newVoteBtn = document.getElementById('newVoteBtn');
    const resultCard = document.getElementById('resultCard');
    
    // Recuperar dados da votação
    const votingData = JSON.parse(localStorage.getItem('gameAwardsVotes'));
    
    // Se não houver dados, voltar para a página inicial
    if (!votingData) {
        alert('Nenhum dado de votação encontrado. Redirecionando para a página inicial.');
        window.location.href = 'index.html';
        return;
    }
    
    const { selections, mostVoted, voteStats } = votingData;
    
    // Mapeamento de IDs para nomes de categorias
    const categoriesMap = {
        'game-of-the-year': 'Jogo do ano',
        'best-direction': 'Melhor direção',
        'best-esports-team': 'Melhor time de esports',
        'best-esports-athlete': 'Melhor atleta de esports',
        'best-esports-game': 'Melhor jogo de esports',
        'best-sports-racing': 'Melhor jogo de esporte/corrida',
        'best-strategy-sim': 'Melhor jogo de simulação/estratégia',
        'best-family-game': 'Melhor jogo para a família',
        'innovation-accessibility': 'Inovação em acessibilidade',
        'best-action-game': 'Melhor jogo de ação',
        'best-fighting-game': 'Melhor jogo de luta',
        'best-rpg': 'Melhor jogo de RPG',
        'best-action-adventure': 'Melhor jogo de ação/aventura',
        'most-anticipated': 'Jogo mais aguardado',
        'content-creator-year': 'Criador de conteúdo do ano',
        'best-vr-ar': 'Melhor jogo de realidade virtual/realidade aumentada',
        'best-debut-indie': 'Melhor jogo de estreia independente',
        'best-indie-game': 'Melhor jogo independente',
        'best-multiplayer': 'Melhor multiplayer',
        'games-for-impact': 'Games for impact',
        'best-community-support': 'Melhor apoio à comunidade',
        'best-narrative': 'Melhor narrativa',
        'best-adaptation': 'Melhor adaptação',
        'best-audio-design': 'Melhor direção de som',
        'best-score-music': 'Melhor trilha e música',
        'best-art-direction': 'Melhor direção de arte',
        'best-mobile-game': 'Melhor jogo para dispositivos móveis',
        'best-ongoing-game': 'Melhor jogo em atualização',
        'best-performance': 'Melhor atuação'
    };
    
    // Calcular estatísticas gerais
    let totalGlobalVotes = 0;
    if (voteStats) {
        Object.values(voteStats).forEach(categoryVotes => {
            Object.values(categoryVotes).forEach(voteCount => {
                totalGlobalVotes += voteCount;
            });
        });
    }
    
    // Exibir total de votos
    totalVotes.textContent = `${totalGlobalVotes} votos registrados`;
    
    // Exibir seleções
    displaySelections(selections);
    
    // Exibir jogo mais votado pelo usuário
    displayMostVoted(mostVoted);
    
    // Configurar botões
    setupButtons();
    
    // Função para exibir as seleções
    function displaySelections(selections) {
        selectionsContainer.innerHTML = '';
        
        // Mostrar apenas as primeiras 5 categorias para manter minimalista
        const displayedSelections = Object.entries(selections).slice(0, 8);
        
        displayedSelections.forEach(([categoryId, gameName], index) => {
            const categoryName = categoriesMap[categoryId] || categoryId;
            
            // Calcular porcentagem global
            let globalPercentage = 0;
            if (voteStats && voteStats[categoryId] && voteStats[categoryId][gameName] !== undefined) {
                const categoryVotes = voteStats[categoryId];
                const totalCategoryVotes = Object.values(categoryVotes).reduce((a, b) => a + b, 0);
                if (totalCategoryVotes > 0) {
                    globalPercentage = (categoryVotes[gameName] / totalCategoryVotes) * 100;
                }
            }
            
            const selectionItem = document.createElement('div');
            selectionItem.className = 'selection-item';
            selectionItem.style.animationDelay = `${index * 0.1}s`;
            
            selectionItem.innerHTML = `
                <div class="category-title">
                    <i class="fas fa-award"></i> ${categoryName}
                </div>
                <div class="game-title">${gameName}</div>
                <div class="global-stats">
                    <div class="global-bar">
                        <div class="global-fill" style="width: ${globalPercentage}%"></div>
                    </div>
                    <div class="global-percentage">${globalPercentage.toFixed(1)}%</div>
                </div>
                <div style="font-size: 0.8rem; color: var(--light-green); margin-top: 5px;">
                    ${globalPercentage.toFixed(1)}% dos votos nesta categoria
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
        
        mostVotedGame.textContent = mostVoted.game;
        
        const categoryText = mostVoted.count === 1 ? 
            '1 categoria' : 
            `${mostVoted.count} categorias`;
        
        mostVotedCount.textContent = `Indicado em ${categoryText}`;
    }
    
    // Configurar botões de ação
    function setupButtons() {
        // Botão de compartilhar
        shareBtn.addEventListener('click', function() {
            // Criar texto para compartilhamento
            let shareText = `🎮 Minha votação no Game Awards 2025:\n\n`;
            
            Object.entries(votingData.selections).forEach(([categoryId, gameName], index) => {
                if (index < 3) { // Mostrar apenas 3 categorias no compartilhamento
                    const categoryName = categoriesMap[categoryId] || categoryId;
                    shareText += `${categoryName}: ${gameName}\n`;
                }
            });
            
            shareText += `\nMeu jogo favorito: ${votingData.mostVoted.game}\n`;
            shareText += `#GameAwards2025 #Votação`;
            
            // Tentar usar Web Share API se disponível
            if (navigator.share) {
                navigator.share({
                    title: 'Minha votação - Game Awards 2025',
                    text: shareText,
                    url: window.location.href
                }).catch(console.error);
            } else {
                // Fallback: copiar para área de transferência
                navigator.clipboard.writeText(shareText).then(() => {
                    showNotification('Votação copiada para a área de transferência! Cole nas redes sociais.');
                }).catch(() => {
                    // Fallback mais simples
                    const textArea = document.createElement('textarea');
                    textArea.value = shareText;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    showNotification('Votação copiada para a área de transferência!');
                });
            }
        });
        
        // Botão de nova votação
        newVoteBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
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
        
        // Adicionar animações CSS
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