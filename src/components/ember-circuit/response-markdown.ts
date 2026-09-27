/* Small, intentionally non-HTML Markdown renderer for untrusted model responses.
 * Only headings, paragraphs, simple lists, tables, blockquotes, rules,
 * fenced code, bold and inline code are admitted. Links and raw HTML stay text.
 */
const escapeHtml = (text: string): string => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

function inline(text: string): string {
  return text.split(/(`[^`\n]+`|\*\*[^*\n]+\*\*|\*[^*\n]+\*)/g).map((part) => {
    if (/^`[^`\n]+`$/.test(part)) return `<code>${escapeHtml(part.slice(1, -1))}</code>`;
    if (/^\*\*[^*\n]+\*\*$/.test(part)) return `<strong>${escapeHtml(part.slice(2, -2))}</strong>`;
    if (/^\*[^*\n]+\*$/.test(part)) return `<em>${escapeHtml(part.slice(1, -1))}</em>`;
    return escapeHtml(part);
  }).join('');
}

const cells = (line: string): string[] => line.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim());
const divider = (line: string): boolean => /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line.trim());

export function renderResponseMarkdown(source: string): string {
  const lines = source.replace(/\r\n?/g, '\n').split('\n');
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    if (/^```/.test(line)) {
      const block: string[] = []; i++;
      while (i < lines.length && !/^```/.test(lines[i])) block.push(lines[i++]);
      if (i < lines.length) i++;
      out.push(`<pre><code>${escapeHtml(block.join('\n'))}</code></pre>`); continue;
    }
    const heading = /^(#{1,4})\s+(.+)$/.exec(line);
    if (heading) { out.push(`<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`); i++; continue; }
    if (/^\s*---+\s*$/.test(line)) { out.push('<hr>'); i++; continue; }
    if (line.includes('|') && i + 1 < lines.length && divider(lines[i + 1])) {
      const head = cells(line); i += 2; const rows: string[][] = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) rows.push(cells(lines[i++]));
      out.push(`<div class="ec-response-table-wrap"><table><thead><tr>${head.map((cell) => `<th>${inline(cell)}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${head.map((_, col) => `<td>${inline(row[col] ?? '')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`); continue;
    }
    if (/^\s*(?:[-*] |\d+\. )/.test(line)) {
      const ordered = /^\s*\d+\. /.test(line); const items: string[] = [];
      const pattern = ordered ? /^\s*\d+\. (.*)$/ : /^\s*[-*] (.*)$/;
      while (i < lines.length && pattern.test(lines[i])) items.push(`<li>${inline(pattern.exec(lines[i++])![1])}</li>`);
      out.push(`<${ordered ? 'ol' : 'ul'}>${items.join('')}</${ordered ? 'ol' : 'ul'}>`); continue;
    }
    if (/^>\s?/.test(line)) {
      const quote: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) quote.push(lines[i++].replace(/^>\s?/, ''));
      out.push(`<blockquote>${inline(quote.join(' '))}</blockquote>`); continue;
    }
    const paragraph = [line]; i++;
    while (i < lines.length && lines[i].trim() && !/^(?:#{1,4}\s|```|\s*[-*] |\s*\d+\. |\s*>|\s*---+\s*$)/.test(lines[i]) && !(i + 1 < lines.length && lines[i].includes('|') && divider(lines[i + 1]))) paragraph.push(lines[i++]);
    out.push(`<p>${inline(paragraph.join(' '))}</p>`);
  }
  return out.join('\n');
}
