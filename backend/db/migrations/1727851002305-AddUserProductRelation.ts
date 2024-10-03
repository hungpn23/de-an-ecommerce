import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserProductRelation1727851002305 implements MigrationInterface {
    name = 'AddUserProductRelation1727851002305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`description\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_329b8ae12068b23da547d3b4798\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_329b8ae12068b23da547d3b4798\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`userId\``);
    }

}
