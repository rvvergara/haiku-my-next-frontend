import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../../components/clinic/clinic.scss';

class Practitioners extends Component {
    render() {
        return (
            <div>
                Practitioners
            </div>
        )
    }
}

function mapStateToProps(state) {

}

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Practitioners)