const axios = require('axios')
const { resolvePath, saveFile } = require('./util')

// top 100 github repo
axios
  .get('https://api.github.com/search/repositories?q=js+language:javascript&sort=stars&order=desc&page=1&per_page=100')
  .then((response) => {
    const data = response.data

    const repos = data.items.map(({ name, clone_url, stargazers_count }) => {
      return { name, clone_url, stargazers_count }
    })

    saveFile(resolvePath('./data/top100-stars-github-repo.json'), JSON.stringify(repos, null, 2))
  })
  .catch((error) => {
    console.log(error)
  })
