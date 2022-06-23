import { ClassNames } from "@emotion/react";
import { FC, ReactNode, useId } from "react";
import ReactModal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
export interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const id = useId();
  return (
    <ClassNames>
      {({ css }) => (
        <ReactModal
          id={id.toString()}
          closeTimeoutMS={150}
          isOpen={isOpen}
          bodyOpenClassName={css`
            .modal_box {
              position: relative;
              padding: 10px;
              margin: 20px;
            }
            /* .modal__content {
              width: "100%";
              position: absolute;
            } */
            .close_button {
              position: absolute;
              top: -30px;
              right: -20px;
              cursor: pointer;
              border: none;
              outline: none;
              padding: 0.4rem;
            }
          `}
          style={{
            overlay: {
              background: "rgba(0, 0, 0, 0.8)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            },
            content: {
              margin: "auto auto",
              width: "max-content",
              height: "max-content",
            },
          }}
          onAfterClose={onClose}
        >
          <div className="modal_box">
            <button className="close_button" onClick={() => onClose?.()}>
              <AiOutlineClose />
            </button>
            <div className="modal__content">{children}</div>
          </div>
        </ReactModal>
      )}
    </ClassNames>
  );
};
