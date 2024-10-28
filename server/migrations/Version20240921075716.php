<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240921075716 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE category (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, icon VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE criterion (id INT AUTO_INCREMENT NOT NULL, label LONGTEXT NOT NULL, purpose LONGTEXT NOT NULL, implementation LONGTEXT NOT NULL, testing LONGTEXT NOT NULL, number VARCHAR(5) NOT NULL, category_id INT NOT NULL, INDEX IDX_7C82227112469DE2 (category_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE criterion ADD CONSTRAINT FK_7C82227112469DE2 FOREIGN KEY (category_id) REFERENCES category (id)');
        $this->addSql('CREATE TABLE report (id INT AUTO_INCREMENT NOT NULL, website VARCHAR(255) NOT NULL, criteria JSON NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
    }

    public function postUp(Schema $schema): void
    {
        $this->insertCategories();
        $this->insertCriteria();
    }

     public function insertCriteria(): void
    {
        $json = file_get_contents(__DIR__.'/../public/data/criteria.json');
        $categories = json_decode($json, true);
        foreach ($categories[0] as $category => $criteria) {
            foreach ($criteria as $key => $criterion) {
                $number = sprintf('%d.%d', $category, ++$key);
                $this->connection->executeStatement(
                    sprintf(
                        'INSERT INTO criterion (label, purpose, implementation, testing, number, category_id) VALUES ("%s", "%s", "%s", "%s", "%s", %d)',
                        addslashes($criterion['label']),
                        addslashes($criterion['purpose']),
                        addslashes($criterion['implementation']),
                        addslashes($criterion['testing']),
                        $number,
                        $category,
                    ),
                );
            }
        }
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE criterion DROP FOREIGN KEY FK_7C82227112469DE2');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE criterion');
        $this->addSql('DROP TABLE report');
    }

    private function insertCategories(): void {
        $json = file_get_contents(__DIR__.'/../public/data/categories.json');
        $categories = json_decode($json, true);
        foreach ($categories as $category) {
            $this->connection->executeStatement(
                sprintf(
                    'INSERT INTO category VALUES (%d, "%s", "%s", "%s")',
                    $category['id'],
                    $category['name'],
                    $category['description'],
                    $category['icon'],
                ),
            );
        }
    }
}
