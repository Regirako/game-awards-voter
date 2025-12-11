// results.js - Lógica da página de resultados

document.addEventListener('DOMContentLoaded', function() {
    // Dados dos jogos
    const gamesData = {
        'expedition33': {
            name: 'Expedition 33: Clair Obscur',
            image: 'assets/images/expedition33.jpg',
            genres: ['RPG', 'Aventura', 'Fantasia'],
            description: 'Uma jornada épica através de paisagens surrealistas onde luz e sombra determinam o destino.'
        },
        'starforge': {
            name: 'Starforge: Legends',
            image: 'assets/images/starforge.jpg',
            genres: ['Ficção Científica', 'Estratégia', 'Multiplayer'],
            description: 'Construa impérios interestelares, participe de batalhas épicas e explore galáxias inexploradas.'
        },
        'astral-legends': {
            name: 'Astral Legends Online',
            image: 'assets/images/astral-legends.jpg',
            genres: ['MMORPG', 'Ação', 'Fantasia'],
            description: 'Um MMORPG expansivo com mundo aberto dinâmico e narrativa profunda adaptativa.'
        }
    };
    
    // Mapeamento de categorias
    const categoriesMap = {
        'game-of-the-year': 'Jogo do Ano',
        'best-direction': 'Melhor Direção',
        'best-art': 'Melhor Arte'
    };
    
    // Elementos do DOM
    const selectionsContainer = document.getElementById('selectionsContainer');
    const mostVotedGame = document.getElementById('mostVotedGame');
    const mostVotedCount = document.getElementById('mostVotedCount');
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
    
    const { selections, mostVoted } = votingData;
    
    // Exibir seleções
    displaySelections(selections);
    
    // Exibir jogo mais votado
    displayMostVoted(mostVoted);
    
    // Configurar botões
    setupButtons();
    
    // Adicionar efeitos especiais
    addSpecialEffects();
    
    // Função para exibir as seleções
    function displaySelections(selections) {
        selectionsContainer.innerHTML = '';
        
        Object.entries(selections).forEach(([category, gameId]) => {
            const game = gamesData[gameId];
            const categoryName = categoriesMap[category];
            
            if (!game) return;
            
            const selectionItem = document.createElement('div');
            selectionItem.className = 'selection-item';
            
            selectionItem.innerHTML = `
                <h3 class="category-title">
                    <i class="fas fa-award"></i> ${categoryName}
                </h3>
                <h4 class="game-title">${game.name}</h4>
                <p>${game.description}</p>
                <div class="game-info">
                    <img src="${game.image}" alt="${game.name}" class="game-image-small">
                    <div class="game-details">
                        <div class="game-genres-small">
                            ${game.genres.map(genre => `<span>${genre}</span>`).join('')}
                        </div>
                        <p><strong>Indicado para:</strong> ${categoryName}</p>
                    </div>
                </div>
            `;
            
            selectionsContainer.appendChild(selectionItem);
        });
    }
    
    // Função para exibir o jogo mais votado
    function displayMostVoted(mostVoted) {
        const game = gamesData[mostVoted.game];
        
        if (!game) return;
        
        mostVotedGame.textContent = game.name;
        
        const categoryText = mostVoted.count === 1 ? 
            '1 categoria' : 
            `${mostVoted.count} categorias`;
        
        mostVotedCount.textContent = `Indicado em ${categoryText}`;
        
        // Destacar o jogo mais votado
        highlightMostVotedGame(mostVoted.game);
    }
    
    // Função para destacar o jogo mais votado
    function highlightMostVotedGame(gameId) {
        // Encontrar todos os itens do jogo mais votado
        const gameItems = document.querySelectorAll('.selection-item');
        
        gameItems.forEach(item => {
            const gameTitle = item.querySelector('.game-title');
            if (gameTitle && gameTitle.textContent.includes(gamesData[gameId].name)) {
                item.style.borderLeftColor = 'var(--gold)';
                item.style.background = 'rgba(255, 215, 0, 0.05)';
                
                // Adicionar ícone de estrela
                const categoryTitle = item.querySelector('.category-title');
                const starIcon = document.createElement('i');
                starIcon.className = 'fas fa-star';
                starIcon.style.color = 'var(--gold)';
                starIcon.style.marginLeft = '10px';
                categoryTitle.appendChild(starIcon);
            }
        });
    }
    
    // Configurar botões de ação
    function setupButtons() {
        // Botão de compartilhar
        shareBtn.addEventListener('click', function() {
            // Criar imagem do card para compartilhamento
            html2canvas(resultCard).then(canvas => {
                // Converter para data URL
                const imageData = canvas.toDataURL('image/png');
                
                // Criar um link temporário para download
                const link = document.createElement('a');
                link.download = 'meu-voto-game-awards-2025.png';
                link.href = imageData;
                link.click();
                
                // Feedback visual
                showNotification('Imagem baixada! Agora você pode compartilhar nas redes sociais.');
            });
        });
        
        // Botão de nova votação
        newVoteBtn.addEventListener('click', function() {
            // Adicionar efeito de transição
            resultCard.style.animation = 'cardEntrance 0.5s ease-in reverse';
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 500);
        });
    }
    
    // Adicionar efeitos especiais
    function addSpecialEffects() {
        // Efeito de partículas
        createParticles();
        
        // Efeito de brilho intermitente
        setInterval(() => {
            const glowIntensity = Math.random() * 0.5 + 0.5;
            resultCard.style.boxShadow = 
                `0 20px 50px rgba(0, 0, 0, 0.5),
                 0 0 ${100 * glowIntensity}px rgba(41, 98, 255, ${0.3 * glowIntensity}),
                 inset 0 0 ${50 * glowIntensity}px rgba(255, 215, 0, ${0.1 * glowIntensity})`;
        }, 2000);
        
        // Efeito de rotação sutil no cursor
        document.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth - 0.5;
            const y = e.clientY / window.innerHeight - 0.5;
            
            resultCard.style.transform = `
                perspective(1000px) 
                rotateY(${x * 2}deg) 
                rotateX(${y * -2}deg)
                translateY(${Math.sin(Date.now() / 1000) * 5}px)
            `;
        });
    }
    
    // Criar partículas flutuantes
    function createParticles() {
        const particlesContainer = document.querySelector('.floating-bg');
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-element';
            
            // Tamanho e posição aleatórios
            const size = Math.random() * 60 + 20;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * -20;
            const duration = Math.random() * 20 + 20;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.opacity = Math.random() * 0.3 + 0.1;
            particle.style.background = `radial-gradient(circle, 
                rgba(41, 98, 255, ${Math.random() * 0.3 + 0.1}) 0%, 
                rgba(255, 215, 0, ${Math.random() * 0.1}) 100%)`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Mostrar notificação
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-blue);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 10000;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.3s ease-out;
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
        
        // Adicionar animação de saída
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideOut {
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
    
    // Adicionar biblioteca html2canvas via CDN se necessário
    if (typeof html2canvas === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
        script.onload = function() {
            console.log('html2canvas carregado para compartilhamento de imagem');
        };
        document.head.appendChild(script);
    }
});