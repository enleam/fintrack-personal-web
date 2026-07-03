const express = require('express');
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

console.log('SERVER VERSION: CORS OPEN V4');

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,PATCH,DELETE,OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With'
  );

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    mensaje: 'API Moni funcionando correctamente.',
    version: 'cors-open-v4'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    mensaje: 'Backend Moni activo.',
    estado: 'OK',
    version: 'cors-open-v4'
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