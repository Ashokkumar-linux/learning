function typeWriterEffect() {
    const headline = document.getElementById('hero-headline');
    if (!headline) return;

    const text = headline.textContent;
    headline.textContent = '';
    let i = 0;

    function type() {
        if (i < text.length) {
            headline.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50); // Adjust typing speed here (in ms)
        }
    }
    type();
}

// Since content is loaded dynamically, we need to ensure the script runs when the page is visible.
// A simple way is to call it directly. The router will execute it.
typeWriterEffect();
