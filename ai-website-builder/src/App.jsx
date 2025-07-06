import React, { useState } from 'react';

const templates = {
  portfolio: (name = 'John Doe') => `
    <html>
    <head>
      <title>${name}'s Portfolio</title>
      <style>
        body { font-family: sans-serif; padding: 2em; background: #f9f9f9; }
        h1 { color: #333; }
        .section { margin-bottom: 2em; }
      </style>
    </head>
    <body>
      <h1>Welcome to ${name}'s Portfolio</h1>
      <div class="section">
        <h2>About Me</h2>
        <p>I am a passionate web developer and designer.</p>
      </div>
      <div class="section">
        <h2>Projects</h2>
        <ul>
          <li>Project 1 - Personal Website</li>
          <li>Project 2 - Mobile App</li>
        </ul>
      </div>
      <div class="section">
        <h2>Contact</h2>
        <p>Email: me@example.com</p>
      </div>
    </body>
    </html>
  `,

  business: (name = 'Your Business') => `
    <html>
    <head>
      <title>${name}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 2em; background: #eef; }
        h1 { color: #003366; }
        .section { margin-bottom: 2em; }
      </style>
    </head>
    <body>
      <h1>Welcome to ${name}</h1>
      <div class="section">
        <h2>Our Services</h2>
        <p>We provide quality services to grow your business.</p>
      </div>
      <div class="section">
        <h2>Contact Us</h2>
        <p>Email: contact@${name.toLowerCase().replace(/\s/g, '')}.com</p>
      </div>
    </body>
    </html>
  `
};

const App = () => {
  const [command, setCommand] = useState('');
  const [htmlCode, setHtmlCode] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const generateSite = () => {
    const lowerCommand = command.toLowerCase();
    let html = '';
    if (lowerCommand.includes('portfolio')) {
      html = templates.portfolio();
    } else if (lowerCommand.includes('business') || lowerCommand.includes('shop')) {
      html = templates.business();
    } else {
      html = '<p>Sorry, I do not understand that type of website yet.</p>';
    }
    setHtmlCode(html);
    setShowPreview(false);
  };

  return (
    <div className="p-4 max-w-xl mx-auto" style={{fontFamily: 'Arial, sans-serif'}}>
      <h1 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '16px'}}>AI Website Builder</h1>
      <input
        style={{width: '100%', padding: '8px', marginBottom: '16px', border: '1px solid #ccc', borderRadius: '4px'}}
        placeholder="Describe your website (e.g., make me a portfolio site)"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
      />
      <div style={{display: 'flex', gap: '12px', marginBottom: '16px'}}>
        <button
          style={{backgroundColor: '#2563eb', color: 'white', padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer'}}
          onClick={generateSite}
        >
          Generate Website
        </button>
        <button
          style={{backgroundColor: htmlCode ? '#16a34a' : '#a3a3a3', color: 'white', padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: htmlCode ? 'pointer' : 'not-allowed'}}
          disabled={!htmlCode}
          onClick={() => setShowPreview(!showPreview)}
        >
          {showPreview ? 'Hide Preview' : 'Preview'}
        </button>
      </div>
      <div style={{marginTop: '24px'}}>
        <h2 style={{fontSize: '20px', fontWeight: '600', marginBottom: '8px'}}>Generated HTML:</h2>
        <textarea
          style={{width: '100%', height: '320px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
          value={htmlCode}
          readOnly
        ></textarea>
      </div>
      {showPreview && (
        <div style={{marginTop: '24px', border: '1px solid #ccc', padding: '16px', borderRadius: '4px'}}>
          <h2 style={{fontSize: '20px', fontWeight: '600', marginBottom: '8px'}}>Website Preview:</h2>
          <iframe
            title="Website Preview"
            srcDoc={htmlCode}
            sandbox="allow-same-origin allow-scripts"
            style={{width: '100%', height: '400px', border: '1px solid #999', borderRadius: '4px'}}
          />
        </div>
      )}
    </div>
  );
};

export default App;