// Advanced ATS Resume Analyzer
export function analyzeCV(cvText, jobDescription) {
  const cvLower = cvText.toLowerCase()
  const jobLower = jobDescription.toLowerCase()

  // Extract keywords from job description
  const jobKeywords = extractKeywords(jobDescription)
  const cvKeywords = extractKeywords(cvText)

  // Find matched and missing keywords
  const matchedKeywords = jobKeywords.filter((keyword) =>
    cvLower.includes(keyword.toLowerCase())
  )
  const missingKeywords = jobKeywords.filter(
    (keyword) => !cvLower.includes(keyword.toLowerCase())
  )

  // Calculate keyword match percentage
  const keywordMatchPercentage =
    jobKeywords.length > 0
      ? Math.round((matchedKeywords.length / jobKeywords.length) * 100)
      : 0

  // Extract skills
  const jobSkills = extractSkills(jobDescription)
  const cvSkills = extractSkills(cvText)
  const matchedSkills = jobSkills.filter((skill) =>
    cvSkills.some(
      (cvSkill) => cvSkill.toLowerCase() === skill.toLowerCase()
    )
  )
  const missingSkills = jobSkills.filter(
    (skill) =>
      !cvSkills.some(
        (cvSkill) => cvSkill.toLowerCase() === skill.toLowerCase()
      )
  )
  const skillMatchPercentage =
    jobSkills.length > 0
      ? Math.round((matchedSkills.length / jobSkills.length) * 100)
      : 0

  // Check for required sections
  const sections = {
    contact: checkContactInfo(cvText),
    summary: /(summary|objective|profile|about|overview)/i.test(cvText),
    experience: /(experience|work history|employment|professional experience|work experience)/i.test(
      cvText
    ),
    education: /(education|academic|degree|university|college|bachelor|master|phd)/i.test(
      cvText
    ),
    skills: /(skills|technical skills|competencies|qualifications|abilities)/i.test(
      cvText
    ),
  }

  const sectionCount = Object.values(sections).filter(Boolean).length

  // Check for action verbs
  const actionVerbs = [
    'achieved',
    'managed',
    'developed',
    'implemented',
    'created',
    'led',
    'improved',
    'designed',
    'executed',
    'coordinated',
    'analyzed',
    'optimized',
    'increased',
    'reduced',
    'established',
    'built',
    'delivered',
    'transformed',
    'launched',
    'initiated',
    'supervised',
    'mentored',
    'collaborated',
    'streamlined',
    'enhanced',
  ]

  const foundVerbs = actionVerbs.filter((verb) => cvLower.includes(verb))
  const verbScore = Math.min(100, (foundVerbs.length / 10) * 100)

  // Check for quantifiable achievements
  const hasNumbers = /\d+/.test(cvText)
  const numberMatches = cvText.match(/\d+/g) || []
  const quantifiableScore = numberMatches.length >= 3 ? 100 : numberMatches.length * 33

  // Check experience level match
  const experienceMatch = checkExperienceLevel(cvText, jobDescription)

  // Check education requirements
  const educationMatch = checkEducationMatch(cvText, jobDescription)

  // Calculate overall score
  let score = 0
  score += keywordMatchPercentage * 0.3 // 30% weight
  score += skillMatchPercentage * 0.25 // 25% weight
  score += (sectionCount / 6) * 100 * 0.15 // 15% weight
  score += verbScore * 0.1 // 10% weight
  score += quantifiableScore * 0.1 // 10% weight
  score += experienceMatch * 0.05 // 5% weight
  score += educationMatch * 0.05 // 5% weight

  score = Math.round(Math.max(0, Math.min(100, score)))

  // Generate feedback
  const strengths = []
  const issues = []
  const suggestions = []

  // Keyword feedback
  if (keywordMatchPercentage >= 70) {
    strengths.push(
      `Excellent keyword match: ${matchedKeywords.length} out of ${jobKeywords.length} keywords found (${keywordMatchPercentage}%)`
    )
  } else if (keywordMatchPercentage >= 50) {
    suggestions.push(
      `Good keyword match (${keywordMatchPercentage}%), but could be improved. Consider adding more relevant keywords from the job description.`
    )
  } else {
    issues.push(
      `Low keyword match: Only ${matchedKeywords.length} out of ${jobKeywords.length} keywords found (${keywordMatchPercentage}%). This significantly reduces ATS compatibility.`
    )
  }

  // Skills feedback
  if (skillMatchPercentage >= 70) {
    strengths.push(
      `Strong skills alignment: ${matchedSkills.length} out of ${jobSkills.length} required skills found (${skillMatchPercentage}%)`
    )
  } else if (skillMatchPercentage >= 50) {
    suggestions.push(
      `Moderate skills match (${skillMatchPercentage}%). Consider highlighting more relevant skills from the job description.`
    )
  } else if (jobSkills.length > 0) {
    issues.push(
      `Missing key skills: Only ${matchedSkills.length} out of ${jobSkills.length} required skills found (${skillMatchPercentage}%).`
    )
  }

  // Section feedback
  if (sectionCount >= 5) {
    strengths.push('Well-structured CV with all essential sections')
  } else if (sectionCount >= 3) {
    suggestions.push(
      `CV structure is good but could include more sections (currently ${sectionCount} out of 6 key sections)`
    )
  } else {
    issues.push(
      `CV is missing important sections. Only ${sectionCount} out of 6 key sections found.`
    )
  }

  if (!sections.contact) {
    issues.push('Missing contact information (email, phone)')
  }

  if (!sections.summary) {
    suggestions.push('Add a professional summary or objective at the top of your CV')
  }

  // Action verbs feedback
  if (foundVerbs.length >= 8) {
    strengths.push(`Strong use of action verbs (${foundVerbs.length} found)`)
  } else if (foundVerbs.length >= 5) {
    suggestions.push(
      `Good use of action verbs, but could use more (${foundVerbs.length} found)`
    )
  } else {
    suggestions.push(
      'Use more action verbs to describe your accomplishments (e.g., "achieved", "managed", "developed")'
    )
  }

  // Quantifiable achievements feedback
  if (numberMatches.length >= 5) {
    strengths.push('Excellent use of quantifiable achievements and metrics')
  } else if (numberMatches.length >= 3) {
    suggestions.push('Add more numbers and metrics to quantify your achievements')
  } else {
    issues.push(
      'Missing quantifiable achievements. Add specific numbers, percentages, or metrics to demonstrate impact.'
    )
  }

  // Missing keywords suggestions
  if (missingKeywords.length > 0 && missingKeywords.length <= 10) {
    suggestions.push(
      `Consider adding these keywords: ${missingKeywords.slice(0, 5).join(', ')}${missingKeywords.length > 5 ? '...' : ''}`
    )
  }

  // Missing skills suggestions
  if (missingSkills.length > 0 && missingSkills.length <= 8) {
    issues.push(
      `Missing important skills: ${missingSkills.slice(0, 5).join(', ')}${missingSkills.length > 5 ? '...' : ''}`
    )
  }

  // Length check
  const wordCount = cvText.split(/\s+/).filter(Boolean).length
  if (wordCount < 200) {
    issues.push('CV is too short (less than 200 words). Add more detail about your experience and achievements.')
  } else if (wordCount > 1000) {
    suggestions.push('CV may be too long (over 1000 words). Consider condensing while keeping key information.')
  } else {
    strengths.push(`Appropriate CV length (${wordCount} words)`)
  }

  // Experience level feedback
  if (experienceMatch >= 80) {
    strengths.push('Experience level appears to match job requirements')
  } else if (experienceMatch < 50) {
    issues.push('Experience level may not match job requirements. Review years of experience mentioned.')
  }

  // Education feedback
  if (educationMatch >= 80) {
    strengths.push('Education requirements appear to be met')
  } else if (educationMatch < 50) {
    suggestions.push('Review education requirements in the job description and ensure they are clearly stated in your CV')
  }

  // Generate improvement roadmap to reach 100%
  const improvementRoadmap = generateImprovementRoadmap({
    score,
    keywordMatchPercentage,
    skillMatchPercentage,
    missingKeywords,
    missingSkills,
    sections,
    foundVerbs,
    numberMatches,
    wordCount,
    experienceMatch,
    educationMatch,
    jobDescription,
  })

  return {
    score,
    keywordMatch: {
      total: jobKeywords.length,
      matched: matchedKeywords.length,
      missing: missingKeywords.length,
      percentage: keywordMatchPercentage,
      matchedKeywords: matchedKeywords.slice(0, 30),
      missingKeywords: missingKeywords.slice(0, 20),
    },
    skillMatch: {
      total: jobSkills.length,
      matched: matchedSkills.length,
      missing: missingSkills.length,
      percentage: skillMatchPercentage,
      matchedSkills: matchedSkills.slice(0, 20),
      missingSkills: missingSkills.slice(0, 15),
    },
    sections,
    strengths,
    issues,
    suggestions,
    improvementRoadmap,
    stats: {
      wordCount,
      actionVerbs: foundVerbs.length,
      quantifiableMetrics: numberMatches.length,
      experienceMatch,
      educationMatch,
    },
  }
}

