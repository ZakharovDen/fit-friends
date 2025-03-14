-- CreateTable
CREATE TABLE "trainings" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "special_offer" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trainings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedbacks" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "training_id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feedbacks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "trainings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
