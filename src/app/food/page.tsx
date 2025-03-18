import { PageWrapper } from '@/components/layout/PageWrapper';
import { MenuTabs } from '@/components/ui/MenuTabs';
import { MenuItem } from '@/types';

export default function Food() {
  // Placeholder data
  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Truffle Risotto',
      description: 'Creamy arborio rice with wild mushrooms, finished with truffle oil and parmesan',
      price: 24,
      category: 'mains',
      dietary: ['vegetarian'],
    },
    {
      id: 2,
      name: 'Wagyu Sliders',
      description: 'Premium Wagyu beef on brioche buns with caramelized onions and truffle aioli',
      price: 18,
      category: 'starters',
    },
    {
      id: 3,
      name: 'Lobster Ravioli',
      description: 'House-made pasta filled with fresh Maine lobster in a saffron cream sauce',
      price: 32,
      category: 'mains',
    },
    {
      id: 4,
      name: 'Chocolate Soufflé',
      description: 'Warm chocolate soufflé with vanilla bean ice cream',
      price: 14,
      category: 'desserts',
      dietary: ['vegetarian'],
    },
    {
      id: 5,
      name: 'Roasted Beet Salad',
      description: 'Roasted beets, arugula, goat cheese, walnuts, and balsamic reduction',
      price: 16,
      category: 'starters',
      dietary: ['vegetarian', 'gluten-free'],
    },
    {
      id: 6,
      name: 'Seared Scallops',
      description: 'Seared sea scallops with cauliflower purée and brown butter sauce',
      price: 22,
      category: 'starters',
      dietary: ['gluten-free'],
    },
    {
      id: 7,
      name: 'Mushroom Wellington',
      description: 'Portobello mushroom, spinach, and caramelized onions wrapped in puff pastry',
      price: 26,
      category: 'mains',
      dietary: ['vegan'],
    },
    {
      id: 8,
      name: 'Berry Panna Cotta',
      description: 'Vanilla bean panna cotta with seasonal berries and mint',
      price: 12,
      category: 'desserts',
      dietary: ['vegetarian', 'gluten-free'],
    },
  ];

  const categories = ['starters', 'mains', 'desserts'];

  return (
    <PageWrapper>
      <h1 className="section-title">Food Menu</h1>
      <p className="mb-8 text-gray-300 max-w-3xl">
        Our chef carefully crafts each dish using locally-sourced ingredients. The menu changes seasonally to showcase the freshest flavors.
      </p>
      
      <div className="space-y-16">
        {categories.map((category) => (
          <div key={category}>
            <h2 className="text-2xl font-serif mb-6 capitalize">{category}</h2>
            <MenuTabs 
              items={menuItems.filter(item => item.category === category)} 
              categories={[category]} 
              enableFiltering={false} 
            />
          </div>
        ))}
      </div>
      
      <div className="mt-12 p-6 border border-gray-800 bg-gray-900/50">
        <h3 className="text-xl font-serif mb-4">Dietary Key</h3>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <span className="text-green-500 text-xs border border-green-500 px-1 rounded">V</span>
            <span className="text-gray-300">Vegetarian</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600 text-xs border border-green-600 px-1 rounded">VG</span>
            <span className="text-gray-300">Vegan</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-500 text-xs border border-amber-500 px-1 rounded">GF</span>
            <span className="text-gray-300">Gluten-Free</span>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}