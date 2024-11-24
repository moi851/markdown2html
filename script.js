$(document).ready(function() {
    // 모바일 기기에서 placeholder에 추가 메시지 설정
    if (isMobileDevice()) {
        const currentLang = localStorage.getItem('language') || 'ko';
        const mobilePlaceholderNote = {
            en: "\n\nNote: Copying inline styles using the clipboard may be limited on mobile devices.",
            ko: "\n\n참고: 모바일 기기에서는 클립보드를 이용한 인라인 스타일 복사가 제한될 수 있습니다.",
            ja: "\n\n注意: モバイルデバイスでは、クリップボードを使用したインラインスタイルのコピーが制限される場合があります。",
            zh: "\n\n注意: 在移动设备上, 使用剪贴板进行内联样式复制可能会受到限制。"
        };
        
        $('#markdown').attr('placeholder', 
            $('#markdown').attr('placeholder') + 
            (mobilePlaceholderNote[currentLang] || mobilePlaceholderNote['ko'])
        );
    }
});

// 번역 데이터
const translations = {
    en: {
        title: "Markdown to HTML Converter",
        headerTitle: "Markdown to HTML Converter",
        headerSubtitle: "Enter Markdown and convert it to HTML",
        textareaPlaceholder: "Enter your Markdown...",
        useInlineStylesLabel: "Use inline styles",
        copyButton: "Copy HTML",
        copyStyledButton: "Copy to Clipboard",
        footer: "© 2024 Markdown Converter. All rights reserved.",
        copyAlert: "HTML has been copied!",
        copyStyledAlert: "Copied to clipboard!",
        copyFailAlert: "Failed to copy HTML.",
        copyStyledFailAlert: "Failed to copy to clipboard.",
        mobileClipboardAlert: "Clipboard copying may be limited on mobile browsers. Please use a desktop environment."
    },
    ko: {
        title: "Markdown to HTML 변환기",
        headerTitle: "Markdown to HTML 변환기",
        headerSubtitle: "마크다운을 입력하고 HTML로 변환하세요.",
        textareaPlaceholder: "마크다운을 입력하세요...",
        useInlineStylesLabel: "인라인 스타일 사용",
        copyButton: "HTML로 복사",
        copyStyledButton: "클립보드로 복사",
        footer: "© 2024 Markdown Converter. All rights reserved.",
        copyAlert: "HTML이 복사되었습니다!",
        copyStyledAlert: "클립보드로 복사되었습니다!",
        copyFailAlert: "HTML 복사에 실패했습니다.",
        copyStyledFailAlert: "클립보드로 복사하는 데 실패했습니다.",
        mobileClipboardAlert: "모바일 브라우저에서는 클립보드 복사가 제한될 수 있습니다. 데스크탑 환경에서 이용하여 주세요."
    },
    ja: {
        title: "Markdown to HTML 変換器",
        headerTitle: "MarkdownからHTMLへのコンバーター",
        headerSubtitle: "Markdownを入力してHTMLに変換してください",
        textareaPlaceholder: "Markdownを入力してください...",
        useInlineStylesLabel: "インラインスタイルを使用",
        copyButton: "HTMLをコピー",
        copyStyledButton: "クリップボードにコピー",
        footer: "© 2024 Markdown Converter. All rights reserved.",
        copyAlert: "HTMLがコピーされました!",
        copyStyledAlert: "クリップボードにコピーされました！",
        copyFailAlert: "HTMLのコピーに失敗しました。",
        copyStyledFailAlert: "クリップボードへのコピーに失敗しました。",
        mobileClipboardAlert: "モバイルブラウザではクリップボードへのコピーが制限される場合があります。デスクトップ環境でご利用ください。"
    },
    zh: {
        title: "Markdown to HTML 转换器",
        headerTitle: "Markdown到HTML转换器",
        headerSubtitle: "输入Markdown并将其转换为HTML",
        textareaPlaceholder: "请输入您的Markdown...",
        useInlineStylesLabel: "使用内联样式",
        copyButton: "复制HTML",
        copyStyledButton: "复制到剪贴板",
        footer: "© 2024 Markdown Converter. All rights reserved.",
        copyAlert: "HTML已复制!",
        copyStyledAlert: "已复制到剪贴板！",
        copyFailAlert: "HTML复制失败。",
        copyStyledFailAlert: "复制到剪贴板失败。",
        mobileClipboardAlert: "在移动浏览器上可能会限制剪贴板复制。请使用桌面环境。"
    }
};

