# Dream Destinations - React CRUD App

Overview:
---------
A React CRUD (Create, Read, Update, Delete) application to manage your list of dream travel destinations. This app uses **JSON Server** as a mock backend and **Axios** for API requests.

## Tech Stack

- **Frontend**: HTML, CSS, ReactjS (Vite)
- **Backend (Mock API)**: JSON Server
- **HTTP Client**: Axios
- **State Management**: useState, useEffect

## Features

- Add new dream destinations
- View all saved destinations
- Edit existing entries
- Delete unwanted destinations
- All form fields supported:
  - `Text input` – Destination name, country, Place etc.
  - `Radio buttons` – Travel type (e.g., Solo, Family, Couple)
  - `Checkboxes` – Activities (e.g., Hiking, Beach, City Tour)
  - `Select dropdown` – Continent
  - `Textarea` – Description
  - `Image upload` – Display image using file URL (stored as base64 or link)

## Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/dream-destinations.git
cd dream-destinations
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start JSON Server

```bash
npx json-server --watch db.json --port 5000
```

### 4. Start the React App

```bash
npm run dev
```

---

## Sample JSON Format (db.json)

```json
{
  "destinations": [
    {
      "id": 1,
      "name": "Paris",
      "country": "France",
      "continent": "Europe",
      "type": "Couple",
      "activities": ["Sightseeing", "Museum"],
      "description": "The city of lights and love.",
      "image": "https://example.com/paris.jpg"
    }
  ]
}
```

## License
MIT License. Free to use and modify.
