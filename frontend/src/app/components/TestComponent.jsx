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
                <button onClick={function() {
                    TestComponentActions.printNew("trololo");
                }}>Click Me</button>
                </div>
            </div>
        );
    }
}

export default TestComponent;
