## Pantry Explorer — Product Discovery & Organization App

**Pantry Explorer** is a scalable front-end application built on top of the OpenFoodFacts API, designed to explore, curate, and organize food products into personalized collections.

The app combines **remote product discovery** with **local state management**, allowing users to search for products, save them into a personal “pantry,” and organize them into custom categories such as *Breakfast*, *High-protein*, or *To try*. Users can also compare products within categories using structured nutritional data.

---

## Core Features

* **Product Discovery**

  * Search and filter products via OpenFoodFacts API
  * Paginated results with async request handling

* **Product Details**

  * View nutritional data, brand, and Nutri-Score
  * Add/remove products from personal pantry

* **Pantry Management**

  * Persist a curated list of saved products
  * Assign products to one or multiple categories

* **Category System**

  * Create, rename, and delete custom collections
  * View grouped products per category

* **Product Comparison**

  * Tabular comparison (e.g., sugars, nutrition grade, brand)

---

## Architecture & State Design

The app emphasizes **scalable state modeling using Redux Toolkit**, with a clear separation of concerns:

### 1. Remote Data Layer (`products` slice)

* Normalized product entities (`productsById`)
* Search state (query, filters, pagination, result IDs)
* Async lifecycle handling (loading, error, caching)

### 2. UI State Layer (`catalogUI` slice)

* Query and filter state (Nutri-Score, brand, etc.)
* Sorting and pagination controls
* Selection state for future bulk actions

### 3. Local Domain Layer (`collections` slice — Phase 2)

* User-defined categories
* Many-to-many relationships between products and categories
* Local-only metadata (tags, notes)

---

## Technical Highlights

* **Redux Toolkit with normalized state** for efficient entity management
* **Async thunks** for API interaction and request lifecycle control
* **Separation of remote vs local state**, enabling scalable architecture
* **Relational data modeling** (many-to-many: products ↔ categories)
* **Memoized selectors** for derived views (e.g., filtered pantry, category contents)
* **Extensible architecture** supporting future features without refactoring

---

## Scalability & Extensions

The project is intentionally scoped small but designed to grow:

* Bulk selection and category assignment
* Offline persistence (localStorage / Redux Persist)
* Advanced filtering (e.g., low sugar, missing data)
* Infinite scroll / pagination improvements
* User annotations (notes, tags)

---

## Key Takeaway

This project demonstrates the ability to design and implement a **real-world, scalable front-end architecture**, balancing:

* API-driven data
* Complex local state
* Clean separation of concerns
* Maintainable and extensible Redux patterns

---
