// コードのシンタックスハイライトと行の強調。
//
// highlight.js（CDN）のあとに読み込む:
//   <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
//   <script src="tim-slides.js"></script>
//
// 行の強調は <pre data-lines="2,4-5"> のように 1 始まりの行番号で指定する。
// highlight.js はコード内の HTML タグを取り除くため、強調は <mark> ではなく
// 行の位置に背景の帯を重ねて表す。
(() => {
  if (window.hljs) {
    // highlightAll() は DOMContentLoaded まで待つため、PDF 化の前に確実に終わるよう直接呼ぶ
    document.querySelectorAll('pre code').forEach(el => hljs.highlightElement(el));
  }

  const parseLines = spec => {
    const lines = [];
    spec.split(',').forEach(part => {
      const [from, to] = part.trim().split('-').map(Number);
      for (let n = from; n <= (to || from); n++) lines.push(n);
    });
    return lines.filter(n => Number.isInteger(n) && n > 0);
  };

  document.querySelectorAll('pre[data-lines]').forEach(pre => {
    const style = getComputedStyle(pre);
    const lineHeight = parseFloat(style.lineHeight);
    const top = parseFloat(style.paddingTop);
    parseLines(pre.dataset.lines).forEach(n => {
      const mark = document.createElement('div');
      mark.className = 'line-mark';
      mark.style.top = `${top + (n - 1) * lineHeight}px`;
      mark.style.height = `${lineHeight}px`;
      pre.prepend(mark);
    });
  });
})();