// 모바일 기기 감지 함수
function isMobileDevice() {
        return (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
            (window.innerWidth <= 800 && window.innerHeight <= 600)
    );
}

// 언어 감지 및 설정
function getUserLanguage() {
    const lang = navigator.language || navigator.userLanguage;
    if (lang.startsWith('ko')) {
        return 'ko';
    } else if (lang.startsWith('ja')) {
        return 'ja';
    } else if (lang.startsWith('zh')) {
        return 'zh';
    }
    return 'en';
}

const userLang = getUserLanguage();
const t = translations[userLang] || translations['en'];

// 번역 적용
document.addEventListener('DOMContentLoaded', () => {
    // lang 속성 설정
    document.documentElement.lang = userLang;

    // 제목
    document.getElementById('pageTitle').innerText = t.title;

    // 헤더
    document.getElementById('headerTitle').innerText = t.headerTitle;
    document.getElementById('headerSubtitle').innerText = t.headerSubtitle;

    // 텍스트 영역 placeholder
    document.getElementById('markdown').placeholder = t.textareaPlaceholder;

    // 체크박스 레이블
    document.getElementById('useInlineStylesLabel').innerText = t.useInlineStylesLabel;

    // 버튼
    document.getElementById('copyButton').innerText = t.copyButton;
    document.getElementById('copyStyledButton').innerText = t.copyStyledButton;

    // 푸터
    document.getElementById('footer').innerHTML = t.footer;

    // Highlight.js 초기화
    hljs.highlightAll();
});

// Highlight.js 클래스에 대한 인라인 스타일 매핑
const highlightStyleMap = {
    'hljs-comment': 'color: #6a737d; font-style: italic;',
    'hljs-quote': 'color: #6a737d; font-style: italic;',
    'hljs-keyword': 'color: #d73a49; font-weight: bold;',
    'hljs-selector-tag': 'color: #d73a49; font-weight: bold;',
    'hljs-number': 'color: #005cc5;',
    'hljs-literal': 'color: #005cc5;',
    'hljs-string': 'color: #032f62;',
    'hljs-doctag': 'color: #005cc5; font-weight: bold;',
    'hljs-title': 'color: #22863a; font-weight: bold;',
    'hljs-section': 'color: #22863a; font-weight: bold;',
    'hljs-selector-id': 'color: #6f42c1;',
    'hljs-selector-class': 'color: #6f42c1;',
    'hljs-type': 'color: #6f42c1;',
    'hljs-attr': 'color: #6f42c1;',
    'hljs-symbol': 'color: #6f42c1;',
    'hljs-bullet': 'color: #005cc5;',
    'hljs-link': 'color: #032f62; text-decoration: underline;',
    'hljs-emphasis': 'font-style: italic;',
    'hljs-strong': 'font-weight: bold;',
    // 필요한 경우 추가 클래스를 여기에 추가하세요.
};

// 커스텀 렌더러 생성
let renderer = new marked.Renderer();

// 현재 스타일 사용 여부
let useInlineStyles = document.getElementById('useInlineStyles').checked;

