# moniker-clone
# Moniker Clone

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is a clone of the Moniker app, built using React Native and Expo. It aims to replicate the core functionalities and gameplay experience of the Moniker board game.

## Getting Started

Follow these steps to get a local copy of the project running on your machine.

### Prerequisites

Make sure you have the following installed on your system:

* **Node.js:** (Ideally the latest LTS version) - [https://nodejs.org/](https://nodejs.org/)
* **npm** (Node Package Manager) - Usually comes bundled with Node.js
* **Expo CLI:** You can install it globally using npm:
    ```bash
    npm install -g expo-cli
    ```
    or using yarn:
    ```bash
    yarn global add expo-cli
    ```
* **A mobile device (iOS or Android) or an emulator/simulator:**
    * **Expo Go App:** Install the Expo Go app on your physical device from the App Store (iOS) or Google Play Store (Android).
    * **iOS Simulator:** Comes bundled with Xcode (available on macOS).
    * **Android Emulator:** Can be set up using Android Studio.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [YOUR_REPOSITORY_URL]
    cd [YOUR_CLONED_REPOSITORY_NAME]
    ```
    *(Replace `[YOUR_REPOSITORY_URL]` with the actual URL of your Moniker clone repository and `[YOUR_CLONED_REPOSITORY_NAME]` with the name of the directory created after cloning.)*

2.  **Install npm packages:**
    Navigate to the project directory in your terminal and run:
    ```bash
    npm install
    ```
    or if you prefer using yarn:
    ```bash
    yarn install
    ```
    This command will download and install all the necessary dependencies listed in the `package.json` file.

## Running the Application

Once the dependencies are installed, you can start the Expo development server.

1.  **Start the Expo development server:**
    In your project directory, run one of the following commands:

    Using npm:
    ```bash
    npx expo start
    ```

    Using yarn:
    ```bash
    yarn expo start
    ```

    This command will:
    * Build your JavaScript bundle.
    * Generate a QR code in your terminal.
    * Open the Expo DevTools in your web browser.

2.  **Run the app on your device or simulator/emulator:**

    * **Physical Device (Expo Go):** Open the Expo Go app on your iOS or Android device and scan the QR code displayed in your terminal or the Expo DevTools. The app will then load and run on your device.

    * **iOS