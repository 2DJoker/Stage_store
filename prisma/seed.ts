import { hashSync } from "bcrypt";
import { prisma } from "./prisma-client";
import { categories, onesize, sizecl, sizes,  } from "./constant";




async function up() {
    
    await prisma.user.createMany({
        data: [
            {
                fullName: 'User Test',
                email: 'user@test.ru',
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'USER'
            },
            {

                fullName: 'Admin Admin',
                email: 'admin@test.ru',
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'ADMIN'
            },
        ]
    });

    await prisma.category.createMany({
        data: categories,
    });
    
    
    await prisma.sizeCl.createMany({
        data: sizecl,
    });

    await prisma.size.createMany({
        data: sizes,
    });

    const product1 = await prisma.product.create({
        data: {
            name: 'Jordan 1 Travis Scott',
            imageUrl: "https://res.cloudinary.com/dc57mpiao/image/upload/v1727089487/travis_ytdydd.jpg",
            categoryId: 1,
            sizeType: 'SHOE',
            sizes: {
                connect: sizes.slice(0, 5),
            },
            dewuSpuId: '1000438',
            price: 0
        },
    });
    const product2 = await prisma.product.create({
        data: {
            name: 'Yeezy Boost 500',
            imageUrl: "https://res.cloudinary.com/dc57mpiao/image/upload/v1727089427/500_i35k6u.jpg",
            categoryId: 1,
            sizeType: "SHOE",
            sizes: {
                connect: sizes.slice(5, 10),
            },
            dewuSpuId: '9551018б',
            price: 0
        },
    });
    const product3 = await prisma.product.create({
        data: {
            name: 'Nike Rubber Dunk Off-white',
            imageUrl: "https://res.cloudinary.com/dc57mpiao/image/upload/v1727089460/dunk3_u6y9lh.jpg",
            categoryId: 1,
            sizeType: 'SHOE',
            sizes: {
                connect: sizes.slice(10, 22),
            },
            dewuSpuId: '1058786',
            price: 0
        },
    });
    const product4 = await prisma.product.create({
        data: {
            name: 'Толстовка False Perception',
            imageUrl: "https://res.cloudinary.com/dc57mpiao/image/upload/v1743805481/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2025-04-04_%D0%B2_15.58.33_owr932.png",
            categoryId: 2,
            sizeType: 'CLOTH',
            sizeCls: {
                connect: sizecl.slice(0, 5),
            },
            dewuSpuId: '1058449',
            price: 0
        },
    });

    await prisma.product.create({
        data: {
          name: 'LV x Takashi Murakami pop-up',
          imageUrl: 'https://res.cloudinary.com/dc57mpiao/image/upload/v1748100553/LV-x-TM-SUperflat-Panda-Cardholder_oat4tx.jpg',
          categoryId: 4,
          sizeType: 'NONE',
        }
    });

    
   await prisma.cart.createMany({
    data: [

        {
            userId: 1,
            totalAmount: 0,
            token: '123221'
        },
        {
            userId: 2,
            totalAmount: 0,
            token: '122321'
        },
    ],
   });

   
   const productItem1 = await prisma.productItem.create({
    data: {
      productId: product1.id,
      sizeId: sizes[1].id, 
      price: 3000
    }
  });
  

   await prisma.cartItem.create({
    data: {
      cartId: 1,
      productItemId: productItem1.id,
      quantity: 2,
      sizes: {
        connect: [{ id: sizes[0].id }, { id: sizes[1].id }]
      },
    },
  });
  
    
    
}

async function down() {
    
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Size" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "SizeCl" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
}


async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.error(e)
    }
}

main().then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1)
    })




    
        
    