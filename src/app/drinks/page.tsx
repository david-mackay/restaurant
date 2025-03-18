import { PageWrapper } from '@/components/layout/PageWrapper';
import { MenuTabs } from '@/components/ui/MenuTabs';
import { DrinkItem } from '@/types';

export default function Drinks() {
  // Placeholder data
  const drinks: DrinkItem[] = [
    {
      id: 1,
      name: 'The Prohibition',
      description: 'Bourbon, bitters, maple syrup, and orange peel, served with a smoked cinnamon stick',
      price: 16,
      category: 'signature',
      featured: true,
      ingredients: ['Bourbon', 'Angostura bitters', 'Maple syrup', 'Orange peel', 'Cinnamon'],
      alcoholContent: 40,
    },
    {
      id: 2,
      name: 'Gatsby\'s Daisy',
      description: 'Gin, elderflower liqueur, fresh lemon, and prosecco with a sugar rim',
      price: 14,
      category: 'signature',
      ingredients: ['Gin', 'St. Germain', 'Lemon juice', 'Prosecco', 'Sugar'],
      alcoholContent: 25,
    },
    {
      id: 3,
      name: 'Vintage Negroni',
      description: 'House-aged Negroni with gin, Campari, and vermouth rosso',
      price: 15,
      category: 'classics',
      ingredients: ['Gin', 'Campari', 'Sweet vermouth', 'Orange twist'],
      alcoholContent: 28,
    },
    {
      id: 4,
      name: 'Smooth Criminal',
      description: 'Non-alcoholic blend of seedlip grove, grapefruit, lime, and rosemary',
      price: 12,
      category: 'non-alcoholic',
      ingredients: ['Seedlip Grove 42', 'Grapefruit juice', 'Lime juice', 'Rosemary syrup', 'Soda'],
      alcoholContent: 0,
    },
    {
      id: 5,
      name: 'Manhattan Transfer',
      description: 'Rye whiskey, sweet vermouth, and bitters with a luxardo cherry',
      price: 15,
      category: 'classics',
      ingredients: ['Rye whiskey', 'Sweet vermouth', 'Angostura bitters', 'Luxardo cherry'],
      alcoholContent: 35,
    },
    {
      id: 6,
      name: 'Velvet Underground',
      description: 'Reposado tequila, blackberry, lime, and agave nectar',
      price: 16,
      category: 'signature',
      ingredients: ['Reposado tequila', 'Blackberry puree', 'Lime juice', 'Agave nectar'],
      alcoholContent: 30,
    },
    {
      id: 7,
      name: 'Garden Party',
      description: 'Non-alcoholic cucumber, mint, elderflower tonic, and lime',
      price: 10,
      category: 'non-alcoholic',
      ingredients: ['Cucumber', 'Mint', 'Elderflower tonic', 'Lime juice'],
      alcoholContent: 0,
    },
  ];

  const categories = ['signature', 'classics', 'wine', 'non-alcoholic'];

  const featuredDrink = drinks.find(drink => drink.featured);

  return (
    <PageWrapper>
      <h1 className="section-title">Drinks Menu</h1>
      <p className="mb-8 text-gray-300 max-w-3xl">
        Our mixologists craft innovative cocktails using house-made syrups, fresh ingredients, and premium spirits. Each drink tells a story.
      </p>
      
      {featuredDrink && (
        <div className="mb-12 p-6 border border-gray-800 bg-gray-900/50 relative">
          <span className="absolute top-4 right-4 bg-amber-700 text-white text-xs px-2 py-1">
            Featured
          </span>
          <h2 className="text-2xl font-serif mb-2">{featuredDrink.name}</h2>
          <p className="text-gray-400 mb-4">{featuredDrink.description}</p>
          {featuredDrink.ingredients && (
            <p className="text-gray-500 text-sm mb-4">
              <span className="italic">Ingredients:</span> {featuredDrink.ingredients.join(', ')}
            </p>
          )}
          <div className="flex justify-between items-center">
            <span className="text-amber-300 font-medium">${featuredDrink.price}</span>
            {typeof featuredDrink.alcoholContent === 'number' && (
              <span className="text-gray-400 text-sm">
                {featuredDrink.alcoholContent > 0 
                  ? `${featuredDrink.alcoholContent}% ABV` 
                  : 'Non-Alcoholic'}
              </span>
            )}
          </div>
        </div>
      )}
      
      <MenuTabs items={drinks} categories={categories} />
    </PageWrapper>
  );
}