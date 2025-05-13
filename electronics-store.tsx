"use client";

import { useEffect, useState, type FormEvent, type ChangeEvent } from "react";
import {
  ShoppingCart,
  Search,
  Headphones,
  Monitor,
  Tv,
  Gamepad,
  Camera,
  Home,
  Star,
  Check,
  Clock,
  X,
  Plus,
  Minus,
  Zap,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Menu,
  CheckCircle,
  Info,
} from "lucide-react";

interface ProductSpec {
  [key: string]: string;
}

interface Product {
  id: number;
  name: string;
  originalPrice: number;
  salePrice: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  badge?: string;
  stock: number;
  description: string;
  features: string[];
  specs: ProductSpec;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface Notification {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

interface CheckoutInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  card: string;
  expiry: string;
  cvv: string;
}

interface ContactForm {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface OrderDetails {
  id: string;
  date: string;
  items: CartItem[];
  shipping: CheckoutInfo;
  total: number;
  tax: number;
  grandTotal: number;
}

export default function ElectronicsStore(): JSX.Element {
  const products: Product[] = [
    {
      id: 1,
      name: "Premium Noise-Cancelling Headphones",
      originalPrice: 349,
      salePrice: 249,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      category: "Audio",
      rating: 4.8,
      reviews: 1243,
      badge: "Best Seller",
      stock: 15,
      description:
        "Experience crystal-clear sound with our premium noise-cancelling headphones. Perfect for travel, work, or immersive listening at home. These headphones feature advanced noise-cancellation technology that blocks out ambient noise, allowing you to focus on your music or calls. With up to 30 hours of battery life, comfortable ear cushions, and high-quality audio drivers, these headphones deliver exceptional sound quality and comfort for extended listening sessions. They also include a built-in microphone for hands-free calling and voice assistant compatibility.",
      features: [
        "Active Noise Cancellation",
        "30-hour battery life",
        "Bluetooth 5.0 connectivity",
        "Built-in microphone",
        "Foldable design",
        "Carrying case included",
      ],
      specs: {
        "Driver Size": "40mm",
        "Frequency Response": "20Hz - 20kHz",
        Impedance: "32 Ohm",
        Weight: "250g",
        "Charging Time": "2 hours",
      },
    },
    {
      id: 2,
      name: 'Ultra HD Smart TV 55"',
      originalPrice: 1299,
      salePrice: 899,
      image:
        "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=2057&auto=format&fit=crop&ixlib=rb-4.0.3",
      category: "TVs",
      rating: 4.7,
      reviews: 856,
      badge: "Top Rated",
      stock: 8,
      description:
        "Immerse yourself in stunning 4K resolution with our Ultra HD Smart TV. Features built-in streaming apps and voice control. This 55-inch TV delivers breathtaking picture quality with HDR support for vibrant colors and deep blacks. The smart platform gives you access to thousands of streaming apps including Netflix, Hulu, Disney+, and more. With voice control compatibility, you can easily search for content, change inputs, or adjust volume using just your voice. The slim bezel design and adjustable stand make it a perfect addition to any living room.",
      features: [
        "4K Ultra HD Resolution",
        "HDR10+ Support",
        "Smart TV Platform",
        "Voice Control",
        "Multiple HDMI inputs",
        "Bluetooth audio connectivity",
      ],
      specs: {
        "Screen Size": "55 inches",
        Resolution: "3840 x 2160",
        "Refresh Rate": "120Hz",
        "HDMI Ports": "4",
        "USB Ports": "2",
        Weight: "15.5kg",
      },
    },
    {
      id: 3,
      name: "Pro Wireless Gaming Mouse",
      originalPrice: 129,
      salePrice: 79,
      image:
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.0.3",
      category: "Gaming",
      rating: 4.6,
      reviews: 532,
      stock: 22,
      description:
        "Gain a competitive edge with our ultra-responsive gaming mouse featuring 25,000 DPI optical sensor and 1ms response time. Designed for professional gamers, this wireless mouse offers lag-free performance with our proprietary 2.4GHz connection. The ergonomic design fits comfortably in your hand during extended gaming sessions, while the lightweight construction allows for quick, precise movements. With 8 programmable buttons and customizable RGB lighting, you can personalize your setup to match your gaming style. The rechargeable battery provides up to 70 hours of continuous use.",
      features: [
        "25,000 DPI optical sensor",
        "1ms response time",
        "8 programmable buttons",
        "Customizable RGB lighting",
        "70-hour battery life",
        "Lightweight design",
      ],
      specs: {
        Sensor: "Optical",
        "DPI Range": "100-25,000",
        Buttons: "8",
        Weight: "85g",
        "Battery Life": "70 hours",
        Connectivity: "2.4GHz Wireless",
      },
    },
    {
      id: 4,
      name: "Mechanical Gaming Keyboard RGB",
      originalPrice: 199,
      salePrice: 149,
      image:
        "https://images.unsplash.com/photo-1541140532154-b024d705b90a?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3",
      category: "Gaming",
      rating: 4.5,
      reviews: 347,
      stock: 19,
      description:
        "Dominate your games with our mechanical keyboard featuring customizable RGB lighting and tactile switches for precise control. This premium gaming keyboard features high-quality mechanical switches that provide satisfying tactile feedback and fast actuation for competitive gaming. The per-key RGB lighting can be customized to create stunning lighting effects or to highlight specific keys for different games. With N-key rollover and anti-ghosting technology, every keypress is registered accurately, even during intense gaming sessions. The durable aluminum frame ensures stability and longevity.",
      features: [
        "Mechanical switches",
        "Per-key RGB lighting",
        "N-key rollover",
        "Anti-ghosting technology",
        "Programmable macro keys",
        "Detachable wrist rest",
      ],
      specs: {
        "Switch Type": "Mechanical",
        "Actuation Force": "45g",
        "Key Rollover": "N-key",
        Backlight: "RGB",
        "Cable Length": "1.8m",
        Weight: "1.2kg",
      },
    },
    {
      id: 5,
      name: 'Ultrawide Curved Monitor 34"',
      originalPrice: 899,
      salePrice: 649,
      image:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      category: "Monitors",
      rating: 4.9,
      reviews: 421,
      badge: "Editor's Choice",
      stock: 5,
      description:
        "Transform your workspace with our immersive ultrawide curved monitor, perfect for productivity and gaming with a 144Hz refresh rate. This 34-inch ultrawide monitor features a 21:9 aspect ratio that provides expansive screen real estate for multitasking or immersive gaming. The 1800R curved display wraps around your field of vision, reducing eye strain during long sessions. With WQHD resolution (3440x1440), you'll enjoy sharp, detailed images and text. The 144Hz refresh rate and 1ms response time ensure smooth motion for gaming, while the IPS panel delivers accurate colors from any viewing angle.",
      features: [
        "34-inch ultrawide display",
        "1800R curved screen",
        "WQHD resolution (3440x1440)",
        "144Hz refresh rate",
        "1ms response time",
        "AMD FreeSync Premium",
      ],
      specs: {
        "Screen Size": "34 inches",
        Resolution: "3440 x 1440",
        "Aspect Ratio": "21:9",
        "Refresh Rate": "144Hz",
        "Response Time": "1ms",
        "Panel Type": "IPS",
      },
    },
    {
      id: 6,
      name: "Wireless Earbuds with ANC",
      originalPrice: 199,
      salePrice: 129,
      image:
        "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      category: "Audio",
      rating: 4.4,
      reviews: 689,
      stock: 31,
      description:
        "Experience true wireless freedom with our premium earbuds featuring active noise cancellation and 30-hour battery life. These compact earbuds deliver exceptional sound quality with deep bass and clear highs. The active noise cancellation technology effectively blocks out ambient noise, allowing you to focus on your music or calls. With the charging case, you get a total of 30 hours of playback time, while the earbuds themselves provide 8 hours on a single charge. They're sweat and water-resistant, making them perfect for workouts, and feature touch controls for easy operation.",
      features: [
        "Active Noise Cancellation",
        "30-hour total battery life",
        "Touch controls",
        "IPX5 water resistance",
        "Bluetooth 5.2",
        "Voice assistant support",
      ],
      specs: {
        "Driver Size": "10mm",
        "Frequency Response": "20Hz - 20kHz",
        "Battery Life": "8 hours (earbuds), 30 hours (with case)",
        "Charging Time": "1.5 hours",
        "Bluetooth Range": "10m",
        Weight: "5.6g per earbud",
      },
    },
    {
      id: 7,
      name: "Professional DSLR Camera",
      originalPrice: 1499,
      salePrice: 1199,
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
      category: "Cameras",
      rating: 4.9,
      reviews: 213,
      badge: "Pro Choice",
      stock: 7,
      description:
        "Capture stunning photos and videos with our professional DSLR camera featuring a 45MP sensor and 4K video recording capabilities. This high-performance camera is designed for professional photographers and serious enthusiasts. The 45MP full-frame sensor captures incredible detail and performs exceptionally well in low-light conditions. With 4K video recording at 60fps, you can create professional-quality videos with beautiful depth of field. The advanced autofocus system with eye tracking ensures your subjects are always in sharp focus, while the weather-sealed body allows you to shoot in challenging conditions.",
      features: [
        "45MP full-frame sensor",
        "4K video at 60fps",
        "Advanced autofocus with eye tracking",
        "Weather-sealed body",
        "Dual memory card slots",
        "5-axis image stabilization",
      ],
      specs: {
        "Sensor Type": "Full-frame CMOS",
        Resolution: "45 megapixels",
        "ISO Range": "100-51,200 (expandable to 204,800)",
        "Autofocus Points": "61",
        "Continuous Shooting": "10 fps",
        "Battery Life": "Approx. 900 shots",
      },
    },
    {
      id: 8,
      name: "Smart Home Hub",
      originalPrice: 249,
      salePrice: 179,
      image:
        "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      category: "Smart Home",
      rating: 4.3,
      reviews: 178,
      stock: 25,
      description:
        "Control your entire smart home ecosystem with our intuitive hub that connects with all major smart devices and voice assistants. This central hub serves as the command center for your smart home, allowing you to control lights, thermostats, security cameras, door locks, and more from a single app. It's compatible with over 10,000 smart devices from various manufacturers and works with popular voice assistants like Alexa, Google Assistant, and Siri. The intuitive interface makes it easy to create automated routines, such as turning off all lights and locking doors at bedtime, or adjusting the thermostat when you leave for work.",
      features: [
        "Compatible with 10,000+ devices",
        "Works with Alexa, Google Assistant, and Siri",
        "Easy automation setup",
        "Secure encrypted connection",
        "Energy usage monitoring",
        "Remote access via smartphone",
      ],
      specs: {
        Connectivity: "Wi-Fi, Bluetooth, Zigbee, Z-Wave",
        Power: "AC adapter (included)",
        Dimensions: "4.5 x 4.5 x 1.2 inches",
        Processor: "1.8 GHz quad-core",
        Memory: "2GB RAM, 16GB storage",
        Range: "Up to 50 feet",
      },
    },
    {
      id: 9,
      name: "Gaming Console Pro",
      originalPrice: 499,
      salePrice: 449,
      image:
        "https://images.unsplash.com/photo-1486401899868-0e435ed85128?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      category: "Gaming",
      rating: 4.8,
      reviews: 932,
      badge: "Limited Stock",
      stock: 3,
      description:
        "Experience next-gen gaming with our powerful console featuring ray tracing, 4K gaming at 120fps, and fast SSD storage. This cutting-edge gaming console delivers incredible graphics with support for ray tracing technology that creates realistic lighting, shadows, and reflections. The custom SSD provides lightning-fast load times, allowing you to jump into your games almost instantly. With support for 4K resolution at up to 120 frames per second, your games will look smoother and more detailed than ever before. The console includes a redesigned controller with haptic feedback and adaptive triggers for a more immersive gaming experience.",
      features: [
        "4K gaming at up to 120fps",
        "Ray tracing support",
        "Custom high-speed SSD",
        "Haptic feedback controller",
        "3D audio technology",
        "Backward compatibility",
      ],
      specs: {
        CPU: "8-core custom Zen 2",
        GPU: "10.28 TFLOPS, 36 CUs",
        Memory: "16GB GDDR6",
        Storage: "1TB custom SSD",
        "Optical Drive": "4K UHD Blu-ray",
        HDMI: "2.1 (supports 4K@120Hz)",
      },
    },
  ];

  const categories: string[] = [
    "All",
    "Audio",
    "TVs",
    "Gaming",
    "Monitors",
    "Cameras",
    "Smart Home",
  ];

  const [timeLeft, setTimeLeft] = useState<string>("");
  const [saleActive, setSaleActive] = useState<boolean>(true);
  const [category, setCategory] = useState<string>("All");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentPage, setCurrentPage] = useState<string>("shop");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [checkoutInfo, setCheckoutInfo] = useState<CheckoutInfo>({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    card: "",
    expiry: "",
    cvv: "",
  });
  const [orderComplete, setOrderComplete] = useState<OrderDetails | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("details");

