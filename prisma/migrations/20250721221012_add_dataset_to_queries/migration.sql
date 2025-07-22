/*
  Warnings:

  - Added the required column `dataset_id` to the `Queries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Queries" ADD COLUMN     "dataset_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Queries" ADD CONSTRAINT "Queries_dataset_id_fkey" FOREIGN KEY ("dataset_id") REFERENCES "Datasets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
