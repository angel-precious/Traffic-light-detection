window.onload = function() {
    const textElements = document.querySelectorAll('p');
    for (let j = 0; j < textElements.length; j++) {
        const text = textElements[j].textContent;
        textElements[j].textContent = '';
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i];
            span.style.animationDelay = `${i * 0.05}s`;  // 每个字母的动画延迟
            textElements[j].appendChild(span);
        }
    }
};
