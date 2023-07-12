function setNextButton() {
    var nextButton = document.getElementById('nextButton');
    var nextUrl = nextButton.getAttribute('data-next-url');
    nextButton.onclick = function() {
        location.href = nextUrl;
    };
}

// 为文本添加打字效果的函数
function typeWriter(textElement, delay) {
    // 保存原有的文本，并清空元素的当前文本
    var originalText = textElement.textContent;
    textElement.textContent = "";
    // 在打字效果开始时显示元素
    setTimeout(function() {
        textElement.classList.remove('invisible');
        textElement.classList.add('visible');
    }, delay);
    // 使用setTimeout函数逐字打印
    var i = 0;
    function typeWriterLoop() {
        if (i < originalText.length) {
            textElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriterLoop, 100);  // 你可以调整这个值来改变打字速度
        }
    }
    setTimeout(typeWriterLoop, delay);  // 开始打印
}

function typeWriterList(ulElement) {
    var lis = ulElement.children;
    var delay = 0;
    for (var i = 0; i < lis.length; i++) {
        (function(i) {
            setTimeout(function() {
                typeWriter(lis[i]);
                lis[i].style.opacity = '1';
                lis[i].style.transition = 'opacity 1s ease-in-out';
                // 同时改变伪元素的透明度
                lis[i].style.setProperty("--li-before-opacity", "1");
            }, delay);
        })(i);
        delay += 2000;  // 延迟递增，使得列表项按顺序展示
    }
    // 在打字效果开始时显示<ul>元素
    ulElement.style.visibility = 'visible';
}

window.onload = function() {

    var textElements = document.querySelectorAll('h1, h2, p');
    for (var i = 0; i < textElements.length; i++) {
        textElements[i].style.opacity = '1';
    }

    var container = document.querySelector('.container');
    var title = document.getElementById('title');
    var button = document.getElementById('nextButton');

    container.style.transition = 'opacity 2s';
    container.style.opacity = '1';

    title.style.transition = 'transform 2s';
    title.style.transform = 'translateY(0)';

    button.style.transition = 'transform 2s';
    button.style.transform = 'translateY(0)';

    // 为每个<p>元素和<ul>元素应用打字效果
    var textElements = document.querySelectorAll('p, li');
    var delay = 0;
    for (var i = 0; i < textElements.length; i++) {
        typeWriter(textElements[i], delay);
        delay += 2000;  // 延迟递增，使得每段文本按顺序展示
    }
};
