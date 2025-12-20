import React, { useState } from 'react'
import './AnalysisResults.css'

function AnalysisResults({ data }) {
  const [activeTab, setActiveTab] = useState('overview')

  const {
    score,
    keywordMatch,
    skillMatch,
    sections,
    strengths,
    issues,
    suggestions,
    improvementRoadmap,
    stats,
  } = data

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981'
    if (score >= 60) return '#f59e0b'
    return '#ef4444'
  }

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Needs Improvement'
    return 'Poor'
  }

  const getScoreDescription = (score) => {
    if (score >= 80)
      return 'Your CV is well-optimized for ATS systems. You have a strong chance of passing initial screening.'
    if (score >= 60)
      return 'Your CV is decent but could be improved. Consider addressing the issues below to increase your chances.'
    if (score >= 40)
      return 'Your CV needs significant improvements to pass ATS screening. Focus on the critical issues listed below.'
    return 'Your CV requires major revisions to be ATS-compatible. Address all issues before applying.'
  }

  return (
    <div className="results">
      <div className="score-card">
        <div className="score-circle-wrapper">
          <div
            className="score-circle"
            style={{
              borderColor: getScoreColor(score),
              background: `conic-gradient(${getScoreColor(score)} ${score * 3.6}deg, #f0f0f0 ${score * 3.6}deg)`,
            }}
          >
            <div className="score-inner">
              <div
                className="score-value"
                style={{ color: getScoreColor(score) }}
              >
                {score}
              </div>
              <div className="score-label">ATS Score</div>
            </div>
          </div>
        </div>
        <div className="score-info">
          <h2
            className="score-status"
            style={{ color: getScoreColor(score) }}
          >
            {getScoreLabel(score)}
          </h2>
          <p className="score-description">{getScoreDescription(score)}</p>
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button
          className={`tab ${activeTab === 'keywords' ? 'active' : ''}`}
          onClick={() => setActiveTab('keywords')}
        >
          🔑 Keywords ({keywordMatch.matched}/{keywordMatch.total})
        </button>
        <button
          className={`tab ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          💼 Skills ({skillMatch.matched}/{skillMatch.total})
        </button>
        <button
          className={`tab ${activeTab === 'feedback' ? 'active' : ''}`}
          onClick={() => setActiveTab('feedback')}
        >
          💡 Feedback
        </button>
        <button
          className={`tab ${activeTab === 'improve' ? 'active' : ''}`}
          onClick={() => setActiveTab('improve')}
        >
          🎯 Improve to 100%
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview">
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-label">Keyword Match</div>
                <div
                  className="metric-value"
                  style={{ color: getScoreColor(keywordMatch.percentage) }}
                >
                  {keywordMatch.percentage}%
                </div>
                <div className="metric-detail">
                  {keywordMatch.matched} of {keywordMatch.total} keywords
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-label">Skills Match</div>
                <div
                  className="metric-value"
                  style={{ color: getScoreColor(skillMatch.percentage) }}
                >
                  {skillMatch.percentage}%
                </div>
                <div className="metric-detail">
                  {skillMatch.matched} of {skillMatch.total} skills
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-label">CV Sections</div>
                <div
                  className="metric-value"
                  style={{
                    color: getScoreColor(
                      (Object.values(sections).filter(Boolean).length / 6) *
                        100
                    ),
                  }}
                >
                  {Object.values(sections).filter(Boolean).length}/6
                </div>
                <div className="metric-detail">Essential sections</div>
              </div>

              <div className="metric-card">
                <div className="metric-label">Action Verbs</div>
                <div
                  className="metric-value"
                  style={{
                    color: getScoreColor(
                      Math.min(100, (stats.actionVerbs / 10) * 100)
                    ),
                  }}
                >
                  {stats.actionVerbs}
                </div>
                <div className="metric-detail">Found in CV</div>
              </div>
            </div>

            <div className="quick-stats">
              <h3>Quick Stats</h3>
              <div className="stats-list">
                <div className="stat-item">
                  <span className="stat-label">Word Count:</span>
                  <span className="stat-value">{stats.wordCount}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Quantifiable Metrics:</span>
                  <span className="stat-value">{stats.quantifiableMetrics}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Experience Match:</span>
                  <span className="stat-value">{stats.experienceMatch}%</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Education Match:</span>
                  <span className="stat-value">{stats.educationMatch}%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'keywords' && (
          <div className="keywords-tab">
            <div className="match-section">
              <h3 className="section-title-success">
                ✅ Matched Keywords ({keywordMatch.matched})
              </h3>
              {keywordMatch.matchedKeywords.length > 0 ? (
                <div className="keyword-list">
                  {keywordMatch.matchedKeywords.map((keyword, idx) => (
                    <span key={idx} className="keyword-tag matched">
                      {keyword}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="empty-state">No keywords matched</p>
              )}
            </div>

            <div className="match-section">
              <h3 className="section-title-warning">
                ⚠️ Missing Keywords ({keywordMatch.missing})
              </h3>
              {keywordMatch.missingKeywords.length > 0 ? (
                <>
                  <p className="section-description">
                    These keywords from the job description are not found in
                    your CV. Consider adding them naturally where relevant.
                  </p>
                  <div className="keyword-list">
                    {keywordMatch.missingKeywords.map((keyword, idx) => (
                      <span key={idx} className="keyword-tag missing">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <p className="empty-state success">
                  Great! All important keywords are present in your CV.
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="skills-tab">
            <div className="match-section">
              <h3 className="section-title-success">
                ✅ Matched Skills ({skillMatch.matched})
              </h3>
              {skillMatch.matchedSkills.length > 0 ? (
                <div className="skill-list">
                  {skillMatch.matchedSkills.map((skill, idx) => (
                    <span key={idx} className="skill-tag matched">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="empty-state">No skills matched</p>
              )}
            </div>

            <div className="match-section">
              <h3 className="section-title-warning">
                ⚠️ Missing Skills ({skillMatch.missing})
              </h3>
              {skillMatch.missingSkills.length > 0 ? (
                <>
                  <p className="section-description">
                    These skills are mentioned in the job description but not
                    found in your CV. If you have these skills, make sure to
                    include them.
                  </p>
                  <div className="skill-list">
                    {skillMatch.missingSkills.map((skill, idx) => (
                      <span key={idx} className="skill-tag missing">
                        {skill}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <p className="empty-state success">
                  Excellent! All required skills are present in your CV.
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'feedback' && (
          <div className="feedback-tab">
            {strengths.length > 0 && (
              <div className="feedback-section">
                <h3 className="section-title-success">✅ Strengths</h3>
                <ul className="feedback-list">
                  {strengths.map((strength, idx) => (
                    <li key={idx}>{strength}</li>
                  ))}
                </ul>
              </div>
            )}

            {issues.length > 0 && (
              <div className="feedback-section">
                <h3 className="section-title-warning">⚠️ Critical Issues</h3>
                <ul className="feedback-list">
                  {issues.map((issue, idx) => (
                    <li key={idx}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}

            {suggestions.length > 0 && (
              <div className="feedback-section">
                <h3 className="section-title-info">💡 Suggestions</h3>
                <ul className="feedback-list">
                  {suggestions.map((suggestion, idx) => (
                    <li key={idx}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'improve' && improvementRoadmap && (
          <div className="improve-tab">
            <div className="improvement-header">
              <h2>🚀 Roadmap to 100% ATS Score</h2>
              <div className="score-projection">
                <span className="current-score">Current: {score}%</span>
                <span className="arrow">→</span>
                <span className="projected-score">Projected: {improvementRoadmap.estimatedScore}%</span>
              </div>
            </div>

            <div className="priority-actions">
              <h3>📋 Priority Actions (Ordered by Impact)</h3>
              {improvementRoadmap.priorityActions.map((action, idx) => (
                <div key={idx} className="priority-card">
                  <div className="priority-badge">Priority {action.priority}</div>
                  <h4>{action.category}: {action.action}</h4>
                  <p className="impact-text">{action.impact}</p>
                  {action.keywords && action.keywords.length > 0 && (
                    <div className="action-items">
                      <strong>Keywords to add:</strong>
                      <div className="items-list">
                        {action.keywords.map((kw, i) => (
                          <span key={i} className="item-tag">{kw}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {action.skills && action.skills.length > 0 && (
                    <div className="action-items">
                      <strong>Skills to add:</strong>
                      <div className="items-list">
                        {action.skills.map((sk, i) => (
                          <span key={i} className="item-tag skill">{sk}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {action.sections && action.sections.length > 0 && (
                    <div className="action-items">
                      <strong>Sections to add:</strong>
                      <ul className="sections-list">
                        {action.sections.map((sec, i) => (
                          <li key={i}>{sec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {action.verbs && action.verbs.length > 0 && (
                    <div className="action-items">
                      <strong>Action verbs to use:</strong>
                      <div className="items-list">
                        {action.verbs.map((v, i) => (
                          <span key={i} className="item-tag verb">{v}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {action.examples && action.examples.length > 0 && (
                    <div className="action-items">
                      <strong>Example phrases with metrics:</strong>
                      <ul className="examples-list">
                        {action.examples.map((ex, i) => (
                          <li key={i}>"{ex}"</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {improvementRoadmap.keywordsToAdd.length > 0 && (
              <div className="improvement-section">
                <h3>🔑 Top Keywords to Add</h3>
                <p className="section-description">
                  Add these keywords naturally throughout your CV, especially in your summary, experience descriptions, and skills section.
                </p>
                <div className="keyword-list">
                  {improvementRoadmap.keywordsToAdd.map((keyword, idx) => (
                    <span key={idx} className="keyword-tag missing">{keyword}</span>
                  ))}
                </div>
              </div>
            )}

            {improvementRoadmap.phrasesToAdd.length > 0 && (
              <div className="improvement-section">
                <h3>💬 Key Phrases from Job Description</h3>
                <p className="section-description">
                  Incorporate these phrases naturally into your CV to better match the job description language.
                </p>
                <div className="phrases-list">
                  {improvementRoadmap.phrasesToAdd.map((phrase, idx) => (
                    <div key={idx} className="phrase-item">"{phrase}"</div>
                  ))}
                </div>
              </div>
            )}

            {improvementRoadmap.skillsToAdd.length > 0 && (
              <div className="improvement-section">
                <h3>💼 Skills to Add</h3>
                <p className="section-description">
                  If you have these skills, make sure to include them in your skills section and mention them in your experience descriptions.
                </p>
                <div className="skill-list">
                  {improvementRoadmap.skillsToAdd.map((skill, idx) => (
                    <span key={idx} className="skill-tag missing">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {improvementRoadmap.actionVerbsToUse.length > 0 && (
              <div className="improvement-section">
                <h3>⚡ Action Verbs to Use</h3>
                <p className="section-description">
                  Start your bullet points with these powerful action verbs to make your achievements stand out.
                </p>
                <div className="items-list">
                  {improvementRoadmap.actionVerbsToUse.map((verb, idx) => (
                    <span key={idx} className="item-tag verb">{verb}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="improvement-tips">
              <h3>💡 Pro Tips to Maximize Your Score</h3>
              <ul className="tips-list">
                <li><strong>Add keywords naturally:</strong> Don't keyword stuff. Integrate keywords into your actual experience descriptions.</li>
                <li><strong>Use job description language:</strong> Mirror the terminology used in the job posting.</li>
                <li><strong>Quantify everything:</strong> Add numbers, percentages, dollar amounts, and timeframes to your achievements.</li>
                <li><strong>Start with action verbs:</strong> Begin each bullet point with a strong action verb.</li>
                <li><strong>Include all sections:</strong> Make sure you have Contact, Summary, Experience, Education, and Skills sections.</li>
                <li><strong>Match the format:</strong> Use standard section headings that ATS systems recognize.</li>
                <li><strong>Be specific:</strong> Use exact skill names and technologies mentioned in the job description.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AnalysisResults
