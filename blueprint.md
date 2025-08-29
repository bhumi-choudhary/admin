## Header Component

## Invoice Management Dashboard UI Blueprint

This blueprint outlines the structure, components, styling, and functionality of the Invoice Management Dashboard UI. The goal is to create a modern, responsive, and intuitive interface for managing invoices.

### Overall Layout

The application will utilize a consistent layout across most pages, consisting of a sidebar for navigation and a main content area. The main content area will adapt based on the selected page.

### Styling

The application will primarily use **Tailwind CSS** for styling, providing a utility-first approach for rapid UI development and responsiveness. **Material-UI** components will be integrated where appropriate for specific UI elements that benefit from pre-built components and styling.

### Theme

The application will support both light and dark themes, allowing users to personalize their experience. The theme will be managed using React Context.

### Responsiveness

The UI will be fully responsive, adapting its layout and components for optimal viewing on various screen sizes (desktops, tablets, and mobile phones) using Tailwind CSS's responsive utility classes.

### New Invoice Management Page

A new page for Invoice Management will be created at `/src/pages/Invoices.jsx`. This page will serve as the central hub for viewing, adding, editing, and deleting invoices.

#### Layout

The layout of the `Invoices.jsx` page will follow the overall application layout with the sidebar and main content area. The main content area will contain:

1.  **Top Stats Cards:** A component displaying key statistics related to invoices.
2.  **Invoice Table:** A table displaying a list of invoices with relevant details.
3.  **Filtering and Sorting Options:** UI elements for filtering and sorting the invoice list.
4.  **Add New Invoice Button:** A prominent button to initiate the process of adding a new invoice.

#### Components

*   **`src/pages/Invoices.jsx`:** The main page component.
*   **`src/components/TopCards.jsx`:** A new reusable component to display key statistics in card format. This component will be placed at the top of the `Invoices.jsx` page and potentially other dashboard pages. It will accept data as props to display different statistics.
*   **Invoice Table Component:** (Existing or new as needed) Component responsible for rendering the table of invoices.
*   **`src/pages/ViewInvoice.jsx`:** A new page component to display the details of a specific invoice.
*   **Filtering and Sorting Components:** (Existing or new as needed) Components for handling filter and sort logic and UI.

#### Styling (Tailwind CSS & Material-UI)

*   **`src/pages/Invoices.jsx`:** Will use Tailwind CSS for overall layout, spacing, and responsiveness.
*   **`src/components/TopCards.jsx`:** Will use Tailwind CSS for card layout, background colors, text styling, and responsiveness. Material-UI Card components can be considered for a more structured card appearance.
*   **Invoice Table:** Will be styled using Tailwind CSS for table structure and Material-UI Table components for enhanced functionality and appearance (e.g., pagination, sorting icons).
*   **Filtering and Sorting Components:** Will utilize a combination of Tailwind CSS for layout and Material-UI components like Select, TextField, and Button for input and interaction elements.

#### View Invoice Page

### Testimonial Review Section

A new section will be added to the application to display customer reviews. This section will feature a responsive grid of testimonial review cards.

#### Layout

The layout will be a grid that adapts to different screen sizes:
- Desktop: 4 cards in a row.
- Tablet: 2 cards in a row.
- Mobile: 1 card per row (stacked vertically).

Each card will have a rounded rectangle shape and a soft shadow.

#### Card Structure

#### Interactivity

*   **Top Stats Cards:** May include hover effects or subtle animations.
*   **Invoice Table:** Will allow sorting by different columns, filtering based on various criteria, and potentially row selection for bulk actions. Each row will likely have actions like "View Details," "Edit," and "Delete."
*   **Add New Invoice Button:** Will trigger a modal or navigate to a separate page/form for adding a new invoice.

### Modifications to Existing Files

Each review card will include the following elements:

1.  **Review Location and Date:** Bold text at the top displaying "Reviewed in [Country] on [Date]".
2.  **Review Text:** A short paragraph containing the customer's review in a clean sans-serif font.
3.  **Star Rating:** A 4.5-star rating displayed using yellow stars, accompanied by a short label like "Excellent Quality".
4.  **Footer:** A horizontal footer in light blue containing:
    *   Customer's circular profile picture.
    *   Customer's name in bold white text.
    *   Customer's job title or role in smaller white text.
5.  **Decorative Icon:** A decorative quotation mark icon on the right side of the card.

#### Styling

The section and cards will utilize a light background, smooth rounded corners, and professional, clean spacing. Tailwind CSS will be used for layout, spacing, and responsiveness, while Material-UI components may be used for elements like avatars, rating stars, or icons to maintain a consistent UI.

*   **`src/components/Sidebar.jsx`:** The sidebar navigation will be updated to include a link to the new "Invoices" page (`/invoices`). The icon for this link should be relevant to invoicing (e.g., a document with a currency symbol).
*   **`src/App.jsx`:** The routing configuration will be updated to include a route for `/invoices` that renders the `Invoices.jsx` component.
*   **`src/App.jsx`:** A new route will be added for the 'View Invoice' page (`/invoices/:invoiceId`) that renders the `ViewInvoice.jsx` component.
*   **`src/pages/Invoices.jsx`:** The 'View' action button in the Invoice Table will be modified to navigate to the 'View Invoice' page, passing the `invoiceId` of the clicked row as a route parameter.


### Vendor Detail Page

A new page will be created to display detailed information about a specific vendor. This page will be accessible by clicking a "View Details" icon or button within the vendor list table on the `/vendors` page. The UI will be designed to provide comprehensive vendor details relevant to an admin user, maintaining the existing blue and white theme and overall admin panel aesthetic.

