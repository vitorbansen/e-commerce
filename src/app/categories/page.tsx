
import Link from 'next/link';
import { Category } from '@prisma/client';

async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  return res.json();
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Nossas Categorias</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <Link key={category.id} href={`/categories/${category.id}`}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{category.name}</h2>
                <p className="text-gray-600 text-sm">{category.description}</p>
                <p className="text-blue-600 mt-4 font-medium">Ver produtos ({category._count?.products || 0})</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


