import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'

const API = 'https://api.escuelajs.co/api/v1/products'

export default function DeleteModal({ product, onClose, onDeleted }) {
    const [deleting, setDeleting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setDeleting(true)
        try {
            console.log('DELETE request:', `${API}/${product.id}`)
            const res = await fetch(`${API}/${product.id}`, {
                method: 'DELETE',
            })
            console.log('DELETE response:', res.status, res.ok)
            onDeleted(product.id)
            onClose()
        } catch (err) {
            console.error('DELETE error:', err)
            setDeleting(false)
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
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-[340px] overflow-hidden">

                {/* Icon */}
                <div className="flex flex-col items-center px-6 pt-6 pb-4 gap-3">
                    <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
                        <AlertTriangle size={28} className="text-red-500" />
                    </div>

                    {/* Title */}
                    <h2 className="text-[15px] font-bold text-gray-900 m-0">Delete Product</h2>

                    {/* Message */}
                    <p className="text-[12px] text-gray-500 text-center m-0 leading-relaxed">
                        Are you sure you want to delete{' '}
                        <span className="font-semibold text-gray-700">{product?.title}</span>?
                        This action cannot be undone.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3 px-6 pb-5">
                    <button
                        onClick={onClose}
                        disabled={deleting}
                        className="flex-1 py-2 text-[12px] font-semibold text-gray-700 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={deleting}
                        className="flex-1 py-2 text-[12px] font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors cursor-pointer border-0 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {deleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    )
}
