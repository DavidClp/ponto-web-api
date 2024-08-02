-- CreateTable
CREATE TABLE "collaborator" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(55) NOT NULL,

    CONSTRAINT "collaborator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shift" (
    "id" SERIAL NOT NULL,
    "collaborator_code" VARCHAR(55) NOT NULL,
    "entry" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exit" TIMESTAMP(3),

    CONSTRAINT "shift_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "collaborator_code_key" ON "collaborator"("code");

-- AddForeignKey
ALTER TABLE "shift" ADD CONSTRAINT "shift_collaborator_code_fkey" FOREIGN KEY ("collaborator_code") REFERENCES "collaborator"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
