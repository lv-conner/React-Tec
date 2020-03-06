
import React from 'react'
import { Button } from "antd";
import { ThemeContext } from "./theme-context";
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const UserContext = React.createContext({ bgColor: "gg", frColor: "bb", text: "Hello" });
class Hook extends React.Component {
    render() {
        // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
        // 无论多深，任何组件都能读取这个值。
        // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
        return (
            <UserContext.Provider value={{name:"tim lv","sex":"man"}}>
                <Toolbar />
                <ThemeContext.Provider value={{ bgColor: "gg", frColor: "bb", text: "GG" }}>
                    <AnotherButton />
                </ThemeContext.Provider>
            </UserContext.Provider>

        );
    }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar(props) {
    return (
        <div>
            <ThemedButton />
        </div>
    );
}
class AnotherButton extends React.Component{
    static contextType = ThemeContext;
    render() {
        console.log(this.context);
        return(
            <div>
                <Button theme={this.context.bgColor} >{this.context.text}</Button>
            </div>
        )

    }
}
class ThemedButton extends React.Component {
    // 指定 contextType 读取当前的 theme context。
    // React 会往上找到最近的 theme Provider，然后使用它的值。
    // 在这个例子中，当前的 theme 值为 “dark”。
    static contextType = ThemeContext;
    render() {
        console.log("this",this);
        console.log("this context",this.context);
        return(
            <div>
                <Button theme={this.context.bgColor} >{this.context.text}</Button>
                <UserContext.Consumer>
                    {value =>  <div>user name is {value.name} and sex is {value.sex}</div>}
                </UserContext.Consumer>
            </div>
        )

    }
}


export default Hook;