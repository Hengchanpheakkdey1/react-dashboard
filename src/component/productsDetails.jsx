import { X } from 'lucide-react' // Icons

export default function ProductModal({ product, onClose }) {
    const img = product.images?.[0] || 'https://placehold.co/140x140/f3f4f6/9ca3af'

    const handleBackdrop = (e) => {
        if (e.target === e.currentTarget) onClose()
    }

    return (
        <div
            onClick={handleBackdrop}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
        >
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-[400px] overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100">
                    <h2 className="text-[13px] font-semibold text-gray-900 m-0">Product Details</h2>
                    <button
                        onClick={onClose}
                        className="w-5 h-5 flex items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer border-0 bg-transparent"
                    >
                        <X size={13} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex gap-3.5 p-4">
                    <img
                        src={img}
                        alt={product.title}
                        onError={e => { e.target.src = 'https://placehold.co/140x140/f3f4f6/9ca3af' }}
                        className="w-[140px] h-[140px] rounded-xl object-cover flex-shrink-0 bg-gray-50 border border-gray-100"
                    />

                    <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-blue-500 font-semibold uppercase tracking-wide">
                            {product.category?.slug || product.category?.name || '—'}
                        </span>

                        <h3 className="text-[14px] font-bold text-gray-900 mt-1 mb-1.5 leading-snug">
                            {product.title}
                        </h3>

                        <p className="text-[16px] font-bold text-blue-600 m-0 mb-2.5">
                            ${product.price.toFixed(2)}
                        </p>

                        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide m-0 mb-1">Description</p>
                        <p className="text-[11px] text-gray-500 leading-relaxed m-0 line-clamp-4">
                            {product.description}
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-4 pb-4">
                    <button
                        onClick={onClose}
                        className="w-full py-1.5 rounded-xl text-[11px] font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer border-0"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}
