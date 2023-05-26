import { Member } from '@prisma/client'
import { app } from '../app'

const cloudinaryUpload = async (file: any, member: Member) => {
  const { cloudinary } = app

  const { public_id, url } = await cloudinary.uploader.upload(file.path, {
    folder: member.username,
    public_id: file.filename,
  })

  return { public_id, url }
}

export { cloudinaryUpload }
