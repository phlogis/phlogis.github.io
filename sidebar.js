document.addEventListener('DOMContentLoaded', function() {
    // 現在のページのパスを取得
    const currentPath = window.location.pathname;
    // サイドバーとスクリプトのパスを設定
    let sidebarPath, scriptPath;
    // Exam_html ディレクトリまたは note ディレクトリ内のページの場合は、親ディレクトリにある sidebar.html とスクリプトを読み込む必要がある。
    // さらにディレクトリを増やすときは、条件を追加する。
    if (currentPath.includes('/Exam_html/') || currentPath.includes('/note/')) {
        sidebarPath = '../sidebar.html';
        scriptPath = '../';
    } else {
        sidebarPath = 'sidebar.html';
        scriptPath = '';
    }

    fetch(sidebarPath)
        .then(response => response.text())
        .then(data => {
            // サイドバーの内容を挿入
            document.getElementById('sidebar-container').innerHTML = data;
            // リンクのパスを修正
            adjustSidebarLinks(scriptPath);
            initializeSidebar();
        });
});

function adjustSidebarLinks(scriptPath) {
    const links = document.querySelectorAll('#sidebar a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href.startsWith('/')) {
            link.setAttribute('href', scriptPath + href.slice(1));
        } else if (!href.startsWith('http') && !href.startsWith('#') && !href.startsWith('../')) {
            link.setAttribute('href', scriptPath + href);
        }
    });
}

function initializeSidebar() {
    document.querySelectorAll('.expandable').forEach(item => {
        item.classList.add('expanded');
        const submenu = item.querySelector('.submenu');
        if (submenu) {
            submenu.style.display = 'block';
        }
        
        item.addEventListener('click', event => {
            event.stopPropagation();
            
            // サブメニュー項目（リンク）がクリックされた場合は、サイドバーを閉じない
            if (event.target.tagName === 'A' && !event.target.classList.contains('expandable')) {
                return;
            }
            
            // ホーム項目またはサブメニューを含む項目がクリックされた場合のみトグル
            if (item.classList.contains('home') || item.querySelector('.submenu')) {
                item.classList.toggle('expanded');
                const submenu = item.querySelector('.submenu');
                if (submenu) {
                    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
                }
            }
        });
    });
}