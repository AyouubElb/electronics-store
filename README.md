# TechElite Electronics Store

A modern, responsive e-commerce web application for an electronics store built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop devices
- **Product Catalog**: Browse products by category with filtering options
- **Product Details**: Detailed product pages with specifications, features, and related products
- **Shopping Cart**: Add, remove, and update quantities of products in your cart
- **Checkout Process**: Multi-step checkout with shipping and payment information
- **Order Confirmation**: Detailed order summary and confirmation
- **Flash Sales**: Time-limited sales with countdown timer
- **Special Deals**: Featured deals and discounts
- **Customer Support**: Contact form and FAQ section

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation
- **TypeScript**: Type-safe JavaScript for better developer experience
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide Icons**: Modern icon library
- **React Hooks**: For state management and side effects

## Project Structure

\`\`\`
electronics-store/
├── app/                  # Next.js app directory
│   ├── page.tsx          # Main entry point
│   ├── layout.tsx        # Root layout
│   ├── globals.css       # Global styles
│   └── loading.tsx       # Loading state
├── components/           # React components
│   ├── ElectronicsStore.tsx  # Main component
│   ├── layout/           # Layout components (Header, Footer)
│   ├── pages/            # Page components
│   └── ui/               # UI components
├── data/                 # Data files
│   └── products.ts       # Product data
├── types/                # TypeScript type definitions
│   └── index.ts          # Type interfaces
├── utils/                # Utility functions
│   └── helpers.ts        # Helper functions
└── public/               # Static assets
\`\`\`

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/AyouubElb/electronics-store.git
   cd electronics-store
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

### Browsing Products

- View all products on the home page
- Filter products by category using the category buttons
- Click on a product card to view detailed information

### Shopping

1. Add products to your cart from the product listing or product detail page
2. View your cart by clicking the cart icon in the header
3. Adjust quantities or remove items in the cart page
4. Proceed to checkout
5. Fill in shipping and payment information
6. Complete your order

### Special Deals

- Check the "Deals" page for special offers and discounts
- Limited-time flash sales are indicated with a countdown timer
