import 'dotenv/config'; 
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { connectDB } from './config/db.js'; 
import Routes from './routes/Routes.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 1. GLOBAL MIDDLEWARE
app.use(express.json());

// 2. DEBUG LOGGER 
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// 3. API ROUTES 
app.use('/nana/api', Routes);

// 4. STATIC FILES (Only call this ONCE, after API routes)
app.use(express.static(join(__dirname, 'public')));

// 5. FRONTEND ENTRY POINT
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

// 6. CATCH-ALL DEBUG 
app.use('/nana/api', (req, res) => {
  console.log(`⚠️ Alert: Request to ${req.url} fell through the Routes file!`);
  res.status(404).json({ error: "Route reached but not handled in Routes.js" });
});

// 7. STARTUP FUNCTION
async function startServer() {
  try {
    await connectDB();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server: http://localhost:${PORT}`);
      console.log(`🔗 API Endpoint: http://localhost:${PORT}/nana/api`);
    });
  } catch (error) {
    console.error('❌ Database Connection Failed:', error);
    process.exit(1);
  }
}

startServer();