# Book Management App with Image Upload

## Quick Start
1. `git clone … && cd book-management-app`
2. ` server/.env` – add MongoDB & Cloudinary creds  
3. `npm install && npm --prefix server install && npm --prefix client install`
4. `npm run dev` – runs backend on :5000 and React on :3000

## Testing
`npm --prefix server test`

## Deployment
Set the same environment variables on your host (Heroku, AWS, etc.).  
Build the frontend with `npm --prefix client run build` and serve the static files or host separately.
