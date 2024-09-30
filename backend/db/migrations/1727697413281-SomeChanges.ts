import { MigrationInterface, QueryRunner } from "typeorm";

export class SomeChanges1727697413281 implements MigrationInterface {
    name = 'SomeChanges1727697413281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product_categories_category\` (\`productId\` int NOT NULL, \`categoryId\` int NOT NULL, INDEX \`IDX_342d06dd0583aafc156e076379\` (\`productId\`), INDEX \`IDX_15520e638eb4c46c4fb2c61c4b\` (\`categoryId\`), PRIMARY KEY (\`productId\`, \`categoryId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_sizes_size\` (\`productId\` int NOT NULL, \`sizeId\` int NOT NULL, INDEX \`IDX_c363d4050056518c07348e8a27\` (\`productId\`), INDEX \`IDX_a7bd6fac9cf96620ec68761ef3\` (\`sizeId\`), PRIMARY KEY (\`productId\`, \`sizeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product_categories_category\` ADD CONSTRAINT \`FK_342d06dd0583aafc156e0763790\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_categories_category\` ADD CONSTRAINT \`FK_15520e638eb4c46c4fb2c61c4b4\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_sizes_size\` ADD CONSTRAINT \`FK_c363d4050056518c07348e8a27e\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_sizes_size\` ADD CONSTRAINT \`FK_a7bd6fac9cf96620ec68761ef3b\` FOREIGN KEY (\`sizeId\`) REFERENCES \`size\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_sizes_size\` DROP FOREIGN KEY \`FK_a7bd6fac9cf96620ec68761ef3b\``);
        await queryRunner.query(`ALTER TABLE \`product_sizes_size\` DROP FOREIGN KEY \`FK_c363d4050056518c07348e8a27e\``);
        await queryRunner.query(`ALTER TABLE \`product_categories_category\` DROP FOREIGN KEY \`FK_15520e638eb4c46c4fb2c61c4b4\``);
        await queryRunner.query(`ALTER TABLE \`product_categories_category\` DROP FOREIGN KEY \`FK_342d06dd0583aafc156e0763790\``);
        await queryRunner.query(`DROP INDEX \`IDX_a7bd6fac9cf96620ec68761ef3\` ON \`product_sizes_size\``);
        await queryRunner.query(`DROP INDEX \`IDX_c363d4050056518c07348e8a27\` ON \`product_sizes_size\``);
        await queryRunner.query(`DROP TABLE \`product_sizes_size\``);
        await queryRunner.query(`DROP INDEX \`IDX_15520e638eb4c46c4fb2c61c4b\` ON \`product_categories_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_342d06dd0583aafc156e076379\` ON \`product_categories_category\``);
        await queryRunner.query(`DROP TABLE \`product_categories_category\``);
    }

}
