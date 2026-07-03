const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const categoriaRoutes = require('./routes/categoria.routes');
const movimientoRoutes = require('./routes/movimiento.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const presupuestoRoutes = require('./routes/presupuesto.routes');
const reporteRoutes = require('./routes/reporte.routes');
const perfilRoutes = require('./routes/perfil.routes');
const metaRoutes = require('./routes/meta.routes');

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://monifront.vercel.app',
  'https://moni-ruby.vercel.app',
  process.env.FRONTEND_URL,
  ...(process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim())
    : [])
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Permite peticiones sin origin, como Postman, Yaak o health checks
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`Origen no permitido por CORS: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    mensaje: 'API Moni funcionando correctamente.'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    mensaje: 'Backend Moni activo.',
    estado: 'OK'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/movimientos', movimientoRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/presupuestos', presupuestoRoutes);
app.use('/api/reportes', reporteRoutes);
app.use('/api/perfil', perfilRoutes);
app.use('/api/metas', metaRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor backend ejecutándose en puerto ${PORT}`);
});