import {Products} from '../@types/product';

const products: Products = [
  {
    id: '1',
    name: 'Ninja Throwing Star',
    description:
      'The shuriken, or ninja star, of the popular imagination. “Shuriken” (手裏剣) literally means “sword that\'s hidden in hand."',
    price: 7.25,
    heroImage: 'https://placehold.co/640x400/red/white/png?text=Shuriken',
    images: [
      'https://placehold.co/320x200/red/white/png?text=Sword%20that%27s%20%0Ahidden%20in%20hand',
      'https://placehold.co/320x200/red/white/png?text=Shuriken%2012',
      'https://placehold.co/320x200/red/white/png?text=Shuriken%2018',
    ],
    variations: [
      {
        id: '1.12',
        name: 'Shuriken 12',
        price: 7.25,
      },
      {
        id: '1.18',
        name: 'Shuriken 18',
        price: 10.9,
      },
      {
        id: '1.25',
        name: 'Shuriken 25',
        price: 15.15,
      },
    ],
  },
  {
    id: '2',
    name: 'Ninjatō',
    description:
      'Typically depicted as being a short sword, often portrayed as having a straight blade (similar to that of a shikomizue) with a square guard.',
    price: 0.0,
    heroImage:
      'https://placehold.co/640x400/green/yellow/png?text=Ninjat%C5%8D',
    images: [
      'https://placehold.co/320x200/green/yellow/png?text=Ninjat%C5%8D%201',
      'https://placehold.co/320x200/green/yellow/png?text=Ninjat%C5%8D%202',
    ],
    variations: [
      {
        id: '2.1',
        name: 'Ninjatō 1',
        price: 4.55,
      },
      {
        id: '2.2',
        name: 'Ninjatō 2',
        price: 9.1,
      },
    ],
  },
];

export default products;
