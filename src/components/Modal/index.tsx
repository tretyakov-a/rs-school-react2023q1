import React from 'react';
import './style.scss';

interface ModalState {
  question: string;
  display: string;
  okCallback?: () => void;
}

interface ModalProps {
  onScrollStateChange?: (isScroll: boolean) => void;
}

export default class Modal extends React.Component<ModalProps, ModalState> {
  static animationDuration = 400;

  constructor(props: ModalProps) {
    super(props);
    this.state = {
      question: 'Are you sure?',
      display: '',
    };
  }

  open = (okCallback: () => void, question: string) => {
    this.setState({ display: 'open', question, okCallback });
    this.props.onScrollStateChange?.(false);
  };

  close = () => {
    this.setState({ display: 'close' });
    setTimeout(() => {
      this.setState({ display: '' });
      this.props.onScrollStateChange?.(true);
    }, Modal.animationDuration);
  };

  handleOKClick = () => {
    const { okCallback } = this.state;
    if (okCallback !== undefined) {
      okCallback();
    }
    this.close();
  };

  render() {
    const classes = ['modal', this.state.display].join(' ');

    return (
      <div
        role="modal"
        className={classes}
        onClick={this.close}
        style={{
          animationDuration: `${Modal.animationDuration}ms`,
        }}
      >
        <div role="modal-window" className="modal__window" onClick={(e) => e.stopPropagation()}>
          <div className="modal__content">{this.state.question}</div>
          <div className="modal__buttons">
            <button className="button" onClick={this.close}>
              Cancel
            </button>
            <button className="button" onClick={this.handleOKClick}>
              OK
            </button>
          </div>
        </div>
      </div>
    );
  }
}
