﻿using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SalonML_API.Data.Models
{
    public class DynamicContent
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Column(TypeName = "varchar(255)")]
        [Required]
        public string Name { get; set; }

        public string? TextEnglish { get; set; }

        public string? TextBosnian { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string? ImageCaptionEnglish { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string? ImageCaptionBosnian { get; set; }

        [Column(TypeName = "varchar(254)")]
        public string? ImageUrl { get; set; }

        [Column(TypeName = "varbinary(max)")]
        // todo check if this should be string
        public string? ImageData { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string? IconValue { get; set; }

        public int? OrderIndex { get; set; }

        [Column(TypeName = "varchar(100)")]
        [Required]
        public string ModifiedBy { get; set; }

        [Required]
        public DateTime ModifiedOn { get; set; }
    }
}
