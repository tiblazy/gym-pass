import { app } from '@/app'
import { prisma } from '@/configs/prisma'
import { createAndAuthenticate } from '@/factories/tests/make-create-and-authenticate-member'
import { nearGymStaticLocation } from '@/utils/static-locations'
import request from 'supertest'

describe('History Check In (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to history a check ins', async () => {
    const { token } = await createAndAuthenticate(app)

    const member = await prisma.member.findFirst()

    await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'History Near Gym',
        description: undefined,
        phone: undefined,
        latitude: nearGymStaticLocation.latitude,
        longitude: nearGymStaticLocation.longitude,
      })

    const gym = await prisma.gym.findFirstOrThrow({
      where: { name: 'History Near Gym' },
    })

    await prisma.checkIn.createMany({
      data: [
        {
          gymId: gym.id,
          member_id: member.id,
        },
        {
          gymId: gym.id,
          member_id: member.id,
        },
        {
          gymId: gym.id,
          member_id: member.id,
        },
      ],
    })

    const response = await request(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gymId: gym.id,
        member_id: member.id,
      }),
      expect.objectContaining({
        gymId: gym.id,
        member_id: member.id,
      }),
      expect.objectContaining({
        gymId: gym.id,
        member_id: member.id,
      }),
    ])
  })
})
