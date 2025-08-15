#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const SECTION_TYPES = ['Pricing', 'FAQ', 'Process', 'CTA']
const ALLOWED_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js']

function findFiles(dir, extensions = ALLOWED_EXTENSIONS) {
  const files = []
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir)
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        traverse(fullPath)
      } else if (stat.isFile() && extensions.includes(path.extname(item))) {
        files.push(fullPath)
      }
    }
  }
  
  traverse(dir)
  return files
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const issues = []
  
  for (const sectionType of SECTION_TYPES) {
    const regex = new RegExp(`<${sectionType}[^>]*>`, 'g')
    const matches = content.match(regex)
    
    if (matches && matches.length > 1) {
      issues.push({
        type: sectionType,
        count: matches.length,
        file: path.relative(process.cwd(), filePath)
      })
    }
  }
  
  return issues
}

function main() {
  const projectRoot = process.cwd()
  const files = findFiles(projectRoot)
  let hasIssues = false
  
  console.log('🔍 Checking for duplicate sections...\n')
  
  for (const file of files) {
    const issues = checkFile(file)
    
    if (issues.length > 0) {
      hasIssues = true
      console.log(`❌ ${path.relative(projectRoot, file)}`)
      
      for (const issue of issues) {
        console.log(`   ${issue.type}: ${issue.count} instances (max 1 allowed)`)
      }
      console.log('')
    }
  }
  
  if (hasIssues) {
    console.log('❌ Lint failed: Duplicate sections found!')
    console.log('Each page should have only one instance of Pricing, FAQ, Process, and CTA sections.')
    process.exit(1)
  } else {
    console.log('✅ All files passed duplicate section check!')
  }
}

if (require.main === module) {
  main()
}

module.exports = { checkFile, findFiles }
