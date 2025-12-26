import React, { useState } from 'react'
import { analyzeResume } from '../utils/atsAnalyzer'
import './ResumeUploader.css'

function ResumeUploader({ onAnalysis, onAnalyzing }) {
  const [file, setFile] = useState(null)
  const [text, setText] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [error, setError] = useState('')

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      if (selectedFile.type !== 'text/plain' && 
          !selectedFile.name.endsWith('.txt') &&
          !selectedFile.name.endsWith('.docx') &&
          !selectedFile.name.endsWith('.pdf')) {
        setError('Please upload a .txt, .pdf, or .docx file')
        return
      }
      setFile(selectedFile)
      setError('')
      
      // Read text file
      if (selectedFile.type === 'text/plain' || selectedFile.name.endsWith('.txt')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setText(e.target.result)
        }
        reader.readAsText(selectedFile)
      } else {
        setError('Please paste your resume text below or convert to .txt format')
      }
    }
  }

  const handleTextChange = (e) => {
    setText(e.target.value)
    setError('')
  }

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value)
  }

  const handleAnalyze = () => {
    if (!text.trim()) {
      setError('Please upload a file or paste your resume text')
      return
    }

    setError('')
    onAnalyzing(true)
    
    // Simulate analysis delay for better UX
    setTimeout(() => {
      const analysis = analyzeResume(text, jobDescription)
      onAnalysis(analysis)
      onAnalyzing(false)
    }, 1500)
  }

  return (
    <div className="uploader">
      <div className="upload-section">
        <label className="upload-label">
          <input
            type="file"
            accept=".txt,.pdf,.docx"
            onChange={handleFileChange}
            className="file-input"
          />
          <div className="upload-box">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            <p>Upload Resume (.txt, .pdf, .docx)</p>
            <span className="upload-hint">or paste text below</span>
          </div>
        </label>
        {file && (
          <p className="file-name">Selected: {file.name}</p>
        )}
      </div>

      <div className="text-input-section">
        <label className="input-label">
          Resume Text
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Paste your resume text here or upload a file..."
            className="resume-textarea"
            rows="10"
          />
        </label>
      </div>

      <div className="text-input-section">
        <label className="input-label">
          Job Description (Optional)
          <textarea
            value={jobDescription}
            onChange={handleJobDescriptionChange}
            placeholder="Paste the job description to compare keywords..."
            className="resume-textarea"
            rows="6"
          />
        </label>
      </div>

      {error && <div className="error-message">{error}</div>}

      <button 
        onClick={handleAnalyze} 
        className="analyze-button"
        disabled={!text.trim()}
      >
        Analyze Resume
      </button>
    </div>
  )
}

export default ResumeUploader