function generateImprovementRoadmap({
  score,
  keywordMatchPercentage,
  skillMatchPercentage,
  missingKeywords,
  missingSkills,
  sections,
  foundVerbs,
  numberMatches,
  wordCount,
  experienceMatch,
  educationMatch,
  jobDescription,
}) {
  const roadmap = {
    priorityActions: [],
    keywordsToAdd: [],
    phrasesToAdd: [],
    skillsToAdd: [],
    sectionsToAdd: [],
    actionVerbsToUse: [],
    quantifiableExamples: [],
    estimatedScore: score,
  }

  // Priority 1: Add missing keywords (30% weight)
  if (keywordMatchPercentage < 100) {
    const topMissingKeywords = missingKeywords.slice(0, 15)
    roadmap.keywordsToAdd = topMissingKeywords
    roadmap.priorityActions.push({
      priority: 1,
      category: 'Keywords',
      action: `Add ${topMissingKeywords.length} missing keywords from job description`,
      impact: `Will increase score by approximately ${Math.round((topMissingKeywords.length / missingKeywords.length) * 30)} points`,
      keywords: topMissingKeywords,
    })
  }

  // Priority 2: Add missing skills (25% weight)
  if (skillMatchPercentage < 100 && missingSkills.length > 0) {
    roadmap.skillsToAdd = missingSkills.slice(0, 10)
    roadmap.priorityActions.push({
      priority: 2,
      category: 'Skills',
      action: `Add ${missingSkills.length} missing skills from job requirements`,
      impact: `Will increase score by approximately ${Math.round((missingSkills.length / (missingSkills.length + (skillMatchPercentage / 100) * missingSkills.length)) * 25)} points`,
      skills: missingSkills.slice(0, 10),
    })
  }

  // Priority 3: Add missing sections (15% weight)
  const missingSections = []
  if (!sections.contact) missingSections.push('Contact Information (email, phone)')
  if (!sections.summary) missingSections.push('Professional Summary or Objective')
  if (!sections.experience) missingSections.push('Work Experience')
  if (!sections.education) missingSections.push('Education')
  if (!sections.skills) missingSections.push('Skills Section')

  if (missingSections.length > 0) {
    roadmap.sectionsToAdd = missingSections
    roadmap.priorityActions.push({
      priority: 3,
      category: 'Structure',
      action: `Add ${missingSections.length} missing CV sections`,
      impact: `Will increase score by approximately ${Math.round((missingSections.length / 6) * 15)} points`,
      sections: missingSections,
    })
  }

  // Priority 4: Add action verbs (10% weight)
  const recommendedVerbs = [
    'achieved', 'managed', 'developed', 'implemented', 'created', 'led',
    'improved', 'designed', 'executed', 'coordinated', 'analyzed', 'optimized',
    'increased', 'reduced', 'established', 'built', 'delivered', 'transformed',
    'launched', 'initiated', 'supervised', 'mentored', 'collaborated',
    'streamlined', 'enhanced', 'generated', 'secured', 'expanded', 'innovated',
  ]
  const verbsToAdd = recommendedVerbs.filter(v => !foundVerbs.includes(v)).slice(0, 10)
  
  if (verbsToAdd.length > 0) {
    roadmap.actionVerbsToUse = verbsToAdd
    roadmap.priorityActions.push({
      priority: 4,
      category: 'Action Verbs',
      action: `Use more action verbs (currently ${foundVerbs.length}, aim for 10+)`,
      impact: `Will increase score by approximately ${Math.round((verbsToAdd.length / 10) * 10)} points`,
      verbs: verbsToAdd,
    })
  }

  // Priority 5: Add quantifiable metrics (10% weight)
  if (numberMatches.length < 5) {
    roadmap.quantifiableExamples = [
      'Increased sales by 25%',
      'Reduced costs by $50,000',
      'Managed team of 10 people',
      'Improved efficiency by 30%',
      'Generated $1M in revenue',
      'Completed 50+ projects',
      'Achieved 95% customer satisfaction',
      'Reduced processing time by 40%',
    ]
    roadmap.priorityActions.push({
      priority: 5,
      category: 'Quantifiable Achievements',
      action: `Add more numbers and metrics (currently ${numberMatches.length}, aim for 5+)`,
      impact: `Will increase score by approximately ${Math.round(((5 - numberMatches.length) / 5) * 10)} points`,
      examples: roadmap.quantifiableExamples,
    })
  }

  // Extract key phrases from job description
  const jobPhrases = extractKeyPhrases(jobDescription)
  roadmap.phrasesToAdd = jobPhrases.slice(0, 10)

  // Calculate estimated score if all improvements are made
  let estimatedScore = score
  if (keywordMatchPercentage < 100) {
    estimatedScore += Math.min(30, (missingKeywords.length / Math.max(1, missingKeywords.length + (keywordMatchPercentage / 100) * missingKeywords.length)) * 30)
  }
  if (skillMatchPercentage < 100 && missingSkills.length > 0) {
    estimatedScore += Math.min(25, (missingSkills.length / Math.max(1, missingSkills.length + (skillMatchPercentage / 100) * missingSkills.length)) * 25)
  }
  if (missingSections.length > 0) {
    estimatedScore += Math.min(15, (missingSections.length / 6) * 15)
  }
  if (foundVerbs.length < 10) {
    estimatedScore += Math.min(10, ((10 - foundVerbs.length) / 10) * 10)
  }
  if (numberMatches.length < 5) {
    estimatedScore += Math.min(10, ((5 - numberMatches.length) / 5) * 10)
  }
  
  roadmap.estimatedScore = Math.min(100, Math.round(estimatedScore))

  return roadmap
}

