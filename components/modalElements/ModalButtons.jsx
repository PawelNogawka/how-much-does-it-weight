import Button from "../formElements/Button";
import "./ModalButtons.scss";

const ModalButtons = ({
  submitBtnValue,
  secondButtonValue,
  disabled,
  handleSecondBtnClick,
  handleSubmitBtnClick,
}) => {
  return (
    <div className="modal-btns">
      <Button
        secondary
        disabled={disabled}
        onClick={handleSubmitBtnClick}
        ariaLabel={
          submitBtnValue === "continue" ? "Go to next step" : "Share your flat"
        }
      >
        {submitBtnValue}
      </Button>
      {secondButtonValue && (
        <Button
          dark
          onClick={handleSecondBtnClick}
          ariaLabel="Go to previous step"
        >
          {secondButtonValue}
        </Button>
      )}
    </div>
  );
};

export default ModalButtons;
