import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRoleColumn1727850355153 implements MigrationInterface {
    name = 'UserRoleColumn1727850355153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` enum ('user', 'admin') NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`description\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`description\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
    }

}