function extractKeyPhrases(jobDescription) {
  // Extract 2-4 word phrases that are commonly used in job descriptions
  const sentences = jobDescription.split(/[.!?]\s+/)
  const phrases = new Set()
  
  sentences.forEach(sentence => {
    const words = sentence.toLowerCase().match(/\b[a-z]{3,}\b/g) || []
    // Extract 2-word phrases
    for (let i = 0; i < words.length - 1; i++) {
      const phrase = `${words[i]} ${words[i + 1]}`
      if (phrase.length > 8 && phrase.length < 30) {
        phrases.add(phrase)
      }
    }
    // Extract 3-word phrases
    for (let i = 0; i < words.length - 2; i++) {
      const phrase = `${words[i]} ${words[i + 1]} ${words[i + 2]}`
      if (phrase.length > 12 && phrase.length < 40) {
        phrases.add(phrase)
      }
    }
  })
  
  // Filter out common phrases and return most relevant
  const commonPhrases = ['the company', 'the team', 'the role', 'the position', 'the candidate', 'will be', 'must have', 'should have']
  return Array.from(phrases)
    .filter(p => !commonPhrases.some(cp => p.includes(cp)))
    .slice(0, 15)
}

function extractKeywords(text) {
  // Remove common stop words and extract meaningful keywords
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
    'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
    'should', 'could', 'may', 'might', 'must', 'can', 'this', 'that',
    'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what',
    'which', 'who', 'whom', 'whose', 'where', 'when', 'why', 'how', 'all',
    'each', 'every', 'both', 'few', 'more', 'most', 'other', 'some', 'such',
    'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very',
    'just', 'now', 'then', 'here', 'there', 'about', 'above', 'below', 'up',
    'down', 'out', 'off', 'over', 'under', 'again', 'further', 'once',
  ])

  // Extract words (4+ characters, alphanumeric)
  const words = text
    .toLowerCase()
    .match(/\b[a-z]{4,}\b/g) || []

  // Count frequency
  const wordFreq = {}
  words.forEach((word) => {
    if (!stopWords.has(word)) {
      wordFreq[word] = (wordFreq[word] || 0) + 1
    }
  })

  // Get keywords that appear 2+ times or are technical terms
  const technicalTerms = [
    'javascript', 'python', 'java', 'react', 'angular', 'vue', 'node',
    'sql', 'database', 'api', 'aws', 'cloud', 'agile', 'scrum',
    'management', 'leadership', 'analytics', 'marketing', 'sales',
    'development', 'engineering', 'design', 'analysis', 'strategy',
    'project', 'team', 'customer', 'client', 'business', 'product',
    'service', 'software', 'system', 'application', 'platform',
    'experience', 'years', 'bachelor', 'master', 'degree', 'certification',
    'communication', 'collaboration', 'problem', 'solving', 'creative',
    'innovative', 'results', 'driven', 'performance', 'improvement',
  ]

  const keywords = Object.keys(wordFreq)
    .filter(
      (word) => wordFreq[word] >= 2 || technicalTerms.includes(word)
    )
    .sort((a, b) => wordFreq[b] - wordFreq[a])
    .slice(0, 50)

  return keywords
}

