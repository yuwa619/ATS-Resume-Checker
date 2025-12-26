import React, { useState, useRef } from 'react'
import './CVUploader.css'

function CVUploader({ cvText, onCVChange }) {
  const [file, setFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)
  const textareaRef = useRef(null)

  const handleFileChange = (selectedFile) => {
    if (!selectedFile) return

    const validTypes = [
      'text/plain',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    const validExtensions = ['.txt', '.pdf', '.docx']

    const fileExtension = selectedFile.name
      .substring(selectedFile.name.lastIndexOf('.'))
      .toLowerCase()

    if (
      !validTypes.includes(selectedFile.type) &&
      !validExtensions.includes(fileExtension)
    ) {
      alert('Please upload a .txt, .pdf, or .docx file')
      return
    }

    setFile(selectedFile)

    // Read text files directly
    if (selectedFile.type === 'text/plain' || fileExtension === '.txt') {
      const reader = new FileReader()
      reader.onload = (e) => {
        onCVChange(e.target.result)
      }
      reader.onerror = () => {
        alert('Error reading file. Please try again or paste the text manually.')
      }
      reader.readAsText(selectedFile)
    } else {
      // For PDF and DOCX, prompt user to paste text
      alert(
        'For PDF and DOCX files, please copy the text from your document and paste it below, or convert to .txt format.'
      )
    }
  }

  const handleInputChange = (e) => {
    handleFileChange(e.target.files[0])
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      handleFileChange(droppedFile)
    }
  }

  const handleTextChange = (e) => {
    onCVChange(e.target.value)
  }

  const handleClear = () => {
    setFile(null)
    onCVChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    if (textareaRef.current) {
      textareaRef.current.value = ''
    }
  }

  const wordCount = cvText.trim().split(/\s+/).filter(Boolean).length

  return (
    <div className="cv-uploader">
      <div className="section-header">
        <h2>📄 Your CV / Resume</h2>
        {file && (
          <button onClick={handleClear} className="clear-btn">
            Clear
          </button>
        )}
      </div>

      <div
        className={`upload-zone ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.pdf,.docx"
          onChange={handleInputChange}
          className="file-input"
        />
        <div className="upload-content">
          <svg
            width="56"
            height="56"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          <p className="upload-text">
            {file ? file.name : 'Click to upload or drag & drop'}
          </p>
          <p className="upload-hint">
            Supports .txt, .pdf, .docx files
          </p>
        </div>
      </div>

      {file && (
        <div className="file-info">
          <span className="file-icon">📎</span>
          <span className="file-name">{file.name}</span>
          <span className="file-size">
            {(file.size / 1024).toFixed(1)} KB
          </span>
        </div>
      )}

      <div className="text-input-wrapper">
        <label className="input-label">
          Or paste your CV text here:
          {wordCount > 0 && (
            <span className="word-count">{wordCount} words</span>
          )}
        </label>
        <textarea
          ref={textareaRef}
          value={cvText}
          onChange={handleTextChange}
          placeholder="Paste your CV/resume text here...&#10;&#10;Include:&#10;• Contact information&#10;• Work experience&#10;• Education&#10;• Skills&#10;• Achievements"
          className="cv-textarea"
          rows="15"
        />
      </div>
    </div>
  )
}

export default CVUploader


