import React, { Component } from 'react';
import { connect } from 'react-redux';
import Shared from '../shared';
import { formatApplicants } from '../../utils/utils';
import {fetchApplicants, updateApplicant} from './applicantActions';

class Applied extends Component {
  render() {
    const {
      appliedPageData = {},
      fetchApplicants = () => {},
      updateApplicant = () => {},
      applicants = [],
      fetching = false,
    } = this.props;

    const {
      tableHeaders = [],
      tableHeadersMap = [],
      acceptActions = [],
      denyActions = [],
      stage = '',
    } = appliedPageData;

    return(
      <Shared.TablePage
        applicants={applicants}
        tableHeaders={tableHeaders}
        tableHeadersMap={tableHeadersMap}
        fetchApplicants={fetchApplicants}
        updateApplicant={updateApplicant}
        fetching={fetching}>
        <Shared.TableContainer
          acceptActions={acceptActions}
          denyActions={denyActions}
          stage={stage} />
      </Shared.TablePage>
    );
  }
}

const mapStateToProps = ({applicants, pageProfiles, fetching}) => {  
  const {
    applied,
  } = pageProfiles;

  return {
    fetching,
    appliedPageData: applied,
  };
};

export default connect(mapStateToProps, {fetchApplicants, updateApplicant})(Applied);
