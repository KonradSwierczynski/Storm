import React from "react";
import { withRouter } from "react-router";


var MatchItem = React.createClass({
    render() {
        return <td>{this.props.item}</td>
    }
});


var MatchRow = React.createClass({
    render() {
        var key = this.props.mkey;
        var match = this.props.match;
        var items = [];
        for (var i = 0; i < match.length; i++)
            items.push(<MatchItem key={"m"+i+","+key} item={match[i]}/>);
        return <tr>{items}</tr>;
    }
});


class MatchesList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        var matches = this.props.matches;
        if (matches === null)
            return null;
        var rows = [];
        var header = null;
        if (matches.length === 0)
            return <span><br />We have no matches records at the moment :(</span>;
        var titleRow = ["First team", "Second team", "Stadium", "City", "Date"];
        rows.push(<MatchRow key={"matchTitleRow"} match={titleRow} mkey={-1} />);
        for (var i = 0; i < matches.length; i++)
            rows.push(<MatchRow key={"m"+i} match={matches[i]} mkey={i} />);
        return (
            <div>
                <table>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default withRouter(MatchesList);
