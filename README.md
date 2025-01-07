
# Payment App

This is a React-based payment application that allows users to make payments using PIX, and copy payment details. This app includes a payment form with custom input handling, environment variable configuration, and deployment instructions.

The app can be seeing running in here: https://justpay.gruposkip.com/ 



<a href="public/images/tela1.png" target="_blank">
    <img src="public/images/tela1.png" alt="Screenshot of Tela 1" width="150">
</a>
<a href="public/images/tela2_.png" target="_blank">
    <img src="public/images/tela2_.png" alt="Screenshot of Tela 2" width="140">
</a>



## Features
- Real-time amount adjustment with range slider and manual input
- Payment submission with custom API key header
- Displays payment method with Pix code and QR code
- Option to copy the Pix code with one click

## Prerequisites
- Node.js and npm installed
- An API endpoint to handle payment requests
- Hosting account (for deployment)

## Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/devEduardoLemos/payment-app.git
   cd your-repo-name
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory, with the content:
   ```plaintext
   REACT_APP_API_KEY=your-api-key-value
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Usage

- **Amount Adjustment**: Use the range slider or click on the displayed value to enter an amount manually.
- **Description**: Enter a description for the payment.
- **Submit Payment**: Click "Pay" to submit the payment.
- **Copy Pix Code**: Click the "Copy Pix Code" button to copy the Pix code to the clipboard.

## Deployment to Hosting

Follow these steps to deploy your application to HostGator:

### Step 1: Build the Application

Build the app for production:
```bash
npm run build
```

This will create a `build` folder containing optimized static files.

### Step 2: Upload to your hosting service

1. **Log in to the hosting**: Access your dashboard panel.
2. **File Manager**: Go to the **File Manager** and open the `public_html` folder.
3. **Upload Build Files**:
   - Compress the `build` folder into a `.zip` file and upload it.
   - Extract the `.zip` file contents and move them to the `public_html` root if needed.

Alternatively, you can upload the contents of the `build` folder to `public_html` via FTP.

### Step 3: Configure Routing (Optional)

If your app uses client-side routing, add a `.htaccess` file in `public_html` with the following content to redirect requests to `index.html`:

```apache
# Redirect all requests to index.html
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Step 4: Test the Deployment

Visit your domain (e.g., `https://yourdomain.com`) to confirm that the app is running as expected.



## License

This project is licensed under the MIT License.


