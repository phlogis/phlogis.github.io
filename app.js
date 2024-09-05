// ベースURLを設定（リポジトリ名を含む）
const baseUrl = '/phlogis.github.io'; // リポジトリ名に応じて変更してください

// メインコンテンツを動的に読み込む関数（修正）
function loadContent(url) {
    // GitHub Pages のベースURLを考慮
    const fullUrl = baseUrl + url;
    fetch(fullUrl)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const content = doc.querySelector('main').innerHTML;
            document.querySelector('main').innerHTML = content;
            updateActiveLink(url);
            window.history.pushState({url: url}, '', fullUrl);
        });
}

// アクティブなリンクを更新する関数
function updateActiveLink(url) {
    const links = document.querySelectorAll('#sidebar a');
    links.forEach(link => {
        if (link.getAttribute('href') === url) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// サイドバーを読み込む関数（修正）
function loadSidebar() {
    fetch(baseUrl + '/sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar-container').innerHTML = data;
            initializeSidebar();
            setupNavigation();
        });
}

// ナビゲーションの設定（修正）
function setupNavigation() {
    const links = document.querySelectorAll('#sidebar a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('href').replace(baseUrl, '');
            loadContent(url);
        });
    });
}

// ブラウザの戻る/進むボタンのハンドリング
window.addEventListener('popstate', function(e) {
    if (e.state && e.state.url) {
        loadContent(e.state.url);
    }
});

// 初期化（修正）
document.addEventListener('DOMContentLoaded', function() {
    loadSidebar();
    // 初期コンテンツのロード
    const initialUrl = window.location.pathname.replace(baseUrl, '');
    loadContent(initialUrl);
});