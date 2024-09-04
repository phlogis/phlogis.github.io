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