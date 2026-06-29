import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
    Package,
    Tag,
    DollarSign,
    Database,
    Upload,
    Sparkles,
} from "lucide-react";

const BASE_URL = import.meta.env.VITE_BASE_URL_API;
const API = `${BASE_URL}/products`;

export default function CreateProduct() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        price: "",
        stock: "",
        description: "",
        categoryId: "",
        imageUrl: "",
    });
    const [categories, setCategories] = useState([]);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`${BASE_URL}/categories`)
            .then((r) => r.json())
            .then((data) => setCategories(Array.isArray(data) ? data : []))
            .catch(() => { });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.title.trim()) {
            setError("Product name is required.");
            return;
        }
        if (!form.price || isNaN(form.price)) {
            setError("A valid price is required.");
            return;
        }
        if (!form.categoryId) {
            setError("Please select a category.");
            return;
        }
        setSaving(true);
        try {
            await fetch(API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: form.title.trim(),
                    price: Number(form.price),
                    description: form.description,
                    categoryId: Number(form.categoryId),
                    images: form.imageUrl
                        ? [form.imageUrl]
                        : ["https://placehold.co/400"],
                }), // Converts a JavaScript object into JSON text.
            });
            navigate("/product");
        } catch {
            setError("Failed to create product. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-4 bg-gray-50 min-h-full">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Package size={18} className="text-blue-600" />
                    <div>
                        <h1 className="text-sm font-bold text-gray-900 m-0">
                            Create New Product
                        </h1>
                        <p className="text-[10px] text-gray-500 mt-0.5">
                            Add a new item to your inventory catalog.
                        </p>
                    </div>
                </div>
                <button className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
                    <Sparkles size={11} />
                    New Listing
                </button>
            </div>

            {/* Form Card */}
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 max-w-3xl"
            >
                {error && (
                    <div className="mb-3 px-3 py-2 text-[11px] font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Row 1: Name + Category */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col gap-1">
                        <label className="flex items-center gap-1 text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
                            <Package size={10} className="text-blue-500" />
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="e.g. Wireless Headphones"
                            className="px-3 py-2 text-[12px] border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-800 placeholder-gray-300"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="flex items-center gap-1 text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
                            <Tag size={10} className="text-blue-500" />
                            Category
                        </label>
                        <select
                            name="categoryId"
                            value={form.categoryId}
                            onChange={handleChange}
                            className="px-3 py-2 text-[12px] border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-800 cursor-pointer"
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Row 2: Price + Stock */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col gap-1">
                        <label className="flex items-center gap-1 text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
                            <DollarSign size={10} className="text-blue-500" />
                            Price ($)
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            className="px-3 py-2 text-[12px] border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-800 placeholder-gray-300"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="flex items-center gap-1 text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
                            <Database size={10} className="text-blue-500" />
                            Stock Quantity
                        </label>
                        <input
                            type="number"
                            name="stock"
                            value={form.stock}
                            onChange={handleChange}
                            placeholder="0"
                            min="0"
                            className="px-3 py-2 text-[12px] border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-800 placeholder-gray-300"
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1 mb-4">
                    <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Tell us more about this product..."
                        className="px-3 py-2 text-[12px] border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-800 resize-none placeholder-gray-300"
                    />
                </div>

                {/* Image URL */}
                <div className="flex flex-col gap-1 mb-5">
                    <label className="flex items-center gap-1 text-[10px] font-semibold text-blue-500 uppercase tracking-wide">
                        <Upload size={10} />
                        Image URL
                    </label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={form.imageUrl}
                        onChange={handleChange}
                        className="px-3 py-2 text-[12px] border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-800"
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 border-t border-gray-100 pt-4">
                    <button
                        type="reset"
                        onClick={() => navigate("/product")}
                        className="px-4 py-2 text-[11px] font-semibold text-gray-600 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-4 py-2 text-[11px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer border-0 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {saving ? "Creating..." : "Create"}
                    </button>
                </div>
            </form>
        </div>
    );
}
