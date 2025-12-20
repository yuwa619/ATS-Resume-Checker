# 🎯 Perfect ATS Resume Checker

A comprehensive web application that compares your CV/resume with job descriptions to optimize for Applicant Tracking Systems (ATS). Get detailed analysis, keyword matching, skills comparison, and actionable feedback to improve your resume's ATS compatibility.

## ✨ Features

### 🔍 **Comprehensive Analysis**
- **Keyword Matching**: Identifies matched and missing keywords from job descriptions
- **Skills Comparison**: Compares required skills with your CV skills
- **ATS Score**: Get a 0-100 compatibility score with detailed breakdown
- **Experience Level Matching**: Checks if your experience matches job requirements
- **Education Verification**: Validates education requirements

### 📊 **Detailed Feedback**
- **Strengths**: Highlights what's working well in your CV
- **Critical Issues**: Identifies problems that need immediate attention
- **Actionable Suggestions**: Provides specific recommendations for improvement
- **Match Percentages**: See exactly how well your CV matches the job description

### 🎨 **Professional UI**
- Modern, responsive design
- Tabbed interface for easy navigation
- Visual score indicators
- Color-coded feedback (green/yellow/red)
- Drag & drop file upload
- Real-time word count

### 📄 **File Support**
- Upload .txt, .pdf, or .docx files
- Paste text directly
- Drag & drop functionality

## 🚀 Getting Started

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start the development server:**
```bash
npm run dev
```

3. **Open your browser:**
Navigate to `http://localhost:5173` (or the URL shown in terminal)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📖 How to Use

1. **Upload Your CV**: 
   - Click to upload or drag & drop your CV file (.txt, .pdf, .docx)
   - Or paste your CV text directly into the text area

2. **Paste Job Description**:
   - Copy the complete job description from the job posting
   - Paste it into the job description field

3. **Analyze**:
   - Click "Analyze CV vs Job Description"
   - Wait for the analysis to complete (takes ~1-2 seconds)

4. **Review Results**:
   - **Overview Tab**: See overall score and key metrics
   - **Keywords Tab**: View matched and missing keywords
   - **Skills Tab**: Check skills alignment
   - **Feedback Tab**: Read detailed strengths, issues, and suggestions

5. **Improve Your CV**:
   - Address critical issues first
   - Add missing keywords naturally
   - Include missing skills if you have them
   - Follow the suggestions to optimize your CV

## 🎯 What Gets Analyzed

### Keyword Analysis
- Extracts important keywords from job description
- Identifies which keywords are present in your CV
- Highlights missing keywords that should be added
- Calculates keyword match percentage

### Skills Analysis
- Detects technical and soft skills in both CV and job description
- Matches required skills with your listed skills
- Identifies missing skills that may be required

### Structure Analysis
- Checks for essential sections (Contact, Summary, Experience, Education, Skills)
- Validates contact information (email, phone)
- Reviews CV length and formatting

### Content Quality
- Action verbs usage
- Quantifiable achievements (numbers, metrics, percentages)
- Experience level matching
- Education requirements matching

## 📊 Scoring System

The ATS score (0-100) is calculated based on:
- **30%** - Keyword match percentage
- **25%** - Skills match percentage
- **15%** - CV structure completeness
- **10%** - Action verbs usage
- **10%** - Quantifiable achievements
- **5%** - Experience level match
- **5%** - Education match

### Score Interpretation
- **80-100**: Excellent - Strong ATS compatibility
- **60-79**: Good - Decent but could be improved
- **40-59**: Needs Improvement - Significant gaps to address
- **0-39**: Poor - Major revisions needed

## 🛠️ Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Modern CSS** - Gradients, animations, responsive design

## 📝 Tips for Best Results

1. **Complete Information**: Include full job description with all requirements
2. **Accurate CV**: Paste your complete, up-to-date CV
3. **Natural Keywords**: Add missing keywords naturally, don't keyword stuff
4. **Skills Honesty**: Only include skills you actually have
5. **Quantify**: Use numbers, percentages, and metrics wherever possible
6. **Action Verbs**: Start bullet points with strong action verbs

## 🔄 Updates

### Version 2.0.0
- Complete rebuild with enhanced analysis
- Advanced keyword and skills matching
- Detailed feedback system
- Professional UI redesign
- Tabbed results interface
- Better scoring algorithm

## 📄 License

MIT

---

**Get your CV ATS-ready and increase your chances of landing interviews!** 🚀