function extractSkills(text) {
  const skillPatterns = [
    // Technical skills
    /\b(javascript|python|java|react|angular|vue|node\.?js|typescript|html|css|sql|mongodb|postgresql|mysql|aws|azure|gcp|docker|kubernetes|git|github|gitlab)\b/gi,
    // Soft skills
    /\b(leadership|communication|teamwork|problem solving|analytical|creative|strategic|collaboration|management|negotiation)\b/gi,
    // Tools and platforms
    /\b(excel|word|powerpoint|outlook|salesforce|jira|confluence|slack|trello|asana)\b/gi,
    // Methodologies
    /\b(agile|scrum|kanban|waterfall|devops|ci\/cd|tdd|bdd)\b/gi,
  ]

  const skills = new Set()
  skillPatterns.forEach((pattern) => {
    const matches = text.match(pattern) || []
    matches.forEach((match) => {
      skills.add(match.toLowerCase().trim())
    })
  })

  // Also look for skills mentioned in lists or after colons
  const listPattern = /(?:skills?|technologies?|tools?|proficiencies?)[:\s]+([^.\n]+)/gi
  let match
  while ((match = listPattern.exec(text)) !== null) {
    const skillList = match[1]
      .split(/[,;•\-\n]/)
      .map((s) => s.trim().toLowerCase())
      .filter((s) => s.length > 2)
    skillList.forEach((skill) => skills.add(skill))
  }

  return Array.from(skills).slice(0, 50)
}

