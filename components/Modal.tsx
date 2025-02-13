import { ReactNode } from 'react'
interface ModalProps {
  isOpen: boolean
  handleClose: () => void
  children: ReactNode
  header: string
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  handleClose,
  children,
  header,
}) => {
  if (isOpen) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        onClick={handleClose}
      >
        <div
          className="flex flex-col w-auto bg-black border border-gray-800 p-6 rounded-xl shadow-lg relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-3 justify-self-center justify-end content-end w-auto items-end">
            <button
              onClick={handleClose}
              className="text-white hover:text-blue-600 text-3xl justify-self-end self-end transition-colors duration-200"
            >
              &times;
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <h2 className="text-white my-5 text-3xl font-bold">
              {header && header}
            </h2>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
