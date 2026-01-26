using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class StoreProductConfiguration : IEntityTypeConfiguration<StoreProduct>
{
    public void Configure(EntityTypeBuilder<StoreProduct> builder)
    {
        builder.ToTable("stores_products");

        builder.HasKey(x => x.Id);

        builder.HasIndex(x => new { x.StoreId, x.ProductId })
               .IsUnique();

        builder.HasOne(x => x.Store)
               .WithMany(x => x.StoreProducts)
               .HasForeignKey(x => x.StoreId);

        builder.HasOne(x => x.Product)
               .WithMany(x => x.StoreProducts)
               .HasForeignKey(x => x.ProductId);
    }
}