#### Layout

The layout of the Vendor Detail page will follow the overall application layout with the sidebar and main content area. The main content area will display the vendor's information in a clear and organized manner. Sections might include:

1.  **Vendor Overview:** Basic information like name, contact details, and status.
2.  **Product Listings:** A list or table of products associated with the vendor.
3.  **Order History:** A summary or list of orders involving this vendor.
4.  **Performance Metrics:** Relevant statistics or charts related to the vendor's performance.
5.  **Notes/Internal Comments:** A section for admin users to add internal notes about the vendor.

#### Components

*   **`src/pages/ViewVendor.jsx`:** A new page component to display the details of a specific vendor.
*   **Vendor Detail Component(s):** Reusable components within `ViewVendor.jsx` to display specific sections of vendor information (e.g., a component for contact details, a component for product listings).
*   **Vendor List Table Component:** (Existing) This component will be modified to include an action button/icon to navigate to the `ViewVendor.jsx` page.

#### Styling (Tailwind CSS & Material-UI)

*   **`src/pages/ViewVendor.jsx`:** Will use Tailwind CSS for overall layout, spacing, and responsiveness.
*   **Vendor Detail Components:** Will use a combination of Tailwind CSS for layout and styling, and potentially Material-UI components like Cards, Lists, Tables, and Typography for displaying the information in a structured and visually appealing way.
*   **Vendor List Table Component:** The added action button/icon will be styled using Tailwind CSS and potentially Material-UI Icons.

#### Interactivity

*   **Vendor List Table:** Each row will have an action button/icon (e.g., an eye icon or a "Details" button) that, when clicked, navigates the user to the `ViewVendor.jsx` page, passing the vendor's ID as a route parameter.
*   **View Vendor Page:** May include buttons for editing vendor information (navigating to an edit page or opening a modal), or actions like suspending/activating the vendor.

#### Modifications to Existing Files

*   **Tailwind CSS Configuration:** Ensure `tailwind.config.js` is correctly configured to include the necessary file paths for scanning Tailwind classes.
*   **Material-UI Setup:** Verify that Material-UI is correctly installed and configured in the project.

### Theme Context Integration

The header component (`src/components/Header.jsx`) serves as the top navigation bar of the application. It contains the application logo, search bar, user profile dropdown, and essential icons for notifications, messages, and theme switching.

*   **`src/pages/Vendors.jsx`:** The Vendor List Table in this page will be updated to include a "View Details" action for each vendor row.
*   **`src/App.jsx`:** The routing configuration will be updated to include a new route for the Vendor Detail page, e.g., `/vendors/:vendorId`, that renders the `ViewVendor.jsx` component.
*   **Vendor List Table Component (if separate from `Vendors.jsx`):** The component responsible for rendering the vendor table will be modified to include the navigation logic to the `ViewVendor.jsx` page when the detail action is triggered.

### Theme Toggle in Header

The header includes a dark and light mode toggle that allows users to switch between the two themes. This functionality is implemented using the theme context, which provides access to the current theme mode and a function to update it.

- The toggle utilizes icons that visually represent the current theme. For example, a sun icon might be displayed in dark mode to suggest switching to light mode, and a moon icon in light mode to suggest switching to dark mode.
- When the user clicks the toggle icon, the `toggleDarkMode` function is triggered.
- The `toggleDarkMode` function accesses the theme context and updates the `darkMode` state, which in turn updates the overall theme of the application.
- The icons are dynamically rendered based on the current `darkMode` state, ensuring they always reflect the theme the user can switch *to*.

This implementation provides a user-friendly way to personalize the application's appearance according to their preference.

### Adding `TopCards` to Dashboard

The `src/components/TopCards.jsx` component will also be integrated into the `src/pages/Dashboard.jsx` page to display relevant statistics for the main dashboard view. This demonstrates the reusability of the `TopCards` component.

### Styling Consistency

## Theme Provider
To ensure the theme context is available to all components that need it, including `src/components/Header.jsx`, the main application component in `src/App.jsx` is wrapped with the `ThemeProvider` component imported from `src/contexts/ThemeContext.jsx`. This makes the theme state and the theme toggle function globally accessible within the application's component tree.

## Persistent Profile Image
The profile image uploaded by the user is now persisted using `localStorage`.
- When a new image is selected, it is converted to a data URL and stored in `localStorage` with a specific key.
- On component mount, the application checks `localStorage` for a stored image URL and displays it if found.

## Profile Section

The profile and settings functionalities have been separated and restructured within the sidebar navigation.

### Profile View
The 'Profile' link in the sidebar (`/profile`) now leads to a page that **only** displays the user's profile data in a visually appealing, full-page layout. The `ProfileDetails` component has been modified to be purely for viewing, with all editing state, buttons, and logic removed. The focus is on presenting the profile information creatively across the full page.
 
### Settings Page

The sidebar navigation includes a 'Profile' link (`/profile`) and a 'Settings' link (`/settings`).

### Re-add 'Settings' to Sidebar
- The 'Settings' link has been added back to the sidebar navigation in `src/components/Sidebar.jsx`.
- This link navigates to the `/settings` route.

### New Settings Page
A new page component for settings has been created at `src/pages/Settings.jsx`.
- This page consolidates the functionality for both **updating profile details** and **changing the password** into a single view.
- The page contains a form with fields for profile information and password change.
- **Save** and **Cancel** buttons are provided at the bottom of the form to handle submission and cancellation of changes.
- Toaster messages (using `notistack`) are implemented to provide feedback after saving changes.
