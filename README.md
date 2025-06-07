# 📣 WhatsApp Campaign Hub

A modern Laravel + Inertia.js + React-based dashboard for managing WhatsApp marketing campaigns, contacts, reports, and scheduling with a clean and intuitive UI.

## 🚀 Features

- 📋 Contact Management (Add, Edit, Delete, Import)
- 📈 Dashboard with campaign and contact stats
- 📊 Campaign Insights and Reports
- 🗓️ Campaign Scheduling
- ⚙️ Simple Settings Page (placeholder)
- 🧾 CSV/Excel Contact Import UI
- 📦 API-ready structure using Laravel controllers and Inertia responses

## 🧱 Tech Stack

- **Backend:** Laravel 10+, PHP 8+
- **Frontend:** React + Inertia.js
- **Styling:** TailwindCSS
- **Icons:** Lucide
- **State Management:** useState (React), Inertia.js props

## 🗂 Project Structure

```
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── ContactController.php
│   ├── Models/
│   │   └── Contact.php
│
├── resources/
│   └── js/
│       ├── Pages/
│       │   ├── DashboardPage.tsx
│       │   ├── ContactsPage.tsx
│       │   ├── CampaignsPage.tsx
│       │   ├── ReportsPage.tsx
│       │   └── SchedulePage.tsx
│       └── components/
│           └── contacts/
│               ├── ContactForm.tsx
│               └── ContactsList.tsx
│
├── database/
│   ├── factories/
│   │   └── ContactFactory.php
│   └── seeders/
│       └── DatabaseSeeder.php
```

## 📦 Installation

### 1. Clone the Repository

    ```bash
    git clone https://github.com/AngeArsene/WhatsApp_Campaign_Hub.git
    cd whatsapp-campaign-hub
    ```

### 2. Install Dependencies

   ```bash
   composer install
   npm install
   ```
### 3. Setup Environment

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

### 4. Run Migrations and Seeders

   ```bash
   php artisan migrate --seed
   ```

### 5. Build assets:

   ```bash
   npm run build
   ```
### 6. Start development servers:

   ```bash
   composer run dev
   ```
   - Visit http://localhost:8000 to view the app.

## 📥 Contact Import Format

**Supported formats:**

- `.csv`
- `.xlsx`
- `.xls`

**Required columns:**

- `first_name`
- `last_name`
- `phone_number`

> 💡 You can download a sample template from the import modal in the app.

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

MIT License.

---

Made with ❤️ using **Laravel** & **React**.
For questions or support, please open an issue on GitHub.
