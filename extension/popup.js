const TOOLS = [
  { id: "password-generator", title: "Password Generator", category: "Security" },
  { id: "json-formatter", title: "JSON Formatter", category: "Developer" },
  { id: "base64-encode-decode", title: "Base64 Tool", category: "Developer" },
  { id: "url-encode-decode", title: "URL Encoder", category: "Developer" },
  { id: "uuid-generator", title: "UUID Generator", category: "Developer" },
  { id: "markdown-to-html", title: "Markdown to HTML", category: "Developer" },
  { id: "word-character-counter", title: "Word Counter", category: "Text" },
  { id: "case-converter", title: "Case Converter", category: "Text" },
  { id: "lorem-ipsum-generator", title: "Lorem Ipsum", category: "Text" },
  { id: "image-resizer", title: "Image Resizer", category: "Media" },
  { id: "color-picker", title: "Color Picker", category: "Media" },
  { id: "svg-to-png", title: "SVG to PNG", category: "Media" },
  { id: "hash-generator", title: "Hash Generator", category: "Security" },
  { id: "my-ip-address", title: "My IP Address", category: "Network" },
  { id: "percentage-calculator", title: "Percentage Calculator", category: "Math" },
  { id: "css-minifier", title: "CSS Minifier", category: "Web" },
  { id: "meta-tag-generator", title: "Meta Tag Gen", category: "Web" },
  { id: "jwt-decoder", title: "JWT Decoder", category: "Developer" },
  { id: "diff-checker", title: "Diff Checker", category: "Developer" },
  { id: "regex-tester", title: "Regex Tester", category: "Developer" },
  { id: "screen-recorder", title: "Screen Recorder", category: "Media" }
];

const DOMAIN = "https://bookmarksoft.com";

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('results');

  function renderTools(tools) {
    resultsContainer.innerHTML = '';
    
    if (tools.length === 0) {
      resultsContainer.innerHTML = '<div class="empty-state">No tools found matching your search.</div>';
      return;
    }

    tools.forEach(tool => {
      const a = document.createElement('a');
      a.href = `${DOMAIN}/tools/${tool.id}`;
      a.className = 'result-item';
      a.target = '_blank';
      
      const info = document.createElement('div');
      info.className = 'result-info';
      
      const title = document.createElement('div');
      title.className = 'result-title';
      title.textContent = tool.title;
      
      const category = document.createElement('div');
      category.className = 'result-category';
      category.textContent = tool.category;
      
      info.appendChild(title);
      info.appendChild(category);
      a.appendChild(info);
      
      const launch = document.createElement('div');
      launch.style.color = 'var(--text-muted)';
      launch.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>';
      a.appendChild(launch);

      resultsContainer.appendChild(a);
    });
  }

  // Initial render
  renderTools(TOOLS);

  // Search functionality
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = TOOLS.filter(tool => 
      tool.title.toLowerCase().includes(query) || 
      tool.category.toLowerCase().includes(query)
    );
    renderTools(filtered);
  });
});
