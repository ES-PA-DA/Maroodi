using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;

public class AppDbContext : DbContext, IApplicationDbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Store> Stores => Set<Store>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Brand> Brands => Set<Brand>();
    public DbSet<Unit> Units => Set<Unit>();
    public DbSet<Status> Statuses => Set<Status>();
    public DbSet<Interaction> Interactions => Set<Interaction>();

    public DbSet<StoreProduct> StoreProducts => Set<StoreProduct>();
    public DbSet<StoreProductPrice> StoreProductPrices => Set<StoreProductPrice>();
    public DbSet<StoreProductPriceReview> StoreProductPriceReviews => Set<StoreProductPriceReview>();

    public DbSet<ProductCategory> ProductCategories => Set<ProductCategory>();
    public DbSet<StoreCategory> StoreCategories => Set<StoreCategory>();

    public DbSet<UserStore> UserStores => Set<UserStore>();
    public DbSet<UserProduct> UserProducts => Set<UserProduct>();
    public DbSet<UserCategory> UserCategories => Set<UserCategory>();
    public DbSet<UserInteraction> UserInteractions => Set<UserInteraction>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseSnakeCaseNames();
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }
}
