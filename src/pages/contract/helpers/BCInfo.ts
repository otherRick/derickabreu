import { AniPackInfo } from './AniPackInfo';
import { ComPackInfo } from './ComPackInfo';
import { EstPackInfo } from './EstPackInfo';
import { ExtPackInfo } from './ExtPackInfo';
import { GesPackInfo } from './GesPackInfo';
import { PalPackInfo } from './PalPackInfo';

export const BCinfo: {
  title: string;
  url: string;
  alt: string;
  description: string;
  details: React.ReactNode | string | undefined;
}[] = [
  {
    title: 'Aniversário Infantil',
    url: 'https://firebasestorage.googleapis.com/v0/b/portfoto-ac408.appspot.com/o/best%2Ffestasol.jpg?alt=media&token=9cd91e74-36e2-400f-aaa2-ae3cdf0b0f82',
    alt: 'festaSol',
    description: AniPackInfo.aniDescription,
    details: AniPackInfo.aniDetails
  },
  {
    title: 'Ensaio Estúdio',
    url: 'https://firebasestorage.googleapis.com/v0/b/portfoto-ac408.appspot.com/o/best%2Fdj1.jpeg?alt=media&token=a12b27c1-6c34-4b15-b69a-85f423357d97',
    alt: 'djcutout',
    description: EstPackInfo.estDescription,
    details: EstPackInfo.estDetails
  },
  {
    title: 'Shows / Palco / Apresentações',
    url: 'https://firebasestorage.googleapis.com/v0/b/portfoto-ac408.appspot.com/o/best%2Fdanca1.jpeg?alt=media&token=c92e5443-29f7-4078-9509-61050b480c17',
    alt: 'show1',
    description: PalPackInfo.palDescription,
    details: PalPackInfo.palDetails
  },
  {
    title: 'Ensaio externo',
    url: 'https://firebasestorage.googleapis.com/v0/b/portfoto-ac408.appspot.com/o/best%2Fcatalogo1.jpg?alt=media&token=5f92bd12-1647-4b4d-a06a-a7b850ba315b',
    alt: 'show1',
    description: ExtPackInfo.extDescription,
    details: ExtPackInfo.extDetails
  },
  {
    title: 'Ensaio Gestantes',
    url: 'https://firebasestorage.googleapis.com/v0/b/portfoto-ac408.appspot.com/o/best%2Fmag1.jpeg?alt=media&token=2428f6dc-ae03-4412-a617-3925a07af016',
    alt: 'show1',
    description: GesPackInfo.gesDescription,
    details: GesPackInfo.gesDetails
  },
  {
    title: 'Aniversários / Comemorações',
    url: 'https://firebasestorage.googleapis.com/v0/b/portfoto-ac408.appspot.com/o/best%2Ffesta4.jpg?alt=media&token=498a42c3-705a-4543-b330-304c70645b8d',
    alt: 'show1',
    description: ComPackInfo.comDescription,
    details: ComPackInfo.comDetails
  }
];
