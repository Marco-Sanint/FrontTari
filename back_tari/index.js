const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// Rutas
app.get('/products', async (req, res) => {
    const products = await prisma.product.findMany();
    res.json(products);
});

app.post('/products', async (req, res) => {
    const { marca, nombre, precio, descripcion } = req.body;
    const newProduct = await prisma.product.create({
        data: { marca, nombre, precio, descripcion }
    });
    res.json(newProduct);
});

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
        where: { id }
    });
    res.json(product);
});

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { marca, nombre, precio, descripcion } = req.body;
    const updatedProduct = await prisma.product.update({
        where: { id },
        data: { marca, nombre, precio, descripcion }
    });
    res.json(updatedProduct);
});

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.product.delete({
        where: { id }
    });
    res.json({ message: 'Producto eliminado' });
});

// Puerto del servidor
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
