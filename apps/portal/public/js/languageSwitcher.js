(function() {
  'use strict';

  // ── Language Options ──
  var LANGUAGES = [
    { code: 'zh',    label: '简体中文', labelShort: '简体', flagUrl: 'https://flagcdn.com/cn.svg' },
    { code: 'zh-TW', label: '繁體中文', labelShort: '繁體', flagUrl: 'https://flagcdn.com/w20/hk.png' },
    { code: 'en',    label: 'English',  labelShort: 'EN',   flagUrl: 'https://flagcdn.com/w20/us.png' },
    { code: 'ja',    label: '日本語',    labelShort: '日本', flagUrl: 'https://flagcdn.com/w20/jp.png' },
    { code: 'ko',    label: '한국어',    labelShort: '韩国', flagUrl: 'https://flagcdn.com/w20/kr.png' },
    { code: 'fr',    label: 'Français', labelShort: 'FR',   flagUrl: 'https://flagcdn.com/w20/fr.png' },
    { code: 'de',    label: 'Deutsch',  labelShort: 'DE',   flagUrl: 'https://flagcdn.com/w20/de.png' },
    { code: 'es',    label: 'Español',  labelShort: 'ES',   flagUrl: 'https://flagcdn.com/w20/es.png' },
    { code: 'ru',    label: 'Русский',  labelShort: 'RU',   flagUrl: 'https://flagcdn.com/w20/ru.png' }
  ];

  // ── Translation Dictionary (Chinese text → translations) ──
  var T = {
    // Header
    'Quantum-Proxy':   { en:'Quantum-Proxy', ja:'Quantum-Proxy', ko:'Quantum-Proxy', fr:'Quantum-Proxy', de:'Quantum-Proxy', es:'Quantum-Proxy', ru:'Quantum-Proxy' },
    '产品':       { en:'Products', ja:'製品', ko:'제품', fr:'Produits', de:'Produkte', es:'Productos', ru:'Продукты' },
    '价格':       { en:'Pricing', ja:'料金', ko:'가격', fr:'Tarifs', de:'Preise', es:'Precios', ru:'Цены' },
    '解决方案':   { en:'Solutions', ja:'ソリューション', ko:'솔루션', fr:'Solutions', de:'Lösungen', es:'Soluciones', ru:'Решения' },
    '帮助中心':   { en:'Help Center', ja:'ヘルプ', ko:'도움말', fr:'Aide', de:'Hilfe', es:'Ayuda', ru:'Помощь' },
    '文档':       { en:'Docs', ja:'ドキュメント', ko:'문서', fr:'Docs', de:'Docs', es:'Docs', ru:'Документы' },
    '注册/登录':  { en:'Sign Up / Log In', ja:'登録/ログイン', ko:'가입/로그인', fr:'Connexion', de:'Anmelden', es:'Acceder', ru:'Войти' },

    // Hero CTA
    '打造极致连接体验': { en:'Get Started Now', ja:'今すぐ始める', ko:'지금 시작하기', fr:'Commencer', de:'Jetzt starten', es:'Comenzar ahora', ru:'Начать сейчас' },

    // Section titles
    '在什么场景中能使用到？':       { en:'What scenarios can it be used in?', ja:'どのようなシーンで使えますか？', ko:'어떤 시나리오에서 사용할 수 있나요?', fr:'Dans quels scénarios l\'utiliser ?', de:'In welchen Szenarien einsetzbar?', es:'¿En qué escenarios se puede usar?', ru:'В каких сценариях использовать?' },
    '覆盖全球60+国家，在线可用率高达99.99%': { en:'Coverage in 60+ Countries · 99.99% Uptime', ja:'60+カ国をカバー · 稼働率99.99%', ko:'60+ 국가 커버리지 · 99.99% 가동률', fr:'Couverture 60+ pays · 99.99% disponibilité', de:'60+ Länder · 99.99% Verfügbarkeit', es:'60+ países · 99.99% disponibilidad', ru:'60+ стран · Доступность 99.99%' },
    '选择代理套餐':               { en:'Choose Your Proxy Plan', ja:'プロキシプランを選択', ko:'프록시 요금제 선택', fr:'Choisissez votre forfait proxy', de:'Wählen Sie Ihren Proxy-Plan', es:'Elija su plan de proxy', ru:'Выберите тариф прокси' },
    '如何快速开始使用？':           { en:'How to Get Started Quickly?', ja:'すぐに使い始めるには？', ko:'빠르게 시작하는 방법은?', fr:'Comment démarrer rapidement ?', de:'Wie starte ich schnell?', es:'¿Cómo empezar rápidamente?', ru:'Как быстро начать?' },

    // Use case tabs
    '电商运营':               { en:'E-commerce', ja:'EC運営', ko:'이커머스', fr:'E-commerce', de:'E-Commerce', es:'E-commerce', ru:'E-commerce' },
    '在线直播':               { en:'Live Streaming', ja:'ライブ配信', ko:'라이브 방송', fr:'Streaming', de:'Live-Streaming', es:'Streaming', ru:'Стриминг' },
    '数据分析与市场研究':     { en:'Data & Research', ja:'データ分析', ko:'데이터 분석', fr:'Analyse de données', de:'Datenanalyse', es:'Análisis de datos', ru:'Аналитика' },
    'AI访问与数据':           { en:'AI & Data', ja:'AI＆データ', ko:'AI & 데이터', fr:'IA & Données', de:'KI & Daten', es:'IA & Datos', ru:'AI и данные' },
    '社交媒体运营':           { en:'Social Media', ja:'SNS運営', ko:'소셜 미디어', fr:'Réseaux sociaux', de:'Social Media', es:'Redes sociales', ru:'Соцсети' },
    'WEB3应用':               { en:'WEB3 Apps', ja:'WEB3アプリ', ko:'WEB3 앱', fr:'Apps WEB3', de:'WEB3-Apps', es:'Apps WEB3', ru:'WEB3' },
    '限量抢购BOT&智能爬虫':   { en:'BOT & Smart Crawler', ja:'BOT＆クローラー', ko:'BOT & 크롤러', fr:'BOT & Crawler', de:'BOT & Crawler', es:'BOT & Crawler', ru:'BOT и краулер' },

    // Use case descriptions
    '使用静态住宅i p、电商运营 多账号矩阵运营的护航者':                     { en:'Static residential IP for secure multi-account e-commerce operations', ja:'静的住居用IPでマルチアカウントEC運営をサポート', ko:'정적 주거용 IP로 안전한 다중 계정 이커머스 운영', fr:'IP résidentiel statique pour e-commerce multi-comptes', de:'Statische Wohn-IP für Multi-Account E-Commerce', es:'IP residencial estática para e-commerce multi-cuenta', ru:'Статический резидентный IP для e-commerce' },
    '高速稳定的网络连接，确保直播画面流畅不卡顿，助力全球直播业务。':       { en:'High-speed, stable connections ensuring smooth global live streaming.', ja:'高速安定接続でグローバルなライブ配信をスムーズに。', ko:'고속 안정적인 연결로 글로벌 라이브 방송을 원활하게.', fr:'Connexions stables pour un streaming fluide.', de:'Schnelle, stabile Verbindungen für reibungsloses Live-Streaming.', es:'Conexiones estables para streaming fluido.', ru:'Стабильное подключение для глобального стриминга.' },
    '轻松获取全球市场数据，精准分析竞品动态，为业务决策提供强有力的数据支持。': { en:'Access global market data and gain competitive insights for business decisions.', ja:'グローバルな市場データで競合分析と意思決定を支援。', ko:'글로벌 시장 데이터로 경쟁 분석 및 비즈니스 의사 결정 지원.', fr:'Accédez aux données mondiales pour des analyses concurrentielles.', de:'Globale Marktdaten für Geschäftsentscheidungen.', es:'Datos de mercado global para decisiones informadas.', ru:'Глобальные рыночные данные для бизнес-решений.' },
    '解锁AI模型地域限制，高效采集训练数据，赋能人工智能应用开发与落地。':   { en:'Unlock regional restrictions on AI models and collect training data efficiently.', ja:'AIモデルの地域制限を解除し、トレーニングデータを効率収集。', ko:'AI 모델 지역 제한 해제 및 훈련 데이터 효율적 수집.', fr:'Débloquez les restrictions IA et collectez les données.', de:'KI-Beschränkungen aufheben und Trainingsdaten sammeln.', es:'Desbloquee restricciones IA y recopile datos.', ru:'Снимайте ограничения ИИ-моделей.' },
    '轻松管理全球社交媒体账号，突破地域限制，实现多账号安全运营与增长。':   { en:'Manage global social media accounts with ease, break through regional restrictions.', ja:'グローバルSNSアカウントを安全に運営。', ko:'글로벌 소셜 미디어 계정 관리 및 지역 제한 돌파.', fr:'Gérez vos comptes sociaux mondiaux sans restrictions.', de:'Globale Social-Media-Konten sicher verwalten.', es:'Gestione cuentas globales sin restricciones.', ru:'Управляйте соцсетями без ограничений.' },
    '安全连接去中心化网络，保障数字资产交易安全，探索Web3无限可能。':       { en:'Securely connect to decentralized networks and explore Web3 possibilities.', ja:'分散型ネットワークに安全接続、Web3の可能性を探索。', ko:'분산 네트워크에 안전 연결, Web3 가능성 탐색.', fr:'Connectez-vous aux réseaux décentralisés et explorez Web3.', de:'Sicher mit dezentralen Netzwerken verbinden.', es:'Conéctese a redes descentralizadas y explore Web3.', ru:'Безопасно подключайтесь к Web3.' },
    '毫秒级响应速度，高并发支持，助力抢购业务成功，高效采集全网数据。':     { en:'Millisecond response times with high concurrency for efficient data collection at scale.', ja:'ミリ秒レベルの応答速度と高並列性で効率的データ収集。', ko:'밀리초 응답 속도와 높은 동시성으로 효율적 데이터 수집.', fr:'Millisecondes de réponse avec haute concurrence.', de:'Millisekunden-Reaktionszeiten mit hoher Parallelität.', es:'Milisegundos de respuesta con alta concurrencia.', ru:'Время отклика в миллисекундах.' },
    '了解更多':   { en:'Learn More', ja:'詳しく見る', ko:'더 알아보기', fr:'En savoir plus', de:'Mehr erfahren', es:'Más información', ru:'Узнать больше' },

    // Coverage features
    '支持多种场景': { en:'Multi-scenario', ja:'マルチシナリオ', ko:'다중 시나리오', fr:'Multi-scénarios', de:'Multi-Szenario', es:'Multi-escenario', ru:'Мультисценарий' },
    '全协议':       { en:'All Protocols', ja:'全プロトコル', ko:'전 프로토콜', fr:'Tous protocoles', de:'Alle Protokolle', es:'Todos los protocolos', ru:'Все протоколы' },
    '10G+高速带宽': { en:'10G+ Speed', ja:'10G+高速帯域', ko:'10G+ 고속', fr:'10G+ Débit', de:'10G+ Speed', es:'10G+ Velocidad', ru:'10G+ скорость' },
    '按需计费方案': { en:'Pay-as-you-go', ja:'従量課金', ko:'종량 과금', fr:'Paiement à l\'usage', de:'Nutzungsbasiert', es:'Pago por uso', ru:'Оплата по факту' },

    // Country names
    '美国':       { en:'United States', ja:'アメリカ', ko:'미국', fr:'États-Unis', de:'USA', es:'EE.UU.', ru:'США' },
    '加拿大':     { en:'Canada', ja:'カナダ', ko:'캐나다', fr:'Canada', de:'Kanada', es:'Canadá', ru:'Канада' },
    '英国':       { en:'UK', ja:'イギリス', ko:'영국', fr:'Royaume-Uni', de:'Großbritannien', es:'Reino Unido', ru:'Великобритания' },
    '香港':       { en:'Hong Kong', ja:'香港', ko:'홍콩', fr:'Hong Kong', de:'Hongkong', es:'Hong Kong', ru:'Гонконг' },
    '新加坡':     { en:'Singapore', ja:'シンガポール', ko:'싱가포르', fr:'Singapour', de:'Singapur', es:'Singapur', ru:'Сингапур' },
    '日本':       { en:'Japan', ja:'日本', ko:'일본', fr:'Japon', de:'Japan', es:'Japón', ru:'Япония' },
    '德国':       { en:'Germany', ja:'ドイツ', ko:'독일', fr:'Allemagne', de:'Deutschland', es:'Alemania', ru:'Германия' },
    '法国':       { en:'France', ja:'フランス', ko:'프랑스', fr:'France', de:'Frankreich', es:'Francia', ru:'Франция' },
    '巴西':       { en:'Brazil', ja:'ブラジル', ko:'브라질', fr:'Brésil', de:'Brasilien', es:'Brasil', ru:'Бразилия' },
    '韩国':       { en:'South Korea', ja:'韓国', ko:'한국', fr:'Corée du Sud', de:'Südkorea', es:'Corea del Sur', ru:'Южная Корея' },
    '印度尼西亚': { en:'Indonesia', ja:'インドネシア', ko:'인도네시아', fr:'Indonésie', de:'Indonesien', es:'Indonesia', ru:'Индонезия' },
    '印度':       { en:'India', ja:'インド', ko:'인도', fr:'Inde', de:'Indien', es:'India', ru:'Индия' },
    '查看更多地区': { en:'View More Regions', ja:'もっと見る', ko:'더 많은 지역', fr:'Voir plus', de:'Mehr Regionen', es:'Ver más regiones', ru:'Больше регионов' },

    // OOS / Stock status
    '已售罄':     { en:'SOLD OUT', ja:'売り切れ', ko:'매진', fr:'ÉPUISÉ', de:'AUSVERKAUFT', es:'AGOTADO', ru:'ПРОДАНО' },
    '补货通知':   { en:'Notify Me', ja:'再入荷通知', ko:'재입고 알림', fr:'M\'avertir', de:'Benachrichtigen', es:'Notificarme', ru:'Уведомить' },

    // Pricing cards
    '静态住宅IP':   { en:'Static Residential IP', ja:'静的住居用IP', ko:'정적 주거용 IP', fr:'IP Résidentiel Statique', de:'Statische Wohn-IP', es:'IP Residencial Estática', ru:'Статический резидентный IP' },
    '动态住宅IP':   { en:'Dynamic Residential IP', ja:'動的住居用IP', ko:'동적 주거용 IP', fr:'IP Résidentiel Dynamique', de:'Dynamische Wohn-IP', es:'IP Residencial Dinámica', ru:'Динамический резидентный IP' },
    '数据中心IP':   { en:'Data Center IP', ja:'データセンターIP', ko:'데이터 센터 IP', fr:'IP Data Center', de:'Datacenter-IP', es:'IP Data Center', ru:'IP дата-центра' },
    '全协议支持':   { en:'All Protocols', ja:'全プロトコル対応', ko:'전 프로토콜 지원', fr:'Tous protocoles', de:'Alle Protokolle', es:'Todos los protocolos', ru:'Все протоколы' },
    '高速带宽':     { en:'High Speed', ja:'高速帯域', ko:'고속 대역폭', fr:'Haut débit', de:'Hochgeschwindigkeit', es:'Alta velocidad', ru:'Высокая скорость' },
    '多行业适配':   { en:'Multi-industry', ja:'多業種対応', ko:'다업종 적용', fr:'Multi-industrie', de:'Multi-Branche', es:'Multi-industria', ru:'Мультиотрасль' },
    '立即购买':     { en:'Buy Now', ja:'今すぐ購入', ko:'지금 구매', fr:'Acheter', de:'Jetzt kaufen', es:'Comprar ahora', ru:'Купить' },

    // Quick start
    '精选适合你的代理类型':     { en:'Choose the right proxy type for you', ja:'最適なプロキシタイプを選択', ko:'적합한 프록시 유형 선택', fr:'Choisissez votre type de proxy', de:'Wählen Sie Ihren Proxy-Typ', es:'Elija su tipo de proxy', ru:'Выберите тип прокси' },
    '一键下单，快速上线极速服务': { en:'One-click purchase, instant high-speed service', ja:'ワンクリック購入、即座に高速サービス', ko:'원클릭 주문, 즉시 고속 서비스', fr:'Achat en un clic, service ultra-rapide', de:'Ein-Klick-Kauf, sofortiger Highspeed-Service', es:'Compra con un clic, servicio ultrarrápido', ru:'Покупка в один клик, мгновенный сервис' },

    // Footer
    '产品与服务':     { en:'Products & Services', ja:'製品とサービス', ko:'제품 및 서비스', fr:'Produits & Services', de:'Produkte & Services', es:'Productos y Servicios', ru:'Продукты и услуги' },
    '静态住宅代理':   { en:'Static Residential Proxy', ja:'静的住居用プロキシ', ko:'정적 주거용 프록시', fr:'Proxy résidentiel statique', de:'Statischer Wohn-Proxy', es:'Proxy residencial estático', ru:'Статический резидентный прокси' },
    '动态住宅代理':   { en:'Dynamic Residential Proxy', ja:'動的住居用プロキシ', ko:'동적 주거용 프록시', fr:'Proxy résidentiel dynamique', de:'Dynamischer Wohn-Proxy', es:'Proxy residencial dinámico', ru:'Динамический резидентный прокси' },
    '数据中心代理':   { en:'Data Center Proxy', ja:'データセンタープロキシ', ko:'데이터 센터 프록시', fr:'Proxy data center', de:'Datacenter-Proxy', es:'Proxy data center', ru:'Прокси дата-центра' },
    '热门应用场景':   { en:'Popular Use Cases', ja:'人気の利用シーン', ko:'인기 사용 사례', fr:'Cas d\'utilisation populaires', de:'Beliebte Anwendungsfälle', es:'Casos de uso populares', ru:'Популярные сценарии' },
    'AI访问加速':     { en:'AI Access Boost', ja:'AIアクセス加速', ko:'AI 접근 가속', fr:'Accélération IA', de:'KI-Zugang beschleunigen', es:'Aceleración IA', ru:'Ускорение AI' },
    '股票市场':       { en:'Stock Market', ja:'株式市場', ko:'주식 시장', fr:'Marché boursier', de:'Aktienmarkt', es:'Mercado de valores', ru:'Фондовый рынок' },
    '游戏加速':       { en:'Game Acceleration', ja:'ゲーム加速', ko:'게임 가속', fr:'Accélération de jeux', de:'Spielbeschleunigung', es:'Aceleración de juegos', ru:'Ускорение игр' },
    '资源与支持':     { en:'Resources & Support', ja:'リソースとサポート', ko:'리소스 및 지원', fr:'Ressources & Support', de:'Ressourcen & Support', es:'Recursos y Soporte', ru:'Ресурсы и поддержка' },
    'API文档':       { en:'API Docs', ja:'APIドキュメント', ko:'API 문서', fr:'Documentation API', de:'API-Dokumentation', es:'Documentación API', ru:'Документация API' },
    '常见问题':       { en:'FAQ', ja:'よくある質問', ko:'자주 묻는 질문', fr:'FAQ', de:'FAQ', es:'FAQ', ru:'FAQ' },
    '法律合规信息':   { en:'Legal & Compliance', ja:'法律・コンプライアンス', ko:'법률 및 준수', fr:'Juridique & Conformité', de:'Recht & Compliance', es:'Legal y Cumplimiento', ru:'Правовая информация' },
    '隐私政策':       { en:'Privacy Policy', ja:'プライバシーポリシー', ko:'개인정보 처리방침', fr:'Politique de confidentialité', de:'Datenschutz', es:'Política de privacidad', ru:'Конфиденциальность' },
    '服务条款':       { en:'Terms of Service', ja:'利用規約', ko:'서비스 약관', fr:'Conditions d\'utilisation', de:'Nutzungsbedingungen', es:'Términos de servicio', ru:'Условия использования' },
    'Cookie政策':    { en:'Cookie Policy', ja:'Cookieポリシー', ko:'쿠키 정책', fr:'Politique de cookies', de:'Cookie-Richtlinie', es:'Política de cookies', ru:'Политика cookies' },
    '版权所有':       { en:'All Rights Reserved', ja:'全著作権所有', ko:'모든 권리 보유', fr:'Tous droits réservés', de:'Alle Rechte vorbehalten', es:'Todos los derechos reservados', ru:'Все права защищены' },
    '扫码添加微信':   { en:'Scan to add WeChat', ja:'スキャンしてWeChatを追加', ko:'스캔하여 위챗 추가', fr:'Scannez pour ajouter WeChat', de:'Scannen um WeChat hinzuzufügen', es:'Escanea para agregar WeChat', ru:'Сканируйте для добавления WeChat' },

    // Help Center - navigation & headings
    '目录导航':       { en:'Navigation', ja:'ナビゲーション', ko:'내비게이션', fr:'Navigation', de:'Navigation', es:'Navegación', ru:'Навигация' },
    '选择一个主题':   { en:'Select a topic', ja:'トピックを選択', ko:'주제를 선택하세요', fr:'Choisissez un sujet', de:'Thema auswählen', es:'Seleccione un tema', ru:'Выберите тему' },
    '打印':           { en:'Print', ja:'印刷', ko:'인쇄', fr:'Imprimer', de:'Drucken', es:'Imprimir', ru:'Печать' },
    '欢迎来到帮助中心': { en:'Welcome to Help Center', ja:'ヘルプセンターへようこそ', ko:'도움말 센터에 오신 것을 환영합니다', fr:'Bienvenue au centre d\'aide', de:'Willkommen im Help Center', es:'Bienvenido al Centro de ayuda', ru:'Добро пожаловать в центр поддержки' },
    '请从左侧目录选择您想要了解的内容，我们将为您提供详细的使用指南和常见问题解答。':
                       { en:'Please select a topic from the left navigation. We provide detailed guides and FAQs.', ja:'左側のナビゲーションから知りたい内容を選択してください。詳細なガイドとFAQをご用意しています。', ko:'왼쪽 내비게이션에서 보고 싶은 내용을 선택하세요. 자세한 가이드와 FAQ를 제공합니다.', fr:'Veuillez choisir un sujet dans la navigation de gauche. Nous fournissons des guides détaillés et une FAQ.', de:'Bitte wählen Sie ein Thema in der linken Navigation. Wir bieten detaillierte Anleitungen und FAQs.', es:'Seleccione un tema en la navegación de la izquierda. Ofrecemos guías detalladas y preguntas frecuentes.', ru:'Выберите тему в левой навигации. Мы предоставляем подробные инструкции и FAQ.' },
    '内容区域（暂留为空白）': { en:'Content area (currently empty)', ja:'コンテンツ領域（現在は空です）', ko:'콘텐츠 영역(현재 비어 있음)', fr:'Zone de contenu (actuellement vide)', de:'Inhaltsbereich (derzeit leer)', es:'Área de contenido (actualmente vacía)', ru:'Область содержимого (пока пусто)' },
    '最后更新：':     { en:'Last updated: ', ja:'最終更新: ', ko:'마지막 업데이트: ', fr:'Dernière mise à jour : ', de:'Zuletzt aktualisiert: ', es:'Última actualización: ', ru:'Последнее обновление: ' },
    '阅读量：':       { en:'Views: ', ja:'閲覧数: ', ko:'조회수: ', fr:'Vues : ', de:'Aufrufe: ', es:'Vistas: ', ru:'Просмотры: ' },
    '找到':           { en:'Found', ja:'件', ko:'건', fr:'Trouvé', de:'Gefunden', es:'Encontrado', ru:'Найдено' },
    '个相关结果':     { en:' results', ja:'件の関連結果', ko:'개의 관련 결과', fr:' résultats', de:' relevante Ergebnisse', es:' resultados relacionados', ru:' результатов' },
    '搜索帮助文档、常见问题...':
                       { en:'Search help articles, FAQs...', ja:'ヘルプ記事、FAQを検索...', ko:'도움말 문서, FAQ 검색...', fr:'Rechercher des articles d\'aide, FAQ...', de:'Hilfedokumente, FAQs durchsuchen...', es:'Buscar ayuda, preguntas frecuentes...', ru:'Поиск статей и FAQ...' },

    // Help Center - Browser Config sub-chapters
    '浏览器配置':       { en:'Browser Configuration', ja:'ブラウザ設定', ko:'브라우저 설정', fr:'Configuration du navigateur', de:'Browser-Konfiguration', es:'Configuración del navegador', ru:'Настройка браузера' },
    'AdsPower 配置教程': { en:'AdsPower Setup Guide', ja:'AdsPower 設定ガイド', ko:'AdsPower 설정 가이드', fr:'Guide AdsPower', de:'AdsPower Anleitung', es:'Guía de AdsPower', ru:'Руководство AdsPower' },
    '比特浏览器配置教程': { en:'BitBrowser Setup Guide', ja:'BitBrowser 設定ガイド', ko:'비트브라우저 설정 가이드', fr:'Guide BitBrowser', de:'BitBrowser Anleitung', es:'Guía de BitBrowser', ru:'Руководство BitBrowser' },
    '候鸟浏览器配置教程': { en:'HouNiao Browser Setup Guide', ja:'候鳥ブラウザ設定ガイド', ko:'후냐오 브라우저 설정 가이드', fr:'Guide HouNiao', de:'HouNiao Anleitung', es:'Guía de HouNiao', ru:'Руководство HouNiao' },
    'VMLogin 配置教程':  { en:'VMLogin Setup Guide', ja:'VMLogin 設定ガイド', ko:'VMLogin 설정 가이드', fr:'Guide VMLogin', de:'VMLogin Anleitung', es:'Guía de VMLogin', ru:'Руководство VMLogin' },
    'HubStudio 配置教程': { en:'HubStudio Setup Guide', ja:'HubStudio 設定ガイド', ko:'HubStudio 설정 가이드', fr:'Guide HubStudio', de:'HubStudio Anleitung', es:'Guía de HubStudio', ru:'Руководство HubStudio' },
    'MuLogin 配置教程':  { en:'MuLogin Setup Guide', ja:'MuLogin 設定ガイド', ko:'MuLogin 설정 가이드', fr:'Guide MuLogin', de:'MuLogin Anleitung', es:'Guía de MuLogin', ru:'Руководство MuLogin' },
    '紫鸟浏览器配置教程': { en:'ZiNiao Browser Setup Guide', ja:'紫鳥ブラウザ設定ガイド', ko:'즈냐오 브라우저 설정 가이드', fr:'Guide ZiNiao', de:'ZiNiao Anleitung', es:'Guía de ZiNiao', ru:'Руководство ZiNiao' },
    'MoreLogin 配置教程': { en:'MoreLogin Setup Guide', ja:'MoreLogin 設定ガイド', ko:'MoreLogin 설정 가이드', fr:'Guide MoreLogin', de:'MoreLogin Anleitung', es:'Guía de MoreLogin', ru:'Руководство MoreLogin' },
    'Nstbrowser 配置教程': { en:'Nstbrowser Setup Guide', ja:'Nstbrowser 設定ガイド', ko:'Nstbrowser 설정 가이드', fr:'Guide Nstbrowser', de:'Nstbrowser Anleitung', es:'Guía de Nstbrowser', ru:'Руководство Nstbrowser' },
    'MostLogin 配置教程': { en:'MostLogin Setup Guide', ja:'MostLogin 設定ガイド', ko:'MostLogin 설정 가이드', fr:'Guide MostLogin', de:'MostLogin Anleitung', es:'Guía de MostLogin', ru:'Руководство MostLogin' },

    // Help Center - Cloud Phone sub-chapters
    '云手机':             { en:'Cloud Phone', ja:'クラウドフォン', ko:'클라우드폰', fr:'Téléphone Cloud', de:'Cloud-Telefon', es:'Teléfono en la nube', ru:'Облачный телефон' },
    '云手机使用概览':     { en:'Cloud Phone Overview', ja:'クラウドフォン概要', ko:'클라우드폰 개요', fr:'Aperçu du téléphone cloud', de:'Cloud-Telefon Übersicht', es:'Descripción general del teléfono en la nube', ru:'Обзор облачного телефона' },
    '云手机代理配置':     { en:'Cloud Phone Proxy Setup', ja:'クラウドフォン プロキシ設定', ko:'클라우드폰 프록시 설정', fr:'Configuration proxy du téléphone cloud', de:'Cloud-Telefon Proxy-Einrichtung', es:'Configuración de proxy del teléfono en la nube', ru:'Настройка прокси облачного телефона' },
    '多开与批量管理':     { en:'Multi-Instance & Batch Management', ja:'マルチインスタンスと一括管理', ko:'다중 인스턴스 및 일괄 관리', fr:'Multi-instances et gestion par lots', de:'Multi-Instanz & Stapelverwaltung', es:'Multi-instancia y gestión por lotes', ru:'Мультиэкземпляры и пакетное управление' },
    '云手机常见问题':     { en:'Cloud Phone FAQ', ja:'クラウドフォン FAQ', ko:'클라우드폰 FAQ', fr:'FAQ téléphone cloud', de:'Cloud-Telefon FAQ', es:'Preguntas frecuentes del teléfono en la nube', ru:'FAQ облачного телефона' },

    // ── Navigation extras ──
    '商务合作':       { en:'Business', ja:'ビジネス', ko:'비즈니스', fr:'Affaires', de:'Geschäft', es:'Negocios', ru:'Бизнес' },
    '企业服务':       { en:'Enterprise', ja:'エンタープライズ', ko:'기업 서비스', fr:'Entreprise', de:'Unternehmen', es:'Empresa', ru:'Корпоративный' },
    'IP转售 · 专属折扣 · 技术支持': { en:'IP Resale · Exclusive Discounts · Tech Support', ja:'IP再販 · 専用割引 · 技術サポート', ko:'IP 재판매 · 전용 할인 · 기술 지원', fr:'Revente IP · Remises exclusives · Support technique', de:'IP-Wiederverkauf · Exklusive Rabatte · Technischer Support', es:'Reventa IP · Descuentos exclusivos · Soporte técnico', ru:'Перепродажа IP · Эксклюзивные скидки · Техподдержка' },
    '成为代理':       { en:'Become Agent', ja:'代理店になる', ko:'에이전트 되기', fr:'Devenir agent', de:'Agent werden', es:'Ser agente', ru:'Стать агентом' },
    '阶梯佣金 · 快速提现 · 专人辅导': { en:'Tiered Commission · Fast Withdrawal · Personal Coaching', ja:'段階的コミッション · 迅速な出金 · 個別指導', ko:'단계적 수수료 · 빠른 출금 · 전담 코칭', fr:'Commission échelonnée · Retrait rapide · Coaching personnel', de:'Gestaffelte Provision · Schnelle Auszahlung · Persönliches Coaching', es:'Comisión escalonada · Retiro rápido · Coaching personal', ru:'Ступенчатая комиссия · Быстрый вывод · Персональный коучинг' },
    '低至':           { en:'From', ja:'最低', ko:'최저', fr:'Dès', de:'Ab', es:'Desde', ru:'От' },
    '天':             { en:'day', ja:'日', ko:'일', fr:'jour', de:'Tag', es:'día', ru:'день' },

    // ── CoverageSection extra ──
    '世界地图':       { en:'World Map', ja:'世界地図', ko:'세계 지도', fr:'Carte du monde', de:'Weltkarte', es:'Mapa del mundo', ru:'Карта мира' },
    '印尼':           { en:'Indonesia', ja:'インドネシア', ko:'인도네시아', fr:'Indonésie', de:'Indonesien', es:'Indonesia', ru:'Индонезия' },
    '香港 中国':      { en:'Hong Kong, China', ja:'香港 中国', ko:'홍콩 중국', fr:'Hong Kong, Chine', de:'Hongkong, China', es:'Hong Kong, China', ru:'Гонконг, Китай' },

    // ── PricingSection features ──
    '多协议支持':     { en:'Multi-protocol', ja:'マルチプロトコル', ko:'멀티 프로토콜', fr:'Multi-protocole', de:'Multi-Protokoll', es:'Multi-protocolo', ru:'Мультипротокол' },
    '多地域接入':     { en:'Multi-region Access', ja:'マルチリージョン', ko:'멀티 리전', fr:'Multi-région', de:'Multi-Region', es:'Multi-región', ru:'Мультирегион' },

    // ── QuickStartSection ──
    'quickstart.intro':                { en:'Get started in just a few simple steps', ja:'簡単なステップですぐに始められます', ko:'간단한 몇 단계로 시작하세요', fr:'Commencez en quelques étapes simples', de:'Starten Sie in wenigen einfachen Schritten', es:'Comience en unos simples pasos', ru:'Начните за несколько простых шагов' },
    '简单选择您的代理需求':             { en:'Simply choose your proxy needs', ja:'プロキシのニーズを簡単に選択', ko:'프록시 요구 사항을 간단히 선택', fr:'Choisissez simplement vos besoins proxy', de:'Wählen Sie einfach Ihre Proxy-Anforderungen', es:'Elija simplemente sus necesidades de proxy', ru:'Просто выберите ваши потребности в прокси' },
    '仅需几步，轻松定义您的代理配置。从选择国家/地区和具体使用场景（如跨境电商、社交媒体），到设定IP级别、使用终端和交付协议，每项选择都将精准匹配您的业务场景。': { en:'In just a few steps, easily define your proxy configuration. From selecting countries and use cases (e.g. cross-border e-commerce, social media) to setting IP levels, endpoints and delivery protocols — every choice precisely matches your business scenario.', ja:'わずか数ステップでプロキシ設定を簡単に定義。国・利用シーン（越境EC、SNSなど）の選択からIPレベル・エンドポイント・配信プロトコルの設定まで、すべてがビジネスシナリオに正確にマッチします。', ko:'몇 단계만으로 프록시 구성을 쉽게 정의하세요. 국가 및 사용 사례(예: 크로스보더 이커머스, 소셜 미디어) 선택부터 IP 레벨, 엔드포인트, 전달 프로토콜 설정까지 — 모든 선택이 비즈니스 시나리오에 정확히 맞습니다.', fr:'En quelques étapes, définissez facilement votre configuration proxy. Du choix des pays et cas d\'utilisation à la configuration des niveaux IP et protocoles — chaque choix correspond à votre scénario métier.', de:'In wenigen Schritten definieren Sie Ihre Proxy-Konfiguration. Von der Auswahl der Länder und Anwendungsfälle bis zur Einstellung von IP-Levels und Protokollen — jede Wahl passt zu Ihrem Geschäftsszenario.', es:'En unos pocos pasos, defina fácilmente su configuración de proxy. Desde la selección de países y casos de uso hasta la configuración de niveles IP y protocolos — cada elección se ajusta a su escenario de negocio.', ru:'Всего за несколько шагов легко определите конфигурацию прокси. От выбора стран и сценариев использования до настройки уровней IP и протоколов — каждый выбор точно соответствует вашему бизнес-сценарию.' },
    '智能推荐，最优匹配':               { en:'Smart Recommendations, Best Match', ja:'スマート推薦、最適マッチ', ko:'스마트 추천, 최적 매칭', fr:'Recommandations intelligentes, meilleure correspondance', de:'Intelligente Empfehlungen, beste Übereinstimmung', es:'Recomendaciones inteligentes, mejor coincidencia', ru:'Умные рекомендации, лучшее совпадение' },
    '基于您在第一步中确定的多维度业务场景，我们的智能系统将自动为您生成一套高度匹配的代理推荐方案。告别繁琐选择，高效找到最适合您的代理服务组合。': { en:'Based on the multi-dimensional business scenarios you defined in step one, our intelligent system automatically generates a highly matched proxy recommendation. Say goodbye to tedious choices and efficiently find the best proxy service combination for you.', ja:'ステップ1で定義した多次元ビジネスシナリオに基づき、インテリジェントシステムが高度にマッチしたプロキシ推薦を自動生成。面倒な選択に別れを告げ、最適なプロキシサービスの組み合わせを効率的に見つけましょう。', ko:'1단계에서 정의한 다차원 비즈니스 시나리오를 기반으로 지능형 시스템이 고도로 매칭된 프록시 추천을 자동 생성합니다. 번거로운 선택과 작별하고 최적의 프록시 서비스 조합을 효율적으로 찾으세요.', fr:'Basé sur les scénarios métier que vous avez définis, notre système intelligent génère automatiquement une recommandation proxy hautement adaptée. Dites adieu aux choix fastidieux.', de:'Basierend auf Ihren definierten Geschäftsszenarien generiert unser intelligentes System automatisch eine optimal passende Proxy-Empfehlung. Verabschieden Sie sich von mühsamen Auswahlen.', es:'Basado en los escenarios de negocio que definió, nuestro sistema inteligente genera automáticamente una recomendación de proxy altamente adaptada. Diga adiós a las elecciones tediosas.', ru:'На основе определённых вами бизнес-сценариев наша интеллектуальная система автоматически генерирует оптимально подобранную рекомендацию прокси. Попрощайтесь с утомительным выбором.' },
    '一键下单，体验高速服务':           { en:'One-Click Order, Experience High-Speed Service', ja:'ワンクリック注文、高速サービスを体験', ko:'원클릭 주문, 고속 서비스 체험', fr:'Commande en un clic, service haute vitesse', de:'Ein-Klick-Bestellung, Highspeed-Service erleben', es:'Pedido con un clic, servicio de alta velocidad', ru:'Заказ в один клик, высокоскоростной сервис' },
    '专属方案为您量身定制，点击立即下单可直接跳转到购买页面，系统将自动为您填充所有配置，无论是集成至软件路由、指纹浏览器，还是代理客户端都能轻松部署，即刻享受稳定、高速的全球代理服务。': { en:'A tailored plan just for you — click to order and jump directly to the purchase page with all configurations auto-filled. Whether integrating into software routers, fingerprint browsers, or proxy clients, deployment is effortless. Enjoy stable, high-speed global proxy service instantly.', ja:'あなた専用のプランをワンクリックで注文。購入ページに直接移動し、すべての設定が自動入力されます。ソフトウェアルーター、フィンガープリントブラウザ、プロキシクライアントへの統合も簡単。安定した高速グローバルプロキシサービスを即座にお楽しみください。', ko:'맞춤형 플랜을 원클릭으로 주문하세요. 구매 페이지로 바로 이동하며 모든 구성이 자동 입력됩니다. 소프트웨어 라우터, 핑거프린트 브라우저, 프록시 클라이언트 통합 모두 간편하게 배포할 수 있습니다.', fr:'Un plan sur mesure pour vous — cliquez pour commander et accédez directement à la page d\'achat avec toutes les configurations pré-remplies. Déploiement facile sur tous les clients.', de:'Ein maßgeschneiderter Plan für Sie — klicken Sie zum Bestellen und gelangen Sie direkt zur Kaufseite mit allen vorausgefüllten Konfigurationen. Einfache Bereitstellung auf allen Clients.', es:'Un plan a medida para usted — haga clic para ordenar y vaya directamente a la página de compra con todas las configuraciones prellenadas. Implementación fácil en todos los clientes.', ru:'Индивидуальный план для вас — нажмите для заказа и перейдите на страницу покупки с автозаполнением всех настроек. Простое развёртывание на всех клиентах.' },

    // ── CTASection ──
    '开始使用Quantum-Proxy':   { en:'Start Using Quantum-Proxy', ja:'Quantum-Proxyを使い始める', ko:'Quantum-Proxy 사용 시작', fr:'Commencer avec Quantum-Proxy', de:'Quantum-Proxy nutzen', es:'Empezar con Quantum-Proxy', ru:'Начать использовать Quantum-Proxy' },
    '注册即送免费测试额度': { en:'Sign up and get free test credits', ja:'登録で無料テストクレジット獲得', ko:'가입 시 무료 테스트 크레딧 제공', fr:'Inscrivez-vous et obtenez des crédits gratuits', de:'Registrieren und kostenlose Testguthaben erhalten', es:'Regístrese y obtenga créditos de prueba gratis', ru:'Зарегистрируйтесь и получите бесплатные тестовые кредиты' },
    '免费注册':           { en:'Free Sign Up', ja:'無料登録', ko:'무료 가입', fr:'Inscription gratuite', de:'Kostenlos registrieren', es:'Registro gratuito', ru:'Бесплатная регистрация' },

    // ── Footer extras ──
    '退款协议':       { en:'Refund Policy', ja:'返金ポリシー', ko:'환불 정책', fr:'Politique de remboursement', de:'Rückerstattungsrichtlinie', es:'Política de reembolso', ru:'Политика возврата' },
    '关于我们':       { en:'About Us', ja:'会社概要', ko:'회사 소개', fr:'À propos', de:'Über uns', es:'Sobre nosotros', ru:'О нас' },
    '公司简介':       { en:'Company', ja:'会社紹介', ko:'회사 소개', fr:'Entreprise', de:'Unternehmen', es:'Empresa', ru:'Компания' },
    '联系我们':       { en:'Contact Us', ja:'お問い合わせ', ko:'문의하기', fr:'Contactez-nous', de:'Kontakt', es:'Contáctenos', ru:'Свяжитесь с нами' },
    '加入我们':       { en:'Join Us', ja:'採用情報', ko:'채용 정보', fr:'Rejoignez-nous', de:'Karriere', es:'Únase a nosotros', ru:'Присоединяйтесь' },
    '联系方式':       { en:'Contact Info', ja:'連絡先', ko:'연락처', fr:'Coordonnées', de:'Kontaktdaten', es:'Información de contacto', ru:'Контактная информация' },
    '智能爬虫':       { en:'Smart Crawler', ja:'スマートクローラー', ko:'스마트 크롤러', fr:'Crawler intelligent', de:'Smart Crawler', es:'Crawler inteligente', ru:'Умный краулер' },

    // ── Placeholder page titles ──
    '静态住宅ISP代理 - 页面建设中':   { en:'Static Residential ISP Proxy - Under Construction', ja:'静的住居用ISPプロキシ - 準備中', ko:'정적 주거용 ISP 프록시 - 준비 중', fr:'Proxy ISP Résidentiel Statique - En construction', de:'Statischer ISP-Wohn-Proxy - Im Aufbau', es:'Proxy ISP Residencial Estático - En construcción', ru:'Статический ISP-прокси - В разработке' },
    '解决方案 - 页面建设中':           { en:'Solutions - Under Construction', ja:'ソリューション - 準備中', ko:'솔루션 - 준비 중', fr:'Solutions - En construction', de:'Lösungen - Im Aufbau', es:'Soluciones - En construcción', ru:'Решения - В разработке' },
    'API文档 - 页面建设中':            { en:'API Docs - Under Construction', ja:'APIドキュメント - 準備中', ko:'API 문서 - 준비 중', fr:'Documentation API - En construction', de:'API-Dokumentation - Im Aufbau', es:'Documentación API - En construcción', ru:'Документация API - В разработке' },
    '常见问题 - 页面建设中':           { en:'FAQ - Under Construction', ja:'よくある質問 - 準備中', ko:'자주 묻는 질문 - 준비 중', fr:'FAQ - En construction', de:'FAQ - Im Aufbau', es:'FAQ - En construcción', ru:'FAQ - В разработке' },
    '公司简介 - 页面建设中':           { en:'About Us - Under Construction', ja:'会社紹介 - 準備中', ko:'회사 소개 - 준비 중', fr:'À propos - En construction', de:'Über uns - Im Aufbau', es:'Sobre nosotros - En construcción', ru:'О компании - В разработке' },
    '联系我们 - 页面建设中':           { en:'Contact Us - Under Construction', ja:'お問い合わせ - 準備中', ko:'문의하기 - 준비 중', fr:'Contactez-nous - En construction', de:'Kontakt - Im Aufbau', es:'Contáctenos - En construcción', ru:'Свяжитесь с нами - В разработке' },
    '加入我们 - 页面建设中':           { en:'Join Us - Under Construction', ja:'採用情報 - 準備中', ko:'채용 정보 - 준비 중', fr:'Rejoignez-nous - En construction', de:'Karriere - Im Aufbau', es:'Únase a nosotros - En construcción', ru:'Присоединяйтесь - В разработке' },
    '隐私政策 - 页面建设中':           { en:'Privacy Policy - Under Construction', ja:'プライバシーポリシー - 準備中', ko:'개인정보 처리방침 - 준비 중', fr:'Politique de confidentialité - En construction', de:'Datenschutz - Im Aufbau', es:'Política de privacidad - En construcción', ru:'Конфиденциальность - В разработке' },
    '服务条款 - 页面建设中':           { en:'Terms of Service - Under Construction', ja:'利用規約 - 準備中', ko:'서비스 약관 - 준비 중', fr:'Conditions d\'utilisation - En construction', de:'Nutzungsbedingungen - Im Aufbau', es:'Términos de servicio - En construcción', ru:'Условия использования - В разработке' },
    '退款协议 - 页面建设中':           { en:'Refund Policy - Under Construction', ja:'返金ポリシー - 準備中', ko:'환불 정책 - 준비 중', fr:'Politique de remboursement - En construction', de:'Rückerstattungsrichtlinie - Im Aufbau', es:'Política de reembolso - En construcción', ru:'Политика возврата - В разработке' },
    'AI数据挖掘 - 页面建设中':         { en:'AI Data Mining - Under Construction', ja:'AIデータマイニング - 準備中', ko:'AI 데이터 마이닝 - 준비 중', fr:'Exploration de données IA - En construction', de:'KI-Data-Mining - Im Aufbau', es:'Minería de datos IA - En construcción', ru:'AI-майнинг данных - В разработке' },
    '股票市场 - 页面建设中':           { en:'Stock Market - Under Construction', ja:'株式市場 - 準備中', ko:'주식 시장 - 준비 중', fr:'Marché boursier - En construction', de:'Aktienmarkt - Im Aufbau', es:'Mercado de valores - En construcción', ru:'Фондовый рынок - В разработке' },
    '智能爬虫 - 页面建设中':           { en:'Smart Crawler - Under Construction', ja:'スマートクローラー - 準備中', ko:'스마트 크롤러 - 준비 중', fr:'Crawler intelligent - En construction', de:'Smart Crawler - Im Aufbau', es:'Crawler inteligente - En construcción', ru:'Умный краулер - В разработке' },
    '动态住宅代理 - 页面建设中':       { en:'Dynamic Residential Proxy - Under Construction', ja:'動的住居用プロキシ - 準備中', ko:'동적 주거용 프록시 - 준비 중', fr:'Proxy résidentiel dynamique - En construction', de:'Dynamischer Wohn-Proxy - Im Aufbau', es:'Proxy residencial dinámico - En construcción', ru:'Динамический резидентный прокси - В разработке' },
    '静态住宅代理 - 页面建设中':       { en:'Static Residential Proxy - Under Construction', ja:'静的住居用プロキシ - 準備中', ko:'정적 주거용 프록시 - 준비 중', fr:'Proxy résidentiel statique - En construction', de:'Statischer Wohn-Proxy - Im Aufbau', es:'Proxy residencial estático - En construcción', ru:'Статический резидентный прокси - В разработке' },
    '数据中心代理 - 页面建设中':       { en:'Data Center Proxy - Under Construction', ja:'データセンタープロキシ - 準備中', ko:'데이터 센터 프록시 - 준비 중', fr:'Proxy data center - En construction', de:'Datacenter-Proxy - Im Aufbau', es:'Proxy data center - En construcción', ru:'Прокси дата-центра - В разработке' },
    '跨境电商 - 页面建设中':           { en:'Cross-border E-commerce - Under Construction', ja:'越境EC - 準備中', ko:'크로스보더 이커머스 - 준비 중', fr:'E-commerce transfrontalier - En construction', de:'Grenzüberschreitender E-Commerce - Im Aufbau', es:'E-commerce transfronterizo - En construcción', ru:'Трансграничная электронная коммерция - В разработке' },

    // ── BusinessCooperationPage ──
    'Enterprise Partner Program':       { en:'Enterprise Partner Program', ja:'エンタープライズパートナープログラム', ko:'엔터프라이즈 파트너 프로그램', fr:'Programme Partenaire Entreprise', de:'Enterprise-Partnerprogramm', es:'Programa de Socios Empresariales', ru:'Корпоративная партнёрская программа' },
    '企业服务 · IP转售合作计划':        { en:'Enterprise Service · IP Resale Partnership', ja:'エンタープライズサービス · IP再販パートナーシップ', ko:'기업 서비스 · IP 재판매 파트너십', fr:'Service Entreprise · Partenariat de revente IP', de:'Enterprise-Service · IP-Wiederverkaufspartnerschaft', es:'Servicio Empresarial · Asociación de reventa IP', ru:'Корпоративный сервис · Партнёрство по перепродаже IP' },
    '面向具有ISP/IDC资质的服务商及企业级用户，提供深度定制化合作方案。买的越多折扣越大，专属技术支持与API全接入，助力您快速拓展业务版图。': { en:'For ISP/IDC service providers and enterprise users, we offer deeply customized partnership plans. The more you buy, the bigger the discount, with dedicated tech support and full API access to help you expand your business.', ja:'ISP/IDCサービスプロバイダーおよびエンタープライズユーザー向けに、深くカスタマイズされたパートナーシッププランを提供。購入量が多いほど割引が大きくなり、専用技術サポートと完全なAPIアクセスでビジネス拡大を支援します。', ko:'ISP/IDC 서비스 제공업체 및 기업 사용자를 위한 맞춤형 파트너십 플랜을 제공합니다. 더 많이 구매할수록 더 큰 할인, 전담 기술 지원 및 전체 API 액세스로 비즈니스 확장을 지원합니다.', fr:'Pour les fournisseurs ISP/IDC et les entreprises, nous offrons des plans de partenariat personnalisés. Plus vous achetez, plus la remise est importante.', de:'Für ISP/IDC-Anbieter und Unternehmenskunden bieten wir maßgeschneiderte Partnerschaftspläne. Je mehr Sie kaufen, desto größer der Rabatt.', es:'Para proveedores ISP/IDC y usuarios empresariales, ofrecemos planes de asociación personalizados. Cuanto más compre, mayor será el descuento.', ru:'Для ISP/IDC-провайдеров и корпоративных пользователей мы предлагаем индивидуальные партнёрские планы. Чем больше покупаете, тем больше скидка.' },
    '立即申请合作':     { en:'Apply Now', ja:'今すぐ申請', ko:'지금 신청', fr:'Postuler maintenant', de:'Jetzt bewerben', es:'Solicitar ahora', ru:'Подать заявку' },
    '返回首页':         { en:'Back to Home', ja:'ホームに戻る', ko:'홈으로 돌아가기', fr:'Retour à l\'accueil', de:'Zurück zur Startseite', es:'Volver al inicio', ru:'На главную' },
    '覆盖国家和地区':   { en:'Countries & Regions', ja:'対象国と地域', ko:'대상 국가 및 지역', fr:'Pays et régions', de:'Länder und Regionen', es:'Países y regiones', ru:'Страны и регионы' },
    '全球IP资源池':     { en:'Global IP Pool', ja:'グローバルIPプール', ko:'글로벌 IP 풀', fr:'Pool IP mondial', de:'Globaler IP-Pool', es:'Pool IP global', ru:'Глобальный IP-пул' },
    '服务可用率':       { en:'Service Uptime', ja:'サービス稼働率', ko:'서비스 가동률', fr:'Disponibilité du service', de:'Dienstverfügbarkeit', es:'Disponibilidad del servicio', ru:'Доступность сервиса' },
    '更多':             { en:'More', ja:'もっと', ko:'더 보기', fr:'Plus', de:'Mehr', es:'Más', ru:'Ещё' },
    '量大折扣更大':     { en:'Bigger Volume, Bigger Discount', ja:'大量購入で大幅割引', ko:'대량 구매 시 더 큰 할인', fr:'Plus de volume, plus de remise', de:'Größeres Volumen, größerer Rabatt', es:'Mayor volumen, mayor descuento', ru:'Больше объём — больше скидка' },
    '为什么选择企业合作': { en:'Why Choose Enterprise Partnership', ja:'なぜエンタープライズパートナーシップを選ぶのか', ko:'왜 기업 파트너십을 선택하는가', fr:'Pourquoi choisir le partenariat entreprise', de:'Warum Enterprise-Partnerschaft wählen', es:'Por qué elegir la asociación empresarial', ru:'Почему стоит выбрать корпоративное партнёрство' },
    '我们为转售服务商提供全链路支持，让合作更高效、更安心': { en:'We provide full-chain support for resellers, making partnerships more efficient and worry-free', ja:'リセラー向けにフルチェーンサポートを提供し、パートナーシップをより効率的で安心に', ko:'리셀러를 위한 풀체인 지원으로 파트너십을 더 효율적이고 안심할 수 있게', fr:'Nous offrons un support complet aux revendeurs pour des partenariats plus efficaces', de:'Wir bieten Resellern vollständige Unterstützung für effizientere Partnerschaften', es:'Ofrecemos soporte completo a revendedores para asociaciones más eficientes', ru:'Мы обеспечиваем полную поддержку реселлеров для более эффективного партнёрства' },
    '阶梯折扣优惠':     { en:'Tiered Discount', ja:'段階的割引', ko:'단계적 할인', fr:'Remise échelonnée', de:'Gestaffelte Rabatte', es:'Descuento escalonado', ru:'Ступенчатая скидка' },
    '买的越多折扣越大，消费量越高优惠力度越强，显著降低采购成本。': { en:'The more you buy, the bigger the discount. Higher volume means stronger savings, significantly reducing procurement costs.', ja:'購入量が多いほど割引が大きく、消費量が多いほど優遇が強力に。調達コストを大幅に削減します。', ko:'더 많이 구매할수록 더 큰 할인. 높은 소비량은 더 강력한 절감 효과로 조달 비용을 크게 줄입니다.', fr:'Plus vous achetez, plus la remise est importante. Un volume plus élevé réduit considérablement les coûts.', de:'Je mehr Sie kaufen, desto größer der Rabatt. Höheres Volumen bedeutet stärkere Einsparungen.', es:'Cuanto más compre, mayor el descuento. Mayor volumen reduce significativamente los costos.', ru:'Чем больше покупаете, тем больше скидка. Больший объём значительно снижает затраты.' },
    'API 全面对接':     { en:'Full API Integration', ja:'完全API統合', ko:'전체 API 통합', fr:'Intégration API complète', de:'Vollständige API-Integration', es:'Integración API completa', ru:'Полная интеграция API' },
    '提供完整的API接口调用能力，轻松集成到您的系统，高效自动化管理。': { en:'Full API interface capabilities for easy integration into your system, enabling efficient automated management.', ja:'完全なAPIインターフェース機能でシステムに簡単に統合し、効率的な自動管理を実現。', ko:'완전한 API 인터페이스 기능으로 시스템에 쉽게 통합하여 효율적인 자동화 관리를 실현합니다.', fr:'Capacités API complètes pour une intégration facile et une gestion automatisée efficace.', de:'Vollständige API-Schnittstellenfähigkeiten für einfache Integration und effiziente automatisierte Verwaltung.', es:'Capacidades API completas para una fácil integración y gestión automatizada eficiente.', ru:'Полные возможности API для лёгкой интеграции и эффективного автоматизированного управления.' },
    '预充值消耗模式':   { en:'Prepaid Consumption Model', ja:'プリペイド消費モデル', ko:'선불 소비 모델', fr:'Modèle de consommation prépayé', de:'Prepaid-Verbrauchsmodell', es:'Modelo de consumo prepago', ru:'Модель предоплатного потребления' },
    '无需囤货垫资，按需充值按量消耗，灵活便捷，资金零风险。': { en:'No inventory or upfront costs. Top up on demand, pay per use — flexible, convenient, zero financial risk.', ja:'在庫不要、前払い不要。必要に応じてチャージし、使用量に応じて支払い。柔軟で便利、資金リスクゼロ。', ko:'재고나 선불 비용 없이 필요에 따라 충전하고 사용량만큼 지불. 유연하고 편리하며 재정적 위험 제로.', fr:'Pas de stock ni d\'avance de fonds. Rechargez à la demande, payez à l\'utilisation — flexible et sans risque.', de:'Kein Lagerbestand, keine Vorauszahlung. Laden Sie nach Bedarf auf und zahlen Sie pro Nutzung — flexibel und risikofrei.', es:'Sin inventario ni costos iniciales. Recargue según demanda, pague por uso — flexible y sin riesgo financiero.', ru:'Без складских запасов и предоплаты. Пополняйте по мере необходимости, платите за использование — гибко и без финансовых рисков.' },
    '专属技术支持':     { en:'Dedicated Tech Support', ja:'専用技術サポート', ko:'전담 기술 지원', fr:'Support technique dédié', de:'Dedizierter technischer Support', es:'Soporte técnico dedicado', ru:'Выделенная техподдержка' },
    '配备专业技术团队一对一对接，7×24小时响应，确保业务稳定运行。': { en:'Professional tech team with 1-on-1 support, 24/7 response, ensuring stable business operations.', ja:'専門技術チームが1対1で対応、24時間365日レスポンスで安定した業務運営を保証。', ko:'전문 기술팀의 1:1 지원, 24/7 대응으로 안정적인 비즈니스 운영을 보장합니다.', fr:'Équipe technique professionnelle en support 1-à-1, réponse 24/7 pour des opérations stables.', de:'Professionelles Tech-Team mit 1-zu-1-Support, 24/7-Reaktion für stabilen Betrieb.', es:'Equipo técnico profesional con soporte 1-a-1, respuesta 24/7 para operaciones estables.', ru:'Профессиональная техническая команда с поддержкой 1-на-1, ответ 24/7 для стабильной работы бизнеса.' },
    '全球优质资源':     { en:'Premium Global Resources', ja:'プレミアムグローバルリソース', ko:'프리미엄 글로벌 리소스', fr:'Ressources mondiales premium', de:'Premium globale Ressourcen', es:'Recursos globales premium', ru:'Премиальные глобальные ресурсы' },
    '覆盖190+国家和地区的海量IP资源，纯净住宅/数据中心IP，高匿可用率99%。': { en:'Massive IP resources covering 190+ countries, clean residential/datacenter IPs, 99% high-anonymity availability.', ja:'190以上の国と地域をカバーする大量IPリソース、クリーンな住居用/データセンターIP、99%の高匿名性可用率。', ko:'190개 이상의 국가를 커버하는 대규모 IP 리소스, 클린 주거용/데이터센터 IP, 99% 고익명성 가용률.', fr:'Ressources IP massives couvrant 190+ pays, IP résidentiels/datacenter propres, 99% de disponibilité.', de:'Massive IP-Ressourcen in 190+ Ländern, saubere Wohn-/Datacenter-IPs, 99% Verfügbarkeit.', es:'Recursos IP masivos en 190+ países, IPs residenciales/datacenter limpias, 99% de disponibilidad.', ru:'Массивные IP-ресурсы в 190+ странах, чистые резидентные/дата-центр IP, 99% доступности.' },
    '可视化管理后台':   { en:'Visual Management Dashboard', ja:'ビジュアル管理ダッシュボード', ko:'시각적 관리 대시보드', fr:'Tableau de bord visuel', de:'Visuelles Management-Dashboard', es:'Panel de gestión visual', ru:'Визуальная панель управления' },
    '独立经销商后台，实时查看消耗、佣金及客户管理数据，运营一目了然。': { en:'Independent reseller dashboard with real-time consumption, commission and customer management data — operations at a glance.', ja:'独立リセラーダッシュボードで消費、コミッション、顧客管理データをリアルタイムに確認。運営が一目瞭然。', ko:'독립 리셀러 대시보드에서 소비, 수수료, 고객 관리 데이터를 실시간으로 확인 — 운영 한눈에.', fr:'Tableau de bord revendeur indépendant avec données en temps réel — opérations en un coup d\'œil.', de:'Unabhängiges Reseller-Dashboard mit Echtzeitdaten — Betrieb auf einen Blick.', es:'Panel de revendedor independiente con datos en tiempo real — operaciones de un vistazo.', ru:'Независимая панель реселлера с данными в реальном времени — операции с первого взгляда.' },
    '合作流程':         { en:'Partnership Process', ja:'パートナーシッププロセス', ko:'파트너십 프로세스', fr:'Processus de partenariat', de:'Partnerschaftsprozess', es:'Proceso de asociación', ru:'Процесс партнёрства' },
    '简单四步，快速开启企业级合作': { en:'Four simple steps to start enterprise partnership', ja:'簡単4ステップでエンタープライズパートナーシップを開始', ko:'간단한 4단계로 기업 파트너십 시작', fr:'Quatre étapes simples pour démarrer le partenariat', de:'Vier einfache Schritte zur Enterprise-Partnerschaft', es:'Cuatro simples pasos para iniciar la asociación', ru:'Четыре простых шага для начала партнёрства' },
    '提交申请':         { en:'Submit Application', ja:'申請を提出', ko:'신청서 제출', fr:'Soumettre la candidature', de:'Bewerbung einreichen', es:'Enviar solicitud', ru:'Подать заявку' },
    '填写企业信息与资质材料，提交合作申请表': { en:'Fill in company information and qualifications, submit partnership application', ja:'企業情報と資格書類を記入し、パートナーシップ申請を提出', ko:'회사 정보 및 자격 자료를 작성하고 파트너십 신청서를 제출', fr:'Remplissez les informations et soumettez la candidature', de:'Füllen Sie Unternehmensinformationen aus und reichen Sie den Antrag ein', es:'Complete la información y envíe la solicitud', ru:'Заполните информацию о компании и подайте заявку' },
    '资质审核':         { en:'Qualification Review', ja:'資格審査', ko:'자격 심사', fr:'Examen des qualifications', de:'Qualifikationsprüfung', es:'Revisión de calificaciones', ru:'Проверка квалификации' },
    '专业团队在1-3个工作日内完成资质审核': { en:'Professional team completes qualification review within 1-3 business days', ja:'専門チームが1〜3営業日以内に資格審査を完了', ko:'전문 팀이 1-3 영업일 이내에 자격 심사를 완료', fr:'L\'équipe professionnelle termine l\'examen en 1 à 3 jours ouvrables', de:'Professionelles Team schließt Prüfung in 1-3 Werktagen ab', es:'El equipo profesional completa la revisión en 1-3 días hábiles', ru:'Профессиональная команда завершает проверку за 1-3 рабочих дня' },
    '签署协议':         { en:'Sign Agreement', ja:'契約締結', ko:'계약 체결', fr:'Signer l\'accord', de:'Vereinbarung unterzeichnen', es:'Firmar acuerdo', ru:'Подписать соглашение' },
    '双方确认合作条款，正式签署合作协议': { en:'Both parties confirm partnership terms and formally sign the agreement', ja:'双方がパートナーシップ条件を確認し、正式に契約を締結', ko:'양측이 파트너십 조건을 확인하고 공식적으로 계약을 체결', fr:'Les deux parties confirment les termes et signent l\'accord', de:'Beide Parteien bestätigen die Bedingungen und unterzeichnen', es:'Ambas partes confirman los términos y firman el acuerdo', ru:'Обе стороны подтверждают условия и подписывают соглашение' },
    '开始合作':         { en:'Start Partnership', ja:'パートナーシップ開始', ko:'파트너십 시작', fr:'Démarrer le partenariat', de:'Partnerschaft starten', es:'Iniciar asociación', ru:'Начать партнёрство' },
    '获取专属账户与API权限，即刻开展业务': { en:'Get your dedicated account and API access, start business immediately', ja:'専用アカウントとAPIアクセスを取得し、即座にビジネスを開始', ko:'전용 계정 및 API 액세스를 받고 즉시 비즈니스를 시작', fr:'Obtenez votre compte dédié et accès API, démarrez immédiatement', de:'Erhalten Sie Ihr dediziertes Konto und API-Zugang, starten Sie sofort', es:'Obtenga su cuenta dedicada y acceso API, comience inmediatamente', ru:'Получите выделенный аккаунт и доступ к API, начните бизнес немедленно' },
    '准备好开始合作了吗？': { en:'Ready to Start the Partnership?', ja:'パートナーシップを始める準備はできましたか？', ko:'파트너십을 시작할 준비가 되셨나요?', fr:'Prêt à démarrer le partenariat ?', de:'Bereit für die Partnerschaft?', es:'¿Listo para iniciar la asociación?', ru:'Готовы начать партнёрство?' },
    '联系我们的商务团队，获取专属合作方案与报价': { en:'Contact our business team for exclusive partnership plans and quotes', ja:'ビジネスチームに連絡して、専用パートナーシッププランと見積もりを取得', ko:'비즈니스 팀에 연락하여 전용 파트너십 플랜 및 견적을 받으세요', fr:'Contactez notre équipe commerciale pour des plans et devis exclusifs', de:'Kontaktieren Sie unser Business-Team für exklusive Pläne und Angebote', es:'Contacte a nuestro equipo comercial para planes y cotizaciones exclusivas', ru:'Свяжитесь с нашей бизнес-командой для получения эксклюзивных планов и расценок' },
    '联系商务团队':     { en:'Contact Business Team', ja:'ビジネスチームに連絡', ko:'비즈니스 팀에 연락', fr:'Contacter l\'équipe commerciale', de:'Business-Team kontaktieren', es:'Contactar equipo comercial', ru:'Связаться с бизнес-командой' },
    '了解代理计划':     { en:'Learn About Agent Program', ja:'代理店プログラムについて', ko:'에이전트 프로그램 알아보기', fr:'Découvrir le programme agent', de:'Agentenprogramm kennenlernen', es:'Conocer el programa de agentes', ru:'Узнать о программе агентов' },

    // ── BecomeAgentPage ──
    'Agent Partner Program':             { en:'Agent Partner Program', ja:'エージェントパートナープログラム', ko:'에이전트 파트너 프로그램', fr:'Programme Partenaire Agent', de:'Agenten-Partnerprogramm', es:'Programa de Socios Agentes', ru:'Агентская партнёрская программа' },
    '成为代理 · 轻松赚取高额佣金':       { en:'Become an Agent · Earn High Commissions Easily', ja:'代理店になる · 高額コミッションを簡単に獲得', ko:'에이전트 되기 · 높은 커미션을 쉽게 벌기', fr:'Devenir agent · Gagnez des commissions facilement', de:'Agent werden · Hohe Provisionen einfach verdienen', es:'Ser agente · Gane altas comisiones fácilmente', ru:'Стать агентом · Легко зарабатывайте высокие комиссии' },
    '加入我们的代理推广计划，分享即赚钱！高额终生返佣，支持微信/支付宝极速提现，专人辅导助您快速起步。': { en:'Join our agent promotion plan — share and earn! High lifetime commissions, fast WeChat/Alipay withdrawals, and personal coaching to help you get started quickly.', ja:'代理店プロモーションプランに参加 — シェアして稼ぐ！高額の生涯コミッション、迅速な出金、個別コーチングで素早くスタート。', ko:'에이전트 프로모션 플랜에 참여하세요 — 공유하고 수익을 얻으세요! 높은 평생 커미션, 빠른 출금, 개인 코칭으로 빠르게 시작하세요.', fr:'Rejoignez notre programme agent — partagez et gagnez ! Commissions à vie, retraits rapides et coaching personnel.', de:'Treten Sie unserem Agentenprogramm bei — teilen und verdienen! Lebenslange Provisionen, schnelle Auszahlungen und persönliches Coaching.', es:'Únase a nuestro programa de agentes — comparta y gane! Comisiones de por vida, retiros rápidos y coaching personal.', ru:'Присоединяйтесь к нашей агентской программе — делитесь и зарабатывайте! Пожизненные комиссии, быстрый вывод средств и персональный коучинг.' },
    '立即加入':         { en:'Join Now', ja:'今すぐ参加', ko:'지금 가입', fr:'Rejoindre maintenant', de:'Jetzt beitreten', es:'Unirse ahora', ru:'Присоединиться' },
    '高额':             { en:'High', ja:'高額', ko:'높은', fr:'Élevé', de:'Hoch', es:'Alto', ru:'Высокий' },
    '阶梯佣金比例':     { en:'Tiered Commission Rate', ja:'段階的コミッション率', ko:'단계적 수수료율', fr:'Taux de commission échelonné', de:'Gestaffelte Provisionsrate', es:'Tasa de comisión escalonada', ru:'Ступенчатая ставка комиссии' },
    '终生':             { en:'Lifetime', ja:'生涯', ko:'평생', fr:'À vie', de:'Lebenslang', es:'De por vida', ru:'Пожизненно' },
    '返佣有效期':       { en:'Commission Validity', ja:'コミッション有効期間', ko:'수수료 유효 기간', fr:'Validité de la commission', de:'Provisionsgültigkeit', es:'Validez de la comisión', ru:'Срок действия комиссии' },
    '次月':             { en:'Next Month', ja:'翌月', ko:'다음 달', fr:'Mois suivant', de:'Nächster Monat', es:'Mes siguiente', ru:'Следующий месяц' },
    '佣金到账':         { en:'Commission Payout', ja:'コミッション支払い', ko:'수수료 지급', fr:'Versement de commission', de:'Provisionszahlung', es:'Pago de comisión', ru:'Выплата комиссии' },
    '加入成本':         { en:'Joining Cost', ja:'参加費用', ko:'가입 비용', fr:'Coût d\'adhésion', de:'Beitrittskosten', es:'Costo de adhesión', ru:'Стоимость вступления' },
    '代理专属权益':     { en:'Exclusive Agent Benefits', ja:'代理店限定特典', ko:'에이전트 전용 혜택', fr:'Avantages exclusifs agent', de:'Exklusive Agentenvorteile', es:'Beneficios exclusivos del agente', ru:'Эксклюзивные преимущества агента' },
    '我们为每一位代理伙伴提供全方位支持，助您轻松开启副业': { en:'We provide comprehensive support for every agent partner, helping you easily start a side business', ja:'すべての代理店パートナーに包括的なサポートを提供し、副業を簡単に始められるようにします', ko:'모든 에이전트 파트너에게 포괄적인 지원을 제공하여 부업을 쉽게 시작할 수 있도록 합니다', fr:'Nous offrons un soutien complet à chaque partenaire agent', de:'Wir bieten jedem Agentenpartner umfassende Unterstützung', es:'Ofrecemos soporte integral a cada socio agente', ru:'Мы обеспечиваем всестороннюю поддержку каждому агенту-партнёру' },
    '高额佣金返利':     { en:'High Commission Rebates', ja:'高額コミッションリベート', ko:'높은 수수료 리베이트', fr:'Remises de commission élevées', de:'Hohe Provisionsrückerstattungen', es:'Altos reembolsos de comisión', ru:'Высокие комиссионные возвраты' },
    '高额阶梯佣金，用户持续消费您持续获利，终生返佣，躺赚不停。': { en:'High tiered commissions — users keep spending, you keep earning. Lifetime rebates, passive income non-stop.', ja:'高額段階的コミッション — ユーザーが消費し続ける限りあなたも稼ぎ続けます。生涯リベート、パッシブインカム。', ko:'높은 단계적 수수료 — 사용자가 계속 소비하면 계속 수익을 얻습니다. 평생 리베이트, 패시브 인컴.', fr:'Commissions échelonnées élevées — revenus passifs à vie.', de:'Hohe gestaffelte Provisionen — lebenslange Rückerstattungen, passives Einkommen.', es:'Altas comisiones escalonadas — ingresos pasivos de por vida.', ru:'Высокие ступенчатые комиссии — пожизненные возвраты, пассивный доход.' },
    '次月快速提现':     { en:'Fast Withdrawal Next Month', ja:'翌月迅速出金', ko:'다음 달 빠른 출금', fr:'Retrait rapide le mois suivant', de:'Schnelle Auszahlung nächsten Monat', es:'Retiro rápido el mes siguiente', ru:'Быстрый вывод в следующем месяце' },
    '支持微信、支付宝和银行卡多渠道提现，佣金次月到账，提现流程简单快捷。': { en:'Multiple withdrawal channels including WeChat, Alipay and bank cards. Commissions arrive next month with a simple, fast process.', ja:'WeChat、Alipay、銀行カードなど複数の出金チャネルに対応。コミッションは翌月に届き、プロセスはシンプルで迅速。', ko:'위챗, 알리페이, 은행 카드 등 다양한 출금 채널을 지원합니다. 수수료는 다음 달에 도착하며 프로세스는 간단하고 빠릅니다.', fr:'Retrait via WeChat, Alipay et carte bancaire. Commissions versées le mois suivant.', de:'Auszahlung über WeChat, Alipay und Bankkarte. Provisionen nächsten Monat.', es:'Retiro por WeChat, Alipay y tarjeta bancaria. Comisiones el mes siguiente.', ru:'Вывод через WeChat, Alipay и банковские карты. Комиссии в следующем месяце.' },
    '专人辅导培训':     { en:'Personal Coaching & Training', ja:'個別コーチングとトレーニング', ko:'전담 코칭 및 교육', fr:'Coaching et formation personnalisés', de:'Persönliches Coaching und Training', es:'Coaching y capacitación personal', ru:'Персональный коучинг и обучение' },
    '一对一运营指导，提供专业推广素材和话术，快速上手无门槛。': { en:'1-on-1 operational guidance with professional marketing materials and scripts — get started quickly with no barriers.', ja:'1対1の運営ガイダンスとプロフェッショナルなマーケティング素材で、障壁なく素早くスタート。', ko:'1:1 운영 가이드와 전문 마케팅 자료로 장벽 없이 빠르게 시작하세요.', fr:'Accompagnement 1-à-1 avec matériel marketing professionnel — démarrage rapide sans barrières.', de:'1-zu-1-Betreuung mit professionellem Marketingmaterial — schneller Start ohne Hürden.', es:'Guía 1-a-1 con material de marketing profesional — inicio rápido sin barreras.', ru:'Индивидуальное руководство с профессиональными маркетинговыми материалами — быстрый старт без барьеров.' },
    '实时数据看板':     { en:'Real-time Data Dashboard', ja:'リアルタイムデータダッシュボード', ko:'실시간 데이터 대시보드', fr:'Tableau de bord en temps réel', de:'Echtzeit-Daten-Dashboard', es:'Panel de datos en tiempo real', ru:'Панель данных в реальном времени' },
    '独立代理后台，实时查看推广数据、用户消费和佣金收益，运营透明。': { en:'Independent agent dashboard with real-time promotion data, user consumption and commission earnings — fully transparent operations.', ja:'独立した代理店ダッシュボードでプロモーションデータ、ユーザー消費、コミッション収益をリアルタイムに確認。完全に透明な運営。', ko:'독립 에이전트 대시보드에서 프로모션 데이터, 사용자 소비, 수수료 수익을 실시간으로 확인 — 완전히 투명한 운영.', fr:'Tableau de bord agent indépendant avec données en temps réel — opérations totalement transparentes.', de:'Unabhängiges Agenten-Dashboard mit Echtzeitdaten — vollständig transparenter Betrieb.', es:'Panel de agente independiente con datos en tiempo real — operaciones totalmente transparentes.', ru:'Независимая панель агента с данными в реальном времени — полностью прозрачные операции.' },
    '专属推广链接':     { en:'Exclusive Promotion Links', ja:'専用プロモーションリンク', ko:'전용 프로모션 링크', fr:'Liens de promotion exclusifs', de:'Exklusive Werbelinks', es:'Enlaces de promoción exclusivos', ru:'Эксклюзивные промо-ссылки' },
    '自动生成专属推广链接和二维码，支持多渠道分享追踪，推广更便捷。': { en:'Auto-generate exclusive promotion links and QR codes with multi-channel sharing and tracking — promotion made easy.', ja:'専用プロモーションリンクとQRコードを自動生成、マルチチャネル共有と追跡に対応 — プロモーションが簡単に。', ko:'전용 프로모션 링크와 QR 코드를 자동 생성하고 다중 채널 공유 및 추적을 지원 — 프로모션이 쉬워집니다.', fr:'Génération automatique de liens et QR codes exclusifs avec suivi multi-canaux.', de:'Automatische Generierung exklusiver Links und QR-Codes mit Multi-Kanal-Tracking.', es:'Generación automática de enlaces y códigos QR exclusivos con seguimiento multicanal.', ru:'Автоматическая генерация эксклюзивных ссылок и QR-кодов с мультиканальным отслеживанием.' },
    '零门槛零风险':     { en:'Zero Barrier, Zero Risk', ja:'ゼロバリア、ゼロリスク', ko:'제로 장벽, 제로 리스크', fr:'Zéro barrière, zéro risque', de:'Keine Hürden, kein Risiko', es:'Sin barreras, sin riesgo', ru:'Без барьеров, без рисков' },
    '免费注册成为代理，无需囤货无需垫资，纯推广分佣模式，轻松创业。': { en:'Register as an agent for free — no inventory, no upfront costs. Pure promotion-commission model, easy entrepreneurship.', ja:'無料で代理店登録 — 在庫不要、前払い不要。純粋なプロモーション・コミッションモデルで簡単に起業。', ko:'무료로 에이전트 등록 — 재고 없음, 선불 비용 없음. 순수 프로모션-커미션 모델로 쉬운 창업.', fr:'Inscription gratuite — pas de stock, pas d\'avance. Modèle promotion-commission pur.', de:'Kostenlose Registrierung — kein Lager, keine Vorauszahlung. Reines Provisions-Modell.', es:'Registro gratuito — sin inventario, sin costos iniciales. Modelo puro de promoción-comisión.', ru:'Бесплатная регистрация — без складов, без предоплаты. Чистая модель промо-комиссии.' },
    '佣金阶梯':         { en:'Commission Tiers', ja:'コミッション階層', ko:'수수료 단계', fr:'Niveaux de commission', de:'Provisionsstufen', es:'Niveles de comisión', ru:'Уровни комиссии' },
    '推广越多佣金越高，终生锁定最高佣金等级': { en:'More promotion means higher commission — lock in the highest tier for life', ja:'プロモーションが多いほどコミッションが高くなり、最高ランクを生涯ロック', ko:'프로모션이 많을수록 수수료가 높아지며, 최고 등급을 평생 고정', fr:'Plus de promotion = commission plus élevée — verrouillez le niveau maximum à vie', de:'Mehr Werbung = höhere Provision — höchste Stufe lebenslang gesichert', es:'Más promoción = mayor comisión — bloquee el nivel máximo de por vida', ru:'Больше продвижения — выше комиссия. Зафиксируйте максимальный уровень навсегда' },
    '初级代理':         { en:'Junior Agent', ja:'ジュニアエージェント', ko:'주니어 에이전트', fr:'Agent junior', de:'Junior-Agent', es:'Agente junior', ru:'Младший агент' },
    '入门级推广量':     { en:'Entry-level volume', ja:'エントリーレベルの量', ko:'입문 수준의 볼륨', fr:'Volume d\'entrée', de:'Einstiegsvolumen', es:'Volumen de entrada', ru:'Начальный объём' },
    '基础':             { en:'Basic', ja:'ベーシック', ko:'기본', fr:'Basique', de:'Basis', es:'Básico', ru:'Базовый' },
    '适合个人兼职推广': { en:'Ideal for part-time promotion', ja:'パートタイムプロモーションに最適', ko:'파트타임 프로모션에 이상적', fr:'Idéal pour la promotion à temps partiel', de:'Ideal für Teilzeit-Promotion', es:'Ideal para promoción a tiempo parcial', ru:'Идеально для подработки' },
    '高级代理':         { en:'Senior Agent', ja:'シニアエージェント', ko:'시니어 에이전트', fr:'Agent senior', de:'Senior-Agent', es:'Agente senior', ru:'Старший агент' },
    '中等推广量':       { en:'Medium volume', ja:'中程度の量', ko:'중간 수준의 볼륨', fr:'Volume moyen', de:'Mittleres Volumen', es:'Volumen medio', ru:'Средний объём' },
    '进阶':             { en:'Advanced', ja:'アドバンスト', ko:'고급', fr:'Avancé', de:'Fortgeschritten', es:'Avanzado', ru:'Продвинутый' },
    '适合全职推广人员': { en:'Ideal for full-time promoters', ja:'フルタイムプロモーターに最適', ko:'풀타임 프로모터에 이상적', fr:'Idéal pour les promoteurs à temps plein', de:'Ideal für Vollzeit-Promoter', es:'Ideal para promotores a tiempo completo', ru:'Идеально для штатных промоутеров' },
    '金牌代理':         { en:'Gold Agent', ja:'ゴールドエージェント', ko:'골드 에이전트', fr:'Agent Gold', de:'Gold-Agent', es:'Agente Gold', ru:'Золотой агент' },
    '大量推广':         { en:'High volume', ja:'大量', ko:'대량', fr:'Grand volume', de:'Hohes Volumen', es:'Gran volumen', ru:'Большой объём' },
    '最高':             { en:'Highest', ja:'最高', ko:'최고', fr:'Maximum', de:'Höchste', es:'Máximo', ru:'Максимальный' },
    '适合团队/工作室':  { en:'Ideal for teams/studios', ja:'チーム/スタジオに最適', ko:'팀/스튜디오에 이상적', fr:'Idéal pour les équipes/studios', de:'Ideal für Teams/Studios', es:'Ideal para equipos/estudios', ru:'Идеально для команд/студий' },
    '热门':             { en:'Hot', ja:'人気', ko:'인기', fr:'Populaire', de:'Beliebt', es:'Popular', ru:'Популярный' },
    '佣金':             { en:'Commission', ja:'コミッション', ko:'수수료', fr:'Commission', de:'Provision', es:'Comisión', ru:'Комиссия' },
    '如何开始':         { en:'How to Start', ja:'始め方', ko:'시작하는 방법', fr:'Comment commencer', de:'So starten Sie', es:'Cómo empezar', ru:'Как начать' },
    '四步轻松开启您的推广赚钱之旅': { en:'Four easy steps to start your promotion and earning journey', ja:'4つの簡単なステップでプロモーションと収益の旅を開始', ko:'4가지 간단한 단계로 프로모션 및 수익 여정을 시작하세요', fr:'Quatre étapes faciles pour commencer à promouvoir et gagner', de:'Vier einfache Schritte zum Start Ihrer Werbe- und Verdienstkarriere', es:'Cuatro pasos fáciles para comenzar su viaje de promoción y ganancias', ru:'Четыре простых шага для начала вашего пути продвижения и заработка' },
    '填写基本信息，一键注册成为推广代理': { en:'Fill in basic info and register as a promotion agent with one click', ja:'基本情報を入力し、ワンクリックでプロモーションエージェントとして登録', ko:'기본 정보를 입력하고 원클릭으로 프로모션 에이전트로 등록', fr:'Remplissez les informations et inscrivez-vous en un clic', de:'Füllen Sie die Informationen aus und registrieren Sie sich mit einem Klick', es:'Complete la información y regístrese con un clic', ru:'Заполните информацию и зарегистрируйтесь в один клик' },
    '获取链接':         { en:'Get Links', ja:'リンクを取得', ko:'링크 받기', fr:'Obtenir des liens', de:'Links erhalten', es:'Obtener enlaces', ru:'Получить ссылки' },
    '登录代理后台，获取您的专属推广链接': { en:'Log in to the agent dashboard and get your exclusive promotion link', ja:'代理店ダッシュボードにログインし、専用プロモーションリンクを取得', ko:'에이전트 대시보드에 로그인하고 전용 프로모션 링크를 받으세요', fr:'Connectez-vous au tableau de bord et obtenez votre lien exclusif', de:'Melden Sie sich am Dashboard an und erhalten Sie Ihren exklusiven Link', es:'Inicie sesión en el panel y obtenga su enlace exclusivo', ru:'Войдите в панель агента и получите эксклюзивную промо-ссылку' },
    '分享推广':         { en:'Share & Promote', ja:'シェアして宣伝', ko:'공유 및 홍보', fr:'Partager et promouvoir', de:'Teilen und werben', es:'Compartir y promover', ru:'Делиться и продвигать' },
    '通过社交媒体、社群等渠道分享推广': { en:'Share and promote through social media, communities and other channels', ja:'SNS、コミュニティなどのチャネルでシェアして宣伝', ko:'소셜 미디어, 커뮤니티 등의 채널을 통해 공유하고 홍보', fr:'Partagez via les réseaux sociaux, communautés et autres canaux', de:'Teilen Sie über soziale Medien, Communitys und andere Kanäle', es:'Comparta a través de redes sociales, comunidades y otros canales', ru:'Делитесь через соцсети, сообщества и другие каналы' },
    '赚取佣金':         { en:'Earn Commission', ja:'コミッションを獲得', ko:'수수료 벌기', fr:'Gagner des commissions', de:'Provisionen verdienen', es:'Ganar comisiones', ru:'Зарабатывать комиссию' },
    '用户消费即可获得佣金，次月到账': { en:'Earn commission when users make purchases — paid next month', ja:'ユーザーが購入するとコミッション獲得 — 翌月支払い', ko:'사용자가 구매하면 수수료를 받습니다 — 다음 달 지급', fr:'Gagnez des commissions sur les achats des utilisateurs — versées le mois suivant', de:'Verdienen Sie Provisionen bei Nutzerkäufen — Auszahlung nächsten Monat', es:'Gane comisiones cuando los usuarios compren — pagadas el mes siguiente', ru:'Зарабатывайте комиссию с покупок пользователей — выплата в следующем месяце' },
    '关于代理计划，您可能想了解的': { en:'What you might want to know about the agent program', ja:'代理店プログラムについて知りたいこと', ko:'에이전트 프로그램에 대해 알고 싶은 것', fr:'Ce que vous pourriez vouloir savoir sur le programme agent', de:'Was Sie über das Agentenprogramm wissen möchten', es:'Lo que podría querer saber sobre el programa de agentes', ru:'Что вы хотели бы знать о программе агентов' },
    '注册需要费用吗？': { en:'Is there a registration fee?', ja:'登録に費用はかかりますか？', ko:'등록 비용이 있나요?', fr:'Y a-t-il des frais d\'inscription ?', de:'Gibt es eine Registrierungsgebühr?', es:'¿Hay una tarifa de registro?', ru:'Есть ли плата за регистрацию?' },
    '完全免费！注册成为代理不收取任何费用，零门槛加入。': { en:'Completely free! No fees to register as an agent — zero barriers to join.', ja:'完全無料！代理店登録に費用は一切かかりません — 参加障壁ゼロ。', ko:'완전 무료! 에이전트 등록에 비용이 전혀 없습니다 — 가입 장벽 제로.', fr:'Totalement gratuit ! Aucun frais d\'inscription — zéro barrière.', de:'Völlig kostenlos! Keine Gebühren — keine Hürden.', es:'¡Completamente gratis! Sin tarifas de registro — sin barreras.', ru:'Абсолютно бесплатно! Никаких сборов — нулевые барьеры.' },
    '佣金如何计算？':   { en:'How is commission calculated?', ja:'コミッションはどのように計算されますか？', ko:'수수료는 어떻게 계산되나요?', fr:'Comment la commission est-elle calculée ?', de:'Wie wird die Provision berechnet?', es:'¿Cómo se calcula la comisión?', ru:'Как рассчитывается комиссия?' },
    '佣金按您推荐用户的实际消费金额按比例计算，具体比例请联系客服了解，终生有效，用户每次消费您都能获得返利。': { en:'Commission is calculated as a percentage of actual spending by referred users. Contact support for specific rates — valid for life, you earn on every purchase.', ja:'コミッションは紹介ユーザーの実際の消費額に基づいて比例計算されます。具体的な率はサポートにお問い合わせください — 生涯有効、毎回の購入で収益を得られます。', ko:'수수료는 추천 사용자의 실제 소비 금액에 비례하여 계산됩니다. 구체적인 비율은 고객 지원에 문의하세요 — 평생 유효, 매 구매마다 수익을 얻습니다.', fr:'La commission est calculée en pourcentage des dépenses réelles des utilisateurs référés. Contactez le support pour les taux — valable à vie.', de:'Die Provision wird als Prozentsatz der tatsächlichen Ausgaben empfohlener Nutzer berechnet. Kontaktieren Sie den Support für genaue Sätze — lebenslang gültig.', es:'La comisión se calcula como porcentaje del gasto real de los usuarios referidos. Contacte al soporte para tarifas — válida de por vida.', ru:'Комиссия рассчитывается как процент от фактических расходов привлечённых пользователей. Свяжитесь с поддержкой для уточнения ставок — действует пожизненно.' },
    '提现有最低金额限制吗？': { en:'Is there a minimum withdrawal amount?', ja:'最低出金額はありますか？', ko:'최소 출금 금액이 있나요?', fr:'Y a-t-il un montant minimum de retrait ?', de:'Gibt es einen Mindestauszahlungsbetrag?', es:'¿Hay un monto mínimo de retiro?', ru:'Есть ли минимальная сумма вывода?' },
    '提现门槛低，支持微信、支付宝和银行卡多种方式。': { en:'Low withdrawal threshold, supporting WeChat, Alipay and bank card methods.', ja:'低い出金閾値、WeChat、Alipay、銀行カードに対応。', ko:'낮은 출금 기준, 위챗, 알리페이, 은행 카드 방식 지원.', fr:'Seuil de retrait bas, prenant en charge WeChat, Alipay et carte bancaire.', de:'Niedrige Auszahlungsschwelle, Unterstützung für WeChat, Alipay und Bankkarte.', es:'Umbral de retiro bajo, compatible con WeChat, Alipay y tarjeta bancaria.', ru:'Низкий порог вывода, поддержка WeChat, Alipay и банковских карт.' },
    '推广素材从哪里获取？': { en:'Where to get promotion materials?', ja:'プロモーション素材はどこで入手できますか？', ko:'프로모션 자료는 어디서 받나요?', fr:'Où obtenir les supports de promotion ?', de:'Wo erhalte ich Werbematerialien?', es:'¿Dónde obtener materiales de promoción?', ru:'Где получить рекламные материалы?' },
    '代理后台提供专业推广素材包，包括Banner、文案、视频等，也可联系专属客服定制。': { en:'The agent dashboard provides professional promotion material packages including banners, copy, videos, etc. You can also contact your dedicated support for customization.', ja:'代理店ダッシュボードでバナー、コピー、動画などのプロフェッショナルなプロモーション素材パッケージを提供。カスタマイズは専用サポートにお問い合わせください。', ko:'에이전트 대시보드에서 배너, 카피, 동영상 등의 전문 프로모션 자료 패키지를 제공합니다. 맞춤화는 전담 지원에 문의하세요.', fr:'Le tableau de bord agent fournit des packs de matériel professionnel. Contactez votre support dédié pour la personnalisation.', de:'Das Agenten-Dashboard bietet professionelle Werbematerial-Pakete. Kontaktieren Sie Ihren dedizierten Support für Anpassungen.', es:'El panel de agente proporciona paquetes de material profesional. Contacte a su soporte dedicado para personalización.', ru:'Панель агента предоставляет профессиональные рекламные пакеты. Свяжитесь с выделенной поддержкой для кастомизации.' },
    '加入代理，开启您的副业之旅': { en:'Join as Agent, Start Your Side Business Journey', ja:'代理店として参加し、副業の旅を始めましょう', ko:'에이전트로 참여하여 부업 여정을 시작하세요', fr:'Rejoignez en tant qu\'agent, démarrez votre activité secondaire', de:'Werden Sie Agent und starten Sie Ihr Nebeneinkommen', es:'Únase como agente, inicie su negocio secundario', ru:'Станьте агентом, начните свой путь к дополнительному заработку' },
    '零门槛、零风险、高回报，分享即赚钱': { en:'Zero barriers, zero risk, high returns — share and earn', ja:'ゼロバリア、ゼロリスク、高リターン — シェアして稼ぐ', ko:'제로 장벽, 제로 리스크, 높은 수익 — 공유하고 벌기', fr:'Zéro barrière, zéro risque, haut rendement — partagez et gagnez', de:'Keine Hürden, kein Risiko, hohe Rendite — teilen und verdienen', es:'Sin barreras, sin riesgo, alto rendimiento — comparta y gane', ru:'Без барьеров, без рисков, высокая доходность — делитесь и зарабатывайте' },
    '申请成为代理':     { en:'Apply to Become Agent', ja:'代理店申請', ko:'에이전트 신청', fr:'Postuler comme agent', de:'Als Agent bewerben', es:'Solicitar ser agente', ru:'Подать заявку на агента' },
    '了解企业服务':     { en:'Learn About Enterprise Service', ja:'エンタープライズサービスについて', ko:'기업 서비스 알아보기', fr:'Découvrir le service entreprise', de:'Enterprise-Service kennenlernen', es:'Conocer el servicio empresarial', ru:'Узнать о корпоративном сервисе' }
  };

  // ── Hero special translations (innerHTML with <br>) ──
  var HERO_T = {
    title: {
      en: 'World-class<br>ISP Proxy',
      ja: 'ワールドクラス<br>ISPプロキシ',
      ko: '세계적인<br>ISP 프록시',
      fr: 'Proxy ISP<br>de classe mondiale',
      de: 'Weltklasse<br>ISP-Proxy',
      es: 'Proxy ISP<br>de clase mundial',
      ru: 'ISP Прокси<br>мирового класса'
    },
    subtitle: {
      en: 'Meet diverse business challenges<br>Always stable and reliable',
      ja: '多様なビジネス課題に対応<br>常に安定して信頼性が高い',
      ko: '다양한 비즈니스 도전 충족<br>항상 안정적이고 신뢰할 수 있는',
      fr: 'Répondre aux défis commerciaux<br>Toujours stable et fiable',
      de: 'Geschäftliche Herausforderungen meistern<br>Immer stabil und zuverlässig',
      es: 'Afrontar desafíos empresariales<br>Siempre estable y confiable',
      ru: 'Решение бизнес-задач<br>Всегда стабильно и надёжно'
    }
  };

  // Expose translations for React
  window.QS_TRANSLATIONS = T;
  window.QS_HERO_TRANSLATIONS = HERO_T;

  // ── State ──
  var currentLang = localStorage.getItem('qs-lang') || 'zh';
  var isApplying = false;
  var switcherEl = null;
  var dropdownEl = null;
  var btnEl = null;
  var originalTexts = new WeakMap(); // element → original innerHTML

  // ── Build Dropdown HTML ──
  function buildDropdownHTML() {
    var html = '';
    LANGUAGES.forEach(function(lang) {
      var isActive = lang.code === currentLang;
      var label = lang.label || lang.labelShort || lang.code.toUpperCase();
      var flagHtml = lang.flagUrl
        ? '<img class="lang-flag-img" src="' + lang.flagUrl + '" alt="' + label + '">'
        : '';

      html += '<div class="lang-option' + (isActive ? ' active' : '') + '" data-lang="' + lang.code + '">' +
        '<span class="lang-flag">' + flagHtml + '</span>' +
        '<span class="lang-text">' + label + '</span>' +
        (isActive ? '<span class="lang-check">✓</span>' : '') +
        '</div>';
    });
    return html;
  }

  // ── Create Switcher DOM ──
  function createSwitcher() {
    var wrapper = document.createElement('div');
    wrapper.className = 'lang-switcher';
    wrapper.id = 'lang-switcher';

    var currentLangObj = LANGUAGES.find(function(l) { return l.code === currentLang; }) || LANGUAGES[0];

    // Button (hongkongweb style: flag + label + chevron)
    var btn = document.createElement('button');
    btn.className = 'lang-switcher-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Select language');
    var currentLabel = currentLangObj.label || currentLangObj.labelShort || currentLangObj.code.toUpperCase();
    var currentFlagHtml = currentLangObj.flagUrl
      ? '<img class="lang-flag-img" src="' + currentLangObj.flagUrl + '" alt="' + currentLabel + '">'
      : '';

    btn.innerHTML =
      '<span class="lang-flag">' + currentFlagHtml + '</span>' +
      '<span class="lang-label">' + currentLabel + '</span>' +
      '<span class="lang-chevron">▾</span>';
    btnEl = btn;

    // Dropdown panel
    var dropdown = document.createElement('div');
    dropdown.className = 'lang-dropdown-panel';
    dropdown.innerHTML = buildDropdownHTML();
    dropdownEl = dropdown;

    wrapper.appendChild(btn);
    wrapper.appendChild(dropdown);
    switcherEl = wrapper;

    // Toggle dropdown
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var isOpen = dropdown.classList.contains('open');
      if (isOpen) { closeDropdown(); } else { openDropdown(); }
    });

    // Language selection
    dropdown.addEventListener('click', function(e) {
      var option = e.target.closest('.lang-option');
      if (!option) return;
      var code = option.dataset.lang;
      if (code && code !== currentLang) { selectLanguage(code); }
      closeDropdown();
    });

    // Click outside to close
    document.addEventListener('click', function(e) {
      if (switcherEl && !switcherEl.contains(e.target)) { closeDropdown(); }
    });

    // ESC to close
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') { closeDropdown(); }
    });

    return wrapper;
  }

  function openDropdown() {
    if (dropdownEl) dropdownEl.classList.add('open');
    if (btnEl) btnEl.classList.add('active');
  }

  function closeDropdown() {
    if (dropdownEl) dropdownEl.classList.remove('open');
    if (btnEl) btnEl.classList.remove('active');
  }

  // ── Select Language ──
  function selectLanguage(code) {
    currentLang = code;
    localStorage.setItem('qs-lang', code);
    
    // Dispatch event for React components
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: code } }));

    // Update button flag + label
    var langObj = LANGUAGES.find(function(l) { return l.code === code; });
    if (langObj && btnEl) {
      var flagEl = btnEl.querySelector('.lang-flag');
      var labelEl = btnEl.querySelector('.lang-label');
      var nextLabel = langObj.label || langObj.labelShort || langObj.code.toUpperCase();
      if (flagEl) {
        var flagHtml = langObj.flagUrl
          ? '<img class="lang-flag-img" src="' + langObj.flagUrl + '" alt="' + nextLabel + '">'
          : '';
        flagEl.innerHTML = flagHtml;
      }
      if (labelEl) labelEl.textContent = nextLabel;
    }

    // Update dropdown active states
    if (dropdownEl) { dropdownEl.innerHTML = buildDropdownHTML(); }

    // Update <html lang>
    document.documentElement.lang = code === 'zh' ? 'zh-CN' : code;

    // Apply translations
    applyTranslations(code);
  }

  // ── Apply Translations ──
  function applyTranslations(lang) {
    if (isApplying) return;
    isApplying = true;

    var homeContainer = document.querySelector('.home-container');
    var helpPage = document.getElementById('help-center-page');
    if (!homeContainer && !helpPage) { isApplying = false; return; }

    // 1. Hero title (has <br> inside) — use innerHTML
    var heroTitle = homeContainer ? homeContainer.querySelector('.hero-title') : null;
    if (heroTitle) {
      if (!originalTexts.has(heroTitle)) originalTexts.set(heroTitle, heroTitle.innerHTML);
      if (lang === 'zh') {
        heroTitle.innerHTML = originalTexts.get(heroTitle);
      } else if (HERO_T.title[lang]) {
        heroTitle.innerHTML = HERO_T.title[lang];
      }
    }

    // 2. Hero subtitle (has <br> inside)
    var heroSub = homeContainer ? homeContainer.querySelector('.hero-subtitle') : null;
    if (heroSub) {
      if (!originalTexts.has(heroSub)) originalTexts.set(heroSub, heroSub.innerHTML);
      if (lang === 'zh') {
        heroSub.innerHTML = originalTexts.get(heroSub);
      } else if (HERO_T.subtitle[lang]) {
        heroSub.innerHTML = HERO_T.subtitle[lang];
      }
    }

    // 3. Walk all text nodes under需要翻译的根节点（首页 + 帮助中心）并翻译
    [homeContainer, helpPage].forEach(function(root) {
      if (!root) return;

      var walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );

      var textNodes = [];
      var node;
      while (node = walker.nextNode()) {
        if (node.textContent.trim()) textNodes.push(node);
      }

      textNodes.forEach(function(tn) {
        // Skip nodes inside hero title/subtitle (handled above)
        if (heroTitle && heroTitle.contains && heroTitle.contains(tn)) return;
        if (heroSub && heroSub.contains && heroSub.contains(tn)) return;
        // Skip nodes inside any language switcher
        if (tn.parentElement && tn.parentElement.closest('.lang-switcher')) return;

        // Store original text on first encounter
        if (!tn._origText) { tn._origText = tn.textContent; }

        var original = tn._origText;

        if (lang === 'zh') {
          tn.textContent = original;
        } else {
          var trimmed = original.trim();
          if (T[trimmed] && T[trimmed][lang]) {
            tn.textContent = original.replace(trimmed, T[trimmed][lang]);
          }
        }
      });
    });

    // 4. Also translate alt attributes on images（仅首页容器内）
    if (homeContainer) {
      homeContainer.querySelectorAll('img[alt]').forEach(function(img) {
        if (!img._origAlt) { img._origAlt = img.alt; }
        if (lang === 'zh') {
          img.alt = img._origAlt;
        } else {
          var trimmed = img._origAlt.trim();
          if (T[trimmed] && T[trimmed][lang]) {
            img.alt = T[trimmed][lang];
          }
        }
      });
    }

    // 5. Translate Help Center search placeholder（属性翻译）
    var searchInput = document.getElementById('help-search-input');
    if (searchInput) {
      if (!searchInput._origPlaceholder) {
        searchInput._origPlaceholder = searchInput.placeholder;
      }
      if (lang === 'zh') {
        searchInput.placeholder = searchInput._origPlaceholder;
      } else {
        var key = (searchInput._origPlaceholder || '').trim();
        if (T[key] && T[key][lang]) {
          searchInput.placeholder = T[key][lang];
        }
      }
    }

    // Allow next application after DOM settles
    requestAnimationFrame(function() { isApplying = false; });
  }

  // ── Insert Switcher into Header / ISP Page / Help Center ──
  function insertSwitcher() {
    console.log('[LanguageSwitcher] insertSwitcher() called');
    if (document.getElementById('lang-switcher')) {
      console.log('[LanguageSwitcher] Switcher already exists');
      return true;
    }

    // Check if we are on any purchase page (tab=purchase)
    var search = window.location.search || '';
    var params = new URLSearchParams(search);
    var isPurchasePage = params.get('tab') === 'purchase';
    console.log('[LanguageSwitcher] isPurchasePage:', isPurchasePage);

    if (isPurchasePage) {
      var ispAnchor = document.getElementById('isp-lang-anchor');
      if (!ispAnchor) return false;

      var swIsp = createSwitcher();
      ispAnchor.appendChild(swIsp);

      // Apply saved language if not Chinese (for home/marketing texts only)
      if (currentLang !== 'zh') {
        setTimeout(function() { applyTranslations(currentLang); }, 300);
      }
      return true;
    }

    // Check if help center is open
    var helpPage = document.getElementById('help-center-page');
    var isHelpCenterOpen = helpPage && helpPage.classList.contains('active');
    
    if (isHelpCenterOpen) {
      var helpNav = helpPage.querySelector('.help-nav-container');
      if (helpNav) {
        var helpLoginBtn = helpNav.querySelector('.nav-login-btn');
        
        // Create actions container if needed
        var actions = helpNav.querySelector('.help-actions');
        if (!actions) {
          actions = document.createElement('div');
          actions.className = 'help-actions';
          if (helpLoginBtn) {
            helpNav.insertBefore(actions, helpLoginBtn);
            actions.appendChild(helpLoginBtn);
          } else {
            helpNav.appendChild(actions);
          }
        }

        var sw = createSwitcher();
        var currentLoginBtn = actions.querySelector('.nav-login-btn');
        if (currentLoginBtn) {
          actions.insertBefore(sw, currentLoginBtn);
        } else {
          actions.appendChild(sw);
        }

        // Apply saved language if not Chinese
        if (currentLang !== 'zh') {
          setTimeout(function() { applyTranslations(currentLang); }, 300);
        }
        return true;
      }
    }

    // Default: insert into home page header
    var headerContent = document.querySelector('.header-content');
    console.log('[LanguageSwitcher] Looking for .header-content:', !!headerContent);
    if (!headerContent) {
      console.log('[LanguageSwitcher] .header-content not found');
      return false;
    }

    var loginBtn = headerContent.querySelector('.login-btn');
    console.log('[LanguageSwitcher] Looking for .login-btn:', !!loginBtn);
    if (!loginBtn) {
      console.log('[LanguageSwitcher] .login-btn not found');
      return false;
    }

    var sw = createSwitcher();
    headerContent.insertBefore(sw, loginBtn);

    // Apply saved language if not Chinese
    if (currentLang !== 'zh') {
      setTimeout(function() { applyTranslations(currentLang); }, 300);
    }

    return true;
  }

  // ── Init with MutationObserver ──
  function init() {
    console.log('[LanguageSwitcher] init() called');
    console.log('[LanguageSwitcher] pathname:', window.location.pathname);
    console.log('[LanguageSwitcher] root exists:', !!document.getElementById('root'));

    // Restore scroll position if returning from ISP page
    var shouldRestore = sessionStorage.getItem('should_restore_scroll');
    var scrollPos = sessionStorage.getItem('home_scroll_pos');
    if (shouldRestore === 'true' && scrollPos) {
       // Only if we are on home root (no query params)
       if (!window.location.search) {
          // Use a small delay to ensure layout is ready
          setTimeout(function() {
             window.scrollTo(0, parseInt(scrollPos));
             sessionStorage.removeItem('should_restore_scroll');
          }, 100);
       }
    }

    // Check if we are on purchase page - need to wait for React component
    var search = window.location.search || '';
    var params = new URLSearchParams(search);
    var isPurchasePage = params.get('tab') === 'purchase';

    // Check if this is a React-rendered home page
    var pathname = window.location.pathname;
    var isReactHomePage = (pathname === '/' || pathname === '') && document.getElementById('root');

    console.log('[LanguageSwitcher] isReactHomePage:', isReactHomePage, 'isPurchasePage:', isPurchasePage);

    if (isReactHomePage || isPurchasePage) {
      // For React-rendered pages, wait for React component to render
      // Try multiple times with increasing delays
      var attempts = 0;
      var maxAttempts = 30; // Try for up to 3 seconds (30 * 100ms)

      function tryInsertReactSwitcher() {
        attempts++;
        console.log('[LanguageSwitcher] tryInsertReactSwitcher() attempt:', attempts);

        var headerContent = document.querySelector('.header-content');
        var loginBtn = headerContent ? headerContent.querySelector('.login-btn') : null;
        console.log('[LanguageSwitcher] headerContent:', !!headerContent, 'loginBtn:', !!loginBtn);

        if (insertSwitcher()) {
          console.log('[LanguageSwitcher] Switcher inserted successfully!');
          startContentWatcher();
          return;
        }

        if (attempts < maxAttempts) {
          setTimeout(tryInsertReactSwitcher, 100);
        } else {
          // Fallback: use MutationObserver
          var observer = new MutationObserver(function() {
            if (insertSwitcher()) {
              observer.disconnect();
              startContentWatcher();
            }
          });
          observer.observe(document.body, { childList: true, subtree: true });

          // Final safety fallback
          setTimeout(function() {
            observer.disconnect();
            insertSwitcher();
            startContentWatcher();
          }, 5000);
        }
      }

      // Start trying immediately, then retry
      tryInsertReactSwitcher();
      return;
    }

    // For non-purchase pages, use original logic
    if (insertSwitcher()) {
      startContentWatcher();
      return;
    }

    var observer = new MutationObserver(function() {
      if (insertSwitcher()) {
        observer.disconnect();
        startContentWatcher();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Safety fallback
    setTimeout(function() {
      observer.disconnect();
      insertSwitcher();
      startContentWatcher();
    }, 5000);
  }

  // ── Watch for dynamic content changes (tab switching, etc.) ──
  function startContentWatcher() {
    var reapplyTimer = null;

    var contentObserver = new MutationObserver(function(mutations) {
      if (isApplying || currentLang === 'zh') return;

      var hasChange = mutations.some(function(m) {
        if (switcherEl && switcherEl.contains(m.target)) return false;
        if (m.target.closest && m.target.closest('.lang-dropdown-panel')) return false;
        return m.type === 'characterData' ||
          (m.type === 'childList' && m.addedNodes.length > 0);
      });

      if (hasChange) {
        if (reapplyTimer) clearTimeout(reapplyTimer);
        reapplyTimer = setTimeout(function() {
          applyTranslations(currentLang);
        }, 200);
      }
    });

    var homeContainer = document.querySelector('.home-container');
    if (homeContainer) {
      contentObserver.observe(homeContainer, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }
  }

  // ── Listen for React component mount event ──
  window.addEventListener('purchase-page-mounted', function() {
    setTimeout(function() {
      if (!document.getElementById('lang-switcher')) {
        insertSwitcher();
        startContentWatcher();
      }
    }, 200);
  });

  window.addEventListener('lang-switcher-insert', function() {
    if (!document.getElementById('lang-switcher')) {
      insertSwitcher();
      startContentWatcher();
    }
  });

  // ── Monitor help center state changes ──
  var helpCenterObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        var helpPage = document.getElementById('help-center-page');
        if (helpPage) {
          var isOpen = helpPage.classList.contains('active');
          var switcher = document.getElementById('lang-switcher');
          
          // If help center is open and switcher doesn't exist, create it
          if (isOpen && !switcher) {
            setTimeout(function() {
              insertSwitcher();
            }, 100);
          }
          // If help center is closed and switcher is in help center, move it back
          else if (!isOpen && switcher) {
            var helpNav = helpPage.querySelector('.help-nav-container');
            if (helpNav && helpNav.contains(switcher)) {
              setTimeout(function() {
                var headerContent = document.querySelector('.header-content');
                if (headerContent) {
                  var loginBtn = headerContent.querySelector('.login-btn');
                  if (loginBtn) {
                    headerContent.insertBefore(switcher, loginBtn);
                  } else {
                    headerContent.appendChild(switcher);
                  }
                }
              }, 50);
            }
          }
        }
      }
    });
  });

  // Start observing help center page
  var helpPage = document.getElementById('help-center-page');
  if (helpPage) {
    helpCenterObserver.observe(helpPage, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  // ── Ensure language switcher persists on navigation clicks ──
  function ensureLangSwitcherVisible() {
    var switcher = document.getElementById('lang-switcher');
    if (!switcher) {
      // If switcher doesn't exist, create it
      insertSwitcher();
    } else {
      // If switcher exists but is not in a visible location, move it
      var headerContent = document.querySelector('.header-content');
      var helpNav = document.getElementById('help-center-page')?.querySelector('.help-nav-container');
      var ispAnchor = document.getElementById('isp-lang-anchor');
      var helpPage = document.getElementById('help-center-page');
      var isHelpCenterOpen = helpPage && helpPage.classList.contains('active');
      var search = window.location.search || '';
      var params = new URLSearchParams(search);
      var isPurchasePage = params.get('tab') === 'purchase';

      // Check if switcher is in the right place
      var isInHeader = headerContent && headerContent.contains(switcher);
      var isInHelpNav = helpNav && helpNav.contains(switcher);
      var isInIspAnchor = ispAnchor && ispAnchor.contains(switcher);

      if (!isInHeader && !isInHelpNav && !isInIspAnchor) {
        // Switcher is orphaned, move it to the right place
        if (isPurchasePage && ispAnchor) {
          ispAnchor.appendChild(switcher);
        } else if (isHelpCenterOpen && helpNav) {
          var helpLoginBtn = helpNav.querySelector('.nav-login-btn');
          var actions = helpNav.querySelector('.help-actions');
          if (!actions) {
            actions = document.createElement('div');
            actions.className = 'help-actions';
            if (helpLoginBtn) {
              helpNav.insertBefore(actions, helpLoginBtn);
              actions.appendChild(helpLoginBtn);
            } else {
              helpNav.appendChild(actions);
            }
          }
          var currentLoginBtn = actions.querySelector('.nav-login-btn');
          if (currentLoginBtn) {
            actions.insertBefore(switcher, currentLoginBtn);
          } else {
            actions.appendChild(switcher);
          }
        } else if (headerContent) {
          var loginBtn = headerContent.querySelector('.login-btn');
          if (loginBtn) {
            headerContent.insertBefore(switcher, loginBtn);
          } else {
            headerContent.appendChild(switcher);
          }
        }
      }
    }
  }

  // Monitor navigation menu clicks
  document.addEventListener('click', function(e) {
    var navLink = e.target.closest('.nav-menu a, .nav-menu .dropdown-link, .help-nav-links a');
    if (navLink) {
      // After a short delay, ensure switcher is still visible
      setTimeout(ensureLangSwitcherVisible, 100);
      setTimeout(ensureLangSwitcherVisible, 500);
    }
  }, true);

  // Monitor scroll events (in case navigation triggers scrolling)
  var scrollTimeout = null;
  window.addEventListener('scroll', function() {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(ensureLangSwitcherVisible, 200);
  }, { passive: true });

  // Monitor DOM changes that might affect the switcher
  var domObserver = new MutationObserver(function(mutations) {
    var shouldCheck = false;
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        // Check if header or navigation was modified
        var target = mutation.target;
        if (target.classList && (
          target.classList.contains('header-content') ||
          target.classList.contains('nav-menu') ||
          target.classList.contains('help-nav-container') ||
          target.closest('.header-content') ||
          target.closest('.help-nav-container')
        )) {
          shouldCheck = true;
        }
      }
    });
    if (shouldCheck) {
      setTimeout(ensureLangSwitcherVisible, 100);
    }
  });

  // Observe document body for changes
  domObserver.observe(document.body, {
    childList: true,
    subtree: true
  });

  // ── Start ──
  // Wait for DOMContentLoaded to ensure React has started rendering
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      console.log('[LanguageSwitcher] DOMContentLoaded fired');
      // Additional delay to let React start rendering
      setTimeout(init, 100);
    });
  } else {
    console.log('[LanguageSwitcher] Document already ready, adding small delay');
    setTimeout(init, 100);
  }
})();