# Khaleex.com 🇨🇭🇦🇪

This is an exclusive premium concierge application for wealthy travelers from the UAE and Saudi Arabia visiting Europe, offering luxury car rentals, hotels, and unique VIP experiences in Switzerland.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and a package manager (like npm or yarn) installed.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/khaleeg-travel-concierge.git
    cd khaleeg-travel-concierge
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

3.  **Set up Environment Variables (Crucial for Security!)**

    This project requires an API key for the Google Gemini API to function.

    -   Create a file named `.env` in the root of the project.
    -   Add your API key to this file as shown below:

    ```env
    API_KEY="YOUR_GEMINI_API_KEY_HERE"
    ```

    **Important:** The `.gitignore` file is configured to prevent the `.env` file from ever being committed to GitHub. This keeps your API key secure and private.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    or
    ```bash
    yarn dev
    ```

The application should now be running on your local server!