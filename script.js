// script.js - Lógica da votação por categoria (ATUALIZADO)

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
    
    // MAPA DE IMAGENS DOS JOGOS (ATUALIZADO COM NOVAS URLs)
    const gameImages = {
        'Clair Obscur: Expedition 33': 'https://i.imgur.com/BdhoFqu.png',
        'Death Stranding 2: On the Beach': 'https://i.ytimg.com/vi/6cs-A1rNvEE/maxresdefault.jpg',
        'Hades 2': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1145350/91ac334a2c137d08968ccc0bc474a02579602100/header.jpg?t=1759973532',
        'Hollow Knight: Silksong': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030300/7983574d464e6559ac7e24275727f73a8bcca1f3/header.jpg?t=1764916587',
        'Kingdom Come: Deliverance 2': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1771300/header.jpg?t=1763987645',
        'Donkey Kong Bananza': 'https://www.showmetech.com.br/wp-content/uploads//2025/07/cover-dk-bananza.png',
        'Ghost of Yotei': 'https://levelupnews.com.br/wp-content/uploads/2025/03/img_7850-1.jpg',
        'Split Fiction': 'https://i.imgur.com/gaYkRJB.jpeg',
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
        'The Alters': 'https://cdn1.epicgames.com/spt-assets/cbdabb1be05c4501bc3c37538d939bb3/the-alters-1nzq5.jpg',
        'Final Fantasy Tactics - The Ivalice Chronicles': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1004640/2d8e4389e157b62f07bdc7c9468bf04010d574c0/header.jpg?t=1762490936',
        'Jurassic World Evolution 3': 'https://www.jurassicworldevolution.com/og_image.jpg',
        'Civilization 7': 'https://image.api.playstation.com/vulcan/ap/rnd/202408/1323/d4493d2c5081068c00bce351d7d16dfdf2a3f9dbe9d1503c.jpg',
        'Tempest Rising': 'https://upload.wikimedia.org/wikipedia/en/0/02/Tempest_Rising_Steam_header.jpg',
        'Two Point Museum': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2185060/f518d1aa2754296e280ba3fe0d2bd4392fa6e3eb/header.jpg?t=1764687868',
        'Lego Party!': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1969370/bdd135d96ca368b1e1cb4f221052adcd0cfbff61/header.jpg?t=1760031466',
        'Lego Voyagers': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1538550/db718ae2be60558df2ef9fcd65302ad87a6045d4/header.jpg?t=1765323947',
        'Mario Kart World': 'https://static.newgamenetwork.com/Mario-Kart-World-Review_FI.jpg',
        'Sonic Racing: CrossWorlds': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2486820/270b38f7e6b9ccd5bc7213e71c1e7594b22ba5fe/header_alt_assets_0.jpg?t=1764191870',
        'Atomfall': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/801800/header.jpg?t=1762346241',
        'South of Midnight': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1934570/header.jpg?t=1744907120',
        '007: First Light': 'https://www.adrenaline.com.br/wp-content/uploads/2025/12/007-first-light-912x569.webp',
        'Grand Theft Auto 6': 'https://viciados.net/wp-content/uploads/2024/09/GTA-6-Grand-Theft-Auto-VI-Jason-Lucia-Rockstar-Games-2025-1280x720.webp',
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
        "No Man's Sky": 'https://assets.nuuvem.com/image/upload/t_product_sharing_banner/v1/products/5de7d16585f23656ce0f01bd/sharing_images/iljwhovdsluyadp2exa7.jpg',
        'Um Filme Minecraft': 'https://akamai.sscdn.co/uploadfile/letras/playlists/0/f/0/c/0f0c0051d76042ad8fd1121e742718a1.jpg',
        'Devil May Cry': 'https://static.toiimg.com/thumb/msid-120238144,imgsize-29776,width-400,resizemode-4/120238144.jpg',
        'Splinter Cell: Deathwatch': 'https://nexafeed.com/wp-content/uploads/2025/10/splinter-cell-deathwatch-1024x576.webp',
        'The Last of Us': 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiChuLJKh1DQDSgcUfsASo2yBRfXTo2_ObpWlz-GxnXNNYUtmxndk_1QfhQSSjqrPCV3_NC4iRFAcxkUXRW4NdE4uLDy8FMV_GFwBG8SaHKUiNv8TN6JxOxJEq64Wr_EYYCg7fswsJqXMtF8G80dk2V7goMD5_EYA7qjuCj3S5ugzbAxeJWwdOTny9L/s1920/the-last-of-us-serie-hbo-podera-ter-ate-tres-temporadas.jpg',
        'Until Dawn': 'https://i.ytimg.com/vi/-9vA1rIoee8/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLD2XvlwP4taq-y0ZohIinLeRNDS_Q',
        'Destiny Rising': 'https://gamingtrend.com/content/images/size/w1200/2025/02/destiny1.jpg',
        'Persona 5: The Phantom X': 'https://static0.polygonimages.com/wordpress/wp-content/uploads/2025/05/Persona-5-The-Phantom-X-Key-Art.jpg?w=1600&h=900&fit=crop',
        'Sonic Rumble': 'https://play-lh.googleusercontent.com/VfbwWSAONEpo5nOe3-KYf7DGv_SWA-AY9_t1gjoPpxsxW29Iyr_LKNwDoJYR3vvtH1XNEPYHj3EVlB_DnHgy=w526-h296-rw',
        'Umamusume: Pretty Derby': 'https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/store/software/switch/70010000071495/453c74766a2e8812397cda3eeba5079f9af2133f8872dfad6caea906d99f8f0a',
        'Wuthering Waves': 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3513350/f203fd0d93b74cd157d88d5d8316a581083007bf/header.jpg?t=1763596285',
        'Marvel Rivals': 'https://sm.ign.com/ign_br/news/m/marvel-riv/marvel-rivals-announced-a-6v6-superhero-team-based-free-to-p_8f6k.jpg',
        
        // NOVAS IMAGENS ADICIONADAS
        'Gen.G - League of Legends': 'https://geng.gg/cdn/shop/files/06_2490_R4.jpg?v=1736792371&width=3000',
        'NRG - Valorant': 'https://noticias.maisesports.com.br/wp-content/uploads/2025/10/vrg-campea-valorant-champions-2025.jpg',
        'Team Falcons - Dota 2': 'https://i.ytimg.com/vi/xwY_U5EL55w/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDdhvASTy1mHKCnJAlf_bb0_mhxcg',
        'Team Liquid PH - Mobile Legends: Bang Bang': 'https://liquipedia.net/commons/images/thumb/9/94/Team_Liquid_PH_at_MSC_2025.jpg/675px-Team_Liquid_PH_at_MSC_2025.jpg',
        'Team Vitality - Counter Strike 2': 'https://vitality.gg/cdn/shop/articles/CS2_BLAST_AustinMajor_champions_CP_32bf2ec4-84c3-41e0-922f-ef766f1dc0d5.jpg?v=1751307798',
        'Brawk': 'https://www.hotspawn.com/wp-content/uploads/2025/10/NRG-brawk-Odin-the-MVP-at-VALORANT-Champions-2025-1125x633.jpg',
        'Chovy': 'https://noticias.maisesports.com.br/wp-content/uploads/2023/10/chovy-worlds-2023.jpg',
        'Forsaken': 'https://media.suara.com/pictures/1600x840/2025/09/16/28598-jason-f0rsaken-susanto-pro-player-valorant.jpg',
        'Kakeru': 'https://liquipedia.net/commons/images/0/07/Kakeru_Red_Bull_Kumite_2025.jpg',
        'Menard': 'https://liquipedia.net/commons/images/thumb/a/ab/MenaRD_EVO_2025.jpg/600px-MenaRD_EVO_2025.jpg',
        'Zywoo': 'https://liquipedia.net/commons/images/thumb/f/ff/ZywOo_at_BLAST_Open_Spring_2025.jpg/600px-ZywOo_at_BLAST_Open_Spring_2025.jpg',
        'Counter Strike 2': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/header.jpg?t=1749053861',
        'Dota 2': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570/header.jpg?t=1762820658',
        'League of Legends': 'https://s2.glbimg.com/cg0Yf7KUqt4wFsxoPyeAIUhZMv8=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2019/Y/L/lIgTd8SVCHPu8lGXmbJg/novo-logo-league-of-legends.jpg',
        'Mobile Legends: Bang Bang': 'https://t2.tudocdn.net/622409?w=1920',
        'Valorant': 'https://cdn.sortiraparis.com/images/1001/66131/1103306-valorant-le-jeu-video-signe-riot-games-est-disponible.jpg',
        'FC 26': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3405690/2d96aa1b06e453cd62dae9029d412f19e61932c3/header.jpg?t=1761904811',
        'F1 25': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3059520/37f833ca5bd3d5c3eec2b411131f3e00f580bbe7/header.jpg?t=1762963192',
        'Rematch': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2138720/header.jpg?t=1761052542',
        'Caedrel': 'https://liquipedia.net/commons/images/6/69/Caedrel_Worlds_2024.jpg',
        'Kai Cenat': 'https://gamohol.com/wp-content/uploads/2023/02/kai-cenat.webp',
        'Moistcr1tikal': 'https://win.gg/wp-content/uploads/2021/12/Moistcritical.jpg.webp',
        'Sakura Miko': 'https://cdn.prod.website-files.com/5d7e8885cad5174a2fcb98d7/64ad80a19abfb265fd9dfe81_Sakura%2520Miko.jpeg',
        'The Burnt Peanut': 'https://www.indy100.com/media-library/the-burnt-peanut-won-best-vtuber-at-the-streamer-awards-2025.jpg?id=62291768&width=1200&height=600&coordinates=0%2C11%2C0%2C15',
        'Christopher Larkin - Hollow Knight: Silksong': 'https://f4.bcbits.com/img/0023421569_10.jpg',
        'Darren Korb - Hades 2': 'https://cdn.shopify.com/s/files/1/1226/8792/files/Origins.png?v=1611406904',
        'Lorien Testard - Clair Obscur: Expedition 33': 'https://live-production.wcms.abc-cdn.net.au/1ff88334db86c8fc11b717e42fcd6cd3?impolicy=wcms_crop_resize&cropH=3290&cropW=4935&xPos=0&yPos=90&width=862&height=575',
        'Toma Otowa - Ghost of Yotei': 'https://m.media-amazon.com/images/M/MV5BMGI3OWRiNGUtNWZkNi00YTNiLWEwZjktZGQ2OGUyMDBkOGFlXkEyXkFqcGc@._V1_.jpg',
        'Woodkid & Ludvig Forssell - Death Stranding 2: On the Beach': 'https://cdn.shopify.com/s/files/1/0703/5217/5391/files/hideo-kojima-teams-up-with-woodkid-for-death-stranding-2-on-v0-bxqhxnuhpbbe1-1.jpg?v=1751285799',
        'Ben Starr - Clair Obscur: Expedition 33': 'https://external-preview.redd.it/ben-starr-as-clive-you-will-never-understand-the-burden-of-v0-zziXFu35sUl8xnnSNum5XxThK_fIfSW8RKNaLfJvKZw.png?format=pjpg&auto=webp&s=6ddc6d3b68bcc6a23e61c3707022ca3cc4242a90',
        'Charlie Cox': 'https://www.hollywoodreporter.com/wp-content/uploads/2025/02/GettyImages-2201803981.jpg?crop=0px%2C269px%2C5000px%2C2797px&resize=2000%2C1126',
        'Erika Ishii': 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/09/erika-ishii.jpg',
        'Jennifer English': 'https://m.media-amazon.com/images/M/MV5BZjg0MTRkMzMtZGNlNi00NjA5LTlkZTgtZDdkZDJiOTRkOTIyXkEyXkFqcGc@._V1_.jpg',
        'Konatsu Kato': 'https://m.media-amazon.com/images/M/MV5BYmZlZjJhYTAtNzNjMi00YmMxLWFhNjEtMDFhMTg0YWMxZGE1XkEyXkFqcGc@._V1_.jpg',
        'Troy Baker': 'https://m.media-amazon.com/images/M/MV5BZjA1YTcxNjktZDhhZi00NDhmLTkyZTYtZWY4OWVmZjA1ZTI4XkEyXkFqcGc@._V1_.jpg'
    };
    
    // INFORMAÇÕES DOS JOGOS (gêneros e sinopse ATUALIZADA)
    const gameInfo = {
        'Clair Obscur: Expedition 33': {
            genres: ['RPG', 'Aventura', 'Fantasia'],
            synopsis: 'RPG de fantasia com combate por turnos e narrativa cinematográfica. Jogadores exploram um mundo dividido entre luz e sombra, tomando decisões que afetam o destino dos personagens.'
        },
        'Death Stranding 2: On the Beach': {
            genres: ['Ação', 'Aventura', 'Ficção Científica'],
            synopsis: 'Sequência do aclamado jogo de Hideo Kojima. Continua a jornada de Sam Bridges em um mundo pós-apocalíptico, focando em conexões humanas e entregas em paisagens surrealistas.'
        },
        'Hades 2': {
            genres: ['Roguelike', 'Ação', 'Mitologia'],
            synopsis: 'Sequência do premiado rogue-like, agora com Melinoë, princesa do submundo, como protagonista. Combate dinâmico, narrativa profunda e deuses gregos revisitados.'
        },
        'Hollow Knight: Silksong': {
            genres: ['Metroidvania', 'Ação', 'Aventura'],
            synopsis: 'A tão aguardada sequência de Hollow Knight. Controle Hornet em um novo reino cheio de perigos, habilidades únicas e segredos a serem desvendados.'
        },
        'Kingdom Come: Deliverance 2': {
            genres: ['RPG', 'Histórico', 'Mundo Aberto'],
            synopsis: 'RPG histórico realista ambientado na Europa Medieval. Sistema de combate complexo, narrativa ramificada e atenção aos detalhes históricos.'
        },
        'Donkey Kong Bananza': {
            genres: ['Plataforma', 'Aventura', 'Família'],
            synopsis: 'Nova aventura do icônico gorila em uma ilha tropical cheia de segredos. Combina plataforma clássica com elementos de exploração e colecionáveis.'
        },
        'Ghost of Yotei': {
            genres: ['Ação', 'Aventura', 'Stealth'],
            synopsis: 'Aventura de ação e stealth ambientada no Japão feudal. Controle um shinobi em missões furtivas com combate preciso e narrativa envolvente.'
        },
        'Split Fiction': {
            genres: ['Ação', 'RPG', 'Ficção Científica'],
            synopsis: 'Jogo de ação com múltiplas realidades e narrativa não-linear. Decisões do jogador afetam diretamente o desenrolar da história em diferentes dimensões.'
        },
        'Avowed': {
            genres: ['RPG', 'Ação', 'Fantasia'],
            synopsis: 'RPG em primeira pessoa da Obsidian no universo de Pillars of Eternity. Exploração, combate mágico e escolhas morais em um mundo rico.'
        },
        'Monster Hunter Wilds': {
            genres: ['Ação', 'RPG', 'Caça'],
            synopsis: 'Nova entrada na famosa série de caça a monstros. Ambientes dinâmicos, monstros colossais e cooperação multiplayer aprimorada.'
        },
        'The Outer Worlds 2': {
            genres: ['RPG', 'Ficção Científica', 'Ação'],
            synopsis: 'Sequência do RPG espacial da Obsidian. Sátira corporativa, escolhas narrativas significativas e novos planetas para explorar.'
        },
        'Indiana Jones and the Great Circle': {
            genres: ['Ação', 'Aventura', 'Quebra-Cabeças'],
            synopsis: 'Aventura do famoso arqueólogo em uma jornada ao redor do mundo. Combina ação, exploração e quebra-cabeças em locais históricos.'
        },
        'Silent Hill f': {
            genres: ['Terror', 'Sobrevivência', 'Psicológico'],
            synopsis: 'Novo capítulo da aclamada série de terror psicológico. Atmosfera opressiva, monstros simbólicos e narrativa perturbadora.'
        },
        "Assassin's Creed Shadows": {
            genres: ['Ação', 'Aventura', 'Stealth'],
            synopsis: 'Nova entrada na série que explora o Japão feudal. Sistema de furtividade renovado e combate com katanas autêntico.'
        },
        'Doom: The Dark Ages': {
            genres: ['Ação', 'FPS', 'Ficção Científica'],
            synopsis: 'Prequela da série Doom ambientada na Idade Média. Combate frenético contra demônios com armas medievais futuristas.'
        },
        'Battlefield 6': {
            genres: ['FPS', 'Multiplayer', 'Guerra'],
            synopsis: 'Mais nova entrada na série de combate militar. Mapas enormes, destruição ambiental e operações em larga escala.'
        },
        'Ninja Gaiden 4': {
            genres: ['Ação', 'Hack and Slash', 'Aventura'],
            synopsis: 'Retorno da clássica série de ação. Combate preciso e desafiador com Ryu Hayabusa contra novas ameaças sobrenaturais.'
        },
        'Shinobi: Art of Vengeance': {
            genres: ['Ação', 'Stealth', 'Aventura'],
            synopsis: 'Reinvenção moderna da clássica série Shinobi. Furtividade, parkour e combate com shurikens em cenários verticais.'
        },
        '2XKO': {
            genres: ['Luta', 'Competitivo', 'Multiplayer'],
            synopsis: 'Jogo de luta 2D baseado no universo de League of Legends. Personagens icônicos, combos visuais e foco em competição.'
        },
        'Fatal Fury: City of the Wolves': {
            genres: ['Luta', 'Arcade', 'Competitivo'],
            synopsis: 'Nova entrada na clássica série de luta da SNK. Sistema de combate renovado e retorno de personagens amados.'
        },
        'Mortal Kombat: Legacy Kollection': {
            genres: ['Luta', 'Coleção', 'Arcade'],
            synopsis: 'Coleção remasterizada dos clássicos Mortal Kombat. Gráficos atualizados, online funcional e conteúdo extra.'
        },
        'Virtua Fighter 5 R.E.V.O. World Stage': {
            genres: ['Luta', '3D', 'Competitivo'],
            synopsis: 'Versão atualizada do clássico jogo de luta 3D. Balanceamento refinado e torneios online integrados.'
        },
        'Capcom Fighting Collection 2': {
            genres: ['Luta', 'Coleção', 'Arcade'],
            synopsis: 'Segunda coleção de jogos de luta clássicos da Capcom. Inclui títulos raros e recursos de preservação histórica.'
        },
        'The Alters': {
            genres: ['Estratégia', 'Simulação', 'Narrativa'],
            synopsis: 'Jogo de estratégia narrativa onde você gerencia versões alternativas de si mesmo. Decisões complexas e dilemas existenciais.'
        },
        'Final Fantasy Tactics - The Ivalice Chronicles': {
            genres: ['RPG', 'Táticas', 'Fantasia'],
            synopsis: 'Remake do clássico RPG tático com novo conteúdo. Batalhas por turnos em grids e história política complexa.'
        },
        'Jurassic World Evolution 3': {
            genres: ['Simulação', 'Estratégia', 'Gestão'],
            synopsis: 'Simulador de parque temático com dinossauros. Gerencie segurança, pesquisa e entretenimento em ilhas pré-históricas.'
        },
        'Civilization 7': {
            genres: ['Estratégia', 'Turnos', 'História'],
            synopsis: 'Mais nova entrada na lendária série de estratégia por turnos. Guie uma civilização da antiguidade à era moderna.'
        },
        'Tempest Rising': {
            genres: ['Estratégia', 'RTS', 'Guerra'],
            synopsis: 'Jogo de estratégia em tempo real inspirado nos clássicos dos anos 90. Três facções únicas e campanha não-linear.'
        },
        'Two Point Museum': {
            genres: ['Simulação', 'Gestão', 'Humor'],
            synopsis: 'Simulador de museu com o humor característico da série Two Point. Crie exposições bizarras e gerencie visitantes.'
        },
        'Lego Party!': {
            genres: ['Party Game', 'Família', 'Multijogador'],
            synopsis: 'Jogo de festa com minijogos no universo Lego. Competições divertidas para até 8 jogadores localmente.'
        },
        'Lego Voyagers': {
            genres: ['Aventura', 'Exploração', 'Família'],
            synopsis: 'Aventura de exploração espacial no universo Lego. Construa naves e explore planetas em sistema solar de brinquedo.'
        },
        'Mario Kart World': {
            genres: ['Corrida', 'Party Game', 'Família'],
            synopsis: 'Mais nova entrada na série de corridas da Nintendo. Novas pistas globais e personagens de todo o universo Mario.'
        },
        'Sonic Racing: CrossWorlds': {
            genres: ['Corrida', 'Arcade', 'Multijogador'],
            synopsis: 'Jogo de corrida com personagens do universo Sonic. Pistas dinâmicas e poderes especiais baseados nos anéis.'
        },
        'Atomfall': {
            genres: ['Ação', 'Sobrevivência', 'Mundo Aberto'],
            synopsis: 'Jogo de sobrevivência em mundo pós-apocalíptico radioativo. Recursos escassos e criaturas mutantes em paisagem desolada.'
        },
        'South of Midnight': {
            genres: ['Ação', 'Aventura', 'Fantasia'],
            synopsis: 'Aventura de ação com elementos de folclore americano. Protagonista feminina em jornada através do sul místico dos EUA.'
        },
        '007: First Light': {
            genres: ['Ação', 'Stealth', 'Espionagem'],
            synopsis: 'Nova aventura do agente 007 com foco em espionagem. Missões globais, gadgets high-tech e vilões icônicos.'
        },
        'Grand Theft Auto 6': {
            genres: ['Ação', 'Mundo Aberto', 'Aventura'],
            synopsis: 'A tão aguardada nova entrada na série. Vice City revisitada, múltiplos protagonistas e mundo aberto mais vivo que nunca.'
        },
        "Marvel's Wolverine": {
            genres: ['Ação', 'Aventura', 'Super-heróis'],
            synopsis: 'Aventura de ação com o mutante mais famoso dos X-Men. Combate visceral com garras de adamantium e regeneração.'
        },
        'Resident Evil: Requiem': {
            genres: ['Terror', 'Sobrevivência', 'Ação'],
            synopsis: 'Novo capítulo na série de terror de sobrevivência. Volta às origens com recursos limitados e atmosfera opressiva.'
        },
        'The Witcher 4': {
            genres: ['RPG', 'Ação', 'Fantasia'],
            synopsis: 'Nova entrada na aclamada série de RPG de fantasia. Nova escola de bruxos, monstros e escolhas morais complexas.'
        },
        'Alien: Rogue Incursion': {
            genres: ['Terror', 'VR', 'Sobrevivência'],
            synopsis: 'Experiência de terror em realidade virtual no universo Alien. Atmosfera claustrofóbica e xenomorfos inteligentes.'
        },
        'Arken Age': {
            genres: ['RPG', 'Fantasia', 'Mundo Aberto'],
            synopsis: 'RPG de fantasia com mundo aberto expansivo. Combate de magia, criaturas míticas e reinos em guerra.'
        },
        'Ghost Town': {
            genres: ['Terror', 'Exploração', 'Suspense'],
            synopsis: 'Jogo de terror psicológico em uma cidade fantasma. Investigação paranormal e encontros sobrenaturais.'
        },
        "Marvel's Deadpool VR": {
            genres: ['Ação', 'VR', 'Humor'],
            synopsis: 'Experiência de ação em VR com o mercenário tagarela. Quebra-quarta-parade, tiroteios e humor característico.'
        },
        'The Midnight Walk': {
            genres: ['Terror', 'Exploração', 'Narrativa'],
            synopsis: 'Jogo de terror narrativo com elementos de exploração. Caminhadas noturnas que revelam segredos sombrios.'
        },
        'Blue Prince': {
            genres: ['RPG', 'Aventura', 'Puzzle'],
            synopsis: 'RPG indie com elementos de puzzle e narrativa profunda. Mecânicas únicas de resolução de mistérios.'
        },
        'Despelote': {
            genres: ['Esporte', 'Futebol', 'Narrativa'],
            synopsis: 'Jogo narrativo sobre futebol e cultura latino-americana. Crescimento pessoal através do esporte em comunidade.'
        },
        'Dispatch': {
            genres: ['Ação', 'Estratégia', 'Táticas'],
            synopsis: 'Jogo de ação tática com elementos de estratégia. Comande equipes especiais em operações de alto risco.'
        },
        'Megabonk': {
            genres: ['Arcade', 'Ação', 'Multijogador'],
            synopsis: 'Jogo de ação arcade com combate frenético. Estética retro e multiplayer caótico.'
        },
        'Absolum': {
            genres: ['Ação', 'RPG', 'Fantasia'],
            synopsis: 'RPG de ação com combate dinâmico e mundo aberto. Classes personalizáveis e magias elementais.'
        },
        'Ball x Pit': {
            genres: ['Esporte', 'Competitivo', 'Multijogador'],
            synopsis: 'Jogo de esporte competitivo com física única. Combina elementos de futebol e basquete em arenas futuristas.'
        },
        'Arc Raiders': {
            genres: ['Ação', 'Co-op', 'Ficção Científica'],
            synopsis: 'Jogo de ação cooperativo contra ameaças alienígenas. Combate tático e personalização de equipamentos.'
        },
        'Elden Ring: Nightreign': {
            genres: ['RPG', 'Ação', 'Fantasia'],
            synopsis: 'Expansão do aclamado RPG de ação da FromSoftware. Novas áreas, chefes e lore para o mundo das Terras Intermédias.'
        },
        'Peak': {
            genres: ['Aventura', 'Exploração', 'Quebra-Cabeças'],
            synopsis: 'Jogo de aventura e exploração em ambientes montanhosos. Escalada realista e descoberta de ruínas antigas.'
        },
        'Consume Me': {
            genres: ['Terror', 'Psicológico', 'Narrativa'],
            synopsis: 'Experiência de terror psicológico com narrativa profunda. Metáforas sobre consumo e identidade na sociedade moderna.'
        },
        'Lost Records: Bloom & Rage': {
            genres: ['Narrativa', 'Aventura', 'Mistério'],
            synopsis: 'Jogo narrativo sobre memórias perdidas e descobertas. Amizade feminina e segredos de verões passados.'
        },
        'Wanderstop': {
            genres: ['Simulação', 'Relaxante', 'Narrativa'],
            synopsis: 'Simulador relaxante sobre cuidar de um jardim mágico. Narrativa contemplativa e mecânicas de cultivo pacíficas.'
        },
        "Baldur's Gate 3": {
            genres: ['RPG', 'Táticas', 'Fantasia'],
            synopsis: 'RPG tático baseado em D&D 5e. Narrativa ramificada, companheiros complexos e combate estratégico por turnos.'
        },
        'Final Fantasy 14': {
            genres: ['MMORPG', 'Fantasia', 'RPG'],
            synopsis: 'MMORPG em constante evolução com expansões regulares. História épica, raides desafiadoras e comunidade ativa.'
        },
        'Fortnite': {
            genres: ['Battle Royale', 'Ação', 'Multijogador'],
            synopsis: 'Battle royale em constante evolução com crossovers. Construção em tempo real e eventos ao vivo regulares.'
        },
        'Helldivers 2': {
            genres: ['Ação', 'Co-op', 'Ficção Científica'],
            synopsis: 'Jogo de ação cooperativo por democracia galáctica. Humor satírico e combate caótico contra insetos e robôs.'
        },
        "No Man's Sky": {
            genres: ['Exploração', 'Sobrevivência', 'Ficção Científica'],
            synopsis: 'Simulador de exploração espacial com universo procedural. 18 quintilhões de planetas, base building e história cósmica.'
        },
        'Um Filme Minecraft': {
            genres: ['Aventura', 'Fantasia', 'Família'],
            synopsis: 'Adaptação cinematográfica do universo Minecraft. Aventura em mundo de blocos com criaturas icônicas do jogo.'
        },
        'Devil May Cry': {
            genres: ['Ação', 'Hack and Slash', 'Fantasia'],
            synopsis: 'Adaptação live-action da série de ação Devil May Cry. Dante e Vergil contra demônios com combate estilizado.'
        },
        'Splinter Cell: Deathwatch': {
            genres: ['Ação', 'Stealth', 'Espionagem'],
            synopsis: 'Adaptação live-action da série de espionagem. Sam Fisher em missões furtivas de alto risco global.'
        },
        'The Last of Us': {
            genres: ['Drama', 'Sobrevivência', 'Ação'],
            synopsis: 'Série live-action baseada no aclamado jogo. Joel e Ellie em jornada pós-apocalíptica por um mundo infectado.'
        },
        'Until Dawn': {
            genres: ['Terror', 'Narrativa', 'Suspense'],
            synopsis: 'Adaptação do jogo de terror interativo. Grupo de amigos em cabana isolada com decisões que determinam quem sobrevive.'
        },
        'Destiny Rising': {
            genres: ['RPG', 'Ação', 'MMO'],
            synopsis: 'Novo capítulo no universo Destiny. Sistema de classes renovado e campanha cooperativa expansiva.'
        },
        'Persona 5: The Phantom X': {
            genres: ['RPG', 'Simulação', 'Fantasia'],
            synopsis: 'Nova entrada na série Persona com novos personagens. Combate por turnos, dungeon crawling e simulação social.'
        },
        'Sonic Rumble': {
            genres: ['Battle Royale', 'Ação', 'Multijogador'],
            synopsis: 'Battle royale com personagens do universo Sonic. Corridas em arenas com power-ups e obstáculos dinâmicos.'
        },
        'Umamusume: Pretty Derby': {
            genres: ['Simulação', 'Esporte', 'Anime'],
            synopsis: 'Jogo de simulação de corridas com garotas-cavalo. Treinamento, competições e desenvolvimento de relacionamentos.'
        },
        'Wuthering Waves': {
            genres: ['RPG', 'Ação', 'Mundo Aberto'],
            synopsis: 'RPG de ação com mundo aberto e combate fluido. Sistema de parry preciso e exploração de ruínas pós-apocalípticas.'
        },
        'Marvel Rivals': {
            genres: ['FPS', 'Hero Shooter', 'Multijogador'],
            synopsis: 'Hero shooter 6v6 com personagens da Marvel. Habilidades únicas por herói e mapas interativos.'
        },
        
        // NOVAS INFORMAÇÕES ADICIONADAS
        'Gen.G - League of Legends': {
            genres: ['Esports', 'Competitivo', 'Coreia'],
            synopsis: 'Equipe coreana dominante no cenário de League of Legends. Múltiplos títulos do LCK e performances consistentes em mundiais.'
        },
        'NRG - Valorant': {
            genres: ['Esports', 'Competitivo', 'América do Norte'],
            synopsis: 'Organização norte-americana campeã do Valorant Champions 2025. Estratégia inovadora e jogadores superstar.'
        },
        'Team Falcons - Dota 2': {
            genres: ['Esports', 'Competitivo', 'Oriente Médio'],
            synopsis: 'Equipe do Oriente Médio que revolucionou o cenário de Dota 2. Jogadas agressivas e drafts surpreendentes.'
        },
        'Team Liquid PH - Mobile Legends: Bang Bang': {
            genres: ['Esports', 'Competitivo', 'Filipinas'],
            synopsis: 'Equipe filipina dominante no Mobile Legends. Táticas de teamfight exemplares e múltiplos títulos internacionais.'
        },
        'Team Vitality - Counter Strike 2': {
            genres: ['Esports', 'Competitivo', 'Europa'],
            synopsis: 'Organização europeia campeã do Major de CS2. Roster francês com sinergia excepcional e individualidades brilhantes.'
        },
        'Brawk': {
            genres: ['Jogador', 'Valorant', 'Iniciador'],
            synopsis: 'Jogador da NRG e MVP do Valorant Champions 2025. Conhecido por jogadas agressivas com Odin e liderança em jogo.'
        },
        'Chovy': {
            genres: ['Jogador', 'League of Legends', 'Mid Laner'],
            synopsis: 'Mid laner coreano do Gen.G, considerado o melhor jogador mecânico do mundo. Farm perfeito e rotações precisas.'
        },
        'Forsaken': {
            genres: ['Jogador', 'Valorant', 'Duelista'],
            synopsis: 'Duelista indonésio da NRG, conhecido como "f0rsaken". Clutches impossíveis e aim extraordinário com Vandal.'
        },
        'Kakeru': {
            genres: ['Jogador', 'Street Fighter', 'Competitivo'],
            synopsis: 'Jogador japonês de Street Fighter VI, campeão do Red Bull Kumite 2025. Conhecido por reads psicológicos precisos.'
        },
        'Menard': {
            genres: ['Jogador', 'Street Fighter', 'Dominicana'],
            synopsis: 'Jogador dominicano de Street Fighter VI, campeão da EVO 2025. Estilo agressivo com personagens de grappler.'
        },
        'Zywoo': {
            genres: ['Jogador', 'Counter Strike', 'AWPer'],
            synopsis: 'AWPer francês do Team Vitality, considerado o melhor jogador de CS2 do mundo. Reações sobrenaturais e positioning perfeito.'
        },
        'Counter Strike 2': {
            genres: ['FPS', 'Tático', 'Competitivo'],
            synopsis: 'FPS tático 5v5 com economia de rodadas. Bombsite attacks/defenses, utility usage e teamwork essencial.'
        },
        'Dota 2': {
            genres: ['MOBA', 'Estratégico', 'Competitivo'],
            synopsis: 'MOBA complexo com mais de 120 heróis únicos. Farm, teamfights épicos e jogo macro estratégico profundo.'
        },
        'League of Legends': {
            genres: ['MOBA', 'Competitivo', 'Estratégico'],
            synopsis: 'MOBA 5v5 com mais de 160 campeões. Lane phase, objetivos de mapa e teamfights decisivas em Summoner\'s Rift.'
        },
        'Mobile Legends: Bang Bang': {
            genres: ['MOBA', 'Mobile', 'Competitivo'],
            synopsis: 'MOBA mobile otimizado para dispositivos móveis. Partidas rápidas de 10-15 minutos e controles touch intuitivos.'
        },
        'Valorant': {
            genres: ['FPS', 'Tático', 'Competitivo'],
            synopsis: 'FPS tático 5v5 com agentes com habilidades únicas. Econ system, plant/defuse e habilidades estratégicas.'
        },
        'FC 26': {
            genres: ['Esporte', 'Futebol', 'Simulação'],
            synopsis: 'Simulador de futebol mais recente da EA Sports. Gráficos realistas, Ultimate Team e licenças oficiais.'
        },
        'F1 25': {
            genres: ['Esporte', 'Corrida', 'Simulação'],
            synopsis: 'Simulador de Fórmula 1 com física avançada. Todas as equipes e pilotos oficiais da temporada 2025.'
        },
        'Rematch': {
            genres: ['Esporte', 'Tênis', 'Simulação'],
            synopsis: 'Simulador de tênis com foco em realismo. Sistema de golpes preciso e torneios profissionais licenciados.'
        },
        'Caedrel': {
            genres: ['Streamer', 'Analista', 'League of Legends'],
            synopsis: 'Ex-jogador profissional e atual analista/streamer de LoL. Conhecido por análises precisas e reações engraçadas.'
        },
        'Kai Cenat': {
            genres: ['Streamer', 'Variedade', 'Entretenimento'],
            synopsis: 'Streamer de variedade com uma das maiores comunidades da Twitch. Conteúdo caótico e interação intensa com fãs.'
        },
        'Moistcr1tikal': {
            genres: ['Streamer', 'Crítica', 'Variedade'],
            synopsis: 'Streamer e YouTuber conhecido por críticas sinceras e humor seco. Cobre desde jogos até eventos da internet.'
        },
        'Sakura Miko': {
            genres: ['VTuber', 'Hololive', 'Entretenimento'],
            synopsis: 'VTuber da agência Hololive JP. Personagem de shrine maiden com personalidade energetic e as vezes desastrada.'
        },
        'The Burnt Peanut': {
            genres: ['VTuber', 'Indie', 'Entretenimento'],
            synopsis: 'VTuber indie que ganhou Best VTuber no Streamer Awards 2025. Conteúdo de arte e streams relaxantes.'
        },
        'Christopher Larkin - Hollow Knight: Silksong': {
            genres: ['Compositor', 'Trilha Sonora', 'Video Game'],
            synopsis: 'Compositor da trilha sonora de Hollow Knight e Silksong. Estilo orquestral melancólico que define a atmosfera dos jogos.'
        },
        'Darren Korb - Hades 2': {
            genres: ['Compositor', 'Trilha Sonora', 'Video Game'],
            synopsis: 'Compositor da trilha sonora de Hades e Hades 2. Mistura de rock com instrumentos gregos antigos.'
        },
        'Lorien Testard - Clair Obscur: Expedition 33': {
            genres: ['Compositor', 'Trilha Sonora', 'Video Game'],
            synopsis: 'Compositor da trilha orquestral de Clair Obscur. Temas épicos que alternam entre luz e sombra musicalmente.'
        },
        'Toma Otowa - Ghost of Yotei': {
            genres: ['Compositor', 'Trilha Sonora', 'Video Game'],
            synopsis: 'Compositor japonês da trilha de Ghost of Yotei. Combina instrumentos tradicionais japoneses com orquestra moderna.'
        },
        'Woodkid & Ludvig Forssell - Death Stranding 2: On the Beach': {
            genres: ['Compositor', 'Trilha Sonora', 'Video Game'],
            synopsis: 'Dupla de compositores para Death Stranding 2. Woodkid traz épico cinematográfico, Forssell mantém a identidade sonora de Kojima.'
        },
        'Ben Starr - Clair Obscur: Expedition 33': {
            genres: ['Ator', 'Dublagem', 'Video Game'],
            synopsis: 'Dublador do protagonista de Clair Obscur. Conhecido por Clive em Final Fantasy XVI, traz intensidade emocional.'
        },
        'Charlie Cox': {
            genres: ['Ator', 'Dublagem', 'Video Game'],
            synopsis: 'Ator britânico que dubla personagem em Clair Obscur. Famoso como Daredevil no MCU, traz profundidade dramática.'
        },
        'Erika Ishii': {
            genres: ['Atriz', 'Dublagem', 'Video Game'],
            synopsis: 'Dubladora de personagem em Ghost of Yotei. Voz versátil em vários jogos AAA com entrega emocional poderosa.'
        },
        'Jennifer English': {
            genres: ['Atriz', 'Dublagem', 'Video Game'],
            synopsis: 'Dubladora de personagem em Clair Obscur. Conhecida por Shadowheart em Baldur\'s Gate 3, traz nuance complexa.'
        },
        'Konatsu Kato': {
            genres: ['Atriz', 'Dublagem', 'Video Game'],
            synopsis: 'Dubladora japonesa em Silent Hill f. Atuações em anime e games com especialidade em personagens perturbados.'
        },
        'Troy Baker': {
            genres: ['Ator', 'Dublagem', 'Video Game'],
            synopsis: 'Dublador de Indiana Jones em Indiana Jones and the Great Circle. Lendário por Joel (The Last of Us) e outros ícones.'
        }
    };
    
    // Dados das categorias (com nomes formatados corretamente)
    const categoriesData = [
        { 
            id: 'game-of-the-year', 
            name: 'Jogo do Ano', 
            nominees: [
                'Clair Obscur: Expedition 33',
                'Death Stranding 2: On the Beach',
                'Donkey Kong Bananza',
                'Hades 2',
                'Hollow Knight: Silksong',
                'Kingdom Come: Deliverance 2'
            ] 
        },
        { 
            id: 'best-direction', 
            name: 'Melhor Direção', 
            nominees: [
                'Clair Obscur: Expedition 33',
                'Death Stranding 2: On the Beach',
                'Ghost of Yotei',
                'Hades 2',
                'Split Fiction'
            ] 
        },
        { 
            id: 'best-esports-team', 
            name: 'Melhor Time de Esports', 
            nominees: [
                "Gen.G - League of Legends",
                "NRG - Valorant",
                "Team Falcons - Dota 2",
                "Team Liquid PH - Mobile Legends: Bang Bang",
                "Team Vitality - Counter Strike 2"
            ] 
        },
        { 
            id: 'best-esports-athlete', 
            name: 'Melhor Atleta de Esports', 
            nominees: [
                'Brawk',
                'Chovy',
                'Forsaken',
                'Kakeru',
                'Menard',
                'Zywoo'
            ] 
        },
        { 
            id: 'best-esports-game', 
            name: 'Melhor Jogo de Esports', 
            nominees: [
                "Counter Strike 2",
                "Dota 2",
                "League of Legends",
                "Mobile Legends: Bang Bang",
                "Valorant"
            ] 
        },
        { 
            id: 'best-sports-racing', 
            name: 'Melhor Jogo de Esporte/Corrida', 
            nominees: [
                "FC 26",
                "F1 25",
                "Mario Kart World",
                "Rematch",
                "Sonic Racing: CrossWorlds"
            ] 
        },
        { 
            id: 'best-strategy-sim', 
            name: 'Melhor Jogo de Simulação/Estratégia', 
            nominees: [
                "The Alters",
                "Final Fantasy Tactics - The Ivalice Chronicles",
                "Jurassic World Evolution 3",
                "Civilization 7",
                "Tempest Rising",
                "Two Point Museum"
            ] 
        },
        { 
            id: 'best-family-game', 
            name: 'Melhor Jogo para a Família', 
            nominees: [
                "Donkey Kong Bananza",
                "Lego Party!",
                "Lego Voyagers",
                "Mario Kart World",
                "Sonic Racing: CrossWorlds",
                "Split Fiction"
            ] 
        },
        { 
            id: 'innovation-accessibility', 
            name: 'Inovação em Acessibilidade', 
            nominees: [
                "Assassin's Creed Shadows",
                "Atomfall",
                "Doom: The Dark Ages",
                "FC 26",
                "South of Midnight"
            ] 
        },
        { 
            id: 'best-action-game', 
            name: 'Melhor Jogo de Ação', 
            nominees: [
                "Battlefield 6",
                "Doom: The Dark Ages",
                "Hades 2",
                "Ninja Gaiden 4",
                "Shinobi: Art of Vengeance"
            ] 
        },
        { 
            id: 'best-fighting-game', 
            name: 'Melhor Jogo de Luta', 
            nominees: [
                "2XKO",
                "Capcom Fighting Collection 2",
                "Fatal Fury: City of the Wolves",
                "Mortal Kombat: Legacy Kollection",
                "Virtua Fighter 5 R.E.V.O. World Stage"
            ] 
        },
        { 
            id: 'best-rpg', 
            name: 'Melhor Jogo de RPG', 
            nominees: [
                "Avowed",
                "Clair Obscur: Expedition 33",
                "Kingdom Come: Deliverance 2",
                "Monster Hunter Wilds",
                "The Outer Worlds 2"
            ] 
        },
        { 
            id: 'best-action-adventure', 
            name: 'Melhor Jogo de Ação/Aventura', 
            nominees: [
                "Death Stranding 2: On the Beach",
                "Ghost of Yotei",
                "Hollow Knight: Silksong",
                "Indiana Jones and the Great Circle",
                "Split Fiction"
            ] 
        },
        { 
            id: 'most-anticipated', 
            name: 'Jogo Mais Aguardado', 
            nominees: [
                "007: First Light",
                "Grand Theft Auto 6",
                "Marvel's Wolverine",
                "Resident Evil: Requiem",
                "The Witcher 4"
            ] 
        },
        { 
            id: 'content-creator-year', 
            name: 'Criador de Conteúdo do Ano', 
            nominees: [
                'Caedrel',
                'Kai Cenat',
                'Moistcr1tikal',
                'Sakura Miko',
                'The Burnt Peanut'
            ] 
        },
        { 
            id: 'best-vr-ar', 
            name: 'Melhor Jogo de Realidade Virtual/Realidade Aumentada', 
            nominees: [
                "Alien: Rogue Incursion",
                "Arken Age",
                "Ghost Town",
                "Marvel's Deadpool VR",
                "The Midnight Walk"
            ] 
        },
        { 
            id: 'best-debut-indie', 
            name: 'Melhor Jogo de Estreia Independente', 
            nominees: [
                "Blue Prince",
                "Clair Obscur: Expedition 33",
                "Despelote",
                "Dispatch",
                "Megabonk"
            ] 
        },
        { 
            id: 'best-indie-game', 
            name: 'Melhor Jogo Independente', 
            nominees: [
                "Absolum",
                "Ball x Pit",
                "Blue Prince",
                "Clair Obscur: Expedition 33",
                "Hades 2",
                "Hollow Knight: Silksong"
            ] 
        },
        { 
            id: 'best-multiplayer', 
            name: 'Melhor Multiplayer', 
            nominees: [
                "Arc Raiders",
                "Battlefield 6",
                "Elden Ring: Nightreign",
                "Peak",
                "Split Fiction"
            ] 
        },
        { 
            id: 'games-for-impact', 
            name: 'Games for Impact', 
            nominees: [
                "Consume Me",
                "Despelote",
                "Lost Records: Bloom & Rage",
                "South of Midnight",
                "Wanderstop"
            ] 
        },
        { 
            id: 'best-community-support', 
            name: 'Melhor Apoio à Comunidade', 
            nominees: [
                "Baldur's Gate 3",
                "Final Fantasy 14",
                "Fortnite",
                "Helldivers 2",
                "No Man's Sky"
            ] 
        },
        { 
            id: 'best-narrative', 
            name: 'Melhor Narrativa', 
            nominees: [
                "Clair Obscur: Expedition 33",
                "Death Stranding 2: On the Beach",
                "Ghost of Yotei",
                "Kingdom Come: Deliverance 2",
                "Silent Hill f"
            ] 
        },
        { 
            id: 'best-adaptation', 
            name: 'Melhor Adaptação', 
            nominees: [
                "Um Filme Minecraft",
                "Devil May Cry",
                "Splinter Cell: Deathwatch",
                "The Last of Us",
                "Until Dawn"
            ] 
        },
        { 
            id: 'best-audio-design', 
            name: 'Melhor Direção de Som', 
            nominees: [
                "Battlefield 6",
                "Clair Obscur: Expedition 33",
                "Death Stranding 2: On the Beach",
                "Ghost of Yotei",
                "Silent Hill f"
            ] 
        },
        { 
            id: 'best-score-music', 
            name: 'Melhor Trilha e Música', 
            nominees: [
                "Christopher Larkin - Hollow Knight: Silksong",
                "Darren Korb - Hades 2",
                "Lorien Testard - Clair Obscur: Expedition 33",
                "Toma Otowa - Ghost of Yotei",
                "Woodkid & Ludvig Forssell - Death Stranding 2: On the Beach"
            ] 
        },
        { 
            id: 'best-art-direction', 
            name: 'Melhor Direção de Arte', 
            nominees: [
                "Clair Obscur: Expedition 33",
                "Death Stranding 2: On the Beach",
                "Ghost of Yotei",
                "Hades 2",
                "Hollow Knight: Silksong"
            ] 
        },
        { 
            id: 'best-mobile-game', 
            name: 'Melhor Jogo para Dispositivos Móveis', 
            nominees: [
                "Destiny Rising",
                "Persona 5: The Phantom X",
                "Sonic Rumble",
                "Umamusume: Pretty Derby",
                "Wuthering Waves"
            ] 
        },
        { 
            id: 'best-ongoing-game', 
            name: 'Melhor Jogo em Atualização', 
            nominees: [
                "Final Fantasy 14",
                "Fortnite",
                "Helldivers 2",
                "Marvel Rivals",
                "No Man's Sky"
            ] 
        },
        { 
            id: 'best-performance', 
            name: 'Melhor Atuação', 
            nominees: [
                "Ben Starr - Clair Obscur: Expedition 33",
                "Charlie Cox - Clair Obscur: Expedition 33",
                "Erika Ishii - Ghost of Yotei",
                "Jennifer English - Clair Obscur: Expedition 33",
                "Konatsu Kato - Silent Hill f",
                "Troy Baker - Indiana Jones and the Great Circle"
            ] 
        }
    ];
    
    // Estado da aplicação
    let currentCategoryIndex = 0;
    let selectedGames = {};
    let completedCategories = new Set();
    
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
                    const isSelected = selectedGames[category.id] === nominee;
                    const imageUrl = getGameImageUrl(nominee);
                    const info = gameInfo[nominee] || { genres: [], synopsis: 'Informações não disponíveis.' };
                    
                    return `
                        <div class="game-card ${isSelected ? 'selected' : ''}" 
                             data-game="${nominee}" 
                             data-category="${category.id}">
                            <div class="game-image">
                                <img src="${imageUrl}" 
                                     alt="${nominee}"
                                     onerror="this.src='https://via.placeholder.com/400x200/1a5e2c/ffffff?text=${encodeURIComponent(nominee.substring(0, 30))}'">
                            </div>
                            <div class="game-info">
                                <h3>${nominee}</h3>
                                
                                ${info.genres && info.genres.length > 0 ? `
                                    <div class="game-genres">
                                        ${info.genres.slice(0, 3).map(genre => 
                                            `<span class="genre-tag">${genre}</span>`
                                        ).join('')}
                                    </div>
                                ` : ''}
                                
                                <p class="game-synopsis">${info.synopsis}</p>
                                
                                <div class="game-selected">
                                    <i class="fas fa-check-circle"></i> Selecionado
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
                count: maxVotes,
                image: getGameImageUrl(mostVotedGame)
            },
            timestamp: new Date().toISOString()
        };
        
        // Salvar e redirecionar
        localStorage.setItem('gameAwardsVotes', JSON.stringify(votingData));
        window.location.href = 'results.html';
    }
    
    // Função para obter URL da imagem do jogo
    function getGameImageUrl(gameName) {
        // Remove informações extras (como nome do artista) para encontrar imagem
        const cleanGameName = gameName.split(' - ')[0];
        
        // Verifica se há URL específica no mapa
        if (gameImages[gameName]) {
            return gameImages[gameName];
        }
        
        if (gameImages[cleanGameName]) {
            return gameImages[cleanGameName];
        }
        
        // Placeholder genérico com tamanho ajustado (400x200)
        return `https://via.placeholder.com/400x200/1a5e2c/ffffff?text=${encodeURIComponent(cleanGameName.substring(0, 30))}`;
    }
});