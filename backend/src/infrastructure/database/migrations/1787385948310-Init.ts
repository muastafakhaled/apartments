import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1787385948310 implements MigrationInterface {
    name = 'Init1787385948310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "areas" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, CONSTRAINT "PK_5110493f6342f34c978c084d0d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8c2ad80240e18fcac9e7c52631" ON "areas"  ("name") `);
        await queryRunner.query(`CREATE TABLE "amenities" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "UQ_8c5f9c7ff7e2174b53d4be10247" UNIQUE ("name"), CONSTRAINT "PK_c0777308847b3556086f2fb233e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."installment_frequency" AS ENUM('Monthly', 'Quarterly', 'Semi-Annually')`);
        await queryRunner.query(`CREATE TABLE "payment_plans" ("id" SERIAL NOT NULL, "apartment_id" integer NOT NULL, "down_payment_pct" numeric(5,2), "term_months" smallint, "installment_amount" numeric(14,2), "installment_frequency" "public"."installment_frequency", CONSTRAINT "PK_8f05aee900e96c2e0c24df48262" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_daeb199b0cbd8dfb7e6e50b7ce" ON "payment_plans"  ("apartment_id") `);
        await queryRunner.query(`CREATE TYPE "public"."apartment_status" AS ENUM('New', 'Launch', 'Ready to Move', 'Near Delivery')`);
        await queryRunner.query(`CREATE TYPE "public"."sale_type" AS ENUM('Developer Sale', 'Resale', 'Nawy Now')`);
        await queryRunner.query(`CREATE TYPE "public"."finishing" AS ENUM('Fully Finished', 'Unfinished', 'Semi-Finished')`);
        await queryRunner.query(`CREATE TYPE "public"."currency" AS ENUM('EGP')`);
        await queryRunner.query(`CREATE TABLE "apartments" ("id" SERIAL NOT NULL, "reference_no" character varying(50) NOT NULL, "title" character varying(255) NOT NULL, "description" text NOT NULL, "image_url" character varying(500) NOT NULL, "status" "public"."apartment_status" NOT NULL DEFAULT 'New', "sale_type" "public"."sale_type" NOT NULL, "finishing" "public"."finishing" NOT NULL, "price" numeric(14,2) NOT NULL, "currency" "public"."currency" NOT NULL DEFAULT 'EGP', "area_sqm" numeric(10,2) NOT NULL, "bedrooms" smallint NOT NULL, "bathrooms" smallint NOT NULL, "floor" smallint NOT NULL, "delivery_date" date, "compound_id" integer NOT NULL, "maintenance_fee" numeric(14,2), "map_lat" numeric(9,6) NOT NULL, "map_lng" numeric(9,6) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f6058e85d6d715dbe22b72fe722" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_3c2204f0486206c911d4d19676" ON "apartments"  ("reference_no") `);
        await queryRunner.query(`CREATE INDEX "IDX_d34ba19b3888abfeaebb444eba" ON "apartments"  ("sale_type") `);
        await queryRunner.query(`CREATE INDEX "IDX_26ebd3c408f10cf6baeba7004e" ON "apartments"  ("price") `);
        await queryRunner.query(`CREATE INDEX "IDX_9554fd858953cbd28bba36d578" ON "apartments"  ("area_sqm") `);
        await queryRunner.query(`CREATE INDEX "IDX_238ab841439eb228c04bdc4bac" ON "apartments"  ("bedrooms") `);
        await queryRunner.query(`CREATE INDEX "IDX_55d37c286a265d21050cae70d2" ON "apartments"  ("compound_id") `);
        await queryRunner.query(`CREATE TABLE "compounds" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "area_id" integer, "developer_id" integer, "developer_start_price" numeric(14,2), "resale_start_price" numeric(14,2), CONSTRAINT "PK_adbbe9a1cdf9d1bf038d6458449" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_db2b6e7bbc10a360af67b86773" ON "compounds"  ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_dc1aace285a0b8a461e70f1379" ON "compounds"  ("area_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_8c068a54ff658b9e500e406696" ON "compounds"  ("developer_id") `);
        await queryRunner.query(`CREATE TABLE "developers" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, CONSTRAINT "PK_247719240b950bd26dec14bdd21" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9ba1b2a1f42a1d6f117a6c0451" ON "developers"  ("name") `);
        await queryRunner.query(`CREATE TABLE "apartment_amenities" ("apartment_id" integer NOT NULL, "amenity_id" integer NOT NULL, CONSTRAINT "PK_33a921fd39ea44e6818fa617967" PRIMARY KEY ("apartment_id", "amenity_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5bab395a4fbf6d7ec165ac6511" ON "apartment_amenities"  ("apartment_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_d3a13a009ba82f873a79fb7d81" ON "apartment_amenities"  ("amenity_id") `);
        await queryRunner.query(`ALTER TABLE "payment_plans" ADD CONSTRAINT "FK_daeb199b0cbd8dfb7e6e50b7ce5" FOREIGN KEY ("apartment_id") REFERENCES "apartments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "apartments" ADD CONSTRAINT "FK_55d37c286a265d21050cae70d2a" FOREIGN KEY ("compound_id") REFERENCES "compounds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "compounds" ADD CONSTRAINT "FK_dc1aace285a0b8a461e70f13792" FOREIGN KEY ("area_id") REFERENCES "areas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "compounds" ADD CONSTRAINT "FK_8c068a54ff658b9e500e4066966" FOREIGN KEY ("developer_id") REFERENCES "developers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "apartment_amenities" ADD CONSTRAINT "FK_5bab395a4fbf6d7ec165ac6511b" FOREIGN KEY ("apartment_id") REFERENCES "apartments"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "apartment_amenities" ADD CONSTRAINT "FK_d3a13a009ba82f873a79fb7d81d" FOREIGN KEY ("amenity_id") REFERENCES "amenities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "apartment_amenities" DROP CONSTRAINT "FK_d3a13a009ba82f873a79fb7d81d"`);
        await queryRunner.query(`ALTER TABLE "apartment_amenities" DROP CONSTRAINT "FK_5bab395a4fbf6d7ec165ac6511b"`);
        await queryRunner.query(`ALTER TABLE "compounds" DROP CONSTRAINT "FK_8c068a54ff658b9e500e4066966"`);
        await queryRunner.query(`ALTER TABLE "compounds" DROP CONSTRAINT "FK_dc1aace285a0b8a461e70f13792"`);
        await queryRunner.query(`ALTER TABLE "apartments" DROP CONSTRAINT "FK_55d37c286a265d21050cae70d2a"`);
        await queryRunner.query(`ALTER TABLE "payment_plans" DROP CONSTRAINT "FK_daeb199b0cbd8dfb7e6e50b7ce5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d3a13a009ba82f873a79fb7d81"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5bab395a4fbf6d7ec165ac6511"`);
        await queryRunner.query(`DROP TABLE "apartment_amenities"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9ba1b2a1f42a1d6f117a6c0451"`);
        await queryRunner.query(`DROP TABLE "developers"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8c068a54ff658b9e500e406696"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dc1aace285a0b8a461e70f1379"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_db2b6e7bbc10a360af67b86773"`);
        await queryRunner.query(`DROP TABLE "compounds"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_55d37c286a265d21050cae70d2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_238ab841439eb228c04bdc4bac"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9554fd858953cbd28bba36d578"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_26ebd3c408f10cf6baeba7004e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d34ba19b3888abfeaebb444eba"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3c2204f0486206c911d4d19676"`);
        await queryRunner.query(`DROP TABLE "apartments"`);
        await queryRunner.query(`DROP TYPE "public"."currency"`);
        await queryRunner.query(`DROP TYPE "public"."finishing"`);
        await queryRunner.query(`DROP TYPE "public"."sale_type"`);
        await queryRunner.query(`DROP TYPE "public"."apartment_status"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_daeb199b0cbd8dfb7e6e50b7ce"`);
        await queryRunner.query(`DROP TABLE "payment_plans"`);
        await queryRunner.query(`DROP TYPE "public"."installment_frequency"`);
        await queryRunner.query(`DROP TABLE "amenities"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8c2ad80240e18fcac9e7c52631"`);
        await queryRunner.query(`DROP TABLE "areas"`);
    }

}
