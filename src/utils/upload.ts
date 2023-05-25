import multer from 'fastify-multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    callback(null, path.join(__dirname, `../../uploads`))
  },

  filename: (request, file, callback) => {
    callback(null, `${file.fieldname}-${request.user.sub}-${file.originalname}`)
  },
})

export const upload = multer({
  storage,
  fileFilter: (_, file, callback) => {
    const authorizedMimeTypes = ['image/jpg', 'image/jpeg', 'image/png']

    const authorized = authorizedMimeTypes.find(
      (mimetype) => mimetype === file.mimetype,
    )

    if (authorized) {
      callback(null, true)
    }

    callback(null, false)
  },
})