// 인라인 스타일을 적용하는 함수
function applyStyles(renderer) {
    // 헤더 스타일
    renderer.heading = function(text, level) {
        if (!useInlineStyles) {
            return `<h${level}>${text}</h${level}>`;
        }
        const sizes = {
            1: 'font-size: 32px; font-weight: bold; margin: 11px 0;',
            2: 'font-size: 24px; font-weight: bold; margin: 12px 0;',
            3: 'font-size: 19px; font-weight: bold; margin: 14px 0;',
            4: 'font-size: 16px; font-weight: bold; margin: 18px 0;',
            5: 'font-size: 13px; font-weight: bold; margin: 24px 0;',
            6: 'font-size: 12px; font-weight: bold; margin: 27px 0;'
        };
        return `<h${level} style="${sizes[level]}">${text}</h${level}>`;
    };

    // 단락 스타일
    renderer.paragraph = function(text) {
        if (!useInlineStyles) {
            return `<p>${text}</p>`;
        }
        return `<p style="margin: 16px 0; line-height: 1.6; color: #24292e;">${text}</p>`;
    };

    // 강조 (bold) 스타일
    renderer.strong = function(text) {
        if (!useInlineStyles) {
            return `<strong>${text}</strong>`;
        }
        return `<strong style="font-weight: bold;">${text}</strong>`;
    };

    // 기울임 (italic) 스타일
    renderer.em = function(text) {
        if (!useInlineStyles) {
            return `<em>${text}</em>`;
        }
        return `<em style="font-style: italic;">${text}</em>`;
    };

    // 링크 스타일
    renderer.link = function(href, title, text) {
        if (!useInlineStyles) {
            return `<a href="${href}" title="${title || ''}">${text}</a>`;
        }
        return `<a href="${href}" title="${title || ''}" style="color: #0366d6; text-decoration: none;">${text}</a>`;
    };

    // 목록 스타일
    renderer.list = function(body, ordered, start) {
        if (!useInlineStyles) {
            const type = ordered ? 'ol' : 'ul';
            return `<${type}>${body}</${type}>`;
        }
        const type = ordered ? 'ol' : 'ul';
        const style = ordered ? 'padding-left: 24px; list-style-type: decimal;' : 'padding-left: 24px; list-style-type: disc;';
        return `<${type} style="${style}">${body}</${type}>`;
    };

    renderer.listitem = function(text) {
        if (!useInlineStyles) {
            return `<li>${text}</li>`;
        }
        return `<li style="margin: 8px 0;">${text}</li>`;
    };

    // 코드 블록 스타일 (Highlight.js 통합)
    renderer.code = function(code, infostring, escaped) {
        const language = (infostring || '').match(/\S*/)[0];
        if (useInlineStyles) {
            if (language && hljs.getLanguage(language)) {
                const highlighted = hljs.highlight(code, { language }).value;
                return `<pre style="background-color: #f6f8fa; padding: 10px; border-radius: 4px; overflow: auto; margin: 16px 0;"><code style="font-family: Consolas, 'Courier New', monospace; font-size: 14px; color: #24292e; background-color: unset;" class="hljs ${language}">${highlighted}</code></pre>`;
            } else {
                // 언어가 지정되지 않았거나 지원되지 않는 경우 기본 처리
                const highlighted = hljs.highlightAuto(code).value;
                return `<pre style="background-color: #f6f8fa; padding: 10px; border-radius: 4px; overflow: auto; margin: 16px 0;"><code style="font-family: Consolas, 'Courier New', monospace; font-size: 14px; color: #24292e; background-color: unset;" class="hljs">${highlighted}</code></pre>`;
            }
        } else {
            // 인라인 스타일 사용하지 않을 때는 Highlight.js 스타일 제거
            return `<pre><code>${escapeHtml(code)}</code></pre>`;
        }
    };

    // 블록 인용 스타일
    renderer.blockquote = function(quote) {
        if (!useInlineStyles) {
            return `<blockquote>${quote}</blockquote>`;
        }
        return `<blockquote style="border-left: 4px solid #dfe2e5; padding-left: 16px; color: #6a737d; margin: 16px 0; background-color: unset;">${quote}</blockquote>`;
    };

    // 수평선 스타일
    renderer.hr = function() {
        if (!useInlineStyles) {
            return `<hr />`;
        }
        return `<hr style="border: none; border-top: 1px solid #dfe2e5; margin: 32px 0;" />`;
    };

    // 이미지 스타일
    renderer.image = function(href, title, text) {
        if (!useInlineStyles) {
            return `<img src="${href}" alt="${text}" title="${title || ''}" />`;
        }
        return `<img src="${href}" alt="${text}" title="${title || ''}" style="max-width: 100%; height: auto;" />`;
    };

    // 인라인 코드 스타일
    renderer.codespan = function(text) {
        if (!useInlineStyles) {
            return `<code>${text}</code>`;
        }
        return `<code style="background-color: unset; padding: 2px 4px; border-radius: 3px; font-family: Consolas, 'Courier New', monospace; font-size: 14px; color: #24292e;">${text}</code>`;
    };
}

