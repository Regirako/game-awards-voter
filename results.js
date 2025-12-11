// results.js - Lógica da página de resultados (CARROSSEL 3D)

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const backgroundGame = document.getElementById('backgroundGame');
    const carouselContainer = document.getElementById('carouselContainer');
    const carouselDots = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const gameDetails = document.getElementById('gameDetails');
    const totalCategories = document.getElementById('totalCategories');
    const uniqueGames = document.getElementById('uniqueGames');
    const topGameVotes = document.getElementById('topGameVotes');
    const shareBtn = document.getElementById('shareBtn');
    const newVoteBtn = document.getElementById('newVoteBtn');
    const resultCard = document.getElementById('resultCard');
    
    // Dados dos jogos com informações completas
    const gameDatabase = {
        'Clair Obscur: Expedition 33': {
            image: 'https://i.imgur.com/BdhoFqu.png',
            genres: ['RPG', 'Aventura', 'Fantasia'],
            developer: 'Sandfall Interactive',
            release: '2025',
            platform: 'PC, PS5, Xbox Series X/S',
            description: 'RPG de fantasia com combate por turnos e narrativa cinematográfica. Jogadores exploram um mundo dividido entre luz e sombra, tomando decisões que afetam o destino dos personagens.'
        },
        'Death Stranding 2: On the Beach': {
            image: 'https://i.ytimg.com/vi/6cs-A1rNvEE/maxresdefault.jpg',
            genres: ['Ação', 'Aventura', 'Ficção Científica'],
            developer: 'Kojima Productions',
            release: '2025',
            platform: 'PS5',
            description: 'Sequência do aclamado jogo de Hideo Kojima. Continua a jornada de Sam Bridges em um mundo pós-apocalíptico, focando em conexões humanas e entregas em paisagens surrealistas.'
        },
        'Hades 2': {
            image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1145350/91ac334a2c137d08968ccc0bc474a02579602100/header.jpg?t=1759973532',
            genres: ['Roguelike', 'Ação', 'Mitologia'],
            developer: 'Supergiant Games',
            release: '2024',
            platform: 'PC, Switch, PS5, Xbox Series X/S',
            description: 'Sequência do premiado rogue-like, agora com Melinoë, princesa do submundo, como protagonista. Combate dinâmico, narrativa profunda e deuses gregos revisitados.'
        },
        'Hollow Knight: Silksong': {
            image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030300/7983574d464e6559ac7e24275727f73a8bcca1f3/header.jpg?t=1764916587',
            genres: ['Metroidvania', 'Ação', 'Aventura'],
            developer: 'Team Cherry',
            release: '2025',
            platform: 'PC, Switch, PS5, Xbox Series X/S',
            description: 'A tão aguardada sequência de Hollow Knight. Controle Hornet em um novo reino cheio de perigos, habilidades únicas e segredos a serem desvendados.'
        },
        'Kingdom Come: Deliverance 2': {
            image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1771300/header.jpg?t=1763987645',
            genres: ['RPG', 'Histórico', 'Mundo Aberto'],
            developer: 'Warhorse Studios',
            release: '2025',
            platform: 'PC, PS5, Xbox Series X/S',
            description: 'RPG histórico realista ambientado na Europa Medieval. Sistema de combate complexo, narrativa ramificada e atenção aos detalhes históricos.'
        },
        'Donkey Kong Bananza': {
            image: 'https://www.showmetech.com.br/wp-content/uploads//2025/07/cover-dk-bananza.png',
            genres: ['Plataforma', 'Aventura', 'Família'],
            developer: 'Nintendo',
            release: '2025',
            platform: 'Nintendo Switch 2',
            description: 'Nova aventura do icônico gorila em uma ilha tropical cheia de segredos. Combina plataforma clássica com elementos de exploração e colecionáveis.'
        },
        'Ghost of Yotei': {
            image: 'https://levelupnews.com.br/wp-content/uploads/2025/03/img_7850-1.jpg',
            genres: ['Ação', 'Aventura', 'Stealth'],
            developer: 'Sucker Punch Productions',
            release: '2025',
            platform: 'PS5',
            description: 'Aventura de ação e stealth ambientada no Japão feudal. Controle um shinobi em missões furtivas com combate preciso e narrativa envolvente.'
        },
        'Split Fiction': {
            image: 'https://i.imgur.com/gaYkRJB.jpeg',
            genres: ['Ação', 'RPG', 'Ficção Científica'],
            developer: 'Arkane Studios',
            release: '2025',
            platform: 'PC, PS5, Xbox Series X/S',
            description: 'Jogo de ação com múltiplas realidades e narrativa não-linear. Decisões do jogador afetam diretamente o desenrolar da história em diferentes dimensões.'
        },
        // Adicione mais jogos conforme necessário...
    };
    
    // Estado do carrossel
    let topGames = [];
    let currentIndex = 0;
    let selections = {};
    
    // Inicializar
    init();
    
    function init() {
        // Recuperar dados da votação
        const votingData = JSON.parse(localStorage.getItem('gameAwardsVotes'));
        
        if (!votingData) {
            alert('Nenhum dado de votação encontrado. Redirecionando para a página inicial.');
            window.location.href = 'index.html';
            return;
        }
        
        selections = votingData.selections;
        
        // Calcular top 3 jogos mais votados
        calculateTopGames(votingData.selections);
        
        // Configurar plano de fundo
        setupBackground();
        
        // Inicializar carrossel
        initCarousel();
        
        // Atualizar estatísticas
        updateStats();
        
        // Configurar botões
        setupButtons();
        
        // Atualizar detalhes do jogo atual
        updateGameDetails();
    }
    
    function calculateTopGames(selections) {
        const voteCount = {};
        
        // Contar votos
        Object.values(selections).forEach(game => {
            voteCount[game] = (voteCount[game] || 0) + 1;
        });
        
        // Converter para array e ordenar
        const gamesArray = Object.entries(voteCount)
            .map(([game, votes]) => ({ game, votes }))
            .sort((a, b) => b.votes - a.votes)
            .slice(0, 3); // Pegar apenas os 3 primeiros
        
        // Se houver menos de 3 jogos, completar com os mais votados
        if (gamesArray.length < 3) {
            const allGames = Object.keys(gameDatabase);
            let addedGames = 0;
            
            for (const game of allGames) {
                if (!gamesArray.some(g => g.game === game) && addedGames < (3 - gamesArray.length)) {
                    gamesArray.push({ game, votes: 0 });
                    addedGames++;
                }
            }
        }
        
        topGames = gamesArray;
        topGameVotes.textContent = topGames[0]?.votes || 0;
    }
    
    function setupBackground() {
        if (topGames.length > 0) {
            const topGame = topGames[0].game;
            const gameData = gameDatabase[topGame] || {};
            
            if (gameData.image) {
                backgroundGame.style.backgroundImage = `url('${gameData.image}')`;
            }
        }
    }
    
    function initCarousel() {
        // Limpar carrossel
        carouselContainer.innerHTML = '';
        carouselDots.innerHTML = '';
        
        // Criar cards 3D
        topGames.forEach((gameData, index) => {
            const position = getPositionForIndex(index);
            createGameCard(gameData, position, index);
            
            // Criar dot
            const dot = document.createElement('div');
            dot.className = `carousel-dot ${index === currentIndex ? 'active' : ''}`;
            dot.dataset.index = index;
            dot.addEventListener('click', () => goToSlide(index));
            carouselDots.appendChild(dot);
        });
        
        // Atualizar posições iniciais
        updateCarouselPositions();
    }
    
    function createGameCard(gameData, position, index) {
        const card = document.createElement('div');
        card.className = 'game-card-3d';
        card.dataset.position = position;
        card.dataset.index = index;
        
        const gameInfo = gameDatabase[gameData.game] || {};
        const imageUrl = gameInfo.image || getFallbackImage(gameData.game);
        
        card.innerHTML = `
            <div class="game-card-image">
                <img src="${imageUrl}" 
                     alt="${gameData.game}"
                     onerror="this.src='https://via.placeholder.com/320x220/1a5e2c/ffffff?text=${encodeURIComponent(gameData.game.substring(0, 30))}'">
            </div>
            <div class="game-card-content">
                <h3 class="game-card-title">${gameData.game}</h3>
                <div class="game-card-categories">
                    Indicado em <span class="vote-count">${gameData.votes}</span> categoria${gameData.votes !== 1 ? 's' : ''}
                </div>
                <div class="game-card-stats">
                    <div class="stat-item">
                        <div class="stat-value">${gameInfo.release || '2025'}</div>
                        <div class="stat-label">Lançamento</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${gameInfo.platform ? gameInfo.platform.split(',')[0] : 'Multi'}</div>
                        <div class="stat-label">Plataforma</div>
                    </div>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => {
            if (position !== 'center') {
                const targetIndex = parseInt(card.dataset.index);
                goToSlide(targetIndex);
            }
        });
        
        carouselContainer.appendChild(card);
    }
    
    function getPositionForIndex(index) {
        if (index === currentIndex) return 'center';
        if (index === (currentIndex + 1) % topGames.length || 
            (currentIndex === topGames.length - 1 && index === 0)) return 'right';
        return 'left';
    }
    
    function updateCarouselPositions() {
        const cards = document.querySelectorAll('.game-card-3d');
        const dots = document.querySelectorAll('.carousel-dot');
        
        cards.forEach((card, index) => {
            const position = getPositionForIndex(parseInt(card.dataset.index));
            card.dataset.position = position;
            
            // Atualizar classe ativa
            if (position === 'center') {
                card.style.zIndex = '3';
            } else {
                card.style.zIndex = '2';
            }
        });
        
        // Atualizar dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        if (index === currentIndex) return;
        
        currentIndex = index;
        updateCarouselPositions();
        updateGameDetails();
        updateBackground();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % topGames.length;
        updateCarouselPositions();
        updateGameDetails();
        updateBackground();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + topGames.length) % topGames.length;
        updateCarouselPositions();
        updateGameDetails();
        updateBackground();
    }
    
    function updateGameDetails() {
        if (topGames.length === 0) return;
        
        const currentGame = topGames[currentIndex];
        const gameInfo = gameDatabase[currentGame.game] || {};
        
        gameDetails.innerHTML = `
            <div class="details-header">
                <h3 class="current-game-title">${currentGame.game}</h3>
                <div class="current-game-votes">
                    ${currentGame.votes} categoria${currentGame.votes !== 1 ? 's' : ''}
                </div>
            </div>
            
            <div class="game-info-grid">
                <div class="info-card">
                    <div class="info-title">Desenvolvedor</div>
                    <div class="info-content">${gameInfo.developer || 'Não informado'}</div>
                </div>
                
                <div class="info-card">
                    <div class="info-title">Gêneros</div>
                    <div class="info-content">${(gameInfo.genres || []).join(', ') || 'Não informado'}</div>
                </div>
                
                <div class="info-card">
                    <div class="info-title">Plataformas</div>
                    <div class="info-content">${gameInfo.platform || 'Não informado'}</div>
                </div>
                
                <div class="info-card">
                    <div class="info-title">Ano de Lançamento</div>
                    <div class="info-content">${gameInfo.release || '2025'}</div>
                </div>
            </div>
            
            <div class="info-card" style="grid-column: 1 / -1; margin-top: 1rem;">
                <div class="info-title">Descrição</div>
                <div class="info-content">${gameInfo.description || 'Descrição não disponível.'}</div>
            </div>
        `;
    }
    
    function updateBackground() {
        if (topGames.length > 0) {
            const currentGame = topGames[currentIndex].game;
            const gameData = gameDatabase[currentGame] || {};
            
            if (gameData.image) {
                backgroundGame.style.backgroundImage = `url('${gameData.image}')`;
            }
        }
    }
    
    function updateStats() {
        // Total de categorias votadas
        totalCategories.textContent = Object.keys(selections).length;
        
        // Total de jogos únicos
        const uniqueGamesSet = new Set(Object.values(selections));
        uniqueGames.textContent = uniqueGamesSet.size;
        
        // Votos do jogo favorito (top 1)
        if (topGames.length > 0) {
            topGameVotes.textContent = topGames[0].votes;
        }
    }
    
    function setupButtons() {
        // Botões do carrossel
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // Botão de compartilhar (screenshot melhorada)
        shareBtn.addEventListener('click', captureHighQualityScreenshot);
        
        // Botão de nova votação
        newVoteBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
        
        // Adicionar controles de teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
    }
    
    function captureHighQualityScreenshot() {
        if (typeof html2canvas === 'undefined') {
            alert('A funcionalidade de compartilhamento está carregando. Por favor, tente novamente em alguns segundos.');
            return;
        }
        
        // Desabilitar botão e mostrar feedback
        const originalText = shareBtn.innerHTML;
        shareBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparando...';
        shareBtn.disabled = true;
        
        // Temporariamente ajustar estilos para screenshot
        const originalCardStyle = resultCard.style.cssText;
        resultCard.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.6)';
        resultCard.style.border = '3px solid var(--gold)';
        
        // Configurações avançadas para qualidade
        const config = {
            backgroundColor: '#0a2810',
            scale: 3, // Alta resolução
            useCORS: true,
            allowTaint: true,
            logging: false,
            removeContainer: true,
            onclone: function(clonedDoc) {
                // Ajustar estilos no clone
                const clonedCard = clonedDoc.getElementById('resultCard');
                if (clonedCard) {
                    clonedCard.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.8)';
                    clonedCard.style.border = '3px solid var(--gold)';
                    clonedCard.style.transform = 'scale(1.02)';
                }
                
                // Remover interatividade
                const buttons = clonedDoc.querySelectorAll('button');
                buttons.forEach(btn => {
                    btn.style.pointerEvents = 'none';
                    btn.style.opacity = '1';
                });
                
                // Garantir que todas as imagens carreguem
                const images = clonedDoc.querySelectorAll('img');
                images.forEach(img => {
                    if (!img.complete) {
                        img.crossOrigin = 'anonymous';
                    }
                });
            }
        };
        
        // Adicionar delay para garantir que todos os elementos estejam renderizados
        setTimeout(() => {
            html2canvas(resultCard, config)
                .then(canvas => {
                    // Restaurar estilos originais
                    resultCard.style.cssText = originalCardStyle;
                    
                    // Criar canvas com marca d'água
                    const finalCanvas = addWatermark(canvas);
                    
                    // Converter para data URL
                    const imageData = finalCanvas.toDataURL('image/png', 1.0);
                    
                    // Criar link para download
                    const link = document.createElement('a');
                    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
                    const fileName = `Game-Awards-Result-${timestamp}.png`;
                    link.download = fileName;
                    link.href = imageData;
                    
                    // Disparar download
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    // Restaurar botão
                    shareBtn.innerHTML = originalText;
                    shareBtn.disabled = false;
                    
                    // Mostrar notificação
                    showNotification('Screenshot salvo em alta qualidade!');
                    
                }).catch(error => {
                    console.error('Erro ao capturar screenshot:', error);
                    
                    // Restaurar estilos originais
                    resultCard.style.cssText = originalCardStyle;
                    
                    // Restaurar botão
                    shareBtn.innerHTML = originalText;
                    shareBtn.disabled = false;
                    
                    showNotification('Erro ao capturar. Tente usar a ferramenta de print do navegador (Ctrl+P).');
                });
        }, 1000);
    }
    
    function addWatermark(originalCanvas) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Configurar canvas do mesmo tamanho
        canvas.width = originalCanvas.width;
        canvas.height = originalCanvas.height;
        
        // Desenhar imagem original
        ctx.drawImage(originalCanvas, 0, 0);
        
        // Adicionar marca d'água sutil
        ctx.font = 'bold 40px Montserrat';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(-Math.PI / 4);
        ctx.fillText('ECOLÓGICA GAME AWARDS 2025', 0, 0);
        ctx.restore();
        
        return canvas;
    }
    
    function getFallbackImage(gameName) {
        return `https://via.placeholder.com/320x220/1a5e2c/ffffff?text=${encodeURIComponent(gameName.substring(0, 30))}`;
    }
    
    function showNotification(message) {
        // Remover notificações anteriores
        const existingNotifications = document.querySelectorAll('.custom-notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = 'custom-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--accent-green), var(--secondary-green));
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 10000;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
            animation: slideInRight 0.3s ease-out;
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            max-width: 350px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(10px);
            font-size: 0.95rem;
        `;
        
        notification.innerHTML = `
            <i class="fas fa-check-circle" style="margin-right: 10px;"></i>
            ${message}
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Inicializar animações CSS se necessário
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
});