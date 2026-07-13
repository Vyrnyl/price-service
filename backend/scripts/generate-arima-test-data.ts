import { prisma } from '../src/prisma';
import { forecastService } from '../src/modules/forecast/forecast.service';

async function main() {
  const commodityName = 'ARIMA Test Commodity';
  const commodityCategory = 'Staple';
  const storeName = 'ARIMA Test Store';
  const storeLocation = 'Test City';
  const ownerEmail = 'arima.tester@example.com';

  let user = await prisma.user.findUnique({ where: { email: ownerEmail } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        name: 'ARIMA Tester',
        email: ownerEmail,
        password: 'arima-test-password',
        role: 'OFFICER',
      },
    });
  }

  let commodity = await prisma.commodity.findFirst({
    where: { name: commodityName, category: commodityCategory },
  });

  if (!commodity) {
    commodity = await prisma.commodity.create({
      data: {
        name: commodityName,
        status: 'Active',
        category: commodityCategory,
      },
    });
  }

  let store = await prisma.store.findFirst({
    where: { name: storeName, location: storeLocation, userId: user.id },
  });

  if (!store) {
    store = await prisma.store.create({
      data: {
        name: storeName,
        location: storeLocation,
        userId: user.id,
      },
    });
  }

  await prisma.forecast.deleteMany({ where: { commodityId: commodity.id } });
  await prisma.priceRecord.deleteMany({ where: { commodityId: commodity.id, storeId: store.id } });
  await prisma.sRP.deleteMany({ where: { commodityId: commodity.id } });

  const srpValues = [45, 47, 49];
  const srpDates = [
    new Date('2026-01-01T00:00:00.000Z'),
    new Date('2026-02-01T00:00:00.000Z'),
    new Date('2026-03-01T00:00:00.000Z'),
  ];

  await prisma.sRP.createMany({
    data: srpValues.map((price, index) => ({
      commodityId: commodity.id,
      price,
      effectiveDate: srpDates[index],
    })),
  });

  const priceValues = [44, 46, 48, 50, 51, 53, 55, 57];
  const priceDates = Array.from({ length: priceValues.length }, (_, index) =>
    new Date(Date.UTC(2026, 0, 5 + index)),
  );

  await prisma.priceRecord.createMany({
    data: priceValues.map((price, index) => ({
      commodityId: commodity.id,
      storeId: store.id,
      userId: user.id,
      price,
      dateAndTime: priceDates[index],
      status: 'COMPLIANT',
    })),
  });

  const forecasts = await forecastService.generateForecast({ commodityId: commodity.id, horizon: 3 });

  console.log('Seeded ARIMA test data');
  console.log(JSON.stringify({
    commodity: { id: commodity.id, name: commodity.name, category: commodity.category },
    store: { id: store.id, name: store.name },
    srpCount: srpValues.length,
    priceRecordCount: priceValues.length,
    forecastCount: forecasts.length,
  }, null, 2));
}

main()
  .catch((error) => {
    console.error('ARIMA seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
