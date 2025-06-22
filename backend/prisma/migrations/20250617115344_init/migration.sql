-- CreateTable
CREATE TABLE "Usuario" (
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "quantAcesso" INTEGER NOT NULL DEFAULT 0,
    "tentativasErradas" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "Livro" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "criadoPor" TEXT NOT NULL,

    CONSTRAINT "Livro_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Livro" ADD CONSTRAINT "Livro_criadoPor_fkey" FOREIGN KEY ("criadoPor") REFERENCES "Usuario"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
