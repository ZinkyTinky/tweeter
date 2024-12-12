using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace final_project.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    TweeterId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FirstName = table.Column<string>(type: "TEXT", nullable: true),
                    LastName = table.Column<string>(type: "TEXT", nullable: true),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    Password = table.Column<string>(type: "TEXT", nullable: false),
                    Username = table.Column<string>(type: "TEXT", nullable: false),
                    Bio = table.Column<string>(type: "TEXT", nullable: false),
                    ProfilePicture = table.Column<string>(type: "TEXT", nullable: true),
                    following = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.TweeterId);
                });

            migrationBuilder.CreateTable(
                name: "Tweet",
                columns: table => new
                {
                    TweetId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    createdAt = table.Column<DateTime>(type: "TEXT", nullable: true),
                    editedAt = table.Column<DateTime>(type: "TEXT", nullable: true),
                    TweetBody = table.Column<string>(type: "TEXT", nullable: false),
                    TweeterId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tweet", x => x.TweetId);
                    table.ForeignKey(
                        name: "FK_Tweet_Users_TweeterId",
                        column: x => x.TweeterId,
                        principalTable: "Users",
                        principalColumn: "TweeterId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "TweeterId", "Bio", "Email", "FirstName", "LastName", "Password", "ProfilePicture", "Username", "following" },
                values: new object[] { 1, "Honestly just a chill guy", "zian@tsale.co.za", "Zian", "Jacobsen", "Password1!", "https://i.imgur.com/1.jpg", "zianjacobsen", null });

            migrationBuilder.InsertData(
                table: "Tweet",
                columns: new[] { "TweetId", "Title", "TweetBody", "TweeterId", "createdAt", "editedAt" },
                values: new object[] { 1, "Cappa lover", "I'm just a chill guy who loves cappuccinos", 1, null, null });

            migrationBuilder.InsertData(
                table: "Tweet",
                columns: new[] { "TweetId", "Title", "TweetBody", "TweeterId", "createdAt", "editedAt" },
                values: new object[] { 2, "HC lover", "I'm just a chill guy who loves Hot chocolates", 1, null, null });

            migrationBuilder.CreateIndex(
                name: "IX_Tweet_TweeterId",
                table: "Tweet",
                column: "TweeterId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tweet");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
