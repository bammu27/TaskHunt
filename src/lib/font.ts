
import { Potta_One, Roboto } from 'next/font/google';
import { Pacifico } from 'next/font/google';



export const roboto = Roboto({
    subsets: ['cyrillic'],
    weight: '500'
}); // Or other Roboto subsets


export const jersey = Pacifico({
    subsets: ['latin', 'latin-ext'], // Specify the subsets you want to include
    weight: '400' // Specify the weight of the font (e.g., '400' for regular)
  });



export const post = Potta_One({
    subsets: ['latin', 'latin-ext'], // Specify the subsets you want to include
    weight: '400' // Specify the weight of the font (e.g., '400' for regular)
  });
