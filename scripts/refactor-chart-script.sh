#!/bin/bash
# Refactor each chart component: remove inline <script define:vars>, add <script type="application/json"> for props

set -e
cd "$(dirname "$0")/.."

for f in src/components/knowledge/charts/*.astro; do
  name=$(basename "$f" .astro)
  echo "Refactoring $name..."

  python3 << PYEOF
import re

with open('$f') as fp:
    content = fp.read()

# Find the chartId definition (e.g. "const chartId = `kc-bar-${Math.random().toString(36).slice(2, 9)}`;")
chart_id_match = re.search(r'const chartId = `([^`]+)`;', content)
if not chart_id_match:
    print(f"  Skipping $name: no chartId found")
    exit()
chart_id_pattern = chart_id_match.group(1)
print(f"  chartId pattern: {chart_id_pattern}")

# Find all the props computed in the frontmatter (between --- and <div)
frontmatter_match = re.search(r'---\n(.*?)\n---\n', content, re.DOTALL)
if not frontmatter_match:
    print(f"  Skipping $name: no frontmatter")
    exit()
frontmatter = frontmatter_match.group(1)

# Find the destructure Props line (first one only)
props_match = re.search(r'const\s*\{([^}]+)\}\s*=\s*Astro\.props;', frontmatter)
if not props_match:
    print(f"  Skipping $name: no Props destructure")
    exit()
props_list = props_match.group(1).strip()
props_names = [p.strip().split('=')[0].strip() for p in props_list.split(',')]
print(f"  Props: {props_names}")

# Find the <script define:vars={{ ... }}> block
script_match = re.search(r'<script define:vars=\{\{[^}]+\}\}>\s*import\(.d3.\)\.then\(\(d3\) => \{', content)
if script_match:
    print(f"  Has d3 import script - removing")
    # Find the matching </script>
    start = script_match.start()
    end_match = re.search(r'</script>', content[start:])
    if end_match:
        end = start + end_match.end()
        content = content[:start] + content[end:]
else:
    print(f"  No d3 import script found")

# Replace the chart div to include data-props attribute and props script
# Find: <div class:list={['kc-...', className]} data-chart-id={chartId}>
# Replace with: <div class:list={['kc-...', className]} data-chart-id={chartId} data-props={JSON.stringify({ ...props })}>
# Also add a <script type="application/json" id="props-{chartId}">{...}</script>

# Build props object for data-props attribute
props_obj_parts = []
for name in props_names:
    props_obj_parts.append(f'{name}: {name}')

# Find the opening div with data-chart-id
div_pattern = r'(<div class:list=\{\[\'kc-[^\']+\', className\]\} data-chart-id=\{chartId\})>'
div_match = re.search(div_pattern, content)
if div_match:
    print(f"  Found opening div")
    new_div = div_match.group(1) + ' data-props={JSON.stringify({ ' + ', '.join(props_obj_parts) + ' })}>'
    content = content[:div_match.start()] + new_div + content[div_match.end():]
else:
    print(f"  WARNING: Could not find opening div")

# Add the props script before </div> (right before the closing tag of the chart div)
# Find the closing </div> after the opening div
# This is tricky - let's just append before </style>
props_script = f'''
<script type="application/json" id="props-{{chartId}}" set:html={{JSON.stringify({{ {', '.join(props_obj_parts)} }})}}></script>
'''

# Insert the props script after the </div> that's at the end of the SVG element
# Find </svg></div> pattern and add the script after
content = re.sub(
    r'(</svg>)(</div>)',
    r'\1\n' + props_script.strip() + r'\2',
    content,
    count=1
)

with open('$f', 'w') as fp:
    fp.write(content)

print(f"  Done")
PYEOF
done

echo "All charts refactored"
