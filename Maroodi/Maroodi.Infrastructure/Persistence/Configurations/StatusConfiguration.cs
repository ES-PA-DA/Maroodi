using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class StatusConfiguration : IEntityTypeConfiguration<Status>
{
    public void Configure(EntityTypeBuilder<Status> builder)
    {
        builder.ToTable("statuses");
        builder.HasData(
            new Status { Id = 1, Name = "Active" },
            new Status { Id = 2, Name = "Inactive" });
    }
}
