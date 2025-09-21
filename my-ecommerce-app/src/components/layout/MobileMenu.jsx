import { X } from "lucide-react";
import { ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavStore } from "../../store/useNavStore";

const MobileMenu = ({ isOpen, onClose, toggleCart, token, user, logout, cartItems }) => {
    const { navigations } = useNavStore();
    
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
        >
            <div
                className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 translate-x-0"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-green-700">Afritabs</h2>
                    <button onClick={onClose}>
                        <X className="w-6 h-6 text-gray-700" />
                    </button>
                </div>
                
                <nav className="flex flex-col p-4 space-y-4 text-gray-700">
                    {navigations.map((item) => (
                        <Link
                            key={item._id}
                            to={item.link}
                            onClick={onClose}
                            className="hover:text-green-600"
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t mt-4 flex flex-col space-y-4">
                    {/* User/Sign In for Mobile */}
                    {token ? (
                        <>
                            <Link to="/my-account" onClick={onClose} className="p-2 flex items-center gap-2 hover:text-green-600">
                                <User size={22} className="text-green-700" />
                                <span>My Account</span>
                            </Link>
                            <Link to="/mylist" onClick={onClose} className="p-2 flex items-center gap-2 hover:text-green-600">
                                <span>My List</span>
                            </Link>
                            <Link to="/orders" onClick={onClose} className="p-2 flex items-center gap-2 hover:text-green-600">
                                <span>Orders</span>
                            </Link>
                            <button
                                onClick={() => {
                                    logout();
                                    onClose();
                                }}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" onClick={onClose} className="w-full text-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
                            Sign In
                        </Link>
                    )}

                    {/* Cart Icon for Mobile */}
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">Shopping Cart</span>
                        <button
                            onClick={() => {
                                toggleCart();
                                onClose();
                            }}
                            className="relative p-2 text-gray-700 hover:text-green-600 transition-colors"
                        >
                            <ShoppingCart size={24} />
                            {cartItems?.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                                    {cartItems.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;