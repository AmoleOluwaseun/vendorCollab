# Vendor Collaboration System

## Project Overview

The Vendor Collaboration System is a web-based platform designed to streamline interactions between the company and its vendors. It facilitates vendor management, product catalog browsing, Request for Quotation (RFQ) processes, purchasing, and invoicing.

The project uses **Bootstrap 5** for the UI and a **custom JavaScript partials loader** (`assets/js/partials-loader.js`) to modularize headers and navigation.

## Project Flow & Modules

The application is organized into several key modules, all accessible from the main **Dashboard**.

### 1. Dashboard

- **Page:** `index.html`
- **Function:** Serves as the central hub. Changes include the removal of legacy widgets and the addition of a "Project Pages" table that provides direct links to all implemented features.

### 2. Vendors Module

Manage vendor relationships and profiles.

- **All Vendors** (`vendors.html`): List of all registered vendors.
- **Vendor Profile** (`vendors-view.html`): Detailed view of a vendor, including their store items and transaction history.
- **Onboard Vendor** (`customers-create.html`): Form to register and onboard new vendors.

### 3. Item Catalog Module

Browse and manage products available in the system.

- **Browse Items** (`browse-items.html`): specific grid view of items with search and filtering (Category, Vendor, Price).
- **Item Details** (`item-details.html`): Detailed view of a specific product with options to contact the vendor or request a quote.
- **Add Item** (`projects-create.html`): Interface for vendors or admins to add new items to the catalog.

### 4. RFQ (Request for Quotation) & Bidding

Manage the procurement process through quotes.

- **All RFQs** (`rfq-list.html`): List of active RFQs with status indicators.
- **RFQ Details** (`rfq-view.html`): View specific RFQ requirements. Vendors can submit quotes here via a modal.
- **Create RFQ** (`rfq-create.html`): Form to generate a new Request for Quotation.
- **RFQ Submissions** (`rfq-submissions.html`): Admin view to compare vendor quotes for a specific RFQ.

### 5. Purchase Module

Handle orders and checkout processes.

- **Transaction History** (`purchase-list.html`): Log of past purchases and their statuses.
- **Shopping Cart** (`purchase-cart.html`): Review selected items before purchase.
- **Checkout** (`purchase-checkout.html`): Shipping address input and payment selection (Credit/Debit Card, Bank Transfer).

### 6. Invoices

Manage billing and financial records.

- **Order Details** (`invoice-view.html`): View specific invoice details.
- **Create Order** (`invoice-create.html`): Generate new manual orders or invoices.

---

## Technical Implementation

### Partial Loading

To maintain consistency and reduce code duplication, the project uses a client-side inclusion strategy:

- **Loader Script:** `assets/js/partials-loader.js`
- **Navigation:** `partials/navigation.html`
- **Header:** `partials/header.html`
- **Usage:** Pages include `div` placeholders (`id="nav-placeholder"`, `id="header-placeholder"`) which are populated by the loader script on page load.

### Key Libraries

- **Bootstrap 5**: Core UI framework.
- **jQuery**: Used for DOM manipulation and some plugin dependencies.
- **Feather Icons**: Icon set used throughout the application.
- **ApexCharts**: Used for dashboard analytics (where applicable).

---

## Future Roadmap & Pending Pages

### Immediate Needs

- **Backend Integration**: Currently, the frontend functionality (forms, buttons) is static or local-only. API integration is needed for:
  - Vendor authentication.
  - Dynamic data loading for tables and grids.
  - Form submissions (RFQ, Orders, Vendor Onboarding).

### Refactoring

- **Legacy Pages**: Several pages still use the old static structure and need to be updated to use the `partials-loader.js` system:
  - `customers.html` (Refactor pending)
  - `projects.html` (Refactor pending)
  - `payment.html` (Refactor pending)
  - Settings pages (e.g., `settings-general.html`, `settings-seo.html`)

### New Features

- **User Authentication**: Login/Register pages with actual authentication logic (currently using templates like `auth-login-cover.html`).
- **Notifications**: Real-time updates for RFQ submissions and order status changes.
