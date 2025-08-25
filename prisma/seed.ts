import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Criar categorias
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Eletrônicos',
        description: 'Produtos eletrônicos e tecnologia'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Roupas',
        description: 'Vestuário e acessórios'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Casa e Jardim',
        description: 'Produtos para casa e jardim'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Esportes',
        description: 'Artigos esportivos e fitness'
      }
    })
  ])

  // Criar produtos
  const products = [
    {
      name: 'Smartphone Samsung Galaxy',
      description: 'Smartphone com tela de 6.5 polegadas, 128GB de armazenamento e câmera tripla',
      price: 1299.99,
      stock: 50,
      featured: true,
      categoryId: categories[0].id,
      image: '/images/smartphone.jpg'
    },
    {
      name: 'Notebook Dell Inspiron',
      description: 'Notebook com processador Intel i5, 8GB RAM e SSD 256GB',
      price: 2499.99,
      stock: 25,
      featured: true,
      categoryId: categories[0].id,
      image: '/images/notebook.jpg'
    },
    {
      name: 'Camiseta Polo',
      description: 'Camiseta polo masculina 100% algodão, disponível em várias cores',
      price: 89.99,
      stock: 100,
      featured: false,
      categoryId: categories[1].id,
      image: '/images/polo.jpg'
    },
    {
      name: 'Tênis Esportivo',
      description: 'Tênis para corrida com tecnologia de amortecimento avançado',
      price: 299.99,
      stock: 75,
      featured: true,
      categoryId: categories[3].id,
      image: '/images/tenis.jpg'
    },
    {
      name: 'Cafeteira Elétrica',
      description: 'Cafeteira elétrica com capacidade para 12 xícaras e timer programável',
      price: 199.99,
      stock: 30,
      featured: false,
      categoryId: categories[2].id,
      image: '/images/cafeteira.jpg'
    },
    {
      name: 'Fone de Ouvido Bluetooth',
      description: 'Fone de ouvido sem fio com cancelamento de ruído e bateria de 30h',
      price: 399.99,
      stock: 60,
      featured: true,
      categoryId: categories[0].id,
      image: '/images/fone.jpg'
    },
    {
      name: 'Jaqueta Jeans',
      description: 'Jaqueta jeans unissex com design clássico e lavagem stone',
      price: 159.99,
      stock: 40,
      featured: false,
      categoryId: categories[1].id,
      image: '/images/jaqueta.jpg'
    },
    {
      name: 'Bicicleta Mountain Bike',
      description: 'Bicicleta mountain bike aro 29 com 21 marchas e freios a disco',
      price: 899.99,
      stock: 15,
      featured: true,
      categoryId: categories[3].id,
      image: '/images/bicicleta.jpg'
    }
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product
    })
  }

  // Criar usuário admin
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.create({
    data: {
      email: 'admin@toppromo.com',
      name: 'Administrador',
      password: hashedPassword,
      isAdmin: true
    }
  })

  // Criar usuário teste
  const hashedUserPassword = await bcrypt.hash('user123', 10)
  await prisma.user.create({
    data: {
      email: 'user@test.com',
      name: 'Usuário Teste',
      password: hashedUserPassword,
      isAdmin: false
    }
  })

  console.log('Seed executado com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

