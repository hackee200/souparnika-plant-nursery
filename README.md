# Souparnika Plant Nursery 🌱

A responsive plant nursery storefront built with plain HTML, CSS and JavaScript. Customers can browse sample plants, filter/search, add products to a cart, and send their order to the nursery through WhatsApp.

## Run locally
1. Download or clone this project.
2. Open `index.html` in a browser. No build tools or installation are needed.

## Important: set your WhatsApp number
Open `script.js` and replace:
```js
const WHATSAPP_NUMBER = "918129497575";
```
The website is already configured with the supplied WhatsApp number: `918129497575`.

## Edit products and prices
In `script.js`, edit the `products` array. Each product has:
- `id`: unique number
- `name`: product name
- `category`: one of the categories used by the filter
- `price`: sample price in INR
- `tag`: short label shown on the product photo
- `image`: image URL

Categories currently used: `Vegetable Plants`, `Seeds`, `Indoor Plants`, `Outdoor Plants`, `Flower Plants`, `Fruit Plants`.

## Images
The demo uses remote Unsplash image URLs. An internet connection is required to load them. For your own nursery photos, place images in an `images/` folder and use paths such as `images/tomato-plant.jpg` in `script.js`.

## Nursery location
The contact section includes the nursery Google Maps link:
https://maps.app.goo.gl/voBVjLmhgCuoQdqu
Customers can open it to view the location and get directions.

## WhatsApp and payments
The checkout opens WhatsApp with the cart contents, quantities and subtotal pre-filled. It does not charge customers automatically. Confirm stock and delivery charges in chat, then share your UPI ID or payment link. Never ask customers to send card PINs or OTPs.

## Publish with GitHub Pages
1. Create/sign in to a GitHub account at https://github.com.
2. Click **New repository**. Name it `souparnika-plant-nursery`.
3. Choose **Public**, then create the repository.
4. Upload `index.html`, `style.css`, `script.js`, and `README.md` (or push them using Git).
5. In the repository, open **Settings → Pages**.
6. Under **Build and deployment**, choose **Deploy from a branch**.
7. Select branch `main` and folder `/ (root)`, then click **Save**.
8. Wait a minute or two. GitHub will show your website URL, usually:
   `https://YOUR-USERNAME.github.io/souparnika-plant-nursery/`

### Optional: publish using Git commands
Run these commands in a terminal inside this project folder after creating the GitHub repository:
```bash
git init
git add .
git commit -m "Create Souparnika Plant Nursery website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/souparnika-plant-nursery.git
git push -u origin main
```
Replace `YOUR-USERNAME` with your GitHub username. Then enable GitHub Pages using steps 5–7 above.

## Before launch checklist
- [ ] Replace the WhatsApp number in `script.js`.
- [ ] Replace sample product names/prices with your real stock and prices.
- [ ] Test adding/removing products and changing quantities.
- [ ] Test WhatsApp checkout on a phone with WhatsApp installed.
- [ ] Replace sample images with your own nursery photos if possible.
- [ ] Confirm your delivery area, delivery fee and payment process in WhatsApp.
