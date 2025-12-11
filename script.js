// script.js - Lógica da votação por categoria

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const categoryNavigation = document.getElementById('categoryNavigation');
    const currentCategoryContainer = document.getElementById('currentCategoryContainer');
    const prevCategoryBtn = document.getElementById('prevCategoryBtn');
    const nextCategoryBtn = document.getElementById('nextCategoryBtn');
    const finalizeVoteBtn = document.getElementById('finalizeVoteBtn');
    const progressFill = document.getElementById('progressFill');
    const progressCount = document.getElementById('progressCount');
    const totalCategoriesCount = document.getElementById('totalCategoriesCount');
    const currentCategoryNumber = document.getElementById('currentCategoryNumber');
    const totalCategoriesSpan = document.getElementById('totalCategories');
    
    // Dados das categorias
    const categoriesData = [
        { id: 'game-of-the-year', name: 'Jogo do ano', nominees: ['Clair Obscur: Expedition 33', 'Death Stranding 2: On the beach', 'Donkey Kong Bananza', 'Hades 2', 'Hollow Knight: Silksong', 'Kingdom Come: Deliverance 2'] },
        { id: 'best-direction', name: 'Melhor direção', nominees: ['Clair Obscur: Expedition 33', 'Death Stranding 2: On the beach', 'Ghost of Yotei', 'Hades 2', 'Split Fiction'] },
        { id: 'best-esports-team', name: 'Melhor time de esports', nominees: ["Gen.G - 'League of legends'", "NRG - 'Valorant'", "Team Falcons - 'Dota 2'", "Team Liquid PH - 'Mobile Legends: Bang bang'", "Team Vitality - 'Counter Strike 2'"] },
        { id: 'best-esports-athlete', name: 'Melhor atleta de esports', nominees: ['Brawk', 'Chovy', 'Forsaken', 'Kakeru', 'Menard', 'Zywoo'] },
        { id: 'best-esports-game', name: 'Melhor jogo de esports', nominees: ["'Counter Strike 2'", "'Dota 2'", "'League of legends'", "'Mobile legends: Bang bang'", "'Valorant'"] },
        { id: 'best-sports-racing', name: 'Melhor jogo de esporte/corrida', nominees: ["'FC 26'", "'F1 25'", "'Mario Kart World'", "'Rematch'", "'Sonic Racing: CrossWorlds'"] },
        { id: 'best-strategy-sim', name: 'Melhor jogo de simulação/estratégia', nominees: ["'The Alters'", "'Final Fantasy Tactics - The Ivalice chronicles'", "'Jurassic World Evolution 3'", "'Civilization 7'", "'Tempest rising'", "'Two point museum'"] },
        { id: 'best-family-game', name: 'Melhor jogo para a família', nominees: ["'Donkey Kong Bananza'", "'Lego Party!'", "'Lego Voyagers'", "'Mario Kart World'", "'Sonic Racing: CrossWorlds'", "'Split Fiction'"] },
        { id: 'innovation-accessibility', name: 'Inovação em acessibilidade', nominees: ["'Assassin's Creed Shadows'", "'Atomfall'", "'Doom: The dark ages'", "'FC 26'", "'South of midnight'"] },
        { id: 'best-action-game', name: 'Melhor jogo de ação', nominees: ["'Battlefield 6'", "'Doom: The dark ages'", "'Hades 2'", "'Ninja Gaiden 4'", "'Shinobi: Art of vengeance'"] },
        { id: 'best-fighting-game', name: 'Melhor jogo de luta', nominees: ["'2XKO'", "'Capcom Fighting Collection 2'", "'Fatal Fury: City of the wolves'", "'Mortal Kombat: Legacy kollection'", "'Virtua Fighter 5 R.E.V.O. World Stage'"] },
        { id: 'best-rpg', name: 'Melhor jogo de RPG', nominees: ["'Avowed'", "'Clair Obscur: Expedition 33'", "'Kingdom Come: Deliverance 2'", "'Monster Hunter Wilds'", "'The Outer Worlds 2'"] },
        { id: 'best-action-adventure', name: 'Melhor jogo de ação/aventura', nominees: ["'Death Stranding 2: On the beach'", "'Ghost of Yotei'", "'Hollow Knight: Silksong'", "'Indiana Jones and the great circle'", "'Split Fiction'"] },
        { id: 'most-anticipated', name: 'Jogo mais aguardado', nominees: ["'007: First light'", "'Grand theft auto 6'", "'Marvel's Wolverine'", "'Resident Evil: Requiem'", "'The Witcher 4'"] },
        { id: 'content-creator-year', name: 'Criador de conteúdo do ano', nominees: ['Caedrel', 'Kai Cenat', 'Moistcr1tikal', 'Sakura Miko', 'The Burnt Peanut'] },
        { id: 'best-vr-ar', name: 'Melhor jogo de realidade virtual/realidade aumentada', nominees: ["'Alien: Rogue Incursion'", "'Arken Age'", "'Ghost town'", "'Marvel's Deadpool VR'", "'The midnight walk'"] },
        { id: 'best-debut-indie', name: 'Melhor jogo de estreia independente', nominees: ["'Blue Prince'", "'Clair Obscur: Expedition 33'", "'Despelote'", "'Dispatch'", "'Megabonk'"] },
        { id: 'best-indie-game', name: 'Melhor jogo independente', nominees: ["'Absolum'", "'Ball x Pit'", "'Blue Prince'", "'Clair Obscur: Expedition 33'", "'Hades 2'", "'Hollow Knight: Silksong'"] },
        { id: 'best-multiplayer', name: 'Melhor multiplayer', nominees: ["'Arc Raiders'", "'Battlefield 6'", "'Elden Ring: Nightreign'", "'Peak'", "'Split Fiction'"] },
        { id: 'games-for-impact', name: 'Games for impact', nominees: ["'Consume me'", "'Despelote'", "'Lost records: Bloom & rage'", "'South of midnight'", "'Wanderstop'"] },
        { id: 'best-community-support', name: 'Melhor apoio à comunidade', nominees: ["'Baldur's Gate 3'", "'Final Fantasy 14'", "'Fortnite'", "'Helldivers 2'", "'No man's sky'"] },
        { id: 'best-narrative', name: 'Melhor narrativa', nominees: ["'Clair Obscur: Expedition 33'", "'Death Stranding 2: On the beach'", "'Ghost of Yotei'", "'Kingdom Come: Deliverance 2'", "'Silent Hill f'"] },
        { id: 'best-adaptation', name: 'Melhor adaptação', nominees: ["'Um filme Minecraft'", "'Devil May Cry'", "'Splinter Cell: Deathwatch'", "'The last of us'", "'Until Dawn'"] },
        { id: 'best-audio-design', name: 'Melhor direção de som', nominees: ["'Battlefield 6'", "'Clair Obscur: Expedition 33'", "'Death Stranding 2: On the beach'", "'Ghost of Yotei'", "'Silent Hill f'"] },
        { id: 'best-score-music', name: 'Melhor trilha e música', nominees: ["Christopher Larkin - 'Hollow Knight: Silksong'", "Darren Korb - 'Hades 2'", "Lorien Testard - 'Clair Obscur: Expedition 33'", "Toma Otowa - 'Ghost of Yotei'", "Woodkid & Ludvig Forssell - 'Death Stranding 2: On the beach'"] },
        { id: 'best-art-direction', name: 'Melhor direção de arte', nominees: ["'Clair Obscur: Expedition 33'", "'Death Stranding 2: On the beach'", "'Ghost of Yotei'", "'Hades 2'", "'Hollow Knight: Silksong'"] },
        { id: 'best-mobile-game', name: 'Melhor jogo para dispositivos móveis', nominees: ["'Destiny rising'", "'Persona 5: The Phantom X'", "'Sonic Rumble'", "'Umamusume: Pretty derby'", "'Wuthering waves'"] },
        { id: 'best-ongoing-game', name: 'Melhor jogo em atualização', nominees: ["'Final Fantasy 14'", "'Fortnite'", "'Helldivers 2'", "'Marvel Rivals'", "'No man's sky'"] },
        { id: 'best-performance', name: 'Melhor atuação', nominees: ["Ben Starr - 'Clair Obscur: Expedition 33'", "Charlie Cox - 'Clair Obscur: Expedition 33'", "Erika Ishii - 'Ghost of Yotei'", "Jennifer English - 'Clair Obscur: Expedition 33'", "Konatsu Kato - 'Silent Hill f'", "Troy Baker - 'Indiana Jones and the great circle'"] }
    ];
    
    // Estado da aplicação
    let currentCategoryIndex = 0;
    let selectedGames = {};
    let completedCategories = new Set();
    let voteStats = JSON.parse(localStorage.getItem('gameAwardsVoteStats')) || {};
    
    // Inicializar estatísticas
    initVoteStats();
    
    // Inicializar navegação
    initNavigation();
    
    // Carregar categoria atual
    loadCategory(currentCategoryIndex);
    
    // Atualizar contadores
    totalCategoriesCount.textContent = categoriesData.length;
    totalCategoriesSpan.textContent = categoriesData.length;
    updateProgress();
    
    // Event Listeners
    prevCategoryBtn.addEventListener('click', goToPreviousCategory);
    nextCategoryBtn.addEventListener('click', goToNextCategory);
    finalizeVoteBtn.addEventListener('click', finalizeVoting);
    
    // Função para inicializar estatísticas
    function initVoteStats() {
        categoriesData.forEach(category => {
            if (!voteStats[category.id]) {
                voteStats[category.id] = {};
                category.nominees.forEach(nominee => {
                    voteStats[category.id][nominee] = 0;
                });
            }
        });
        saveVoteStats();
    }
    
    // Função para inicializar navegação
    function initNavigation() {
        categoryNavigation.innerHTML = '';
        
        categoriesData.forEach((category, index) => {
            const navItem = document.createElement('div');
            navItem.className = 'category-nav-item';
            navItem.textContent = `${index + 1}. ${category.name}`;
            navItem.dataset.index = index;
            
            if (index === currentCategoryIndex) {
                navItem.classList.add('current');
            }
            
            if (completedCategories.has(category.id)) {
                navItem.classList.add('completed');
            }
            
            navItem.addEventListener('click', () => {
                if (index !== currentCategoryIndex) {
                    goToCategory(index);
                }
            });
            
            categoryNavigation.appendChild(navItem);
        });
    }
    
    // Função para carregar uma categoria
    function loadCategory(index) {
        if (index < 0 || index >= categoriesData.length) return;
        
        const category = categoriesData[index];
        
        // Atualizar navegação
        updateNavigation(index);
        
        // Atualizar número da categoria
        currentCategoryNumber.textContent = index + 1;
        
        // Calcular porcentagens
        const totalVotes = calculateTotalVotes(category.id);
        const percentages = calculatePercentages(category.id, totalVotes);
        
        // Criar conteúdo da categoria
        currentCategoryContainer.innerHTML = `
            <div class="category-header">
                <h2>
                    <i class="fas fa-award"></i>
                    ${category.name}
                </h2>
                <p class="category-description">
                    Selecione uma opção abaixo. Clique em "Próxima Categoria" para continuar.
                </p>
            </div>
            
            <div class="games-grid" id="gamesGrid-${category.id}">
                ${category.nominees.map(nominee => {
                    const percentage = percentages[nominee] || 0;
                    const isSelected = selectedGames[category.id] === nominee;
                    
                    return `
                        <div class="game-card ${isSelected ? 'selected' : ''}" 
                             data-game="${nominee}" 
                             data-category="${category.id}">
                            <div class="game-image">
                                <img src="${getGameImageUrl(nominee)}" 
                                     alt="${nominee}"
                                     onerror="this.src='https://via.placeholder.com/400x200/1a5e2c/ffffff?text=${encodeURIComponent(nominee.substring(0, 30))}'">
                            </div>
                            <div class="game-info">
                                <h3>${nominee}</h3>
                                <div class="game-meta">
                                    <div class="vote-percentage">
                                        ${percentage.toFixed(1)}% dos votos
                                    </div>
                                    <div class="game-selected">
                                        <i class="fas fa-check-circle"></i> Selecionado
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
        
        // Adicionar eventos aos cards
        setTimeout(() => {
            const gameCards = currentCategoryContainer.querySelectorAll('.game-card');
            gameCards.forEach(card => {
                card.addEventListener('click', function() {
                    selectGame(this, category.id);
                });
            });
        }, 100);
        
        // Atualizar botões de navegação
        updateNavigationButtons();
    }
    
    // Função para selecionar um jogo
    function selectGame(card, categoryId) {
        const gameName = card.dataset.game;
        
        // Desselecionar todos os cards desta categoria
        const categoryCards = currentCategoryContainer.querySelectorAll('.game-card');
        categoryCards.forEach(c => c.classList.remove('selected'));
        
        // Selecionar o card clicado
        card.classList.add('selected');
        
        // Atualizar estado
        selectedGames[categoryId] = gameName;
        
        // Marcar categoria como completada
        if (!completedCategories.has(categoryId)) {
            completedCategories.add(categoryId);
            updateProgress();
            updateNavigation(currentCategoryIndex);
        }
        
        // Atualizar botão de próxima categoria
        updateNavigationButtons();
    }
    
    // Função para ir para próxima categoria
    function goToNextCategory() {
        const currentCategory = categoriesData[currentCategoryIndex];
        
        // Verificar se a categoria atual foi preenchida
        if (!selectedGames[currentCategory.id]) {
            alert(`Por favor, selecione uma opção na categoria "${currentCategory.name}" antes de continuar.`);
            return;
        }
        
        // Animar saída
        currentCategoryContainer.style.animation = 'slideOutLeft 0.3s ease-out forwards';
        
        setTimeout(() => {
            // Ir para próxima categoria
            if (currentCategoryIndex < categoriesData.length - 1) {
                currentCategoryIndex++;
                loadCategory(currentCategoryIndex);
                currentCategoryContainer.style.animation = 'slideInRight 0.3s ease-out';
            }
        }, 300);
    }
    
    // Função para ir para categoria anterior
    function goToPreviousCategory() {
        // Animar saída
        currentCategoryContainer.style.animation = 'slideOutLeft 0.3s ease-out forwards';
        
        setTimeout(() => {
            // Ir para categoria anterior
            if (currentCategoryIndex > 0) {
                currentCategoryIndex--;
                loadCategory(currentCategoryIndex);
                currentCategoryContainer.style.animation = 'slideInRight 0.3s ease-out';
            }
        }, 300);
    }
    
    // Função para ir para uma categoria específica
    function goToCategory(index) {
        // Animar saída
        currentCategoryContainer.style.animation = 'slideOutLeft 0.3s ease-out forwards';
        
        setTimeout(() => {
            currentCategoryIndex = index;
            loadCategory(currentCategoryIndex);
            currentCategoryContainer.style.animation = 'slideInRight 0.3s ease-out';
        }, 300);
    }
    
    // Função para atualizar navegação
    function updateNavigation(index) {
        const navItems = categoryNavigation.querySelectorAll('.category-nav-item');
        navItems.forEach((item, i) => {
            item.classList.remove('current');
            if (i === index) {
                item.classList.add('current');
            }
            
            const categoryId = categoriesData[i].id;
            if (completedCategories.has(categoryId)) {
                item.classList.add('completed');
            } else {
                item.classList.remove('completed');
            }
        });
    }
    
    // Função para atualizar botões de navegação
    function updateNavigationButtons() {
        // Botão anterior
        prevCategoryBtn.disabled = currentCategoryIndex === 0;
        
        // Botão próximo
        const currentCategory = categoriesData[currentCategoryIndex];
        const isCurrentCompleted = !!selectedGames[currentCategory.id];
        nextCategoryBtn.disabled = !isCurrentCompleted;
        
        // Se for a última categoria, mudar texto do botão
        if (currentCategoryIndex === categoriesData.length - 1) {
            nextCategoryBtn.innerHTML = `Finalizar <i class="fas fa-check-circle"></i>`;
            nextCategoryBtn.removeEventListener('click', goToNextCategory);
            nextCategoryBtn.addEventListener('click', finalizeVoting);
        } else {
            nextCategoryBtn.innerHTML = `Próxima Categoria <i class="fas fa-chevron-right"></i>`;
            nextCategoryBtn.removeEventListener('click', finalizeVoting);
            nextCategoryBtn.addEventListener('click', goToNextCategory);
        }
    }
    
    // Função para atualizar progresso
    function updateProgress() {
        const completedCount = completedCategories.size;
        const total = categoriesData.length;
        const percentage = (completedCount / total) * 100;
        
        progressFill.style.width = `${percentage}%`;
        progressCount.textContent = completedCount;
        
        // Habilitar botão de finalizar se todas estiverem completas
        finalizeVoteBtn.disabled = completedCount !== total;
    }
    
    // Função para finalizar votação
    function finalizeVoting() {
        // Verificar se todas as categorias foram preenchidas
        if (completedCategories.size !== categoriesData.length) {
            alert('Por favor, complete todas as categorias antes de finalizar.');
            return;
        }
        
        // Atualizar estatísticas
        Object.entries(selectedGames).forEach(([categoryId, gameName]) => {
            if (voteStats[categoryId] && voteStats[categoryId][gameName] !== undefined) {
                voteStats[categoryId][gameName]++;
            }
        });
        saveVoteStats();
        
        // Calcular jogo mais votado pelo usuário
        const voteCount = {};
        Object.values(selectedGames).forEach(game => {
            voteCount[game] = (voteCount[game] || 0) + 1;
        });
        
        let mostVotedGame = null;
        let maxVotes = 0;
        
        Object.entries(voteCount).forEach(([game, votes]) => {
            if (votes > maxVotes) {
                maxVotes = votes;
                mostVotedGame = game;
            }
        });
        
        // Preparar dados para resultados
        const votingData = {
            selections: selectedGames,
            mostVoted: {
                game: mostVotedGame,
                count: maxVotes
            },
            voteStats: voteStats,
            timestamp: new Date().toISOString()
        };
        
        // Salvar e redirecionar
        localStorage.setItem('gameAwardsVotes', JSON.stringify(votingData));
        window.location.href = 'results.html';
    }
    
    // Funções auxiliares
    function calculateTotalVotes(categoryId) {
        const categoryVotes = voteStats[categoryId];
        return Object.values(categoryVotes).reduce((sum, votes) => sum + votes, 0);
    }
    
    function calculatePercentages(categoryId, totalVotes) {
        const percentages = {};
        const categoryVotes = voteStats[categoryId];
        
        if (totalVotes > 0) {
            Object.keys(categoryVotes).forEach(nominee => {
                percentages[nominee] = (categoryVotes[nominee] / totalVotes) * 100;
            });
        }
        
        return percentages;
    }
    
    function getGameImageUrl(gameName) {
        const gameImageMap = {
            'Clair Obscur: Expedition 33': 'https://cdn.cloudflare.steamstatic.com/steam/apps/1158690/header.jpg',
            'Death Stranding 2: On the beach': 'https://cdn.cloudflare.steamstatic.com/steam/apps/1850570/header.jpg',
            'Hades 2': 'https://cdn.cloudflare.steamstatic.com/steam/apps/1145350/header.jpg',
            'Hollow Knight: Silksong': 'https://cdn.cloudflare.steamstatic.com/steam/apps/1030300/header.jpg',
            'Kingdom Come: Deliverance 2': 'https://cdn.cloudflare.steamstatic.com/steam/apps/3794300/header.jpg'
        };
        
        for (const [key, url] of Object.entries(gameImageMap)) {
            if (gameName.includes(key)) {
                return url;
            }
        }
        
        return `https://via.placeholder.com/400x200/1a5e2c/ffffff?text=${encodeURIComponent(gameName.substring(0, 30))}`;
    }
    
    function saveVoteStats() {
        localStorage.setItem('gameAwardsVoteStats', JSON.stringify(voteStats));
    }
});