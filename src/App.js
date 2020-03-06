import React, { lazy, Suspense } from 'react';
import { HashRouter,BrowserRouter,Route, Switch ,Link, Router } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import "./App.css";

const Home = lazy(() => import('./components/Home'));
const List = lazy(() => import('./components/List'));
const Hook = lazy(() => import("./components/Hook"));
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key:null
        }
    }
    handleClick = ({ item, key, keyPath, domEvent }) => {
        this.setState({
            key:key
        });
        console.log(key)
    }
    renderComponents = () => {
        var component = null;
        switch (this.state.key) {
            case "home":
                component = <Home />
                break;
            case "list":
                component = <List />
                break;
            default:
                break;
        }
        return component;
    }
    componentDidMount(){
        console.log(this.props);
    }
    render() {
        return(
            <div>
                <div className="deader"></div>
                <div className="content">
                    <BrowserRouter>
                        <div className="left">
                            <Menu onClick={this.handleClick} style={{ width: 256 }} defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline">
                                <Menu.Item key="home"><Link to="/home">Home</Link></Menu.Item>
                                <Menu.Item key="list"><Link to="/list">List</Link></Menu.Item>
                                <Menu.Item key="hook"><Link to="/hook">Hook</Link></Menu.Item>
                            </Menu>
                        </div>
                        <div className="right">
                            {/* <Suspense fallback={<Loading />}>
                                {this.renderComponents()}
                            </Suspense> */}
                            <Suspense fallback={<Loading />}>
                                <Switch>
                                    <Route path="/home" exact component={props => <Home {...props} />} />
                                    <Route path="/list" exact component={props => <List {...props} />} />
                                    <Route path="/hook" exact component={props => <Hook {...props} />} />
                                </Switch>
                            </Suspense>
                        </div>
                    </BrowserRouter>
                </div>
            </div>
        )
    }
}

function Loading() {
    return <div>Loading...</div>
}

export default App;