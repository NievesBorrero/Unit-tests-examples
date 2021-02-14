import { danger, fail, markdown, message, warn } from 'danger'

const fs = require('fs')
const path = require('path')

const istanbulCoverage = require('danger-plugin-istanbul-coverage')
  .istanbulCoverage
const jiraIssue = require('danger-plugin-jira-issue').default

const getEslintMarkdown = (eslintOutput, files) => {
  let eslintMarkdown =
    '## Eslint Issues:\n<details>\n  <summary>Issues</summary>\n\n'
  let warnings = false

  eslintOutput.map((record) => {
    const file = path.parse(record.filePath).base

    if (files.includes(file)) {
      if (record.messages.length > 0) {
        warnings = true
        eslintMarkdown = eslintMarkdown.concat('  ').concat(file).concat('\n')
        record.messages.map((error) => {
          eslintMarkdown = eslintMarkdown.concat(
            `  * ${error.ruleId} - ${error.message} Line ${error.line} \n`
          )
        })
      }
      eslintMarkdown = eslintMarkdown.concat('\n')
    }
  })

  eslintMarkdown = eslintMarkdown.concat('</details>')

  if (warnings) {
    return eslintMarkdown
  } else {
    return ''
  }
}

const existsChangelog = fs.existsSync('CHANGELOG.md')

if (!existsChangelog) {
  fail(
    'Create a changelog file following the instructions of [KeepaChangelog](https://keepachangelog.com/en/1.0.0/)'
  )
} else {
  const hasChangelogModified = danger.git.modified_files.includes(
    'CHANGELOG.md'
  )

  if (!hasChangelogModified) {
    fail(
      'Please add a changelog entry for your changes and follow the instructions of [KeepaChangelog](https://keepachangelog.com/en/1.0.0/)'
    )
  }
}

// Checking tests

let areThereNewTest = false

danger.git.modified_files.map((file) => {
  if (file.includes('spec') || file.includes('test')) {
    areThereNewTest = true
  }
})

danger.git.created_files.map((file) => {
  if (file.includes('spec') || file.includes('test')) {
    areThereNewTest = true
  }
})

if (!areThereNewTest) {
  warn('Create some tests :rocket:')
}

if (fs.existsSync('coverage/coverage-summary.json')) {
  istanbulCoverage({
    customSuccessMessage: 'Congrats, coverage is good',
    customFailureMessage: 'Coverage is a little low, take a look',
    coveragePath: 'coverage/coverage-summary.json',
    reportFileSet: 'createdOrModified',
    reportMode: 'warn'
  })
}

jiraIssue({
  key: '[PROJECT-JIRA-CODE]',
  url: 'https://wealize.atlassian.net/browse',
  emoji: ':paperclip:',
  location: 'title'
})

if (fs.existsSync('eslint.json')) {
  const eslintOutput = JSON.parse(fs.readFileSync('eslint.json', 'utf8'))

  if (
    danger.git.modified_files.length > 0 ||
    danger.git.created_files.length > 0
  ) {
    const modifiedFiles = danger.git.modified_files.map((pathname) => {
      return path.parse(pathname).base
    })

    const newFiles = danger.git.created_files.map((pathname) => {
      return path.parse(pathname).base
    })

    const files = newFiles.concat(modifiedFiles)

    const messageToSend = getEslintMarkdown(eslintOutput, files)

    if (messageToSend !== '') {
      markdown(messageToSend)
    } else {
      message("There aren't eslint errors in your code :rocket:")
    }
  }
}
