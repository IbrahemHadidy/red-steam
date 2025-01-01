# Red-Steam Frontend

Red-Steam is a comprehensive web application that functions as a Steam clone, designed to manage game libraries, user accounts, and more. This project serves as both a learning exercise and a demonstration of my web development skills. It has allowed me to explore and apply technologies such as Next.js, React, Redux Toolkit, and RTK Query in a real-world and challenging context.

## Features

- User-friendly interface to manage game libraries.
- Dynamic routing with Next.js.
- State management powered by Redux Toolkit and RTK Query.
- Modular architecture for scalability and maintainability: The application is structured into modular components and features, making it easy to develop, test, and extend each part independently. This approach allows for efficient management of code, better separation of concerns, and facilitates parallel development.
- Custom admin panels for full content and user management.
- Dynamic forms for creating, updating, and managing game details, media, and promotional offers.
- User role management and permissions for different admin statuses.
- Advanced search functionality with filters, similar to Steam's search experience.
- Custom media carousels for game media presentation, similar to Steam.
- Secure authentication and user authorization.
- User profile management with account settings.
- Sandbox environment for testing PayPal payment integration.
- Integrated game shopping cart, wishlist, and purchase workflow.

## Technologies

- **Next.js 15** (with the App Router) for advanced routing
- **React 19**
- **Redux Toolkit** for simplified state management.
- **RTK Query** for data fetching and caching.
- **TypeScript** for ensuring type safety and better maintainability while scaling.
- **SCSS** for a maintainable CSS.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or above).
- [pnpm](https://pnpm.io/) package manager.

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/IbrahemHadidy/red-steam-frontend.git
   cd red-steam-frontend
   ```
2. **Install dependencies using pnpm**:
   ```bash
   pnpm install
   ```
3. **Set up environment variables**:
   Copy the sample.env file and rename it to .env.local and update the values according to your local environment.

4. **Run the development server**:
   ```bash
   pnpm dev
   ```
5. **Open http://localhost:3000 (or the port you've configured) in your browser.**

## Known Issues

The following features are currently under development or not functioning as intended:

- **Navbar Links**: The links on the navbar are static placeholders and are not functional yet.
- **Notifications**: Notifications are a placeholder and not yet integrated.
- **Your Queue**: The "Your Queue" feature is not integrated yet and is currently not working.
- **Community Features**: All community-based features are disabled as the community system is not implemented yet.
- **Phone Settings**: Phone-related settings, including adding or updating phone numbers, are currently disabled and non-functional.
- **Image Loading**: `[Error [TimeoutError]: The operation was aborted due to timeout]` occurs when using the Next.js `Image` component, as images are slow to load on the server due to the absence of a CDN.

## Requirements

This project should be run alongside the [Red-Steam Backend](https://github.com/IbrahemHadidy/red-steam-backend). Ensure that the backend is up and running at `http://localhost:4000/api` or modify the `NEXT_PUBLIC_BACKEND_API_URL` in your `.env.local` file as needed.

## Build for Production

1. **Build the application:**
   ```bash
   pnpm build
   ```
2. **Start the production server:**
   ```bash
   pnpm start
   ```

## Future Plans

If the project continues, the following features are planned for potential development:

- **OTP Authentication**: Implementation of One-Time Password (OTP) functionality to enhance security. OTPs will be used for the following scenarios:
  - Adding or changing a phone number to verify ownership.
  - Logging in to ensure secure access, especially for sensitive accounts. OTPs can be delivered via SMS or through authenticator apps for a seamless and secure user experience.
- **Friend Management**: Allow users to connect and manage their social circle with the following capabilities:
  - Adding friends to build a personal network.
  - Blocking or removing users to control interactions and ensure a safe environment.
- **Notifications System**: A robust notification system to keep users informed about important updates and activities, such as:
  - Offers or discounts on games in their wishlist.
  - New game releases that align with their interests.
  - Friend requests and social interactions.
  - Login attempts from new devices or locations.
  - Successful checkouts or completed transactions.
- **Enhanced Authentication**: Advanced session control to improve account security, including:
  - Viewing and managing active sessions across multiple devices.
  - The ability to remotely log out from specific devices.
  - Alerts for new logins from unrecognized devices or locations.
  - Optional device-based session persistence with enhanced security measures, such as re-authentication for sensitive actions.
- **Chat System**: Real-time messaging between users.
- **Community Features**: Interactive forums, group chats, user-managed groups, and event scheduling.
- **Enhanced User Profiles**: Public and private profile views with customizable settings.
  > **Note**: This list is not exhaustive. Additional features and improvements may be added depending on the areas I wish to explore and learn in the future.

## Disclaimer
This project is an educational replica of the Steam website created solely for learning purposes. Some CSS styles and design elements are inspired by the original Steam website to replicate certain features for educational practice.

This project is not affiliated with, endorsed by, or associated with Valve Corporation or Steam in any way.
