interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: any; // Aseguramos que sea un array de strings
    etapa: "Etapa 1" | "Etapa 2"; // Nueva prop para definir la etapa
  }
  
  const Modal = ({ isOpen, onClose, title, children, etapa }: ModalProps) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-lg">
          <div className="flex justify-between  mb-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
          <div className="overflow-y-auto max-h-[70vh] flex flex-col items-center gap-4">
            {etapa === "Etapa 1" ? (
              <>
                <p className="leading-relaxed">
                {children[0]?.props.children + " " + children[1]?.props.children} {/* Une los dos primeros textos */}
                </p>
                {children[2] && <p className="leading-relaxed">{children[2]}</p>} {/* Tercer texto separado */}
              </>
            ) : (
              children.map((msg, index) => <p key={index} className="leading-relaxed">{msg}</p>) // Etapa 2: Todos separados
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;
  