function checkContactInfo(text) {
  const hasEmail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(
    text
  )
  const hasPhone =
    /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(text) ||
    /\+\d{10,15}/.test(text)
  return hasEmail && hasPhone
}

function checkExperienceLevel(cvText, jobDescription) {
  // Look for years of experience in job description
  const jobYearsMatch = jobDescription.match(
    /(\d+)[\s-]*(?:years?|yrs?|year)[\s-]*(?:of|experience|exp)/i
  )
  if (!jobYearsMatch) return 75 // Default score if not specified

  const requiredYears = parseInt(jobYearsMatch[1])

  // Look for years of experience in CV
  const cvYearsMatches = cvText.match(
    /(\d+)[\s-]*(?:years?|yrs?|year)[\s-]*(?:of|experience|exp)/gi
  )

  if (!cvYearsMatches || cvYearsMatches.length === 0) return 50

  // Check if CV mentions at least the required years
  let maxCvYears = 0
  cvYearsMatches.forEach((match) => {
    const years = parseInt(match.match(/\d+/)[0])
    maxCvYears = Math.max(maxCvYears, years)
  })

  if (maxCvYears >= requiredYears) return 100
  if (maxCvYears >= requiredYears * 0.8) return 80
  if (maxCvYears >= requiredYears * 0.6) return 60
  return 40
}

