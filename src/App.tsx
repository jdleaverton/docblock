import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [text, setText] = useState('')
  const [result, setResult] = useState<{
    hasTracker: boolean
    trackerType: 'James' | 'Luke' | 'Matthew' | null
    count: number
  } | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  // Add the favicon effect inside the component
  useEffect(() => {
    // Create an in-memory canvas to draw the emoji
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw emoji
      ctx.font = '48px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✋', canvas.width/2, canvas.height/2);
      
      // Update favicon
      const linkElement = document.querySelector("link[rel*='icon']") || document.createElement('link');
      // Cast to HTMLLinkElement to fix TypeScript errors
      const link = linkElement as HTMLLinkElement;
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = canvas.toDataURL("image/x-icon");
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    
    // Set page title
    document.title = "DocBlock";
  }, []);

  const checkForTrackers = () => {
    // Count invisible separators (U+2063)
    const invisibleSeparatorRegex = /\u2063/g
    const matches = text.match(invisibleSeparatorRegex) || []
    const count = matches.length

    let trackerType: 'James' | 'Luke' | 'Matthew' | null = null;
    if (count === 1) trackerType = 'James'
    else if (count === 2) trackerType = 'Luke'
    else if (count === 3) trackerType = 'Matthew'

    setResult({
      hasTracker: count > 0,
      trackerType,
      count
    })
  }

  const removeFingerprint = () => {
    const cleanText = text.replace(/\u2063/g, '')
    setText(cleanText)
    setMessage("Fingerprint successfully removed! You can now copy the text below.")
  }

  const frameSomeoneElse = (fingerprint: 'James' | 'Luke' | 'Matthew') => {
    // Remove existing fingerprint first
    let cleanText = text.replace(/\u2063/g, '')
    
    // Add new fingerprint
    let invisibleSeparators = ''
    if (fingerprint === 'James') invisibleSeparators = '\u2063'
    else if (fingerprint === 'Luke') invisibleSeparators = '\u2063\u2063'
    else if (fingerprint === 'Matthew') invisibleSeparators = '\u2063\u2063\u2063'
    
    setText(cleanText + invisibleSeparators)
    setMessage(`Fingerprint changed to ${fingerprint}! You can now copy the text below.`)
  }

  const copyText = () => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setMessage("Text copied to clipboard!")
        setTimeout(() => setMessage(null), 3000)
      })
      .catch(err => {
        console.error('Failed to copy text: ', err)
        setMessage("Failed to copy text. Please try selecting and copying manually.")
      })
  }

  // Get other fingerprint options for the dropdown
  const getOtherFingerprints = () => {
    if (!result?.trackerType) return ['James', 'Luke', 'Matthew']
    return ['James', 'Luke', 'Matthew'].filter(fp => fp !== result.trackerType)
  }

  return (
    <div className="container">
      <a 
        href="#" 
        className="title-link"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = window.location.pathname; // Refreshes the current page without changing the path
        }}
      >
        <h1 className="title" title="Putting the sass back in SaaS">✋ DocBlock</h1>
      </a>
      <h2 className="subtitle">Check if your DocSend documents have embedded trackers. Copy and paste your text below.</h2>
      
      <textarea 
        className="textbox" 
        value={text} 
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your document text here..."
      />
      
      <button className="check-button" onClick={checkForTrackers}>
        Block the Doc!
      </button>
      
      {message && <div className="message">{message}</div>}
      
      {result && (
        <div className="result-section">
          {result.hasTracker ? (
            <>
              <p className="tracker-found">
                Tracker detected: <strong>{result.trackerType}</strong> fingerprint found!
              </p>
              <div className="action-buttons">
                <button onClick={removeFingerprint}>
                  Remove Fingerprint
                </button>
                
                <select 
                  className="frame-dropdown"
                  onChange={(e) => frameSomeoneElse(e.target.value as 'James' | 'Luke' | 'Matthew')}
                  defaultValue=""
                >
                  <option value="" disabled>Frame Someone Else</option>
                  {getOtherFingerprints().map(fp => (
                    <option key={fp} value={fp}>{fp}</option>
                  ))}
                </select>
                
                <button onClick={copyText} className="copy-button">
                  📋 Copy Text
                </button>
              </div>
            </>
          ) : (
            <p className="no-tracker">No document trackers found!</p>
          )}
        </div>
      )}
    </div>
  )
}

export default App
