import { hashSync } from "bcrypt";
import { prisma } from "./prisma-client";
import { categories, onesize, sizecl, sizes } from "./constant";

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "User Test",
        email: "user@test.ru",
        password: hashSync("111111", 10),
        verified: new Date(),
        role: "USER",
      },
      {
        fullName: "Admin Admin",
        email: "admin@test.ru",
        password: hashSync("111111", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });

  await prisma.category.createMany({ data: categories });
  await prisma.sizeCl.createMany({ data: sizecl });
  await prisma.size.createMany({ data: sizes });

  // Новые бренды
  await prisma.brand.createMany({
    data: [
      { name: "Nike" },
      { name: "Adidas" },
      { name: "Puma" },
      { name: "Reebok" },
      { name: "New Balance" },
      { name: "Louis Vuitton" }, 
      { name: "Chrome Hearts" },
      { name: "Supreme" },
      { name: "Stone Island" },
      { name: "Converse" },
      
    ],
  });

  // Цвета
  await prisma.color.createMany({
    data: [
      { name: "Black" },
      { name: "White" },
      { name: "Red" },
      { name: "Blue" },
    ],
  });

  // Получаем brandId и colorId для использования ниже
  const nike = await prisma.brand.findFirst({ where: { name: "Nike" } });
  const adidas = await prisma.brand.findFirst({ where: { name: "Adidas" } });
  const puma = await prisma.brand.findFirst({ where: { name: "Puma" } });
  const reebok = await prisma.brand.findFirst({ where: { name: "Reebok" } });
  const newBalance = await prisma.brand.findFirst({ where: { name: "New Balance" } });
  const louisVuitton = await prisma.brand.findFirst({ where: { name: "Louis Vuitton" } });
  const ChromeHearts = await prisma.brand.findFirst({ where: { name: "Chrome Hearts" } });
  const Supreme = await prisma.brand.findFirst({ where: { name: "Supreme" } });
  const StoneIsland = await prisma.brand.findFirst({ where: { name: "Stone Island" } });
  const Converse = await prisma.brand.findFirst({ where: { name: "Converse" } });

  const black = await prisma.color.findFirst({ where: { name: "Black" } });
  const white = await prisma.color.findFirst({ where: { name: "White" } });
  const red = await prisma.color.findFirst({ where: { name: "Red" } });
  const blue = await prisma.color.findFirst({ where: { name: "Blue" } });

  // Продукты с корректными брендами
  const product1 = await prisma.product.create({
    data: {
      name: "Jordan 1 Travis Scott",
      imageUrl: "https://res.cloudinary.com/dc57mpiao/image/upload/v1727089487/travis_ytdydd.jpg",
      categoryId: 1,
      sizeType: "SHOE",
      sizes: {
        connect: sizes.slice(0, 5),
      },
      dewuSpuId: "1000438",
      brandId: nike?.id,      // Jordan — бренд Nike
      colorId: black?.id,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Yeezy Boost 500",
      imageUrl: "https://res.cloudinary.com/dc57mpiao/image/upload/v1727089427/500_i35k6u.jpg",
      categoryId: 1,
      sizeType: "SHOE",
      sizes: {
        connect: sizes.slice(5, 10),
      },
      dewuSpuId: "9551018",
      brandId: adidas?.id,    // Yeezy — Adidas
      colorId: white?.id,
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: "Off-White x Nike Dunk",
      imageUrl: "https://res.cloudinary.com/dc57mpiao/image/upload/v1727089460/dunk3_u6y9lh.jpg",
      categoryId: 1,
      sizeType: "SHOE",
      sizes: {
        connect: sizes.slice(10, 22),
      },
      dewuSpuId: "1058786",
      brandId: nike?.id,     // Dunk — Nike, в коллаборации с Off-White
      colorId: red?.id,
    },
  });

  const product4 = await prisma.product.create({
    data: {
      name: "Толстовка False Perception",
      imageUrl: "https://res.cloudinary.com/dc57mpiao/image/upload/v1743805481/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2025-04-04_%D0%B2_15.58.33_owr932.png",
      categoryId: 2,
      sizeType: "CLOTH",
      sizeCls: {
        connect: sizecl.slice(0, 5),
      },
      dewuSpuId: "1058449",
      brandId: puma?.id,     // заменил бренд на Puma
      colorId: black?.id,
    },
  });

  const product5 = await prisma.product.create({
    data: {
      name: "LV x Takashi Murakami pop-up",
      imageUrl: "https://res.cloudinary.com/dc57mpiao/image/upload/v1748100553/LV-x-TM-SUperflat-Panda-Cardholder_oat4tx.jpg",
      categoryId: 4,
      sizeType: "NONE",
      brandId: louisVuitton?.id, // бренд Louis Vuitton
      colorId: blue?.id,
    },
  });

  // Добавим ещё пару продуктов с новыми брендами

  const product6 = await prisma.product.create({
    data: {
      name: "Reebok Classic Leather",
      imageUrl: "https://example.com/reebok-classic.jpg",
      categoryId: 1,
      sizeType: "SHOE",
      sizes: {
        connect: sizes.slice(0, 5),
      },
      dewuSpuId: "2000001",
      brandId: reebok?.id,
      colorId: white?.id,
    },
  });

  const product7 = await prisma.product.create({
    data: {
      name: "New Balance 574",
      imageUrl: "https://example.com/nb-574.jpg",
      categoryId: 1,
      sizeType: "SHOE",
      sizes: {
        connect: sizes.slice(5, 10),
      },
      dewuSpuId: "2000002",
      brandId: newBalance?.id,
      colorId: black?.id,
    },
  });

  // ProductItems для обуви
  for (const [index, size] of sizes.slice(0, 5).entries()) {
    await prisma.productItem.create({
      data: {
        productId: product1.id,
        sizeId: size.id,
        price: 3000 + index * 200,
      },
    });
  }

  for (const [index, size] of sizes.slice(5, 10).entries()) {
    await prisma.productItem.create({
      data: {
        productId: product2.id,
        sizeId: size.id,
        price: 3500 + index * 150,
      },
    });
  }

  for (const [index, size] of sizes.slice(10, 22).entries()) {
    await prisma.productItem.create({
      data: {
        productId: product3.id,
        sizeId: size.id,
        price: 4000 + index * 100,
      },
    });
  }

  for (const [index, size] of sizes.slice(0, 5).entries()) {
    await prisma.productItem.create({
      data: {
        productId: product6.id,
        sizeId: size.id,
        price: 2800 + index * 150,
      },
    });
  }

  for (const [index, size] of sizes.slice(5, 10).entries()) {
    await prisma.productItem.create({
      data: {
        productId: product7.id,
        sizeId: size.id,
        price: 3200 + index * 130,
      },
    });
  }

  // ProductItems для одежды
  for (const [index, cl] of sizecl.slice(0, 5).entries()) {
    await prisma.productItem.create({
      data: {
        productId: product4.id,
        sizeClId: cl.id,
        price: 5000 + index * 250,
      },
    });
  }

  // Корзины
  await prisma.cart.createMany({
    data: [
      { userId: 1, totalAmount: 0, token: "123221" },
      { userId: 2, totalAmount: 0, token: "122321" },
    ],
  });

  // Товар в корзину
  const productItem1 = await prisma.productItem.findFirst({
    where: { productId: product1.id },
  });

  if (productItem1) {
    await prisma.cartItem.create({
      data: {
        cartId: 1,
        productItemId: productItem1.id,
        quantity: 2,
        sizes: {
          connect: [{ id: productItem1.sizeId! }],
        },
      },
    });
  }
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Color" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Brand" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Size" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "SizeCl" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
