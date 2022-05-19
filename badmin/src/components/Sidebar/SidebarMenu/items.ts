import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
import EventTwoToneIcon from '@mui/icons-material/EventTwoTone';
import EmojiFoodBeverageTwoToneIcon from '@mui/icons-material/EmojiFoodBeverageTwoTone';
import NightlifeTwoToneIcon from '@mui/icons-material/NightlifeTwoTone';
import AddLocationTwoToneIcon from '@mui/icons-material/AddLocationTwoTone';
import CatchingPokemonTwoToneIcon from '@mui/icons-material/CatchingPokemonTwoTone';
import FaceRetouchingNaturalTwoToneIcon from '@mui/icons-material/FaceRetouchingNaturalTwoTone';
import SickTwoToneIcon from '@mui/icons-material/SickTwoTone';
import SentimentVerySatisfiedTwoToneIcon from '@mui/icons-material/SentimentVerySatisfiedTwoTone';
import QueueMusicTwoToneIcon from '@mui/icons-material/QueueMusicTwoTone';
import TheaterComedyTwoToneIcon from '@mui/icons-material/TheaterComedyTwoTone';
import FormatListNumberedTwoToneIcon from '@mui/icons-material/FormatListNumberedTwoTone';
import FloodTwoToneIcon from '@mui/icons-material/FloodTwoTone';

export interface MenuItem {
  link: string;
  icon?: OverridableComponent<SvgIconTypeMap<any>> & { muiName: string };
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: 'События',
    items: [
      {
        name: 'События',
        link: '/events',
        icon: EventTwoToneIcon,
      },
      {
        name: 'Добавить событие',
        link: '/events/create',
        icon: EmojiFoodBeverageTwoToneIcon,
      },
      {
        name: 'Классификация',
        link: '/events/terms',
        icon: SickTwoToneIcon,
        items: [
          {
            name: 'Категории',
            link: '/events/terms/category',
            icon: TheaterComedyTwoToneIcon,
          },
          {
            name: 'Жанры',
            link: '/events/terms/genre',
            icon: QueueMusicTwoToneIcon,
          },
          {
            name: 'Настроения',
            link: '/events/terms/feeling',
            icon: SentimentVerySatisfiedTwoToneIcon,
          },
          {
            name: 'Подборки',
            link: '/events/terms/selection',
            icon: FormatListNumberedTwoToneIcon,
          },
        ],
      },
    ],
  },
  {
    heading: 'Площадки',
    items: [
      {
        name: 'Площадки',
        link: '/items',
        icon: NightlifeTwoToneIcon,
      },
      {
        name: 'Добавить место',
        link: '/items/create',
        icon: AddLocationTwoToneIcon,
      },
      {
        name: 'Типы площадок',
        link: '/items/terms/types',
        icon: FloodTwoToneIcon,
      },
    ],
  },
  {
    heading: 'Артисты',
    items: [
      {
        name: 'Артисты',
        link: '/artists',
        icon: CatchingPokemonTwoToneIcon,
      },
      {
        name: 'Добавить нового',
        link: '/artists/create',
        icon: FaceRetouchingNaturalTwoToneIcon,
      },
    ],
  },
];

export default menuItems;
