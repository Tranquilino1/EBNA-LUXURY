import { Modal } from '../ui/Modal';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmModal({ onConfirm, onCancel }: DeleteConfirmModalProps) {
  return (
    <Modal isOpen={true} onClose={onCancel} title="Confirmar Eliminación">
      <div className="delete-modal-content text-center p-4">
        <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-bold mb-2">¿Estás seguro de eliminar este producto?</h3>
        <p className="text-sm text-gray-300 mb-6">
          Esta acción no se puede deshacer y el producto será eliminado permanentemente de la tienda.
        </p>

        <div className="flex justify-center gap-4">
          <button className="btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn-danger btn-primary bg-red-600" onClick={onConfirm}>
            Eliminar Producto
          </button>
        </div>
      </div>
    </Modal>
  );
}
