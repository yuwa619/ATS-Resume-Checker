import React, { useState } from 'react'
import CVUploader from './components/CVUploader'
import JobDescriptionInput from './components/JobDescriptionInput'
import AnalysisResults from './components/AnalysisResults'
import { analyzeCV } from './utils/atsAnalyzer'
import './App.css'

function App() {
  const [cvText, setCvText] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [analysisData, setAnalysisData] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState('')

  const handleCVChange = (text) => {
    setCvText(text)
    setAnalysisData(null)
    setError('')
  }

  const handleJobDescriptionChange = (text) => {
    setJobDescription(text)
    setAnalysisData(null)
    setError('')
  }

  const handleAnalyze = () => {
    if (!cvText.trim()) {
      setError('Please upload or paste your CV')
      return
    }

    if (!jobDescription.trim()) {
      setError('Please paste the job description')
      return
    }

    setError('')
    setIsAnalyzing(true)
    setAnalysisData(null)

    // Simulate analysis with a slight delay for better UX
    setTimeout(() => {
      try {
        const analysis = analyzeCV(cvText, jobDescription)
        setAnalysisData(analysis)
      } catch (err) {
        setError('An error occurred during analysis. Please try again.')
        console.error(err)
      } finally {
        setIsAnalyzing(false)
      }
    }, 1500)
  }

  const handleReset = () => {
    setCvText('')
    setJobDescription('')
    setAnalysisData(null)
    setError('')
  }

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>🎯 Perfect ATS Checker</h1>
          <p>Compare your CV with job descriptions and optimize for ATS systems</p>
        </header>

        {error && (
          <div className="error-banner">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <div className="input-section">
          <CVUploader 
            cvText={cvText}
            onCVChange={handleCVChange}
          />
          
          <JobDescriptionInput 
            jobDescription={jobDescription}
            onJobDescriptionChange={handleJobDescriptionChange}
          />
        </div>

        <div className="actions">
          <button 
            onClick={handleAnalyze} 
            className="analyze-btn"
            disabled={!cvText.trim() || !jobDescription.trim() || isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <span className="spinner-small"></span>
                Analyzing...
              </>
            ) : (
              <>
                <span>🔍</span>
                Analyze CV vs Job Description
              </>
            )}
          </button>

          {analysisData && (
            <button 
              onClick={handleReset} 
              className="reset-btn"
            >
              Reset
            </button>
          )}
        </div>

        {isAnalyzing && (
          <div className="loading-overlay">
            <div className="loading-content">
              <div className="spinner-large"></div>
              <p>Analyzing your CV against the job description...</p>
              <p className="loading-subtext">Checking keywords, skills, and requirements...</p>
            </div>
          </div>
        )}

        {analysisData && !isAnalyzing && (
          <AnalysisResults data={analysisData} />
        )}

        <footer className="footer">
          <p>Get your CV ATS-ready and increase your chances of landing interviews</p>
        </footer>
      </div>
    </div>
  )
}

export default App
