document.addEventListener('DOMContentLoaded', function() {
    const settingsClickable = document.getElementById('settingsClickable');
    const settings = document.getElementById('settings');
    if (settingsClickable) {
        settingsClickable.addEventListener('click', function() {
            if (settings.style.display === 'none') {
                settings.style.display = 'block';
                settingsClickable.innerText = '▼ Settings';
            } else {
                settings.style.display = 'none';
                settingsClickable.innerText = '▶ Settings';
            }
        });
    }
});
