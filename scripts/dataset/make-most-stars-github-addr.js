/**
 * This script uses the search API provided by github to get top 100 Javascript-based open source project repository information with high star values.
 * - @see top100-stars-github-repo.json
 */
const path = require('path')
const axios = require('axios')
const { saveFile } = require('../util')

const resolvePath = (file) => path.resolve(__dirname, file)

axios
  .get('https://api.github.com/search/repositories?q=js+language:javascript&sort=stars&order=desc&page=3&per_page=100')
  .then((response) => {
    const data = response.data

    const repos = data.items.map(({ name, clone_url, stargazers_count }) => {
      return { name, clone_url, stargazers_count }
    })

    saveFile(resolvePath('./data/top-stars-github-repo.json'), JSON.stringify(repos, null, 2))
  })
  .catch((error) => {
    console.log(error)
  })
