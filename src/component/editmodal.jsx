import { useState, useEffect } from 'react'
import { X, Tag, DollarSign, Database, Upload } from 'lucide-react'

const BASE_URL = 'https://api.escuelajs.co/api/v1' //Store the common part of the API
const API = `${BASE_URL}/products`// Then create endpoints 

export default function EditModal({ product, onClose, onUpdated }) {
    const [form, setForm] = useState({
        title: product.title,
        price: product.price,
        description: product.description,
        categoryId: product.category?.id || '',
        imageUrl: product.images?.[0] || '',
    })
    const [categories, setCategories] = useState([])
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        fetch(`${BASE_URL}/categories`)
            .then(r => r.json())
            .then(data => setCategories(Array.isArray(data) ? data : []))
            .catch(() => { })
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        try {
            const res = await fetch(`${API}/${product.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: form.title,
                    price: Number(form.price),
                    description: form.description,
                    categoryId: Number(form.categoryId),
                    images: form.imageUrl ? [form.imageUrl] : product.images,
                }),
            })
            const updated = await res.json()
            onUpdated(updated)
            onClose()
        } catch {
            setSaving(false)
        }
    }

    const handleBackdrop = (e) => {
        if (e.target === e.currentTarget) onClose()
    }

    return (
        <div
            onClick={handleBackdrop}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
        >
            <form
                method="POST"
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-xl w-full max-w-[400px] overflow-hidden"
            >

                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100">
                    <h2 className="text-[13px] font-semibold text-gray-900 m-0">Edit Product</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-5 h-5 flex items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer border-0 bg-transparent"
                    >
                        <X size={13} />
                    </button>
                </div>

                {/* Body */}
                <div className="px-4 py-3 flex flex-col gap-2.5">

                    {/* Row 1: Name + Category */}
                    <div className="grid grid-cols-2 gap-2.5">
                        <div className="flex flex-col gap-1">
                            <label className="flex items-center gap-1 text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
                                <Tag size={10} className="text-blue-500" />
                                Product Name
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                className="px-2.5 py-1.5 text-[12px] border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-800"
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
                                className="px-2.5 py-1.5 text-[12px] border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-800 cursor-pointer"
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Row 2: Price + Stock */}
                    <div className="grid grid-cols-2 gap-2.5">
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
                                min="0"
                                className="px-2.5 py-1.5 text-[12px] border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-800"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="flex items-center gap-1 text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
                                <Database size={10} className="text-blue-500" />
                                Stock Qty
                            </label>
                            <input
                                type="number"
                                name="stock"
                                defaultValue={50}
                                min="0"
                                className="px-2.5 py-1.5 text-[12px] border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-800"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={2}
                            className="px-2.5 py-1.5 text-[12px] border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-800 resize-none"
                        />
                    </div>

                    {/* Image URL */}
                    <div className="flex flex-col gap-1">
                        <label className="flex items-center gap-1 text-[10px] font-semibold text-blue-500 uppercase tracking-wide">
                            <Upload size={10} />
                            Image URL
                        </label>
                        <input
                            type="text"
                            name="imageUrl"
                            value={form.imageUrl}
                            onChange={handleChange}
                            className="px-2.5 py-1.5 text-[12px] border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-800"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-2 px-4 py-2.5 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-3 py-1.5 text-[11px] font-semibold text-gray-600 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-3 py-1.5 text-[11px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer border-0 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {saving ? 'Saving...' : 'Update Product'}
                    </button>
                </div>
            </form>
        </div>
    )
}
