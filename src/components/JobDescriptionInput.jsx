import React from 'react'
import './JobDescriptionInput.css'

function JobDescriptionInput({ jobDescription, onJobDescriptionChange }) {
  const wordCount = jobDescription.trim().split(/\s+/).filter(Boolean).length

  return (
    <div className="job-description-input">
      <div className="section-header">
        <h2>💼 Job Description</h2>
        {wordCount > 0 && (
          <span className="word-count">{wordCount} words</span>
        )}
      </div>

      <div className="input-wrapper">
        <textarea
          value={jobDescription}
          onChange={(e) => onJobDescriptionChange(e.target.value)}
          placeholder="Paste the job description here...&#10;&#10;Include:&#10;• Job title and requirements&#10;• Required skills and qualifications&#10;• Experience level needed&#10;• Education requirements&#10;• Key responsibilities"
          className="job-textarea"
          rows="15"
        />
      </div>

      <div className="tips">
        <h3>💡 Tips for best results:</h3>
        <ul>
          <li>Copy the complete job description</li>
          <li>Include all requirements and qualifications</li>
          <li>Make sure both CV and job description are complete</li>
        </ul>
      </div>
    </div>
  )
}

export default JobDescriptionInput


