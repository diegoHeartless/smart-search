import { connect } from "react-redux";
import bindActionCreators from "react-redux/es/utils/bindActionCreators";
import {searchStart} from "../actions/search";
import SearchField from "../components/search";
import {SearchState} from "../reducers/search";

function mapStateToProps(state: {searchReducer: SearchState}, ownProps: any) {
    return {
        content: state.searchReducer.content,
        loading: state.searchReducer.loading,
        statistics: state.searchReducer.statistics
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(
        {
            searchStart
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchField);