using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Maroodi.Infrastructure.Persistence
{
    public static class DbSeeder
    {
        public static void EnsureSeedData(IServiceProvider services)
        {
            using var scope = services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            // Apply pending migrations
            context.Database.Migrate();

            // If products already exist, skip seeding
            if (context.Products.Any()) return;

            var now = DateTime.UtcNow;

            // Seed status first (used by many entities)
            var statusActive = new Status { Id = 1, Name = "Active" };
            //context.Statuses.Add(statusActive);
            context.SaveChanges();


            if (!context.Users.Where(w => w.Name == "System").Any()) {
                // Create a default system user to satisfy CreatedBy FKs
                var defaultUser = new User
                {
                    Name = "System",
                    LastName = "Seeder",
                    Email = "seeder@local",
                    Password = "seed",
                    StatusId = statusActive.Id,
                    CreatedAt = now
                };
                context.Users.Add(defaultUser);
                context.SaveChanges();
            }

            int user_id = context.Users.Where(w => w.Name == "System").Select(s => s.Id).FirstOrDefault();


            // Seed units
            var unitPiece = new Unit { Name = "Pieza" };
            var unitKg = new Unit { Name = "Kg" };
            var unitL = new Unit { Name = "Litro" };
            var unitPack = new Unit { Name = "Paquete" };
            context.Units.AddRange(unitPiece, unitKg, unitL, unitPack);

            // Seed brand
            var brandDefault = new Brand { Name = "Marca Generica" };
            context.Brands.Add(brandDefault);

            context.SaveChanges();

            // Seed categories
            var limpieza = new Category { Name = "Limpieza" };
            var carnes = new Category { Name = "Carnes" };
            var pescados = new Category { Name = "Pescados" };
            var abarrotes = new Category { Name = "Abarrotes" };
            context.Categories.AddRange(limpieza, carnes, pescados, abarrotes);
            context.SaveChanges();

            // Seed stores (set StatusId and CreatedBy to satisfy FK constraints)
            var walmart = new Store
            {
                Name = "Walmart",
                Latitude = "32.5149",
                Longitude = "-117.0382",
                StatusId = statusActive.Id,
                CreatorId = user_id,
                CreatedAt = now
            };
            var calimax = new Store
            {
                Name = "Calimax",
                Latitude = "32.5027",
                Longitude = "-116.9640",
                StatusId = statusActive.Id,
                CreatorId = user_id,
                CreatedAt = now
            };
            context.Stores.AddRange(walmart, calimax);
            context.SaveChanges();

            // Seed products (8 original + 10 additional = 18), set CreatedBy
            var products = new[]
            {
                new Product { Name = "Escoba", Amount = 1.00m, UnitId = unitPiece.Id, BrandId = brandDefault.Id, StatusId = statusActive.Id, CreatorId = user_id, CreatedAt = now },
                new Product { Name = "Jabón en polvo 1kg", Amount = 1.00m, UnitId = unitPack.Id, BrandId = brandDefault.Id, StatusId = statusActive.Id, CreatorId = user_id, CreatedAt = now },
                new Product { Name = "Pollo entero", Amount = 1.00m, UnitId = unitKg.Id, BrandId = brandDefault.Id, StatusId = statusActive.Id, CreatorId = user_id, CreatedAt = now },
                new Product { Name = "Pechuga de pollo", Amount = 1.00m, UnitId = unitKg.Id, BrandId = brandDefault.Id, StatusId = statusActive.Id, CreatorId = user_id, CreatedAt = now },
                new Product { Name = "Pescado tilapia", Amount = 1.00m, UnitId = unitKg.Id, BrandId = brandDefault.Id, StatusId = statusActive.Id, CreatorId = user_id, CreatedAt = now },
                new Product { Name = "Atún en lata", Amount = 1.00m, UnitId = unitPiece.Id, BrandId = brandDefault.Id, StatusId = statusActive.Id, CreatorId = user_id, CreatedAt = now },
                new Product { Name = "Arroz 1kg", Amount = 1.00m, UnitId = unitKg.Id, BrandId = brandDefault.Id, StatusId = statusActive.Id, CreatorId = user_id, CreatedAt = now },
                new Product { Name = "Frijol 1kg", Amount = 1.00m, UnitId = unitKg.Id, BrandId = brandDefault.Id, StatusId = statusActive.Id, CreatorId = user_id, CreatedAt = now },

                // 10 additional products requested
                new Product { Name = "Leche 1L", Amount = 1.00m, UnitId = unitL.Id, BrandId = brandDefault.Id, StatusId = statusActive.Id, CreatorId = user_id, CreatedAt = now },
                new Product { Name = "Huevos 12pz", Amount = 12.00m, UnitId = unitPiece.Id, BrandId = brandDefault.Id, StatusId = statusActive.Id, CreatorId = user_id, CreatedAt = now },
                new Product { Name = "Aceite 1L", Amount = 1.00m, UnitId = unitL.Id, BrandId = brandDefault.Id, StatusId = statusActive.Id, CreatorId = user_id, CreatedAt = now },
                new Product { Name = "Azúcar 1kg", Amount = 1.00m, UnitId = unitKg.Id, BrandId = brandDefault.Id, StatusId = statusActive.Id, CreatorId = user_id, CreatedAt = now },
                new Product { Name = "Pasta 500g", Amount = 0.5m, UnitId = unitKg.Id, BrandId = brandDefault.Id, StatusId = statusActive.Id, CreatorId = user_id, CreatedAt = now },
                new Product { Name = "Detergente líquido 1L", Amount = 1.00m, UnitId = unitL.Id, BrandId = brandDefault.Id, StatusId = statusActive.Id, CreatorId = user_id, CreatedAt = now },
                new Product { Name = "Jugo 1L", Amount = 1.00m, UnitId = unitL.Id, BrandId = brandDefault.Id, StatusId = statusActive.Id, CreatorId = user_id, CreatedAt = now },
                new Product { Name = "Queso fresco 500g", Amount = 0.5m, UnitId = unitKg.Id, BrandId = brandDefault.Id, StatusId = statusActive.Id, CreatorId = user_id, CreatedAt = now },
                new Product { Name = "Pan blanco 400g", Amount = 0.4m, UnitId = unitKg.Id, BrandId = brandDefault.Id, StatusId = statusActive.Id, CreatorId = user_id, CreatedAt = now },
                new Product { Name = "Tomate 1kg", Amount = 1.00m, UnitId = unitKg.Id, BrandId = brandDefault.Id, StatusId = statusActive.Id, CreatorId = user_id, CreatedAt = now }
            };

            context.Products.AddRange(products);
            context.SaveChanges();

            // Map products to categories
            Product Find(string name) => context.Products.First(p => p.Name == name);

            context.ProductCategories.AddRange(
                new ProductCategory { ProductId = Find("Escoba").Id, CategoryId = limpieza.Id },
                new ProductCategory { ProductId = Find("Jabón en polvo 1kg").Id, CategoryId = limpieza.Id },
                new ProductCategory { ProductId = Find("Pollo entero").Id, CategoryId = carnes.Id },
                new ProductCategory { ProductId = Find("Pechuga de pollo").Id, CategoryId = carnes.Id },
                new ProductCategory { ProductId = Find("Pescado tilapia").Id, CategoryId = pescados.Id },
                new ProductCategory { ProductId = Find("Atún en lata").Id, CategoryId = pescados.Id },
                new ProductCategory { ProductId = Find("Arroz 1kg").Id, CategoryId = abarrotes.Id },
                new ProductCategory { ProductId = Find("Frijol 1kg").Id, CategoryId = abarrotes.Id },
                new ProductCategory { ProductId = Find("Leche 1L").Id, CategoryId = abarrotes.Id },
                new ProductCategory { ProductId = Find("Huevos 12pz").Id, CategoryId = abarrotes.Id },
                new ProductCategory { ProductId = Find("Aceite 1L").Id, CategoryId = abarrotes.Id },
                new ProductCategory { ProductId = Find("Azúcar 1kg").Id, CategoryId = abarrotes.Id },
                new ProductCategory { ProductId = Find("Pasta 500g").Id, CategoryId = abarrotes.Id },
                new ProductCategory { ProductId = Find("Detergente líquido 1L").Id, CategoryId = limpieza.Id },
                new ProductCategory { ProductId = Find("Queso fresco 500g").Id, CategoryId = abarrotes.Id },
                new ProductCategory { ProductId = Find("Pan blanco 400g").Id, CategoryId = abarrotes.Id },
                new ProductCategory { ProductId = Find("Tomate 1kg").Id, CategoryId = abarrotes.Id }
            );
            context.SaveChanges();

            // Create store-product relations (both stores stock most items).
            // Also set StatusId on StoreProduct (required).
            foreach (var prod in context.Products.ToList())
            {
                var spW = new StoreProduct { StoreId = walmart.Id, ProductId = prod.Id, StatusId = statusActive.Id, CreatedAt = now };
                var spC = new StoreProduct { StoreId = calimax.Id, ProductId = prod.Id, StatusId = statusActive.Id, CreatedAt = now };
                context.StoreProducts.AddRange(spW, spC);
            }
            context.SaveChanges();

            // Seed sample prices for comparisons. Set StatusId and CreatedBy (required).
            var random = new Random(42);

            foreach (var sp in context.StoreProducts.Include(x => x.Product).ToList())
            {
                decimal basePrice = sp.Product.Amount > 0 ? sp.Product.Amount * (sp.Product.UnitId == unitKg.Id ? 50m : 1m) : 10m;
                var price1 = basePrice + (decimal)(random.NextDouble() * 20 - 10);
                var price2 = basePrice + (decimal)(random.NextDouble() * 20 - 10);

                context.StoreProductPrices.Add(new StoreProductPrice { StoreProductId = sp.Id, Price = Math.Round(price1, 2), CreatedAt = now.AddDays(-1), StatusId = statusActive.Id, CreatorId = user_id });
                context.StoreProductPrices.Add(new StoreProductPrice { StoreProductId = sp.Id, Price = Math.Round(price2, 2), CreatedAt = now, StatusId = statusActive.Id, CreatorId = user_id });
            }

            context.SaveChanges();
        }
    }
}