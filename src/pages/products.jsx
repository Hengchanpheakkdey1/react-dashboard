import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  Plus,
  Search,
  SlidersHorizontal,
  Package,
  TrendingUp,
  AlertTriangle,
  XCircle,
  Pencil,
  Trash2,
} from "lucide-react";

import ProductModal from "../component/productsDetails";
import EditModal from "../component/editmodal";
import DeleteModal from "../component/deletemodal";

const API = "https://api.escuelajs.co/api/v1/products";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

  // Fetch all products when the page loads
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`${API}/?limit=200`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  function handleDelete(product) {
    setDeleteTarget(product);
  }

  async function handleDeleteConfirm(id) {
    setDeleting(true);
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setDeleteTarget(null);
    } catch (err) {
      console.error("DELETE error:", err);
    } finally {
      setDeleting(false);
    }
  }

  // Update a product in the list after editing
  function handleUpdated(updatedProduct) {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
    );
  }

  // Filter products by search text
  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  ); // goes through every item in the array and decides:
  // true → keep it
  // false → remove it

  return (
    <div className="p-4 bg-gray-50 min-h-full">
      <div>
        {/* Page Header */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-sm font-bold text-gray-900 m-0">
              Products Management
            </h1>
            <p className="text-[10px] text-gray-500 mt-0.5">
              Manage your inventory, prices, and stock levels.
            </p>
          </div>
          <Link
            to="/product/create"
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg no-underline transition-colors"
          >
            <Plus size={12} />
            Add Product
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-3 mb-3">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-3 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-blue-100 text-blue-600">
              <Package size={14} />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-medium m-0">
                Total Products
              </p>
              <p className="text-lg font-bold text-gray-900 m-0 leading-tight">
                1234
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-3 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-green-100 text-green-600">
              <TrendingUp size={14} />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-medium m-0">
                Total Stock
              </p>
              <p className="text-lg font-bold text-gray-900 m-0 leading-tight">
                780
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-3 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-orange-100 text-orange-500">
              <AlertTriangle size={14} />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-medium m-0">
                Low Stock
              </p>
              <p className="text-lg font-bold text-gray-900 m-0 leading-tight">
                666
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-3 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-red-100 text-red-500">
              <XCircle size={14} />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-medium m-0">
                Out of Stock
              </p>
              <p className="text-lg font-bold text-gray-900 m-0 leading-tight">
                100
              </p>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          {/* Search and Filter Bar */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
            <div className="relative">
              <Search
                size={11}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-6 pr-3 py-1 text-xs border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 text-gray-700"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-gray-400">
                {filtered.length} products
              </span>
              <button className="flex items-center gap-1 text-xs text-gray-600 font-medium border border-gray-200 bg-white px-2.5 py-1 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                <SlidersHorizontal size={11} />
                Filters
              </button>
            </div>
          </div>

          {/* Table */}
          <table className="w-full border-collapse table-fixed">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 py-2 w-[45%]">
                  Product
                </th>
                <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 py-2 w-[25%]">
                  Category
                </th>
                <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 py-2 w-[18%]">
                  Price
                </th>
                <th className="text-right text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 py-2 w-[12%]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-10 text-gray-400 text-xs"
                  >
                    Loading...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-10 text-gray-400 text-xs"
                  >
                    No products found.
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Product image + name + description */}
                    <td className="px-3 py-2">
                      <div
                        onClick={() => setSelectedProduct(product)}
                        className="flex items-center gap-2 cursor-pointer group"
                      >
                        <img
                          src={
                            product.images?.[0] || "https://placehold.co/32x32"
                          }
                          alt={product.title}
                          onError={(e) => {
                            e.target.src =
                              "https://placehold.co/32x32/f3f4f6/9ca3af";
                          }}
                          className="w-8 h-8 rounded-md object-cover flex-shrink-0 border border-gray-100 bg-gray-50 group-hover:opacity-75 transition-opacity"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-gray-900 m-0 truncate group-hover:text-blue-600 transition-colors">
                            {product.title}
                          </p>
                          <p className="text-[10px] text-gray-400 m-0 truncate">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-3 py-2">
                      <span className="text-[11px] text-blue-600 font-medium">
                        {product.category?.name || "—"}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-3 py-2">
                      <span className="text-xs font-semibold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                    </td>

                    {/* Edit and Delete buttons */}
                    <td className="px-3 py-2">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setEditProduct(product)}
                          className="w-6 h-6 flex items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer border-0 bg-transparent"
                        >
                          <Pencil size={11} />
                        </button>
                        <button
                          onClick={() => handleDelete(product)}
                          className="w-6 h-6 flex items-center justify-center rounded-md text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer border-0 bg-transparent"
                        >
                          <Trash2 size={11} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Product Details Modal */}
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}

        {/* Edit Product Modal */}
        {editProduct && (
          <EditModal
            product={editProduct}
            onClose={() => setEditProduct(null)}
            onUpdated={handleUpdated}
          />
        )}

        {/* Delete Confirmation Modal */}
        {deleteTarget && (
          <DeleteModal
            product={deleteTarget}
            deleting={deleting}
            onClose={() => setDeleteTarget(null)}
            onConfirm={handleDeleteConfirm}
          />
        )}
      </div>
    </div>
  );
}
