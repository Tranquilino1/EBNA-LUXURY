import React, { createContext, useContext, useState } from 'react';
import type { Product } from '../types';
import { useAuth } from './AuthContext';
import { useAdminProducts } from '../hooks/useAdminProducts';
import { ProductFormModal } from '../components/admin/ProductFormModal';
import { DeleteConfirmModal } from '../components/admin/DeleteConfirmModal';
import { ProductInspectModal } from '../components/admin/ProductInspectModal';
import { BulkDeleteModal } from '../components/admin/BulkDeleteModal';

interface AdminCrudContextType {
  isAdmin: boolean;
  selectedIds: Set<string>;
  toggleSelect: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clearSelection: () => void;
  openCreateModal: () => void;
  openEditModal: (product: Product) => void;
  openDeleteModal: (product: Product) => void;
  openInspectModal: (product: Product) => void;
  openBulkDeleteModal: (products: Product[]) => void;
  quickToggleStock: (productId: string, currentStatus: boolean) => Promise<void>;
  bulkUpdateStock: (inStock: boolean) => Promise<void>;
  bulkUpdateVisibility: (isHidden: boolean) => Promise<void>;
  closeAllModals: () => void;
  refetchCatalog: () => Promise<void>;
}

const AdminCrudContext = createContext<AdminCrudContextType | undefined>(undefined);

export const AdminCrudProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin } = useAuth();
  const { 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    toggleStock, 
    bulkDelete,
    bulkUpdateStock: bulkUpdateStockHook,
    bulkUpdateVisibility: bulkUpdateVisibilityHook,
    refetch 
  } = useAdminProducts();

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);
  const [bulkDeleteProductsList, setBulkDeleteProductsList] = useState<Product[]>([]);
  const [isInspectOpen, setIsInspectOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectAll = (ids: string[]) => {
    setSelectedIds(new Set(ids));
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
  };

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

  const openBulkDeleteModal = (products: Product[]) => {
    setBulkDeleteProductsList(products);
    setIsBulkDeleteOpen(true);
  };

  const closeAllModals = () => {
    setIsFormOpen(false);
    setIsDeleteOpen(false);
    setIsBulkDeleteOpen(false);
    setIsInspectOpen(false);
    setSelectedProduct(null);
  };

  const quickToggleStock = async (productId: string, currentStatus: boolean) => {
    await toggleStock(productId, currentStatus);
  };

  const bulkUpdateStock = async (inStock: boolean) => {
    if (selectedIds.size === 0) return;
    const ids = Array.from(selectedIds);
    await bulkUpdateStockHook(ids, inStock);
    clearSelection();
  };

  const bulkUpdateVisibility = async (isHidden: boolean) => {
    if (selectedIds.size === 0) return;
    const ids = Array.from(selectedIds);
    await bulkUpdateVisibilityHook(ids, isHidden);
    clearSelection();
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

  const handleConfirmBulkDelete = async () => {
    const ids = bulkDeleteProductsList.map(p => p.id);
    await bulkDelete(ids);
    clearSelection();
    closeAllModals();
  };

  return (
    <AdminCrudContext.Provider
      value={{
        isAdmin,
        selectedIds,
        toggleSelect,
        selectAll,
        clearSelection,
        openCreateModal,
        openEditModal,
        openDeleteModal,
        openInspectModal,
        openBulkDeleteModal,
        quickToggleStock,
        bulkUpdateStock,
        bulkUpdateVisibility,
        closeAllModals,
        refetchCatalog: refetch,
      }}
    >
      {children}

      {/* Global Modals for Admin CRUD */}
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

      {isAdmin && isBulkDeleteOpen && (
        <BulkDeleteModal
          isOpen={isBulkDeleteOpen}
          selectedProducts={bulkDeleteProductsList}
          onConfirm={handleConfirmBulkDelete}
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
