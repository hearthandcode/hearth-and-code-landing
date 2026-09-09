/**
 * Tiny safe markdown renderer for inline prose in prompt cards.
 * Supports: paragraphs, **bold**, *italic*, `code`, lists (- or 1.),
 * blockquotes (>), and inline links [text](url).
 * Output is HTML-escaped before tag substitution.
 */
function escape(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inline(s: string): string {
  // code first to protect its content from further substitution
  const protected_ = s.replace(/`([^`]+)`/g, (_, c) => `@@CODE@@${escape(c)}@@/CODE@@`);
  let out = escape(protected_);
  // links: [text](url) — escape text, escape url, but no attributes
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => `<a href="${u}">${t}</a>`);
  // bold then italic
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>');
  out = out.replace(/@@CODE@@([^@]+)@@\/CODE@@/g, '<code>$1</code>');
  return out;
}

export function renderMarkdown(src: string): string {
  if (!src) return '';
  const text = src.replace(/\r\n?/g, '\n');
  const lines = text.split('\n');
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    // fenced code block
    if (/^```/.test(line)) {
      const buf: string[] = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) { buf.push(escape(lines[i])); i++; }
      out.push(`<pre class="ec-md__code"><code>${buf.join('\n')}</code></pre>`);
      i++;
      continue;
    }
    // list (consecutive - or 1. lines)
    if (/^[-*] /.test(line) || /^\d+\. /.test(line)) {
      const items: string[] = [];
      const ordered = /^\d+\. /.test(line);
      while (i < lines.length && ((ordered && /^\d+\. /.test(lines[i])) || (!ordered && /^[-*] /.test(lines[i])))) {
        items.push(`<li>${inline(lines[i].replace(/^([-*] |\d+\. )/, ''))}</li>`);
        i++;
      }
      out.push(`<${ordered ? 'ol' : 'ul'} class="ec-md__list">${items.join('')}</${ordered ? 'ol' : 'ul'}>`);
      continue;
    }
    // blockquote
    if (/^> /.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^> ?/.test(lines[i])) { buf.push(lines[i].replace(/^> ?/, '')); i++; }
      out.push(`<blockquote class="ec-md__quote">${inline(buf.join(' '))}</blockquote>`);
      continue;
    }
    // blank line — paragraph break
    if (line.trim() === '') { i++; continue; }
    // paragraph
    const buf: string[] = [line];
    i++;
    while (i < lines.length && lines[i].trim() !== '' && !/^([-*] |\d+\. |> |```)/.test(lines[i])) { buf.push(lines[i]); i++; }
    out.push(`<p>${inline(buf.join(' '))}</p>`);
  }
  return out.join('\n');
}
