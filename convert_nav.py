#!/usr/bin/env python3
"""Replace inline navigation blocks with placeholder divs in HTML files."""
import re

files_to_convert = [
    'rfq-list.html',
    'invoice-view.html',
    'invoice-create.html',
    'projects-create.html'
]

placeholder = """    <!--! ================================================================ !-->
    <!--! [Start] Navigation Manu !-->
    <!--! ================================================================ !-->
    <div id="navigation-placeholder"></div>
    <!--! ================================================================ !-->
    <!--! [End]  Navigation Manu !-->
    <!--! ================================================================ !-->"""

base_path = '/Applications/XAMPP/xamppfiles/htdocs/vendor_collab/'

for fname in files_to_convert:
    filepath = base_path + fname
    with open(filepath, 'r') as f:
        content = f.read()

    # Find and replace the nav block: from the comment before <nav> to the comment after </nav>
    # Pattern: match from <!--! [Start] Navigation --> through </nav> and its trailing comments
    pattern = r'(\s*<!--!\s*=+\s*!-->\s*\n\s*<!--!\s*\[Start\]\s*Navigation\s*Manu?\s*!-->\s*\n\s*<!--!\s*=+\s*!-->\s*\n)\s*<nav class="nxl-navigation">.*?</nav>\s*\n(\s*<!--!\s*=+\s*!-->\s*\n\s*<!--!\s*\[End\]\s*Navigation\s*Manu?\s*!-->\s*\n\s*<!--!\s*=+\s*!-->)'
    
    match = re.search(pattern, content, re.DOTALL)
    if match:
        content = content[:match.start()] + '\n' + placeholder + '\n' + content[match.end():]
        
        # Add partials-loader.js if not present
        if 'partials-loader.js' not in content:
            content = content.replace('</body>', '    <script src="assets/js/partials-loader.js"></script>\n</body>')
        
        with open(filepath, 'w') as f:
            f.write(content)
        print(f'OK: {fname}')
    else:
        print(f'FAIL: {fname} - nav block not found')
