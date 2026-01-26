using Microsoft.EntityFrameworkCore;

public interface IApplicationDbContext
{
    DbSet<User> Users { get; }
    DbSet<Product> Products { get; }
    DbSet<Store> Stores { get; }
    DbSet<Category> Categories { get; }
    DbSet<Brand> Brands { get; }
    DbSet<Unit> Units { get; }
    DbSet<Status> Statuses { get; }
    DbSet<Interaction> Interactions { get; }

    DbSet<StoreProduct> StoreProducts { get; }
    DbSet<StoreProductPrice> StoreProductPrices { get; }
    DbSet<StoreProductPriceReview> StoreProductPriceReviews { get; }

    DbSet<ProductCategory> ProductCategories { get; }
    DbSet<StoreCategory> StoreCategories { get; }

    DbSet<UserStore> UserStores { get; }
    DbSet<UserProduct> UserProducts { get; }
    DbSet<UserCategory> UserCategories { get; }
    DbSet<UserInteraction> UserInteractions { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
