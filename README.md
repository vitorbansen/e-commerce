# Top Promo Br - E-commerce Completo

Um projeto completo de e-commerce desenvolvido com Next.js, React, Tailwind CSS e Prisma ORM, conectado a um banco SQLite.

![Top Promo Br Logo](public/logo.png)

## 🚀 Funcionalidades

### Frontend (Loja)
- ✅ **Página inicial** com produtos em destaque e categorias
- ✅ **Catálogo de produtos** com filtros e busca
- ✅ **Página de detalhes** do produto com informações completas
- ✅ **Sistema de carrinho** funcional com persistência
- ✅ **Checkout simulado** com formulário completo
- ✅ **Login e cadastro** de usuários (opcional)
- ✅ **Design responsivo** para desktop e mobile
- ✅ **SEO otimizado** com meta tags

### Backend (APIs)
- ✅ **API REST** completa para produtos, categorias, carrinho e pedidos
- ✅ **Autenticação** de usuários com JWT
- ✅ **Banco de dados** SQLite com Prisma ORM
- ✅ **Validação** de dados e tratamento de erros
- ✅ **Seed** automático com dados de exemplo

### Painel Administrativo
- ✅ **Dashboard** com estatísticas e métricas
- ✅ **CRUD completo** de produtos
- ✅ **Gestão de categorias**
- ✅ **Visualização de pedidos**
- ✅ **Interface intuitiva** e responsiva

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite com Prisma ORM
- **Icons**: Lucide React
- **Authentication**: JWT (simulado)
- **Deployment**: Vercel Ready

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Passos

1. **Clone o repositório**
```bash
git clone <repository-url>
cd top-promo-br
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o banco de dados**
```bash
# Gerar o cliente Prisma
npx prisma generate

# Executar migrações
npx prisma migrate dev --name init

# Popular o banco com dados de exemplo
npm run db:seed
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

5. **Acesse a aplicação**
- Loja: http://localhost:3000
- Admin: http://localhost:3000/admin

## 🔑 Credenciais de Teste

### Usuário Administrador
- **Email**: admin@toppromo.com
- **Senha**: admin123

### Usuário Cliente
- **Email**: cliente@toppromo.com  
- **Senha**: cliente123

## 📁 Estrutura do Projeto

```
top-promo-br/
├── prisma/
│   ├── schema.prisma          # Schema do banco de dados
│   ├── seed.ts               # Dados de exemplo
│   └── migrations/           # Migrações do banco
├── src/
│   ├── app/                  # Páginas (App Router)
│   │   ├── admin/           # Painel administrativo
│   │   ├── products/        # Páginas de produtos
│   │   ├── cart/            # Carrinho de compras
│   │   ├── checkout/        # Finalização de compra
│   │   ├── login/           # Autenticação
│   │   └── api/             # Rotas da API
│   ├── components/          # Componentes React
│   │   ├── admin/           # Componentes do admin
│   │   ├── layout/          # Layout e navegação
│   │   ├── product/         # Componentes de produto
│   │   └── ui/              # Componentes de interface
│   ├── contexts/            # Context API (Estado global)
│   ├── lib/                 # Utilitários e configurações
│   └── styles/              # Estilos globais
├── public/                  # Arquivos estáticos
└── package.json
```

## 🎯 Funcionalidades Detalhadas

### Sistema de Carrinho
- Adicionar/remover produtos
- Alterar quantidades
- Persistência local e no servidor
- Cálculo automático de totais

### Checkout
- Formulário completo de dados pessoais
- Endereço de entrega
- Múltiplas formas de pagamento
- Validação de campos

### Painel Admin
- Dashboard com métricas em tempo real
- Gestão completa de produtos (CRUD)
- Controle de estoque
- Visualização de pedidos
- Filtros e busca avançada

### SEO e Performance
- Meta tags otimizadas
- Imagens responsivas
- Loading states
- Error boundaries

## 🚀 Deploy

### Vercel (Recomendado)

1. **Conecte seu repositório ao Vercel**
2. **Configure as variáveis de ambiente**
3. **Deploy automático**

### Outras Plataformas

O projeto está configurado para deploy em qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- Heroku
- AWS Amplify

## 📊 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start

# Linting
npm run lint

# Banco de dados
npm run db:seed      # Popular com dados
npm run db:reset     # Resetar banco
npm run db:studio    # Interface visual do banco
```

## 🎨 Customização

### Cores e Tema
Edite o arquivo `tailwind.config.js` para personalizar:
- Paleta de cores
- Fontes
- Espaçamentos
- Breakpoints

### Logo e Branding
- Substitua o logo em `public/logo.png`
- Atualize o nome da empresa nos componentes
- Modifique as cores do tema

### Produtos e Categorias
- Edite o arquivo `prisma/seed.ts`
- Execute `npm run db:seed` para aplicar

## 🐛 Solução de Problemas

### Erro de Banco de Dados
```bash
# Resetar completamente o banco
rm prisma/dev.db
npx prisma migrate dev --name init
npm run db:seed
```

### Erro de Dependências
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Erro de Build
```bash
# Verificar tipos TypeScript
npx tsc --noEmit
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte, entre em contato:
- Email: contato@toppromo.com
- Telefone: (11) 9999-9999

---

**Desenvolvido com ❤️ para Top Promo Br**
