import AddNewVideoForm from "./AddNewVideoForm";

interface ModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ( props: ModalProps ) => {
  const { setOpenModal } = props;

  return (
    <div className="flex justify-center items-center backdrop-blur overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative min-w-5xl my-6 mx-auto max-w-6xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-end p-5 border-b border-solid border-gray-300 rounded-t ">
            <button
              type="button"
              className="bg-transparent border-0 text-black float-right"
              onClick={() => setOpenModal(false)}
            >
              <span className="text-black opacity-7 h-6 w-6 text-xl block">
                x
              </span>
            </button>
          </div>
          <div className="relative px-6 flex-auto">
            <AddNewVideoForm />
          </div>
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={() => setOpenModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal;
