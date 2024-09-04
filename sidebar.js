
document.addEventListener('DOMContentLoaded', function() {
    // 現在のページのパスを取得
    const currentPath = window.location.pathname;
    // サイドバーとスクリプトのパスを設定
    let sidebarPath, scriptPath;

    if (currentPath.includes('/Exam_html/') || currentPath.includes('/note/')) {
        sidebarPath = '../sidebar.html';
        scriptPath = '/';
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
        if (link.getAttribute('href').startsWith('/')) {
            link.setAttribute('href', scriptPath + link.getAttribute('href').slice(1));
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