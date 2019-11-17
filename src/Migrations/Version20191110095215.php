<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191110095215 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE invoice (id INT AUTO_INCREMENT NOT NULL, membership_id INT NOT NULL, amount INT NOT NULL, status SMALLINT NOT NULL, currency VARCHAR(3) NOT NULL, payment_type VARCHAR(10) DEFAULT NULL, paytext VARCHAR(255) DEFAULT NULL, request_id INT DEFAULT NULL, created_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL, canceled_at DATETIME DEFAULT NULL, INDEX IDX_906517441FB354CD (membership_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE membership (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, status VARCHAR(20) NOT NULL, expired_at DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE invoice ADD CONSTRAINT FK_906517441FB354CD FOREIGN KEY (membership_id) REFERENCES membership (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE invoice DROP FOREIGN KEY FK_906517441FB354CD');
        $this->addSql('DROP TABLE invoice');
        $this->addSql('DROP TABLE membership');
    }
}
