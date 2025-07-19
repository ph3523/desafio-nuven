-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha_hash" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Datasets" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Datasets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Records" (
    "id" SERIAL NOT NULL,
    "dataset_id" INTEGER NOT NULL,
    "dados_json" JSONB NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Queries" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "pergunta" TEXT NOT NULL,
    "resposta" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Queries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Datasets" ADD CONSTRAINT "Datasets_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Records" ADD CONSTRAINT "Records_dataset_id_fkey" FOREIGN KEY ("dataset_id") REFERENCES "Datasets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Queries" ADD CONSTRAINT "Queries_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