function checkEducationMatch(cvText, jobDescription) {
  const educationKeywords = {
    bachelor: ['bachelor', "bachelor's", 'ba', 'bs', 'bsc', 'b.a.', 'b.s.'],
    master: ['master', "master's", 'ma', 'ms', 'msc', 'm.a.', 'm.s.', 'mba'],
    phd: ['phd', 'ph.d', 'doctorate', 'doctoral'],
    degree: ['degree', 'diploma', 'certification', 'certificate'],
  }

  const jobLower = jobDescription.toLowerCase()
  const cvLower = cvText.toLowerCase()

  let requiredLevel = null
  if (
    educationKeywords.phd.some((keyword) => jobLower.includes(keyword))
  ) {
    requiredLevel = 'phd'
  } else if (
    educationKeywords.master.some((keyword) => jobLower.includes(keyword))
  ) {
    requiredLevel = 'master'
  } else if (
    educationKeywords.bachelor.some((keyword) => jobLower.includes(keyword))
  ) {
    requiredLevel = 'bachelor'
  } else if (
    educationKeywords.degree.some((keyword) => jobLower.includes(keyword))
  ) {
    requiredLevel = 'degree'
  }

  if (!requiredLevel) return 75 // Default if not specified

  // Check if CV mentions the required education level
  if (requiredLevel === 'phd') {
    if (educationKeywords.phd.some((keyword) => cvLower.includes(keyword)))
      return 100
    if (
      educationKeywords.master.some((keyword) => cvLower.includes(keyword))
    )
      return 70
    return 40
  }

  if (requiredLevel === 'master') {
    if (
      educationKeywords.master.some((keyword) => cvLower.includes(keyword))
    )
      return 100
    if (
      educationKeywords.bachelor.some((keyword) => cvLower.includes(keyword))
    )
      return 60
    return 30
  }

  if (requiredLevel === 'bachelor') {
    if (
      educationKeywords.bachelor.some((keyword) => cvLower.includes(keyword))
    )
      return 100
    if (
      educationKeywords.master.some((keyword) => cvLower.includes(keyword))
    )
      return 100 // Master's is higher than bachelor's
    return 50
  }

  if (requiredLevel === 'degree') {
    if (
      educationKeywords.degree.some((keyword) => cvLower.includes(keyword))
    )
      return 100
    return 60
  }

  return 75
}