  const [contactForm, setContactForm] = useState<ContactForm>({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const saleEndTime = new Date(Date.now() + 1000 * 60 * 10);

  const filteredProducts: Product[] =
    category === "All"
      ? products
      : products.filter((p) => p.category === category);

  const getDiscountPercentage = (original: number, sale: number): number => {
    return Math.round(((original - sale) / original) * 100);
  };

  const formatPrice = (price: number | string): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getRelatedProducts = (product: Product | null): Product[] => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  };

  const generateOrderId = (): string => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const addNotification = (
    message: string,
    type: "success" | "error" | "info" = "success"
  ): void => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );
    }, 5000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = saleEndTime.getTime() - now;

      if (distance < 0) {
        setTimeLeft("Sale Ended");
        setSaleActive(false);
        clearInterval(interval);
      } else {
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const viewProduct = (product: Product): void => {
    setSelectedProduct(product);
    setQuantity(1);
    setActiveTab("details");
    setCurrentPage("product");
    window.scrollTo(0, 0);
  };

  const addToCart = (product: Product, qty = 1): void => {
    const existingItem = cartItems.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { product, quantity: qty }]);
    }

    addNotification(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId: number): void => {
    const product = cartItems.find((item) => item.product.id === productId);
    setCartItems(cartItems.filter((item) => item.product.id !== productId));

    if (product) {
      addNotification(`${product.product.name} removed from cart`, "info");
    }
  };

  const updateCartQuantity = (productId: number, newQuantity: number): void => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems(
      cartItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const cartTotal = cartItems.reduce((total, item) => {
    const price = saleActive
      ? item.product.salePrice
      : item.product.originalPrice;
    return total + price * item.quantity;
  }, 0);

  const handleCheckoutChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCheckoutInfo({ ...checkoutInfo, [name]: value });
  };

  const processOrder = (): void => {
    const newOrderId = generateOrderId();
    setOrderId(newOrderId);

    const orderDetails: OrderDetails = {
      id: newOrderId,
      date: new Date().toLocaleDateString(),
      items: cartItems,
      shipping: checkoutInfo,
      total: cartTotal,
      tax: cartTotal * 0.08,
      grandTotal: cartTotal * 1.08,
    };

    setOrderComplete(orderDetails);
    setCartItems([]);
    setCurrentPage("success");
    window.scrollTo(0, 0);

    addNotification("Order placed successfully!", "success");
  };

  const renderStars = (rating: number): JSX.Element => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span key={i}>
            {i < Math.floor(rating) ? (
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            ) : (
              <Star className="w-4 h-4 text-gray-300" />
            )}
          </span>
        ))}
        <span className="ml-1 text-gray-500 text-sm">({rating})</span>
      </div>
    );
  };

  const renderPage = (): JSX.Element => {
    return (
      <div className="page-transition">
        {(() => {
          switch (currentPage) {
            case "product":
              return renderProductPage();
            case "cart":
              return renderCartPage();
            case "checkout":
              return renderCheckoutPage();
            case "success":
              return renderSuccessPage();
            case "deals":
              return renderDealsPage();
            case "support":
              return renderSupportPage();
            default:
              return renderShopPage();
          }
        })()}
      </div>
    );
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const renderShopPage = (): JSX.Element => {
    return (
      <>
        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap");

          :root {
            --font-body: "Outfit", sans-serif;
            --font-heading: "Space Grotesk", sans-serif;
            --color-primary: #0284c7;
            --color-secondary: #0f172a;
            --color-accent: #0ea5e9;
          }

          .font-body {
            font-family: var(--font-body);
          }

          .font-heading {
            font-family: var(--font-heading);
          }

          button,
          [role="button"],
          a,
          input[type="submit"],
          .cursor-pointer {
            cursor: pointer;
          }

          /* Animation classes */
          .fade-in {
            animation: fadeIn 0.3s ease-in-out;
          }

          .slide-in {
            animation: slideIn 0.4s ease-out;
          }

          .scale-in {
            animation: scaleIn 0.3s ease-out;
          }

          .bounce-in {
            animation: bounceIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slideIn {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes scaleIn {
            from {
              transform: scale(0.95);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes bounceIn {
            0% {
              transform: scale(0.8);
              opacity: 0;
            }
            70% {
              transform: scale(1.05);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }

          .page-transition {
            animation: fadeIn 0.4s ease-out;
          }

          .hover-scale {
            transition: transform 0.2s ease;
          }

          .hover-scale:hover {
            transform: scale(1.03);
          }

          /* Remove number input arrows */
          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input[type="number"] {
            -moz-appearance: textfield;
          }
        `}</style>

        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-slate-900 mb-12">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3')] bg-cover bg-center mix-blend-overlay"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <div className="inline-block px-3 py-1 rounded-full bg-sky-600/20 text-sky-200 text-sm font-medium mb-4">
                  Flash Sale Now Live
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 font-heading">
                  Next-Gen Tech <br />
                  <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                    At Unbeatable Prices
                  </span>
                </h1>
                <p className="text-purple-100 text-lg md:text-xl mb-8 max-w-lg mx-auto md:mx-0 font-body">
                  Discover premium electronics with exclusive deals up to 50%
                  off. Limited time offers available now.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <button className="px-8 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg transition shadow-lg hover:shadow-sky-500/30">
                    Shop Now
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage("deals");
                      window.scrollTo(0, 0);
                    }}
                    className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium rounded-lg transition border border-white/20"
                  >
                    View Deals
                  </button>
                </div>

                {saleActive && (
                  <div className="mt-8 inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                    <div className="text-white font-medium">Sale ends in:</div>
                    <div className="text-xl font-mono font-bold text-white">
                      {timeLeft}
                    </div>
                  </div>
                )}
              </div>

              <div className="hidden md:block relative">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-sky-500 rounded-full filter blur-3xl opacity-20"></div>
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>

                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-2 rounded-2xl shadow-2xl rotate-1 transform hover:rotate-0 transition-transform duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1588200908342-23b585c03e26?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Featured products"
                    className="rounded-xl"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-sky-600 text-white text-lg font-bold px-4 py-2 rounded-lg shadow-lg">
                    Up to 50% OFF
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              className="w-full h-auto"
            >
              <path
                fill="#0f172a"
                fillOpacity="1"
                d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L\`\`\`xml
C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L
\`\`\`

\`\`\`xml
1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-100 mb-6 font-heading">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories
              .filter((cat) => cat !== "All")
              .map((cat, index) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className="relative overflow-hidden group rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 p-4 h-32 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition cursor-pointer hover-scale bounce-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="text-sky-500 mb-2">
                    {cat === "Audio" && <Headphones className="w-8 h-8" />}
                    {cat === "TVs" && <Tv className="w-8 h-8" />}
                    {cat === "Gaming" && <Gamepad className="w-8 h-8" />}
                    {cat === "Monitors" && <Monitor className="w-8 h-8" />}
                    {cat === "Cameras" && <Camera className="w-8 h-8" />}
                    {cat === "Smart Home" && <Home className="w-8 h-8" />}
                  </div>
                  <span className="font-medium text-slate-100">{cat}</span>
                  <div className="absolute inset-0 bg-sky-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                </button>
              ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <h2 className="text-2xl font-bold text-slate-100 mb-4 font-heading">
            Our Products
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-slate-700 hover-scale slide-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover cursor-pointer"
                    onClick={() => viewProduct(product)}
                  />
                  {product.badge && (
                    <span className="absolute top-4 left-4 bg-teal-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      {product.badge}
                    </span>
                  )}
                  {saleActive && (
                    <span className="absolute top-4 right-4 bg-rose-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      {getDiscountPercentage(
                        product.originalPrice,
                        product.salePrice
                      )}
                      % OFF
                    </span>
                  )}
                </div>

                <div className="p-5 flex-grow flex flex-col">
                  <div className="mb-2">{renderStars(product.rating)}</div>
                  <h3
                    className="font-semibold text-lg mb-1 text-slate-100 cursor-pointer hover:text-teal-400 transition font-heading"
                    onClick={() => viewProduct(product)}
                  >
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-400 mb-4 font-body">
                    {product.reviews} reviews • {product.stock} in stock
                  </p>

                  <div className="mt-auto">
                    <div className="flex items-center mb-4">
                      <span className="text-2xl font-bold text-slate-100">
                        $
                        {saleActive
                          ? formatPrice(product.salePrice)
                          : formatPrice(product.originalPrice)}
                      </span>
                      {saleActive && (
                        <span className="ml-2 text-sm text-slate-500 line-through">
                          ${formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => viewProduct(product)}
                        className="flex-1 bg-sky-600 hover:bg-sky-700 text-white py-2 px-4 rounded-lg font-medium transition"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-slate-700 hover:bg-slate-600 text-slate-200 py-2 px-4 rounded-lg font-medium transition"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  const renderProductPage = (): JSX.Element => {
    if (!selectedProduct) return <></>;

    const relatedProducts = getRelatedProducts(selectedProduct);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex mb-6 text-sm text-slate-400">
          <button
            onClick={() => setCurrentPage("shop")}
            className="hover:text-teal-400 transition"
          >
            Home
          </button>
          <span className="mx-2">/</span>
          <button
            onClick={() => {
              setCurrentPage("shop");
              setCategory(selectedProduct.category);
            }}
            className="hover:text-teal-400 transition"
          >
            {selectedProduct.category}
          </button>
          <span className="mx-2">/</span>
          <span className="text-slate-100 font-medium">
            {selectedProduct.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-800 p-4 rounded-xl shadow-md">
            <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
              <img
                src={selectedProduct.image || "/placeholder.svg"}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              {selectedProduct.badge && (
                <span className="absolute top-4 left-4 bg-teal-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  {selectedProduct.badge}
                </span>
              )}
              {saleActive && (
                <span className="absolute top-4 right-4 bg-rose-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  {getDiscountPercentage(
                    selectedProduct.originalPrice,
                    selectedProduct.salePrice
                  )}
                  % OFF
                </span>
              )}
            </div>
          </div>

          <div>
            <span className="inline-block px-3 py-1 bg-sky-900 text-sky-300 rounded-full text-sm font-medium mb-3">
              {selectedProduct.category}
            </span>
            <h1 className="text-3xl font-bold text-slate-100 mb-2 font-heading">
              {selectedProduct.name}
            </h1>

            <div className="flex items-center mb-4">
              {renderStars(selectedProduct.rating)}
              <span className="ml-2 text-slate-400">
                {selectedProduct.reviews} reviews
              </span>
            </div>

            <div className="flex items-center mb-6">
              <span className="text-3xl font-bold text-slate-100">
                $
                {saleActive
                  ? formatPrice(selectedProduct.salePrice)
                  : formatPrice(selectedProduct.originalPrice)}
              </span>
              {saleActive && (
                <span className="ml-3 text-lg text-slate-500 line-through">
                  ${formatPrice(selectedProduct.originalPrice)}
                </span>
              )}
              {saleActive && (
                <span className="ml-3 bg-rose-900 text-rose-200 px-2 py-1 rounded text-sm font-medium">
                  Save $
                  {formatPrice(
                    selectedProduct.originalPrice - selectedProduct.salePrice
                  )}
                </span>
              )}
            </div>

            <p className="text-slate-300 mb-6 font-body">
              {selectedProduct.description}
            </p>

            <div className="mb-6">
              <div className="flex items-center mb-2">
                <Check className="w-5 h-5 text-teal-500 mr-2" />
                <span className="text-slate-300">
                  {selectedProduct.stock > 10
                    ? "In Stock"
                    : selectedProduct.stock > 0
                    ? `Only ${selectedProduct.stock} left in stock`
                    : "Out of Stock"}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-teal-500 mr-2" />
                <span className="text-slate-300">
                  Free shipping on orders over $50
                </span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Quantity
              </label>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-2 rounded-l-md transition"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <div className="w-16 text-center py-2 bg-slate-800 text-slate-100 font-medium border-y border-slate-600">
                  {quantity}
                </div>
                <button
                  onClick={() =>
                    setQuantity(Math.min(selectedProduct.stock, quantity + 1))
                  }
                  className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-2 rounded-r-md transition"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={() => {
                  addToCart(selectedProduct, quantity);
                  setQuantity(1);
                }}
                className="flex-1 bg-sky-600 hover:bg-sky-700 text-white py-3 px-6 rounded-lg font-medium transition flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(selectedProduct, quantity);
                  setCurrentPage("cart");
                  setQuantity(1);
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl shadow-md p-6 mb-12">
          <div className="border-b border-slate-700 mb-6">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab("details")}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === "details"
                    ? "border-b-2 border-teal-600 text-teal-500"
                    : "text-slate-400 hover:text-slate-300"
                }`}
              >
                Product Details
              </button>
              <button
                onClick={() => setActiveTab("specs")}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === "specs"
                    ? "border-b-2 border-teal-600 text-teal-500"
                    : "text-slate-400 hover:text-slate-300"
                }`}
              >
                Specifications
              </button>
            </div>
          </div>

          <div className="fade-in">
            {activeTab === "details" ? (
              <div>
                <h3 className="text-lg font-bold text-slate-100 mb-4 font-heading">
                  Features
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                  {selectedProduct.features &&
                    selectedProduct.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-teal-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300 font-body">
                          {feature}
                        </span>
                      </li>
                    ))}
                </ul>

                <h3 className="text-lg font-bold text-slate-100 mb-4 font-heading">
                  Description
                </h3>
                <p className="text-slate-300 font-body leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold text-slate-100 mb-4 font-heading">
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedProduct.specs &&
                    Object.entries(selectedProduct.specs).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex border-b border-slate-700 pb-2"
                        >
                          <span className="w-1/3 font-medium text-slate-400">
                            {key}
                          </span>
                          <span className="w-2/3 text-slate-300">{value}</span>
                        </div>
                      )
                    )}
                </div>
              </div>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-100 mb-6 font-heading">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-slate-700 hover-scale fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover cursor-pointer"
                      onClick={() => viewProduct(product)}
                    />
                    {saleActive && (
                      <span className="absolute top-2 right-2 bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {getDiscountPercentage(
                          product.originalPrice,
                          product.salePrice
                        )}
                        % OFF
                      </span>
                    )}
                  </div>

                  <div className="p-4 flex-grow flex flex-col">
                    <h3
                      className="font-medium text-slate-100 mb-1 cursor-pointer hover:text-teal-400 transition font-heading"
                      onClick={() => viewProduct(product)}
                    >
                      {product.name}
                    </h3>

                    <div className="mt-auto pt-2">
                      <div className="flex items-center mb-2">
                        <span className="font-bold text-slate-100">
                          $
                          {saleActive
                            ? formatPrice(product.salePrice)
                            : formatPrice(product.originalPrice)}
                        </span>
                        {saleActive && (
                          <span className="ml-2 text-xs text-slate-500 line-through">
                            ${formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 py-1.5 px-3 rounded-lg text-sm font-medium transition flex items-center justify-center"
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderCartPage = (): JSX.Element => {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-8 font-heading">
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-slate-800 rounded-xl shadow-md p-8 text-center">
            <ShoppingCart className="w-16 h-16 mx-auto text-slate-600 mb-4" />
            <h2 className="text-xl font-medium text-slate-100 mb-2 font-heading">
              Your cart is empty
            </h2>
            <p className="text-slate-400 mb-6 font-body">
              Looks like you haven't added any products to your cart yet.
            </p>
            <button
              onClick={() => setCurrentPage("shop")}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-slate-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b border-slate-700">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium text-slate-100 font-heading">
                      Cart Items (
                      {cartItems.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}
                      )
                    </h2>
                    <button
                      onClick={() => setCartItems([])}
                      className="text-sm text-rose-500 hover:text-rose-400"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-slate-700">
                  {cartItems.map((item, index) => (
                    <div
                      key={item.product.id}
                      className="p-6 flex flex-col sm:flex-row slide-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="sm:w-24 sm:h-24 mb-4 sm:mb-0 flex-shrink-0">
                        <img
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-lg cursor-pointer"
                          onClick={() => viewProduct(item.product)}
                        />
                      </div>
                      <div className="sm:ml-6 flex-1">
                        <div className="flex justify-between mb-2">
                          <h3
                            className="text-lg font-medium text-slate-100 cursor-pointer hover:text-teal-400 transition font-heading"
                            onClick={() => viewProduct(item.product)}
                          >
                            {item.product.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-slate-500 hover:text-rose-500"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-sm text-slate-400 mb-4 font-body">
                          {item.product.category}
                        </p>
                        <div className="flex flex-wrap justify-between items-end">
                          <div className="flex items-center border border-slate-600 rounded-md mb-2 sm:mb-0">
                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              className="px-3 py-1 text-slate-300 hover:bg-slate-700"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-3 py-1 text-slate-200">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="px-3 py-1 text-slate-300 hover:bg-slate-700"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center">
                              <span className="text-lg font-bold text-slate-100">
                                $
                                {saleActive
                                  ? formatPrice(
                                      (
                                        item.product.salePrice * item.quantity
                                      ).toFixed(2)
                                    )
                                  : formatPrice(
                                      (
                                        item.product.originalPrice *
                                        item.quantity
                                      ).toFixed(2)
                                    )}
                              </span>
                              {saleActive && (
                                <span className="ml-2 text-sm text-slate-500 line-through">
                                  $
                                  {formatPrice(
                                    (
                                      item.product.originalPrice * item.quantity
                                    ).toFixed(2)
                                  )}
                                </span>
                              )}
                            </div>
                            {item.quantity > 1 && (
                              <p className="text-sm text-slate-400">
                                $
                                {saleActive
                                  ? formatPrice(item.product.salePrice)
                                  : formatPrice(
                                      item.product.originalPrice
                                    )}{" "}
                                each
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-slate-800 rounded-xl shadow-md p-6 sticky top-24">
                <h2 className="text-lg font-medium text-slate-100 mb-4 font-heading">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Subtotal</span>
                    <span className="font-medium text-slate-200">
                      ${formatPrice(cartTotal.toFixed(2))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Shipping</span>
                    <span className="font-medium text-slate-200">$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tax (8%)</span>
                    <span className="font-medium text-slate-200">
                      ${formatPrice((cartTotal * 0.08).toFixed(2))}
                    </span>
                  </div>
                  <div className="border-t border-slate-700 pt-3 mt-3 flex justify-between">
                    <span className="font-bold text-slate-100">Total</span>
                    <span className="font-bold text-slate-100">
                      ${formatPrice((cartTotal * 1.08).toFixed(2))}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentPage("checkout")}
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-lg font-medium transition mb-3"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => setCurrentPage("shop")}
                  className="w-full bg-slate-700 text-sky-400 border border-sky-600 py-3 rounded-lg font-medium transition hover:bg-slate-700"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderCheckoutPage = (): JSX.Element => {
    if (cartItems.length === 0) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <ShoppingCart className="w-16 h-16 mx-auto text-slate-600 mb-4" />
          <h2 className="text-2xl font-medium text-slate-100 mb-2 font-heading">
            Your cart is empty
          </h2>
          <p className="text-slate-400 mb-6 font-body">
            You need to add items to your cart before checkout.
          </p>
          <button
            onClick={() => setCurrentPage("shop")}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            Shop Now
          </button>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-8 font-heading">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-medium text-slate-100 mb-4 font-heading">
                Shipping Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    name="name"
                    className="w-full p-2 border border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-slate-700 text-slate-100"
                    value={checkoutInfo.name}
                    onChange={handleCheckoutChange}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="w-full p-2 border border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-slate-700 text-slate-100"
                    value={checkoutInfo.email}
                    onChange={handleCheckoutChange}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Address
                </label>
                <input
                  name="address"
                  className="w-full p-2 border border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-slate-700 text-slate-100"
                  value={checkoutInfo.address}
                  onChange={handleCheckoutChange}
                  placeholder="123 Main St"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    City
                  </label>
                  <input
                    name="city"
                    className="w-full p-2 border border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-slate-700 text-slate-100"
                    value={checkoutInfo.city}
                    onChange={handleCheckoutChange}
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    ZIP Code
                  </label>
                  <input
                    name="zip"
                    className="w-full p-2 border border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-slate-700 text-slate-100"
                    value={checkoutInfo.zip}
                    onChange={handleCheckoutChange}
                    placeholder="10001"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-medium text-slate-100 mb-4 font-heading">
                Payment Information
              </h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Card Number
                </label>
                <input
                  name="card"
                  className="w-full p-2 border border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-slate-700 text-slate-100"
                  value={checkoutInfo.card}
                  onChange={handleCheckoutChange}
                  placeholder="4242 4242 4242 4242"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Expiry Date
                  </label>
                  <input
                    name="expiry"
                    className="w-full p-2 border border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-slate-700 text-slate-100"
                    value={checkoutInfo.expiry}
                    onChange={handleCheckoutChange}
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    CVV
                  </label>
                  <input
                    name="cvv"
                    className="w-full p-2 border border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-slate-700 text-slate-100"
                    value={checkoutInfo.cvv}
                    onChange={handleCheckoutChange}
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-slate-800 rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-medium text-slate-100 mb-4 font-heading">
                Order Summary
              </h2>

              <div className="max-h-60 overflow-y-auto mb-4">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center py-2 border-b border-slate-700 last:border-0"
                  >
                    <div className="w-12 h-12 flex-shrink-0">
                      <img
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="text-sm font-medium text-slate-100 font-heading">
                        {item.product.name}
                      </h4>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-400">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-sm font-medium text-slate-200">
                          $
                          {saleActive
                            ? formatPrice(
                                (
                                  item.product.salePrice * item.quantity
                                ).toFixed(2)
                              )
                            : formatPrice(
                                (
                                  item.product.originalPrice * item.quantity
                                ).toFixed(2)
                              )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="font-medium text-slate-200">
                    ${formatPrice(cartTotal.toFixed(2))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Shipping</span>
                  <span className="font-medium text-slate-200">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tax (8%)</span>
                  <span className="font-medium text-slate-200">
                    ${formatPrice((cartTotal * 0.08).toFixed(2))}
                  </span>
                </div>
                <div className="border-t border-slate-700 pt-3 mt-3 flex justify-between">
                  <span className="font-bold text-slate-100">Total</span>
                  <span className="font-bold text-slate-100">
                    ${formatPrice((cartTotal * 1.08).toFixed(2))}
                  </span>
                </div>
              </div>

              <button
                onClick={processOrder}
                disabled={
                  !checkoutInfo.name ||
                  !checkoutInfo.email ||
                  !checkoutInfo.address ||
                  !checkoutInfo.city ||
                  !checkoutInfo.zip ||
                  !checkoutInfo.card ||
                  !checkoutInfo.expiry ||
                  !checkoutInfo.cvv
                }
                className={`w-full py-3 rounded-lg font-medium transition mb-3 ${
                  !checkoutInfo.name ||
                  !checkoutInfo.email ||
                  !checkoutInfo.address ||
                  !checkoutInfo.city ||
                  !checkoutInfo.zip ||
                  !checkoutInfo.card ||
                  !checkoutInfo.expiry ||
                  !checkoutInfo.cvv
                    ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                    : "bg-teal-600 hover:bg-teal-700 text-white"
                }`}
              >
                Place Order
              </button>

              <button
                onClick={() => setCurrentPage("cart")}
                className="w-full bg-slate-700 text-teal-400 border border-teal-600 py-3 rounded-lg font-medium transition hover:bg-slate-700"
              >
                Back to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSuccessPage = (): JSX.Element => {
    if (!orderComplete) {
      setCurrentPage("shop");
      return <></>;
    }

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-slate-800 rounded-xl shadow-md p-8 text-center mb-8">
          <div className="w-16 h-16 bg-teal-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-teal-400" />
          </div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2 font-heading">
            Order Confirmed!
          </h1>
          <p className="text-slate-300 mb-6 font-body">
            Thank you for your purchase. Your order has been received.
          </p>
          <div className="inline-block bg-slate-700 rounded-lg px-4 py-2 mb-6">
            <span className="text-slate-400 text-sm">Order ID: </span>
            <span className="font-medium text-slate-200">
              {orderComplete.id}
            </span>
          </div>
          <p className="text-slate-300 font-body">
            We've sent a confirmation email to{" "}
            <span className="font-medium">{orderComplete.shipping.email}</span>{" "}
            with your order details.
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-xl font-medium text-slate-100 font-heading">
              Order Details
            </h2>
          </div>

          <div className="p-6 border-b border-slate-700">
            <div className="flex justify-between mb-2">
              <span className="text-slate-400">Order Date</span>
              <span className="font-medium text-slate-200">
                {orderComplete.date}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Order ID</span>
              <span className="font-medium text-slate-200">
                {orderComplete.id}
              </span>
            </div>
          </div>

          <div className="p-6 border-b border-slate-700">
            <h3 className="font-medium text-slate-100 mb-3 font-heading">
              Items
            </h3>
            <div className="space-y-4">
              {orderComplete.items.map((item) => (
                <div key={item.product.id} className="flex items-center">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="font-medium text-slate-100 font-heading">
                      {item.product.name}
                    </h4>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">
                        Qty: {item.quantity}
                      </span>
                      <span className="font-medium text-slate-200">
                        $
                        {saleActive
                          ? formatPrice(
                              (item.product.salePrice * item.quantity).toFixed(
                                2
                              )
                            )
                          : formatPrice(
                              (
                                item.product.originalPrice * item.quantity
                              ).toFixed(2)
                            )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 border-b border-slate-700">
            <h3 className="font-medium text-slate-100 mb-3 font-heading">
              Shipping Address
            </h3>
            <p className="text-slate-300 font-body">
              {orderComplete.shipping.name}
              <br />
              {orderComplete.shipping.address}
              <br />
              {orderComplete.shipping.city}, {orderComplete.shipping.zip}
            </p>
          </div>

          <div className="p-6">
            <h3 className="font-medium text-slate-100 mb-3 font-heading">
              Payment Summary
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Subtotal</span>
                <span className="text-slate-200">
                  ${formatPrice(orderComplete.total.toFixed(2))}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Shipping</span>
                <span className="text-slate-200">$0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tax</span>
                <span className="text-slate-200">
                  ${formatPrice(orderComplete.tax.toFixed(2))}
                </span>
              </div>
              <div className="border-t border-slate-700 pt-2 mt-2 flex justify-between">
                <span className="font-bold text-slate-100">Total</span>
                <span className="font-bold text-slate-100">
                  ${formatPrice(orderComplete.grandTotal.toFixed(2))}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setCurrentPage("shop")}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  };

  const renderDealsPage = (): JSX.Element => {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-100 mb-4 font-heading">
            Special Deals & Offers
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto font-body">
            Discover our exclusive deals and limited-time offers on premium
            electronics. Save big on the latest technology products.
          </p>
        </div>

        {saleActive && (
          <div className="bg-gradient-to-r from-sky-600 to-blue-700 rounded-2xl overflow-hidden shadow-xl mb-12">
            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-heading">
                  Flash Sale Now Live!
                </h2>
                <p className="text-teal-100 text-lg mb-6 max-w-lg font-body">
                  Hurry! These incredible deals won't last long. Save up to 50%
                  on selected items.
                </p>
                <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <span className="text-white font-medium">Ends in:</span>
                  <span className="text-xl font-mono font-bold text-white">
                    {timeLeft}
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <button className="bg-white text-purple-700 hover:bg-purple-50 font-bold px-8 py-3 rounded-lg shadow-lg transition">
                  Shop All Deals
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-sky-800 to-sky-900 rounded-xl p-6 text-white shadow-lg">
            <h3 className="text-xl font-bold mb-2 font-heading">
              Clearance Sale
            </h3>
            <p className="mb-4 text-sky-200 font-body">
              Up to 70% off on last season's tech
            </p>
            <button
              onClick={() => {
                setCurrentPage("shop");
                setCategory("All");
              }}
              className="bg-white text-sky-700 px-4 py-2 rounded-lg font-medium"
            >
              View Offers
            </button>
          </div>
          <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl p-6 text-white shadow-lg">
            <h3 className="text-xl font-bold mb-2 font-heading">
              Bundle Deals
            </h3>
            <p className="mb-4 text-blue-200 font-body">
              Save more when you buy together
            </p>
            <button
              onClick={() => {
                setCurrentPage("shop");
                setCategory("Audio");
              }}
              className="bg-white text-blue-700 px-4 py-2 rounded-lg font-medium"
            >
              View Bundles
            </button>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 text-white shadow-lg">
            <h3 className="text-xl font-bold mb-2 font-heading">
              Student Discounts
            </h3>
            <p className="mb-4 text-slate-200 font-body">
              Special offers for students with valid ID
            </p>
            <button
              onClick={() => {
                setCurrentPage("shop");
                setCategory("Gaming");
              }}
              className="bg-white text-slate-700 px-4 py-2 rounded-lg font-medium"
            >
              Learn More
            </button>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-100 mb-6 font-heading">
          Featured Deals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products
            .filter((p) => p.originalPrice - p.salePrice > 100)
            .map((product) => (
              <div
                key={product.id}
                className="bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-slate-700"
              >
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover cursor-pointer"
                    onClick={() => viewProduct(product)}
                  />
                  <span className="absolute top-4 right-4 bg-rose-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {getDiscountPercentage(
                      product.originalPrice,
                      product.salePrice
                    )}
                    % OFF
                  </span>
                </div>

                <div className="p-5 flex-grow flex flex-col">
                  <h3
                    className="font-semibold text-lg mb-1 text-slate-100 cursor-pointer hover:text-teal-400 transition font-heading"
                    onClick={() => viewProduct(product)}
                  >
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-300 mb-4 font-body">
                    {product.description.substring(0, 100)}...
                  </p>

                  <div className="mt-auto">
                    <div className="flex items-center mb-4">
                      <span className="text-2xl font-bold text-slate-100">
                        ${formatPrice(product.salePrice)}
                      </span>
                      <span className="ml-2 text-sm text-slate-500 line-through">
                        ${formatPrice(product.originalPrice)}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg font-medium transition flex items-center justify-center"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  const renderSupportPage = (): JSX.Element => {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-100 mb-4 font-heading">
            Customer Support
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto font-body">
            We're here to help with any questions or issues you might have. Our
            support team is available 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-800 p-6 rounded-xl shadow-md border border-slate-700">
            <div className="w-12 h-12 bg-sky-900 rounded-full flex items-center justify-center text-sky-400 mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-100 font-heading">
              Phone Support
            </h3>
            <p className="text-slate-300 mb-4 font-body">
              Call us directly for immediate assistance with your questions or
              concerns.
            </p>
            <p className="font-medium text-lg text-teal-400">
              +90 212 555 6789
            </p>
            <p className="text-sm text-slate-400">Available 24/7</p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl shadow-md border border-slate-700">
            <div className="w-12 h-12 bg-sky-900 rounded-full flex items-center justify-center text-sky-400 mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-100 font-heading">
              Email Support
            </h3>
            <p className="text-slate-300 mb-4 font-body">
              Send us an email and we'll get back to you within 24 hours.
            </p>
            <p className="font-medium text-lg text-teal-400">
              support@techelite.com
            </p>
            <p className="text-sm text-slate-400">Response within 24 hours</p>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-100 mb-6 font-heading">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-700">
              <h3 className="text-lg font-bold mb-2 text-slate-100 font-heading">
                What is your return policy?
              </h3>
              <p className="text-slate-300 font-body">
                We offer a 30-day return policy on all products. Items must be
                in their original condition with all packaging and accessories.
              </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-700">
              <h3 className="text-lg font-bold mb-2 text-slate-100 font-heading">
                How long does shipping take?
              </h3>
              <p className="text-slate-300 font-body">
                Standard shipping takes 3-5 business days. Express shipping is
                available for 1-2 business day delivery.
              </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-700">
              <h3 className="text-lg font-bold mb-2 text-slate-100 font-heading">
                Do you offer international shipping?
              </h3>
              <p className="text-slate-300 font-body">
                Yes, we ship to most countries worldwide. International shipping
                typically takes 7-14 business days.
              </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-700">
              <h3 className="text-lg font-bold mb-2 text-slate-100 font-heading">
                How do I track my order?
              </h3>
              <p className="text-slate-300 font-body">
                Once your order ships, you'll receive a tracking number via
                email. You can also track your order in your account dashboard.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-8 rounded-xl shadow-md border border-slate-700">
          <h2 className="text-2xl font-bold text-slate-100 mb-6 font-heading">
            Contact Us
          </h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className={`w-full p-2 border ${
                  formErrors.fullName ? "border-rose-500" : "border-slate-600"
                } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-slate-700 text-slate-100`}
                placeholder="John Doe"
                value={contactForm.fullName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setContactForm({ ...contactForm, fullName: e.target.value })
                }
              />
              {formErrors.fullName && (
                <p className="mt-1 text-sm text-rose-500">
                  {formErrors.fullName}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Email
              </label>
              <input
                type="email"
                className={`w-full p-2 border ${
                  formErrors.email ? "border-rose-500" : "border-slate-600"
                } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-slate-700 text-slate-100`}
                placeholder="john@example.com"
                value={contactForm.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setContactForm({ ...contactForm, email: e.target.value })
                }
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-rose-500">{formErrors.email}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Subject
              </label>
              <input
                type="text"
                className={`w-full p-2 border ${
                  formErrors.subject ? "border-rose-500" : "border-slate-600"
                } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-slate-700 text-slate-100`}
                placeholder="Order Question"
                value={contactForm.subject}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setContactForm({ ...contactForm, subject: e.target.value })
                }
              />
              {formErrors.subject && (
                <p className="mt-1 text-sm text-rose-500">
                  {formErrors.subject}
                </p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Message
              </label>
              <textarea
                rows={4}
                className={`w-full p-2 border ${
                  formErrors.message ? "border-rose-500" : "border-slate-600"
                } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-slate-700 text-slate-100`}
                placeholder="How can we help you?"
                value={contactForm.message}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setContactForm({ ...contactForm, message: e.target.value })
                }
              ></textarea>
              {formErrors.message && (
                <p className="mt-1 text-sm text-rose-500">
                  {formErrors.message}
                </p>
              )}
            </div>
            <div className="md:col-span-2">
              <button
                onClick={(e: FormEvent) => {
                  e.preventDefault();

                  const errors: FormErrors = {};
                  if (!contactForm.fullName.trim())
                    errors.fullName = "Full name is required";
                  if (!contactForm.email.trim())
                    errors.email = "Email is required";
                  else if (!/\S+@\S+\.\S+/.test(contactForm.email))
                    errors.email = "Email is invalid";
                  if (!contactForm.subject.trim())
                    errors.subject = "Subject is required";
                  if (!contactForm.message.trim())
                    errors.message = "Message is required";

                  setFormErrors(errors);

                  if (Object.keys(errors).length === 0) {
                    addNotification(
                      "Message sent successfully! We'll get back to you shortly!",
                      "success"
                    );
                    setContactForm({
                      fullName: "",
                      email: "",
                      subject: "",
                      message: "",
                    });
                  }
                }}
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                Submit Message
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 font-body">
      <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white sticky top-0 z-30 shadow-lg shadow-sky-900/20 border-b border-sky-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => {
                  setCurrentPage("shop");
                  setCategory("All");
                }}
                className="flex items-center cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-sky-500 via-blue-500 to-sky-600 p-2 rounded-lg shadow-lg mr-2 transform -rotate-3">
                    <Monitor className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 font-heading tracking-tight">
                      TECH<span className="text-white">ELITE</span>
                    </span>
                    <span className="text-[10px] text-sky-400 uppercase tracking-widest -mt-1 font-semibold">
                      Premium Electronics
                    </span>
                  </div>
                </div>
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => {
                  setCurrentPage("shop");
                  setCategory("All");
                }}
                className={`text-slate-300 hover:text-white transition relative group cursor-pointer ${
                  currentPage === "shop" ? "text-white font-medium" : ""
                }`}
              >
                Shop
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-400 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button
                onClick={() => setCurrentPage("deals")}
                className={`text-slate-300 hover:text-white transition relative group cursor-pointer ${
                  currentPage === "deals" ? "text-white font-medium" : ""
                }`}
              >
                Deals
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-400 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button
                onClick={() => setCurrentPage("support")}
                className={`text-slate-300 hover:text-white transition relative group cursor-pointer ${
                  currentPage === "support" ? "text-white font-medium" : ""
                }`}
              >
                Support
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-400 group-hover:w-full transition-all duration-300"></span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer focus:outline-none">
                <Search className="h-5 w-5" />
              </button>

              <div className="relative">
                <button
                  onClick={() => setCurrentPage("cart")}
                  className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer focus:outline-none"
                >
                  <ShoppingCart className="h-5 w-5" />
                </button>
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform bg-sky-600 rounded-full shadow-lg">
                    {cartItems.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </span>
                )}
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-800 shadow-lg border-t border-slate-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => {
                  setCurrentPage("shop");
                  setCategory("All");
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md ${
                  currentPage === "shop"
                    ? "bg-slate-700 text-white"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                Shop
              </button>
              <button
                onClick={() => {
                  setCurrentPage("deals");
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md ${
                  currentPage === "deals"
                    ? "bg-slate-700 text-white"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                Deals
              </button>
              <button
                onClick={() => {
                  setCurrentPage("support");
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md ${
                  currentPage === "support"
                    ? "bg-slate-700 text-white"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                Support
              </button>
            </div>
          </div>
        )}
      </header>

      {saleActive && (currentPage === "shop" || currentPage === "product") && (
        <div className="bg-gradient-to-r from-sky-800 to-blue-800 text-white py-3 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-2 md:mb-0">
              <Zap className="w-6 h-6 mr-2 animate-pulse" />
              <span className="font-bold text-xl font-heading">FLASH SALE</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm opacity-90">
                Hurry! Limited time offers end in:
              </p>
              <div className="text-2xl font-mono font-bold">{timeLeft}</div>
            </div>
          </div>
        </div>
      )}

      <main>{renderPage()}</main>

      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`px-4 py-3 rounded-lg shadow-lg flex items-center slide-in ${
              notification.type === "success"
                ? "bg-sky-600 text-white"
                : notification.type === "error"
                ? "bg-rose-600 text-white"
                : "bg-blue-600 text-white"
            }`}
          >
            {notification.type === "success" && (
              <CheckCircle className="w-5 h-5 mr-2" />
            )}
            {notification.type === "error" && <X className="w-5 h-5 mr-2" />}
            {notification.type === "info" && <Info className="w-5 h-5 mr-2" />}
            {notification.message}
          </div>
        ))}
      </div>

      <footer className="bg-slate-800 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4 font-heading">
                TechElite
              </h3>
              <p className="text-sm font-body">
                Your premier destination for cutting-edge electronics and tech
                accessories.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4 font-heading">Shop</h4>
              <ul className="space-y-2 text-sm font-body">
                <li>
                  <button
                    onClick={() => {
                      setCurrentPage("shop");
                      setCategory("All");
                      window.scrollTo(0, 0);
                    }}
                    className="hover:text-teal-400 transition"
                  >
                    All Products
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setCurrentPage("deals");
                      window.scrollTo(0, 0);
                    }}
                    className="hover:text-teal-400 transition"
                  >
                    Deals
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setCurrentPage("shop");
                      setCategory("All");
                      window.scrollTo(0, 0);
                    }}
                    className="hover:text-teal-400 transition"
                  >
                    New Arrivals
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setCurrentPage("deals");
                      window.scrollTo(0, 0);
                    }}
                    className="hover:text-teal-400 transition"
                  >
                    Clearance
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4 font-heading">
                Support
              </h4>
              <ul className="space-y-2 text-sm font-body">
                <li>
                  <button
                    onClick={() => {
                      setCurrentPage("support");
                      window.scrollTo(0, 0);
                    }}
                    className="hover:text-teal-400 transition"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setCurrentPage("support");
                      window.scrollTo(0, 0);
                    }}
                    className="hover:text-teal-400 transition"
                  >
                    FAQs
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setCurrentPage("support");
                      window.scrollTo(0, 0);
                    }}
                    className="hover:text-teal-400 transition"
                  >
                    Shipping
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setCurrentPage("support");
                      window.scrollTo(0, 0);
                    }}
                    className="hover:text-teal-400 transition"
                  >
                    Returns
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4 font-heading">
                Stay Connected
              </h4>
              <div className="flex space-x-4 mb-4">
                <a
                  href="#"
                  className="text-slate-400 hover:text-teal-400 transition"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-teal-400 transition"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
