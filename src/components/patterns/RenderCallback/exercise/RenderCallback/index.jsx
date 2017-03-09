/*

Hint:
- Move the composed component into this file
- GitHubIssueSearch is a component, not a function. You should import ./GitHubIssueSearcher
  here and receive the arguments from GitHubIssueSearch using an arrow function

*/

import React from "react"
import GitHubIssueSearcher from "./GitHubIssueSearcher"
import ScrollNotifier from '../ScrollNotifier'

const RenderCallback = () => (
  <GitHubIssueSearcher>
    {(issues, fetchNextPage, isFetching) => (
      <ScrollNotifier
        style={{ height: 400 }}
        onScrollAtTheBottom={ fetchNextPage }
      >
        <ul className="issue-list">
          {issues.map(item => (
            <li key={item.id}>
              <a href={item.html_url} target="_blank">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </a>
            </li>
          ))}
          {!isFetching ? null : <li className="text-center" key="loading">
              <h2><i className="fa fa-cog fa-spin fa-3x fa-fw margin-bottom"></i></h2>
            </li>
          }
        </ul>
      </ScrollNotifier>
    )}
  </GitHubIssueSearcher>
)

export default RenderCallback
