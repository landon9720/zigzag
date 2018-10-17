import _ from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch, HashRouter, Link } from 'react-router-dom'

import './reset'
import './styles'

const App = () => (
    <div>
        <Switch>
            <Route exact path="/" component={componentFor('index')} />
            <Route path="/:id" component={Page} />
        </Switch>
    </div>
)

const componentFor = id => {
    try {
        const h = require('./pages/' + id + '.md')
        return () => <div dangerouslySetInnerHTML={{ __html: h }} />
    } catch (e) {
        try {
            return require('./pages/' + id + '.jsx').default
        } catch (f) {
            return () => <div>404</div>
        }
    }
}

class Page extends React.Component {
    render() {
        const { match } = this.props
        const homeIconBlacklist = ['#helloworld']
        const PageComponent = componentFor(match.params.id)
        return (
            <div>
                <PageComponent />
                <p className="nav">
                    {!_(homeIconBlacklist).includes(window.location.hash) ? (
                        <span>🏠 <Link to="/helloworld">home</Link></span>
                    ) : null}
                </p>
            </div>
        )
    }
}

ReactDOM.render(
    <HashRouter hashType="noslash">
        <App />
    </HashRouter>,
    document.getElementById('root')
)