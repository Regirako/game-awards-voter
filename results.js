// results.js - Lógica da página de resultados (CORRIGIDA)

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
        'Clair Obscur: Expedition 33': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1903340/be3305b02d4db0dffa3458537118423bf2792d7e/header.jpg?t=1762765069',
        'Death Stranding 2: On the Beach': 'https://i.ytimg.com/vi/6cs-A1rNvEE/maxresdefault.jpg',
        'Hades 2': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1145350/91ac334a2c137d08968ccc0bc474a02579602100/header.jpg?t=1759973532',
        'Hollow Knight: Silksong': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030300/7983574d464e6559ac7e24275727f73a8bcca1f3/header.jpg?t=1764916587',
        'Kingdom Come: Deliverance 2': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1771300/header.jpg?t=1763987645',
        'Donkey Kong Bananza': 'https://i.ytimg.com/vi/vgJ7J70RTKo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAbSkuovuyhJ3lilPAGalUCVBR7og',
        'Ghost of Yotei': 'https://levelupnews.com.br/wp-content/uploads/2025/03/img_7850-1.jpg',
        'Split Fiction': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2001120/header.jpg?t=1763484567',
        'Avowed': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2457220/header.jpg?t=1765372812',
        'Monster Hunter Wilds': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2246340/header.jpg?t=1765334071',
        'The Outer Worlds 2': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1449110/fe273e39cbaf4997d1c8e53879800f07dba0ee03/header.jpg?t=1761760147',
        'Indiana Jones and the Great Circle': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2677660/5446adc6c89a73bcbc24c0eed16d8ced7f13f240/header_brazilian.jpg?t=1763745007',
        'Silent Hill f': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2947440/7e5d923ac622bd1775ebc9b5d4b5b0a24bf5ed40/header.jpg?t=1763007193',
        "Assassin's Creed Shadows": 'https://clan.akamai.steamstatic.com/images/45310381/e9cc4f0447ef5bdb9b3c829524731abcb17f4af8_400x225.jpg',
        'Doom: The Dark Ages': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3017860/header.jpg?t=1764606093',
        'Battlefield 6': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2807960/c12d12ce3c7d217398d3fcad77427bfc9d57c570/header.jpg?t=1764700003',
        'Ninja Gaiden 4': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2627260/header.jpg?t=1762366827',
        'Shinobi: Art of Vengeance': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2361770/782c310729ea0fad430124f806e76cff1c5c015e/header.jpg?t=1763988116',
        '2XKO': 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZQQNVUNtAnCVGDFFHyBUUZ60B6-wiF-oRHJeQhrylyRJpFKK-TWBtPBFSl0RHYzBeU5cMg5TpS3THf0gNSUNC4TarXtZwizgm94ynKzHs_CTVgJiWVLoHJU_wE4KVHMISA-dYWCWjmAUJNpe0NEliAn6WSsKMBQ6okpcMUeuR8X2OTfqsFOljk2dUZTU/s3840/2xko-nome-oficial-project-l.jpg',
        'Fatal Fury: City of the Wolves': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2492040/header.jpg?t=1762809995',
        'Mortal Kombat: Legacy Kollection': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3454980/24fece3b770962ade1a94dfb3f134befe97469b9/header.jpg?t=1763496851',
        'Virtua Fighter 5 R.E.V.O. World Stage': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3112260/9501a2ea86226e8620f07dd889e1c365e2d32e66/header.jpg?t=1764731674',
        'Capcom Fighting Collection 2': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2400430/header.jpg?t=1757478014',
        'The Alters': 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1601570/53ebf6abda9fed04afba6ec1e8b93744cafe04a7/capsule_616x353.jpg?t=1763565704',
        'Final Fantasy Tactics - The Ivalice Chronicles': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1004640/2d8e4389e157b62f07bdc7c9468bf04010d574c0/header.jpg?t=1762490936',
        'Jurassic World Evolution 3': 'https://www.jurassicworldevolution.com/og_image.jpg',
        'Civilization 7': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1295660/header.jpg?t=1762277940',
        'Tempest Rising': 'https://upload.wikimedia.org/wikipedia/en/0/02/Tempest_Rising_Steam_header.jpg',
        'Two Point Museum': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2185060/f518d1aa2754296e280ba3fe0d2bd4392fa6e3eb/header.jpg?t=1764687868',
        'Lego Party!': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1969370/bdd135d96ca368b1e1cb4f221052adcd0cfbff61/header.jpg?t=1760031466',
        'Lego Voyagers': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1538550/db718ae2be60558df2ef9fcd65302ad87a6045d4/header.jpg?t=1765323947',
        'Mario Kart World': 'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/store/software/switch2/70010000095431/b664445df3f7a3765a760822d725ea1853bc6f43d2aa96ccee81d6f45cb281ef',
        'Sonic Racing: CrossWorlds': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2486820/270b38f7e6b9ccd5bc7213e71c1e7594b22ba5fe/header_alt_assets_0.jpg?t=1764191870',
        'Atomfall': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/801800/header.jpg?t=1762346241',
        'South of Midnight': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1934570/header.jpg?t=1744907120',
        '007: First Light': 'https://www.adrenaline.com.br/wp-content/uploads/2025/12/007-first-light-912x569.webp',
        'Grand Theft Auto 6': 'https://stories.cnnbrasil.com.br/wp-content/uploads/sites/9/2025/01/image_af9532.png',
        "Marvel's Wolverine": 'https://image.api.playstation.com/vulcan/ap/rnd/202510/0721/0f8097282863ccd07abf4485a2bc733111127e628552207e.jpg',
        'Resident Evil: Requiem': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3764200/d478bccdd167e0d8e1f4760bcad7e6bcbbb3258d/header.jpg?t=1761795352',
        'The Witcher 4': 'https://levelupnews.com.br/wp-content/uploads/2025/06/18004cd0-5a82-437c-9186-b9de20b02b46-1.jpg',
        'Alien: Rogue Incursion': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3655390/0e501987ea970bd9aab9c2959b37f2e442d2079d/header.jpg?t=1759248016',
        'Arken Age': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2274200/header.jpg?t=1764175255',
        'Ghost Town': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2496180/header.jpg?t=1764089384',
        "Marvel's Deadpool VR": 'https://lookaside.fbsbx.com/elementpath/media/?media_id=2536558160012725&version=1749480140&transcode_extension=webp',
        'The Midnight Walk': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2863640/header.jpg?t=1764152671',
        'Blue Prince': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1569580/879ac248a3b548a6bbc32771b950756378e7e922/header.jpg?t=1764595214',
        'Despelote': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2367820/header.jpg?t=1759948341',
        'Dispatch': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2592160/header.jpg?t=1764278303',
        'Megabonk': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3405340/d06cb39a82a703e42541085fc61b42d80904b3f8/header.jpg?t=1760445338',
        'Absolum': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1904480/65f868078425ea29b87cb85075fcd1b3a8b71400/header.jpg?t=1763489963',
        'Ball x Pit': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2062430/a157aa8de4bd9070194ddffb27c31636355dca05/header.jpg?t=1764122366',
        'Arc Raiders': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1808500/04baafaf64a5aa5f46ecda5d71889a4848dc0628/header.jpg?t=1765441443',
        'Elden Ring: Nightreign': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2622380/header.jpg?t=1764808750',
        'Peak': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3527290/31bac6b2eccf09b368f5e95ce510bae2baf3cfcd/header.jpg?t=1764003551',
        'Consume Me': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2359120/e8a024adceea4ab8f851274785ec7d62d8bf64fc/header.jpg?t=1758745344',
        'Lost Records: Bloom & Rage': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1902960/header.jpg?t=1762783814',
        'Wanderstop': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1299460/header.jpg?t=1764011216',
        "Baldur's Gate 3": 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/48a2fcbda8565bb45025e98fd8ebde8a7203f6a0/header.jpg?t=1759825106',
        'Final Fantasy 14': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/39210/header.jpg?t=1760606311',
        'Fortnite': 'https://i.ytimg.com/vi/adGdyCdvKz4/maxresdefault.jpg',
        'Helldivers 2': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/553850/10b090a2f39571b0fbf3e3700276ecd857b9c1a8/header_brazilian.jpg?t=1763568660',
        "No Man's Sky": 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/275850/5123063ede60c6db0f79497774f00de784db7358/header_alt_assets_25.jpg?t=1763984433',
        'Um Filme Minecraft': 'https://akamai.sscdn.co/uploadfile/letras/playlists/0/f/0/c/0f0c0051d76042ad8fd1121e742718a1.jpg',
        'Devil May Cry': 'https://occ-0-8407-92.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABQokw-UFDcTGSOVLQKggWPpoAalrqT13KvtflIt9eV18K1T7x7chjziDFP3j9O3sC8ALGhbcIDBUfq6uslirp9oI6uZt_1iNrrou.jpg?r=47d',
        'Splinter Cell: Deathwatch': 'https://nexafeed.com/wp-content/uploads/2025/10/splinter-cell-deathwatch-1024x576.webp',
        'The Last of Us': 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiChuLJKh1DQDSgcUfsASo2yBRfXTo2_ObpWlz-GxnXNNYUtmxndk_1QfhQSSjqrPCV3_NC4iRFAcxkUXRW4NdE4uLDy8FMV_GFwBG8SaHKUiNv8TN6JxOxJEq64Wr_EYYCg7fswsJqXMtF8G80dk2V7goMD5_EYA7qjuCj3S5ugzbAxeJWwdOTny9L/s1920/the-last-of-us-serie-hbo-podera-ter-ate-tres-temporadas.jpg',
        'Until Dawn': 'https://i.ytimg.com/vi/-9vA1rIoee8/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLD2XvlwP4taq-y0ZohIinLeRNDS_Q',
        'Destiny Rising': 'https://gamingtrend.com/content/images/size/w1200/2025/02/destiny1.jpg',
        'Persona 5: The Phantom X': 'https://static0.polygonimages.com/wordpress/wp-content/uploads/2025/05/Persona-5-The-Phantom-X-Key-Art.jpg?w=1600&h=900&fit=crop',
        'Sonic Rumble': 'https://i.ytimg.com/vi/I-1HtmQdGPI/maxresdefault.jpg',
        'Umamusume: Pretty Derby': 'https://a.storyblok.com/f/178900/900x506/5c7ff66b5b/umamusume-game.jpg/m/filters:quality(95)format(webp)',
        'Wuthering Waves': 'https://play-lh.googleusercontent.com/7ePq9193_ivAh-yvYUQAeCuJEt3ixJsj3fEFmLM8O8B_BTQN4sxV8JhUGs4ENOe2WS5GrzjlTJKAmMam4kXiYRQ=w526-h296-rw',
        'Marvel Rivals': 'https://sm.ign.com/ign_br/news/m/marvel-riv/marvel-rivals-announced-a-6v6-superhero-team-based-free-to-p_8f6k.jpg'
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
        if (!mostVoted || !mostVoted.game) {
            mostVotedGame.textContent = 'Nenhum jogo selecionado';
            mostVotedCount.textContent = '';
            return;
        }
        
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
                 onerror="this.src='https://via.placeholder.com/320x150/1a5e2c/ffffff?text=${encodeURIComponent(gameName.substring(0, 30))}'">
        `;
    }
    
    // Função para atualizar estatísticas
    function updateStats(selections, mostVoted) {
        // Contar categorias votadas
        categoriesCount.textContent = Object.keys(selections).length;
        
        // Contar total de jogos únicos votados
        const uniqueGames = new Set(Object.values(selections));
        totalGames.textContent = uniqueGames.size;
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
        return `https://via.placeholder.com/320x150/1a5e2c/ffffff?text=${encodeURIComponent(cleanGameName.substring(0, 30))}`;
    }
    
    // Configurar botões de ação
    function setupButtons() {
        // Botão de capturar card (screenshot) - CORRIGIDO
        shareBtn.addEventListener('click', function() {
            captureCardScreenshot();
        });
        
        // Botão de nova votação
        newVoteBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
    
    // Função para capturar screenshot do card - CORRIGIDA
    function captureCardScreenshot() {
        // Verificar se html2canvas está carregado
        if (typeof html2canvas === 'undefined') {
            alert('A funcionalidade de captura está carregando. Por favor, tente novamente em alguns segundos.');
            return;
        }
        
        // Desabilitar botão e mostrar feedback
        const originalText = shareBtn.innerHTML;
        shareBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
        shareBtn.disabled = true;
        
        // Configurações otimizadas para html2canvas
        const config = {
            backgroundColor: null,
            scale: 2,
            useCORS: true,
            allowTaint: true,
            logging: false,
            onclone: function(clonedDoc) {
                // Garantir que todos os estilos estão carregados no clone
                const clonedCard = clonedDoc.getElementById('resultCard');
                if (clonedCard) {
                    clonedCard.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.4)';
                }
            }
        };
        
        // Tentar capturar com timeout
        const capturePromise = html2canvas(resultCard, config);
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout ao capturar card')), 10000)
        );
        
        Promise.race([capturePromise, timeoutPromise])
            .then(canvas => {
                // Converter para data URL
                const imageData = canvas.toDataURL('image/png');
                
                // Criar link para download
                const link = document.createElement('a');
                const fileName = `ecologica-game-awards-${new Date().toISOString().slice(0, 10)}.png`;
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
                showNotification('Card salvo como imagem! Verifique sua pasta de downloads.');
                
            }).catch(error => {
                console.error('Erro ao capturar screenshot:', error);
                
                // Restaurar botão
                shareBtn.innerHTML = originalText;
                shareBtn.disabled = false;
                
                // Mensagem amigável de erro
                if (error.message.includes('Timeout')) {
                    showNotification('A captura demorou muito. Tente novamente.');
                } else if (error.message.includes('CORS') || error.message.includes('taint')) {
                    showNotification('Algumas imagens não puderam ser carregadas. A captura pode estar incompleta.');
                } else {
                    showNotification('Erro ao capturar o card. Tente novamente.');
                }
            });
    }
    
    // Mostrar notificação
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
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
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