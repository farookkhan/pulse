import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';

const makeActionButtons = (actions, stage, handleModalConfirm, handleModalClose) => {
    return actions.map((action) => {
      const {
        label = '',
        value = '',
        isPrimary = false,
        isSecondary = false,
        program = '',
      } = action;

      const onTouchHandlerToUse = label === 'Cancel' ? handleModalClose : handleModalConfirm;

      return (
        <FlatButton
          label={label}
          primary={isPrimary}
          secondary={isSecondary}
          onTouchTap={() => onTouchHandlerToUse(stage, value, program)}
        />
      );
    });
  };

const ConfirmDecision = (props) => {
  const {
    handleModalClose,
    handleModalConfirm,
    modalStatus,
    decision = '',
    selectedName,
    selectedApplicants = [],
    acceptActions = [],
    denyActions = [],
    infoActions = [],
    deferWithdrawActions = [],
    reminderActions = [],
    stage,
  } = props;

  let titleText;
  let modalActions;
  let bodyText;

  if (decision === 'accept') {
    modalActions = makeActionButtons(acceptActions, stage, handleModalConfirm, handleModalClose);
    if (stage === 'secondary') {
      titleText = `Confirm SECONDARY For:`;
    } else if (stage === 'final') {
      titleText = `Confirm ACCEPTANCE For:`;
    }
  } else if (decision === 'info') {
    modalActions = makeActionButtons(infoActions, stage, handleModalConfirm, handleModalClose);
    titleText = 'Send INFO email?';
  } else if (decision === 'defer-withdraw') {
    modalActions = makeActionButtons(deferWithdrawActions, stage, handleModalConfirm, handleModalClose);
    titleText = 'Send DEFER/WITHDRAW email?';
    bodyText = 'Note that the applicant will not be removed from the list until they choose to either defer/withdraw.';
  } else if (decision === 'reminder') {
    modalActions = makeActionButtons(reminderActions, stage, handleModalConfirm, handleModalClose);
    titleText = 'Send REMINDER email?';
    bodyText = 'The applicant will be sent an email and text message.';
  } else {
    modalActions = makeActionButtons(denyActions, stage, handleModalConfirm, handleModalClose);
    titleText = `Confirm REJECTION For`;
  }

  const selectedList = selectedApplicants.map((applicant, idx) => {
    return (
      <ListItem
        disabled
        innerDivStyle={{padding: '8px 16px'}}
        key={`confirm-modal-${applicant.id}`}
        primaryText={`· ${applicant.name}`}/>
    );
  });

  return (
    <div>
      <Dialog
        title={titleText}
        actions={modalActions}
        modal={true}
        open={modalStatus}>
        {bodyText ? bodyText : null}
        <List>
          {selectedList}
        </List>
      </Dialog>
    </div>
  );
};

export default ConfirmDecision;
