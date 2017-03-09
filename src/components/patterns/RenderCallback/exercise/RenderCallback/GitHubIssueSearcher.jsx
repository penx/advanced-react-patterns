/*

Hint: You must move the logic from the Higher-Order Component here.
Where is the logic in withGitHubIssueSearch or in GitHubIssueSearchInfiniteScroller?

Steps:
1. Copy the logic from the HoC into this file
2. The Render Callback is a component and the HoC is a function. Once you copy
   the logic from the HoC here you will have to remove the main function
3. Refactor the return of the render method of the HoC code in this file to
   "execute" the children and pass the right arguments

*/

import React from 'react'
import searchGitHubIssues from '../utils/searchGitHubIssues'
import { GITHUB_ISSUES_API_URL } from '../utils/config'

class GitHubIssueSearcher extends React.Component {
  constructor() {
    super()
    this.state = {
      isFetching: false,
      issues: [],
      links: {}
    }
  }

  componentDidMount() {
    const {
      query = 'react',
      label = 'bug',
      language = 'javascript',
      state = 'open',
      sort = 'sort',
      order = 'asc'
    } = this.props

    this.fetch(`${GITHUB_ISSUES_API_URL}?q=${query}+label:${label}+language:${language}+state:${state}&sort=${sort}&order=${order}`)
  }

  fetchNextPage = () => {
    this.fetch(this.state.links.next)
  }

  fetch = (url) => {
    this.setState({ isFetching: true })
    searchGitHubIssues(url, (issues, links) => {
      this.setState({
        isFetching: false,
        issues: [...this.state.issues, ...issues],
        links
      })
    })
  }

  render() {
    const fetchNextPage = !this.state.isFetching && this.state.links.next ?
      this.fetchNextPage :
      null
    const { issues, isFetching } = this.state
    return this.props.children(issues, fetchNextPage, isFetching)
  }
}

export default GitHubIssueSearcher
