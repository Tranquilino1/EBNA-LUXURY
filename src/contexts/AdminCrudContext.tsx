import React, { createContext, useContext, useState } from 'react';
import type { Product } from '../types';
import { useAuth } from './AuthContext';
import { useAdminProducts } from '../hooks/useAdminProducts';
import { ProductFormModal } from '../components/admin/ProductFormModal';
import { DeleteConfirmModal } from '../components/admin/DeleteConfirmModal';
import { ProductInspectModal } from '../components/admin/ProductInspectModal';

interface AdminCrudContextType {
  isAdmin: boolean;
  openCreateModal: () => void;
  openEditModal: (product: Product) => void;
  openDeleteModal: (product: Product) => void;
  openInspectModal: (product: Product) => void;
  quickToggleStock: (productId: string, currentStatus: boolean) => Promise<void>;
  closeAllModals: () => void;
  refetchCatalog: () => Promise<void>;
}

const AdminCrudContext = createContext<AdminCrudContextType | undefined>(undefined);

export const AdminCrudProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin } = useAuth();
  const { addProduct, updateProduct, deleteProduct, toggleStock, refetch } = useAdminProducts();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isInspectOpen, setIsInspectOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openCreateModal = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
    setIsInspectOpen(false);
  };

  const openDeleteModal = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
    setIsInspectOpen(false);
  };

  const openInspectModal = (product: Product) => {
    setSelectedProduct(product);
    setIsInspectOpen(true);
  };

  const closeAllModals = () => {
    setIsFormOpen(false);
    setIsDeleteOpen(false);
    setIsInspectOpen(false);
    setSelectedProduct(null);
  };

  const quickToggleStock = async (productId: string, currentStatus: boolean) => {
    await toggleStock(productId, currentStatus);
  };

  const handleSaveProduct = async (productData: Partial<Product>, imageFile?: File) => {
    if (selectedProduct) {
      await updateProduct(selectedProduct.id, productData, imageFile);
    } else {
      await addProduct(productData, imageFile);
    }
    await refetch();
    closeAllModals();
  };

  const handleConfirmDelete = async () => {
    if (selectedProduct) {
      await deleteProduct(selectedProduct.id);
      await refetch();
      closeAllModals();
    }
  };

  return (
    <AdminCrudContext.Provider
      value={{
        isAdmin,
        openCreateModal,
        openEditModal,
        openDeleteModal,
        openInspectModal,
        quickToggleStock,
        closeAllModals,
        refetchCatalog: refetch,
      }}
    >
      {children}

      {/* Global Modals for Admin CRUD anywhere on the site */}
      {isAdmin && isFormOpen && (
        <ProductFormModal
          product={selectedProduct}
          onClose={closeAllModals}
          onSave={handleSaveProduct}
        />
      )}

      {isAdmin && isDeleteOpen && selectedProduct && (
        <DeleteConfirmModal
          onConfirm={handleConfirmDelete}
          onCancel={closeAllModals}
        />
      )}

      {isAdmin && isInspectOpen && selectedProduct && (
        <ProductInspectModal
          product={selectedProduct}
          onClose={closeAllModals}
          onEdit={() => {
            setIsInspectOpen(false);
            setIsFormOpen(true);
          }}
          onToggleStock={() => quickToggleStock(selectedProduct.id, selectedProduct.in_stock)}
          onDelete={() => {
            setIsInspectOpen(false);
            setIsDeleteOpen(true);
          }}
        />
      )}
    </AdminCrudContext.Provider>
  );
};

export const useAdminCrud = () => {
  const context = useContext(AdminCrudContext);
  if (!context) {
    throw new Error('useAdminCrud must be used within an AdminCrudProvider');
  }
  return context;
};
