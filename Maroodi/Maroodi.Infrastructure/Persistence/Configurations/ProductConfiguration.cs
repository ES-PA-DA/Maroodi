using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable("products");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Name)
               .IsRequired()
               .HasMaxLength(150);

        builder.Property(x => x.Amount)
               .HasPrecision(10, 2);

        builder.HasOne(x => x.Unit)
               .WithMany()
               .HasForeignKey(x => x.UnitId);

        builder.HasOne(x => x.Brand)
               .WithMany(x => x.Products)
               .HasForeignKey(x => x.BrandId);

        builder.HasOne(x => x.Status)
               .WithMany()
               .HasForeignKey(x => x.StatusId);
    }
}
