import { Title } from "@/components/shared/title";
import { Container } from "@/components/shared/container";
import { TopBar } from "@/components/shared/top-bra";
import { Filters } from "@/components/shared/Filters";
import { ProductsGroupList } from "@/components/shared/products-group-list";

export default function Home() {
  return (
    <>
    <Container className="mt-5">
      <Title text="Все товары" size="lg" className="font-extrabold" />
    
    </Container>
    <TopBar />

    <Container className="mt-10 pb-14">

      <div className="flex gap-[80px]">

       <div className="w-[250px]">
        <Filters />
       </div>

        <div className="flex-1">
          <div className="flex flex-col gap-16">
            <ProductsGroupList title="Обувь" items={[
              {
              id: 1,
              name: "Jordan 1 Travis Scott",
              imageUrl: 'https://res.cloudinary.com/dc57mpiao/image/upload/v1727089487/travis_ytdydd.jpg',
              price: 179000,
              items: [{ price: 179000 }],
            },
            {
              id: 2,
              name: "Jordan 1 Travis Scott",
              imageUrl: 'https://res.cloudinary.com/dc57mpiao/image/upload/v1727089487/travis_ytdydd.jpg',
              price: 179000,
              items: [{ price: 179000 }],
            },
            {
              id: 3,
              name: "Jordan 1 Travis Scott",
              imageUrl: 'https://res.cloudinary.com/dc57mpiao/image/upload/v1727089487/travis_ytdydd.jpg',
              price: 179000,
              items: [{ price: 179000 }],
            },
            {
              id: 4,
              name: "Jordan 1 Travis Scott",
              imageUrl: 'https://res.cloudinary.com/dc57mpiao/image/upload/v1727089487/travis_ytdydd.jpg',
              price: 179000,
              items: [{ price: 179000 }],
            },
            {
              id: 5,
              name: "Jordan 1 Travis Scott",
              imageUrl: 'https://res.cloudinary.com/dc57mpiao/image/upload/v1727089487/travis_ytdydd.jpg',
              price: 179000,
              items: [{ price: 179000 }],
            }
            ]} categoryId={1} />
            <ProductsGroupList title="Одежда" items={[
              {
                id: 1,
                name: "Толстовка False Perception",
                imageUrl: 'https://res.cloudinary.com/dc57mpiao/image/upload/v1743805481/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2025-04-04_%D0%B2_15.58.33_owr932.png',
                price: 9000,
                items: [{ price: 9000 }],
              },
              {
                id: 2,
                name: "Куртка Stone Island Painted Camo",
                imageUrl: "https://res.cloudinary.com/dc57mpiao/image/upload/v1747315357/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2025-05-15_%D0%B2_07.28.31_cdmvwn.png",
                price: 89900,
                items: [{ price: 89900 }],
              }
             ]} categoryId={2} />
             <ProductsGroupList title="Головные уборы" items={[
              {
                id: 1,
                name: "Supreme SS23 cap",
                imageUrl: 'https://res.cloudinary.com/dc57mpiao/image/upload/v1747314710/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2025-05-15_%D0%B2_07.13.29_vfgoz3.png',
                price: 8900,
                items: [{ price: 8900}],
              }
             ]} categoryId={3} />
          </div>
        </div>
      </div>
    </Container>

    </>
  );
}
