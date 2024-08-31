document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.expandable').forEach(item => {
        // 初期状態ですべての展開可能な項目を展開状態にする
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
});

/* サイト内検索は実装できていないので、コメントアウト */
/* function toggleSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput.style.display === 'none' || searchInput.style.display === '') {
        searchInput.style.display = 'inline-block';
        searchInput.focus();
    } else {
        searchInput.style.display = 'none';
    }
}

document.getElementById('search-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        alert('Search functionality would be implemented here.');
        this.value = '';
    }
}) */;