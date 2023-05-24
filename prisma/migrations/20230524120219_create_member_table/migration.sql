-- CreateTable
CREATE TABLE "members" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "totp_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totp_key" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "members_email_key" ON "members"("email");

-- CreateIndex
CREATE UNIQUE INDEX "members_totp_created_at_key" ON "members"("totp_created_at");

-- CreateIndex
CREATE UNIQUE INDEX "members_totp_key_key" ON "members"("totp_key");