// 이스케이프 HTML 함수
function escapeHtml(html) {
    return html
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// 인라인 스타일 적용 함수
function applyHighlightInlineStyles(element) {
    const elements = element.querySelectorAll('*');
    elements.forEach(el => {
        el.classList.forEach(cls => {
            if (highlightStyleMap[cls]) {
                el.style.cssText += highlightStyleMap[cls];
            }
        });
    });
}

// 초기 렌더러 설정
applyStyles(renderer);

// Marked.js 설정
marked.setOptions({
    renderer: renderer,
    breaks: true,
    gfm: true,
    headerIds: false
});

const markdownInput = document.getElementById('markdown');
const outputDiv = document.getElementById('output');
const useInlineStylesCheckbox = document.getElementById('useInlineStyles');

// 마크다운 입력 시 실시간으로 HTML로 변환
markdownInput.addEventListener('input', updateOutput);

// 체크박스 변경 시 렌더러 업데이트
useInlineStylesCheckbox.addEventListener('change', function() {
    useInlineStyles = this.checked;
    // 새로운 렌더러 생성
    renderer = new marked.Renderer();
    applyStyles(renderer);
    // Marked.js 옵션 업데이트
    marked.setOptions({
        renderer: renderer,
        breaks: true,
        gfm: true,
        headerIds: false
    });
    updateOutput();
});

function updateOutput() {
    const markdownText = markdownInput.value;
    const html = marked.parse(markdownText);
    outputDiv.innerHTML = html;
    // Highlight.js 하이라이팅 다시 적용
    if (useInlineStyles) {
        hljs.highlightAll();
    }
}

// 초기 출력 업데이트
updateOutput();

// 기존 HTML 복사 함수 (스타일 제외)
function copyHTML() {
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = outputDiv.innerHTML;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextarea);
    alert(t.copyAlert);
}

// 새로운 스타일 포함 HTML 복사 함수
function copyStyledHTML() {
    if (!navigator.clipboard || !window.ClipboardItem) {
        // 구형 브라우저를 위한 폴백(fallback) 방식
        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = outputDiv.innerText; // innerHTML 대신 innerText 사용
        document.body.appendChild(tempTextarea);
        tempTextarea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextarea);
        alert(t.copyStyledAlert);
        return;
    }

    let htmlContent = outputDiv.innerHTML;

    if (useInlineStyles) {
        const clonedDiv = outputDiv.cloneNode(true);
        applyHighlightInlineStyles(clonedDiv);
        clonedDiv.querySelectorAll('*').forEach(el => {
            el.className = '';
        });
        htmlContent = clonedDiv.innerHTML;
    }

    // HTML과 일반 텍스트 모두 클립보드에 복사
    const plainText = outputDiv.innerText;
    const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
    const textBlob = new Blob([plainText], { type: 'text/plain' });
    
    const data = [
        new ClipboardItem({
            'text/html': htmlBlob,
            'text/plain': textBlob
        })
    ];

    navigator.clipboard.write(data).then(() => {
        alert(t.copyStyledAlert);
    }).catch(err => {
        console.error('복사 실패: ', err);
        alert(t.copyStyledFailAlert);
    });

}
