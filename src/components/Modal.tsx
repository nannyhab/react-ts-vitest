type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ open, onClose, children }: ModalProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div className="bg-white text-black rounded p-6 w-full max-w-md text-left">
        <button onClick={onClose} className="float-right">✕</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;