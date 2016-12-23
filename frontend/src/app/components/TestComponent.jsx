import React from 'react';
import TestComponentActions from "../actions/TestComponentActions.jsx";
import TestComponentStore from "../stores/TestComponentStore.jsx";

class TestComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = TestComponentStore.getState();
    }

    componentDidMount() {
        TestComponentStore.listen(this.onChange);
    }

    componentWillUnmount() {
        TestComponentStore.unlisten(this.onChange);
    }

    onChange = (newState) => {
        this.setState(newState);
    };

    render() {
        return (
            <div>
                <div>Hello {this.state.content}!</div>
                <div id="testButton">
                <button onClick={() => {
                    TestComponentActions.printNew("trololo");
                }}>Click Me</button>
                </div>
                <input type="text" id="textTest" defaultValue="Enter here..."/>
                <button onClick={() => {
                    TestComponentActions.createTable(
                        document.getElementById("textTest").value
                    )
                }}>Try Me</button>
            </div>
        );
    }
}

export default TestComponent;
