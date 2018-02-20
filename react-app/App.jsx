import React from 'react';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            data: [1,2,3,4,5,6,7,8,9,0],
            myArray: [
                {
                    "key1": "value1",
                    "key2": "value2",
                    "key3": "value3",
                    "key4": "value4",
                    "key5": "value5"
                }, {
                    "key1": "value1",
                    "key2": "value2",
                    "key3": "value3",
                    "key4": "value4",
                    "key5": "value5"
                }, {
                    "key1": "value1",
                    "key2": "value2",
                    "key3": "value3",
                    "key4": "value4",
                    "key5": "value5"
                }, {
                    "key1": "value1",
                    "key2": "value2",
                    "key3": "value3",
                    "key4": "value4",
                    "key5": "value5"
                }
            ]
        }

        this.setStateHandler = this.setStateHandler.bind(this);
        this.buttonClicked = this.buttonClicked.bind(this);

    };

    buttonClicked(e) {
        console.log(e.target.value);
        console.log("this is test" + e.target.value);
        this.state.data.push(e.target.value);
        //   this.state.data.push(e.target.value);
    };
    setStateHandler() {
        var item = "setState..."
        var myArray = this.state.data.slice();
        console.log(this.state.data);
        myArray.push(item);
        this.setState({data: myArray})
    };
    render() {
        return (
            <div>
                <button onClick={this.buttonClicked} value="funfact">SET STATE12412412</button>
                <input type="text" value={this.state.data} onChange={this.buttonClicked}/>
                {this.state.data.map((person, i) => <Content myNumber={i} key={i} data={person} keys={i}/>)}
            </div>
        );
    }
}

class Content extends React.Component {
    constructor() {
        super();
        this.state = {
            data: ["key" : "world"]
        }
    }
    componentWillMount() {
        console.log(this.state.data);
        return (
            <div>
                <h3>{this.props.myNumber}</h3>
            </div>
        );
        console.log('Component WILL MOUNT!')
    }
    componentDidMount() {
        console.log('Component DID MOUNT!')
    }
    componentWillReceiveProps(newProps) {
        console.log('Component WILL RECIEVE PROPS!')
    }
    shouldComponentUpdate(newProps, newState) {
        return true;
    }
    componentWillUpdate(nextProps, nextState) {
        console.log('Component WILL UPDATE!');
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('Component DID UPDATE!')
    }
    componentWillUnmount() {
        console.log('Component WILL UNMOUNT!')
    }
    render() {

        return (
            <p>{this.props.data}</p>

    )
   }
}

class App1 extends React.Component {
    constructor() {
        super();
        this.state = {
            content: "Content from state...",
            fun: [
                {
                    "id": 1,
                    "name": "Foo",
                    "age": "20"
                }, {
                    "id": 2,
                    "name": "Bar",
                    "age": "30"
                }, {
                    "id": 3,
                    "name": "Baz",
                    "age": "40"
                }, {
                    "id": 4,
                    "name": "Baz",
                    "age": "40"
                }, {
                    "id": 5,
                    "name": "Baz",
                    "age": "40"
                }, {
                    "id": 6,
                    "name": "Baz",
                    "age": "40"
                }
            ],
            data: [
                {
                    "id": 1,
                    "name": "Fooasfasfasfsa",
                    "age": "20"
                }, {
                    "id": 2,
                    "name": "Basfsafar",
                    "age": "30"
                }, {
                    "id": 3,
                    "name": "Basfasfaz",
                    "age": "40"
                }, {
                    "id": 4,
                    "name": "Basfasfaz",
                    "age": "40"
                }, {
                    "id": 5,
                    "name": "asfasfBaz",
                    "age": "40"
                }, {
                    "id": 6,
                    "name": "asfasf",
                    "age": "40"
                }
            ]
        }
    }
    render() {
        return (
            <div>
                <Header/ > <table>
            <tbody>
                {this.state.fun.map((person, i) => <TableRow key={i} data={person} keys={i}/>)}
            </tbody>
        </table>
        {
            this.state.data.map((person, i) => <CustomDiv key={i} data={person} keys={i}/>)
        } < div > <h1>{this.props.header}</h1> < h2 > {
            this.state.content
        } < /h2>
                </div > <Footer/> < /div>
        );
    }
}
class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>gsdgs</h1 > </div>);
    }
}
class Footer extends React.Component {
    render() {
        return (
            <footer>This is footer</footer>
        );
    }
}
class TableRow extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.data.id}</td>
                <td>{this.props.data.name}</td>
                <td>{this.props.data.age}</td>
            </tr>
        );
    }
}
class CustomDiv extends React.Component {
    render() {
        return (
            <div>
                <div>123{this.props.data.id}</div>
                <div>13{this.props.data.name}</div>
                <div>13{this.props.data.age}</div>
            </div>
        );
    }
}
export default App;
