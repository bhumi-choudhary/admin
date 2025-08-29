import { createContext, useState, useEffect, useContext } from 'react';

export const ProductContext = createContext();

const LOCAL_STORAGE_KEY = 'products';

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const savedProducts = localStorage.getItem(LOCAL_STORAGE_KEY);
      return savedProducts ? JSON.parse(savedProducts) : [];
    } catch (error) {
      console.error("Error loading products from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
    } catch (error) {
      console.error("Error saving products to localStorage:", error);
    }
  }, [products]);

  const addProduct = (product) => {
 setProducts((prevProducts) => [
 ...prevProducts,
 { ...product, id: Date.now(), category: product.category || 'Uncategorized' },
 ]);
  };

  const deleteProduct = (productId) => {
    setProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));
  };

  const updateProduct = (productToUpdate) => {
    const updatedProduct = {
      ...productToUpdate,
      category: productToUpdate.category || 'Uncategorized'
    };


    setProducts((prevProducts) =>
      prevProducts.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const getProductById = (productId) => {
    return products.find(product => product.id === parseInt(productId));
  };


  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct, updateProduct, getProductById }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
